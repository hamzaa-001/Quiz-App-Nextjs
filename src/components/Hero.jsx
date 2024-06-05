"use client";

import { useSelector, useDispatch } from "react-redux";
import DropDown from "./templates/DropDown";
import { Button } from "./ui/button";
import { useState } from "react";
import { setNumberOfQuestion } from "@/redux/features/quizSlice";
import { useRouter } from "next/navigation";

const Hero = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const numberOfQuestion = useSelector((state) => state.quiz.numberOfQuestion);
  const [newNumberOfQuestion, setNewNumberOfQuestion] =
    useState(numberOfQuestion);

  const handleClick = () => {
    dispatch(setNumberOfQuestion(parseInt(newNumberOfQuestion, 10)));
    console.log("🚀 ~ Hero ~ numberOfQuestion:", newNumberOfQuestion);
    router.push("/quiz");
  };

  const quiz = useSelector((state) => state.quiz);
  console.log("🚀 ~ Hero ~ quiz:", quiz);

  return (
    <div className="w-full h-[100vh] bg-slate-950 flex flex-col justify-center items-center gap-10">
      <h1 className="text-6xl font-bold text-white">Quiz App</h1>

      <div className="w-[65%] h-[300px] p-10 flex flex-col justify-center items-center bg-white rounded-2xl">
        <div className="w-[100%]">
          <form>
            <label
              htmlFor="number-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select number of Questions:
            </label>
            <input
              type="number"
              id="number-input"
              aria-describedby="helper-text-explanation"
              value={newNumberOfQuestion}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="10"
              required
              onChange={(e) => setNewNumberOfQuestion(e.target.value)}
            />
          </form>
        </div>

        <div className="mt-10">
          <DropDown />
        </div>

        <div className="w-[100%]">
          <Button className="mt-10 w-full" onClick={handleClick}>
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
