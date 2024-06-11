"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, resetScore } from "@/redux/features/quizSlice";
import { useRouter } from "next/navigation";

const QuizPage = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const quiz = useSelector((state) => state.quiz);
  const { numberOfQuestion, category, level, type, score } = quiz;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${
          category.id
        }&difficulty=${level}&type=${
          type === "True/False" ? "boolean" : "multiple"
        }`
      );

      const data = await response.json();
      const results = data.results;
      const shuffledResult = results.map((e) => {
        const value = [...e.incorrect_answers, e.correct_answer]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        e.answers = [...value];
        return e;
      });

      setQuestions([...shuffledResult]);
      setIsLoading(false);
      dispatch(resetScore());
    };
    fetchQuestions();
  }, [category.id, level, type, numberOfQuestion, dispatch]);

  const handleNext = () => {
    setQuestionIndex(questionIndex + 1);
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    setHasAnswered(true);
    if (answer === questions[questionIndex].correct_answer) {
      dispatch(incrementScore());
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-950 flex flex-col justify-center items-center gap-10">
      {isLoading ? (
        <div className="text-4xl text-white">Loading...</div>
      ) : questionIndex < questions.length ? (
        <>
          <h1 className="lg:text-6xl text-3xl font-bold text-white ">
            Question Number #{questionIndex + 1}
          </h1>

          <p className="text-xl text-white">
            Your score is: {score} / {questions.length}
          </p>

          <div className="lg:w-[65%] w-full min-h-[350px] p-10 flex flex-col justify-center items-center bg-white rounded-2xl">
            <div className="w-[100%]">
              <h3 className="text-center lg:text-3xl text-lg font-bold">
                {questions.length && questions[questionIndex].question}
              </h3>
            </div>

            <div className="w-[100%] grid lg:grid-cols-2 grid-cols-1 lg:gap-x-10 gap-y-2">
              {questions.length &&
                questions[questionIndex].answers?.map((ans, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`lg:mt-10 mt-2 w-full ${
                      hasAnswered
                        ? ans === questions[questionIndex].correct_answer
                          ? "border-2 border-green-500"
                          : ans === selectedAnswer
                          ? "border-2 border-red-500"
                          : "border-2 border-gray-500"
                        : ""
                    }`}
                    onClick={() => !hasAnswered && checkAnswer(ans)}
                    disabled={hasAnswered}
                  >
                    {ans}
                  </Button>
                ))}
            </div>

            <div className="w-[100%]">
              <Button className="mt-10 w-full" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-[65%] h-[350px] p-10 flex flex-col justify-center items-center bg-white rounded-2xl">
          <h1 className="text-6xl font-bold text-white">Quiz Completed!</h1>
          <p className="text-3xl">
            Your score is: {score} / {questions.length}
          </p>
          <div className="mt-6 text-4xl">
            {score / questions.length >= 0.5 ? (
              <span role="img" aria-label="smile emoji">
                😊
              </span>
            ) : (
              <span role="img" aria-label="crying emoji">
                😢
              </span>
            )}
          </div>
          <Button className="mt-10 w-full" onClick={() => router.push("/")}>
            Go to Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
