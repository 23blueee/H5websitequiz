import React, {
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import titleImg from "@/assets/title.png";
import shockImg from "@/assets/shock.png";
import bgImg from "@/assets/bg.jpg";
import { getQuotaCount } from "@/services/api";
import type { QuotaCount } from "@/services/api";
// 导入Home页面专用样式
import "./Home.css";

/**
 * 首页组件
 * - 活动介绍、奖品、温馨提示、开始答题按钮
 * - 使用 shadcn/ui Card、Button、Alert
 * - 移动端自适应
 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [quotaCount, setQuotaCount] =
    useState<QuotaCount | null>(null);
  const [isLoading, setIsLoading] =
    useState(true);
  const [
    showQuotaExceeded,
    setShowQuotaExceeded,
  ] = useState(false);

  // 页面加载时获取名额数量
  useEffect(() => {
    const loadQuotaCount = async () => {
      try {
        const count =
          await getQuotaCount();
        console.log(
          "获取到的名额数据:",
          count
        );
        setQuotaCount(count);
      } catch (error) {
        console.error(
          "加载名额数量失败:",
          error
        );
        // 如果加载失败，设置默认值
        setQuotaCount({
          total: 1,
          used: 0,
          count: 1,
          remaining: 1,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadQuotaCount();
  }, []);

  // 处理按钮点击
  const handleButtonClick = () => {
    console.log(
      "按钮点击，当前名额数据:",
      quotaCount
    );
    console.log(
      "剩余名额:",
      quotaCount?.remaining
    );
    console.log(
      "剩余名额 === 0:",
      quotaCount?.remaining === 0
    );

    if (quotaCount?.remaining === 0) {
      // 如果名额已满，显示弹窗
      console.log("显示弹窗");
      setShowQuotaExceeded(true);
    } else {
      // 如果还有名额，跳转到答题页面
      console.log("跳转到答题页面");
      navigate("/quiz");
    }
  };

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-lg text-gray-600">
          加载中...
        </div>
      </div>
    );
  }

  return (
    // 页面整体flex布局，内容区自适应剩余高度，底部按钮固定，背景图宽度100%高度自适应
    <div
      className="min-h-screen w-full bg-gray-50 relative"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main
        className="w-full sm:max-w-md md:max-w-lg mx-auto px-4 flex flex-col items-center pt-8 z-10"
        style={{ minHeight: 0 }}
      >
        {/* 顶部主标题图片 */}
        <img
          src={titleImg}
          alt="残疾预防线上活动"
          className="w-full h-auto mb-4"
          style={{
            objectFit: "contain",
          }}
        />
        <Button
          className="w-full h-20 text-xl font-bold rounded-full max-w-md mx-4 mt-4 mb-8 animate-breath"
          onClick={handleButtonClick}
        >
          {quotaCount?.remaining === 0
            ? "活动名额已满"
            : "点击参与答题，赢精美奖品!"}
        </Button>

        {/* 奖品展示整合为一个卡片 */}
        <Card className="w-full bg-white/80 backdrop-blur-md rounded-2xl ">
          <CardContent className="p-4 flex flex-col">
            <div className="font-bold text-lg text-center mb-1">
              温馨提示
            </div>
            {/* 奖品长文本说明 */}
            <div className="text-base text-gray-800 ">
              奖品包含但不限于以下内容：无菌鸡蛋，卫生用品，电子配件，其他配饰等
              <br />
              <span className="text-red-500 font-bold">
                剩余名额：
                {quotaCount?.remaining ||
                  0}
                个，先到先得，速来参与！
              </span>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 名额已满弹窗 */}
      <Dialog
        open={showQuotaExceeded}
        onOpenChange={
          setShowQuotaExceeded
        }
      >
        <DialogContent className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-2xl z-[9999]">
          <DialogTitle>
            活动已结束
          </DialogTitle>
          <DialogDescription>
            很抱歉，活动名额已满，感谢您的参与！
          </DialogDescription>
          <img
            src={shockImg}
            alt="名额已满"
            className="w-20 h-20 object-contain"
          />
          <div className="text-xl font-bold text-center text-red-600">
            活动已结束
          </div>
          <div className="text-center text-gray-700 max-w-xs">
            很抱歉，活动名额已满，感谢您的参与！
            <br />
            <span className="text-sm text-gray-500">
              已参与人数：
              {quotaCount?.used || 0}/
              {quotaCount?.total || 350}
            </span>
          </div>
          <Button
            className="w-32 h-12 text-lg rounded-full"
            onClick={() =>
              setShowQuotaExceeded(
                false
              )
            }
          >
            我知道了
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
