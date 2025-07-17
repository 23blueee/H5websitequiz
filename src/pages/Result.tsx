import React from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { questions } from "../data/questions";
import { Button } from "@/components/ui/button";

/**
 * 答题结果页组件
 * 仅错题解析部分的每道题目为卡片样式（bg-white rounded-lg p-4 shadow），其余内容普通排版
 */
const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 通过 location.state 获取答题结果
  const { success, wrongList } =
    location.state || {};

  // 若未传递 state，直接跳转回首页
  if (typeof success === "undefined") {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center px-0 relative">
      {/* 内容区域顶部对齐，普通排版 */}
      <div className="w-full max-w-md flex flex-col items-center px-4 mt-12">
        {success ? (
          <>
            {/* 最大标题 2xl */}
            <div className="text-2xl font-bold text-green-600 mb-2 text-left w-full">
              恭喜你，全部答对！
            </div>
            {/* 小标题 xl */}
            <div className="text-xl font-semibold text-slate-800 mb-4 text-left w-full">
              可以继续填写表单，参与后续活动
            </div>
          </>
        ) : (
          <>
            {/* 最大标题 2xl */}
            <div className="text-2xl font-bold text-slate-800 mb-2 text-left w-full">
              答题未全部正确
            </div>
            {/* 小标题 xl */}
            <div className="text-xl font-semibold text-slate-800 mb-4 text-left w-full">
              请查看错题解析后重新挑战！
            </div>
            {/* 错题解析，每道题为卡片样式，内容区自适应剩余高度，超出部分可滚动，底部预留空间防止被按钮遮挡 */}
            <div
              className="flex-1 w-full space-y-4 overflow-y-auto mb-8 pb-40"
              style={{ minHeight: 0 }}
            >
              {(wrongList || []).map(
                (idx: number) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4"
                  >
                    <div className="font-semibold mb-1 text-lg">
                      {
                        questions[idx]
                          .question
                      }
                    </div>
                    <div className="text-gray-800 mb-1 text-lg">
                      正确答案：
                      {
                        questions[idx]
                          .answer
                      }
                    </div>
                    <div className="text-gray-800 text-lg">
                      解析：
                      {
                        questions[idx]
                          .explanation
                      }
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
      {/* 按钮固定底部居中，宽度自适应，高度56px，左右间距mx-4，新增“回到首页”按钮，按钮组上下布局 */}
      <div className="fixed left-0 right-0 bottom-0 w-full sm:max-w-md sm:mx-auto px-4 sm:px-4 bg-gray-50 pb-6 pt-2 flex flex-col justify-center items-center z-20">
        {success ? (
          <>
            {/* 去填写表单按钮 */}
            <Button
              className="w-full h-14 text-lg rounded-full max-w-md mx-4 mb-3"
              onClick={() =>
                navigate("/form")
              }
            >
              去填写表单
            </Button>
            {/* 回到首页按钮 */}
            <Button
              variant="link"
              className="w-full h-14 text-lg rounded-full max-w-md mx-4"
              onClick={() =>
                navigate("/")
              }
            >
              回到首页
            </Button>
          </>
        ) : (
          <>
            {/* 重新挑战按钮 */}
            <Button
              className="w-full h-14 text-lg rounded-full max-w-md mx-4 mb-3"
              onClick={() =>
                navigate("/quiz")
              }
            >
              重新挑战
            </Button>
            {/* 回到首页按钮 */}
            <Button
              variant="outline"
              className="w-full h-14 text-lg rounded-full max-w-md mx-4"
              onClick={() =>
                navigate("/")
              }
            >
              回到首页
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Result;
