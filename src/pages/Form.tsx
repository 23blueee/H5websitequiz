import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addresses } from "../data/addresses";
import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer.tsx";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog-no-close";
import CloseIcon from "@/assets/close.svg";

/**
 * 填写表单页组件
 * 收集用户姓名、手机号和领取地址
 */
const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] =
    useState("");
  const [address, setAddress] =
    useState("");
  const [error, setError] =
    useState("");
  const [drawerOpen, setDrawerOpen] =
    useState(false);
  const [showSuccess, setShowSuccess] =
    useState(false);

  // 简单校验
  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("请输入姓名");
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError("请输入有效的手机号");
      return;
    }
    if (!address) {
      setError("请选择领取地址");
      return;
    }
    setError("");
    setShowSuccess(true);
    // alert("提交成功！");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center relative">
      {/* 表单内容区，顶部不再有header */}
      <main className="w-full sm:max-w-md md:max-w-lg mx-auto px-4 mt-12 z-10">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="text-2xl font-bold text-center mb-2 text-slate-800">
            填写领奖信息
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              姓名
            </label>
            <Input
              placeholder="请输入姓名"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              手机号
            </label>
            <Input
              placeholder="请输入手机号"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              maxLength={11}
              inputMode="numeric"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">
              领取地址
            </label>
            {/* 点击输入框弹出Drawer，Drawer中选择地址 */}
            <Drawer
              open={drawerOpen}
              onOpenChange={
                setDrawerOpen
              }
            >
              <DrawerTrigger asChild>
                <div
                  className={`h-14 w-full rounded-lg border border-input  px-3 flex items-center text-base cursor-pointer ${
                    !address
                      ? "text-gray-500"
                      : "text-gray-900"
                  }`}
                  onClick={() =>
                    setDrawerOpen(true)
                  }
                >
                  {address ||
                    "请选择领取地址"}
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="flex flex-row">
                  <DrawerTitle>
                    选择领取地址
                  </DrawerTitle>
                  {/* 右上角关闭icon按钮 */}
                  <DrawerClose asChild>
                    <button
                      className=" p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                      aria-label="关闭"
                    >
                      <img
                        src={CloseIcon}
                        alt="关闭"
                        className="w-8 h-8"
                      />
                    </button>
                  </DrawerClose>
                </DrawerHeader>
                <div className="flex flex-col gap-1 px-4 pb-4">
                  {addresses.map(
                    (addr) => (
                      <button
                        key={addr}
                        type="button"
                        className={`w-full text-left px-4 py-3 rounded-lg border border-gray-200 bg-white text-base mb-2 hover:bg-orange-50 ${
                          address ===
                          addr
                            ? "border-orange-500 text-orange-600 font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          setAddress(
                            addr
                          );
                          setDrawerOpen(
                            false
                          );
                        }}
                      >
                        {addr}
                      </button>
                    )
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          {error && (
            <div className="text-red-500 text-center text-sm">
              {error}
            </div>
          )}
        </form>
      </main>
      {/* 底部提交按钮固定，风格统一 */}
      <div className="fixed left-0 right-0 bottom-0 w-full sm:max-w-md md:max-w-lg sm:mx-auto px-4 pb-6 pt-2 flex flex-col justify-center items-center z-20">
        <Button
          className="w-full h-14 text-lg rounded-full max-w-md mx-4"
          onClick={handleSubmit}
        >
          提交
        </Button>
      </div>
      {/* 成功弹窗 */}
      <Dialog open={showSuccess}>
        <DialogContent>
          <div className="text-xl font-bold text-center">
            提交成功
          </div>
          <Button
            className="w-32 h-12 text-lg rounded-full"
            onClick={() =>
              navigate("/")
            }
          >
            确认
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormPage;
