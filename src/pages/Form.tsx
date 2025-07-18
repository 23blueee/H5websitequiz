import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addresses } from "../data/addresses";
import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
  DrawerDescription,
} from "@/components/ui/drawer.tsx";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/close.svg";
import happyImg from "@/assets/happy.png";
import shockImg from "@/assets/shock.png";
import { submitForm } from "@/services/api";
import { CustomDialog } from "@/components/ui/CustomDialog";

/**
 * 填写表单页组件
 * 收集用户姓名、手机号和领取地址
 */
const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [site, setSite] = useState("");
  const [error, setError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 前端校验错误状态
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    phone?: string;
    site?: string;
  }>({});

  // 表单提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 清除之前的错误
    setValidationErrors({});
    setError("");

    // 前端表单验证
    const errors: {
      name?: string;
      phone?: string;
      site?: string;
    } = {};

    if (!name.trim()) {
      errors.name = "请输入姓名";
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      errors.phone = "请输入有效的手机号";
    }
    if (!site) {
      errors.site = "请选择领取地址";
    }

    // 如果有前端校验错误，显示错误信息并返回
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 调用API提交表单
      await submitForm({
        name: name.trim(),
        phone,
        site,
      });

      // 提交成功
      setShowSuccess(true);
    } catch (error: unknown) {
      // 处理提交后的错误（使用弹窗）
      console.error("提交失败:", error);

      let errorMessage = "提交失败，请稍后重试";

      if (error instanceof Error) {
        // 优先使用后端返回的具体错误信息
        if (error.message.includes("活动数量已完成")) {
          errorMessage = "很抱歉，活动名额已满，感谢您的参与！";
        } else if (error.message.includes("重复添加")) {
          errorMessage = "该手机号已存在，请使用其他手机号";
        } else if (error.message.includes("网络连接失败")) {
          errorMessage = "网络连接失败，请检查网络连接或联系管理员";
        } else if (error.message.includes("Network Error")) {
          errorMessage = "网络错误，可能是跨域问题，请联系管理员";
        } else {
          // 使用后端返回的具体错误信息
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center relative">
      {/* 表单内容区，顶部不再有header */}
      <main className="w-full sm:max-w-md md:max-w-lg mx-auto px-4 mt-12 z-10">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="text-2xl font-bold text-center mb-2 text-slate-800">
            填写领奖信息
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">姓名</label>
            <Input
              placeholder="请输入姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className={validationErrors.name ? "border-red-500" : ""}
            />
            {validationErrors.name && (
              <div className="text-red-500 text-sm mt-1">
                {validationErrors.name}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">手机号</label>
            <Input
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
              inputMode="numeric"
              disabled={isSubmitting}
              className={validationErrors.phone ? "border-red-500" : ""}
            />
            {validationErrors.phone && (
              <div className="text-red-500 text-sm mt-1">
                {validationErrors.phone}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              领取地址
            </label>
            {/* 点击输入框弹出Drawer，Drawer中选择地址 */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <div
                  className={`h-14 w-full rounded-lg border px-3 flex items-center text-base cursor-pointer ${
                    validationErrors.site ? "border-red-500" : "border-input"
                  } ${!site ? "text-gray-500" : "text-gray-900"} ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isSubmitting && setDrawerOpen(true)}
                >
                  {site || "请选择领取地址"}
                </div>
              </DrawerTrigger>
              {validationErrors.site && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.site}
                </div>
              )}
              <DrawerContent>
                <div>
                  <div className="flex items-center justify-between px-4 h-20">
                    <DrawerTitle className="text-2xl font-bold">
                      选择领取地址
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                    <DrawerClose className="bg-blue-100" asChild>
                      <button className="p-2 rounded-full" aria-label="关闭">
                        <img src={CloseIcon} alt="关闭" className="w-6 h-6" />
                      </button>
                    </DrawerClose>
                  </div>
                  <div className="flex flex-col gap-1 px-4 pb-4">
                    {addresses.map((addr) => (
                      <button
                        key={addr}
                        type="button"
                        className={`w-full text-left px-4 py-3 rounded-lg border border-gray-200 bg-white text-base mb-2 hover:bg-orange-50 ${
                          site === addr
                            ? "border-orange-500 text-orange-600 font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          setSite(addr);
                          setDrawerOpen(false);
                        }}
                      >
                        {addr}
                      </button>
                    ))}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          {/* 移除原来的内联错误显示 */}
        </form>
      </main>
      {/* 底部提交按钮固定，风格统一 */}
      <div className="fixed left-0 right-0 bottom-0 w-full sm:max-w-md md:max-w-lg sm:mx-auto px-4 pb-6 pt-2 flex flex-col justify-center items-center z-20">
        <Button
          className="w-full h-14 text-lg rounded-full max-w-md mx-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "提交中..." : "提交"}
        </Button>
      </div>
      {/* 成功弹窗 */}
      <CustomDialog
        open={showSuccess}
        imgSrc={happyImg}
        imgAlt="成功"
        title="提交成功"
        description="您的领奖信息已提交，请等待通知。"
        content={
          <div className="text-xl font-bold text-center text-green-600">
            提交成功
          </div>
        }
        buttonText="确认"
        onButtonClick={() => navigate("/")}
        onOpenChange={setShowSuccess}
      />
      {/* 错误弹窗 */}
      <CustomDialog
        open={showError}
        imgSrc={shockImg}
        imgAlt="提示"
        title="提交失败"
        description={error}
        content={
          <div className="text-center text-gray-700 max-w-xs">{error}</div>
        }
        buttonText="我知道了"
        onButtonClick={() => {
          setShowError(false);
          navigate("/");
        }}
        onOpenChange={setShowError}
      />
    </div>
  );
};

export default FormPage;
