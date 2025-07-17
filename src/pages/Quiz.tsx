import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

/**
 * 答题页结构：顶部栏（回首页，sticky），题目区域（紧随header），底部操作按钮
 * 样式全统一，所有题目和选项 w-full，无嵌套，无条件样式，移动端自适应
 */
const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] =
    useState(0);
  const [answers, setAnswers] =
    useState<{ [key: number]: string }>(
      {}
    );
  const [error, setError] =
    useState("");

  const handleSelect = (
    val: string
  ) => {
    setAnswers({
      ...answers,
      [current]: val,
    });
    setError("");
  };
  const handleNext = () => {
    if (!answers[current]) {
      setError("请先选择本题答案");
      return;
    }
    setCurrent(current + 1);
    setError("");
  };
  const handlePrev = () => {
    setCurrent(current - 1);
    setError("");
  };
  const handleSubmit = () => {
    if (!answers[current]) {
      setError("请先选择本题答案");
      return;
    }
    if (
      Object.keys(answers).length <
      questions.length
    ) {
      setError("请先完成全部试题");
      return;
    }
    const wrong: number[] = [];
    questions.forEach((q, idx) => {
      if (answers[idx] !== q.answer) {
        wrong.push(idx);
      }
    });
    // 统一跳转到 /result，并传递答题结果
    navigate("/result", {
      state: {
        success: wrong.length === 0,
        wrongList: wrong,
        answers,
      },
    });
  };
  const q = questions[current];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center relative">
      {/* 题目区域紧随 header，所有内容 w-full，无嵌套 */}
      <main className="w-full sm:max-w-lg px-0 sm:mx-auto flex-1 flex flex-col bg-gray-50 px-4 mt-12 z-10">
        <div className="w-full flex flex-col gap-0">
          {/* 题目渲染 */}
          <div className="mb-2 w-full">
            <div className="font-bold mb-8 text-2xl text-left leading-snug w-full">
              {q.question}
            </div>
            <div className="flex flex-col gap-2 w-full">
              {q.options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center cursor-pointer text-xl font-medium w-full h-16 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-all select-none text-left"
                  style={{
                    minHeight: 56,
                  }}
                >
                  <input
                    type="radio"
                    name={`q${current}`}
                    value={opt[0]}
                    checked={
                      answers[
                        current
                      ] === opt[0]
                    }
                    onChange={() =>
                      handleSelect(
                        opt[0]
                      )
                    }
                    className="mr-4 accent-blue-600 w-5 h-5"
                  />
                  <span className="flex-1">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
            {/* 错题高亮（仅弹窗时显示） */}
            {/* 错题解析弹窗（已移除，统一到 result 页面处理） */}
          </div>
          {/* 错误提示 */}
          {error && (
            <div className="w-full px-4">
              <Alert
                variant="destructive"
                className="mb-2"
              >
                <AlertDescription className="text-center text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </main>
      {/* 底部按钮区固定，w-full，max-w-lg 居中 */}
      {/*
        响应式优化说明：
        - 移动端按钮区宽度100vw无留白
        - 大屏时按钮区居中且最大宽度max-w-lg
      */}
      <div className="fixed left-0 right-0 bottom-0 w-full sm:max-w-lg sm:mx-auto px-4 sm:px-4 bg-gray-50 pb-6 pt-2 flex gap-4 z-20">
        <Button
          variant="secondary"
          className="w-1/2 h-16 text-lg rounded-full"
          onClick={handlePrev}
          disabled={current === 0}
        >
          上一题
        </Button>
        {current <
        questions.length - 1 ? (
          <Button
            className="w-1/2 h-16 text-lg rounded-full"
            onClick={handleNext}
            disabled={!answers[current]}
          >
            下一题
          </Button>
        ) : (
          <Button
            className="w-1/2 h-16 text-lg rounded-full"
            onClick={handleSubmit}
            disabled={!answers[current]}
          >
            提交答案
          </Button>
        )}
      </div>
      {/* 错题解析弹窗（已移除，统一到 result 页面处理） */}
    </div>
  );
};

export default Quiz;
