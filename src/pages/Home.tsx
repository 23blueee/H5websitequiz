import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import titleImg from "@/assets/title.png";
// 在文件顶部 import 处后添加自定义动画样式
import "../App.css";

/**
 * 首页组件
 * - 活动介绍、奖品、温馨提示、开始答题按钮
 * - 使用 shadcn/ui Card、Button、Alert
 * - 移动端自适应
 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  // const prizes = [
  //   {
  //     name: "无菌鸡蛋 1 箱",
  //   },
  //   {
  //     name: "赛博拐杖 1 根",
  //   },
  //   {
  //     name: "黄金 1 块",
  //   },
  // ];

  return (
    // 页面整体flex布局，内容区自适应剩余高度，底部按钮固定，背景图宽度100%高度自适应
    <div
      className="min-h-screen w-full bg-gray-50 relative"
      style={{
        backgroundImage:
          "url(/src/assets/bg.jpg)",
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
          onClick={() =>
            navigate("/quiz")
          }
        >
          点击参与答题，赢精美奖品!
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
                名额仅限350个，先到先得，速来参与！
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
