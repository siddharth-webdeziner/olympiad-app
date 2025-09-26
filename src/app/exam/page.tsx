"use client";

import { useState, useEffect } from "react";

export default function Exam() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes in seconds
  const [answers, setAnswers] = useState<string[]>([]); // Array to store selected answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set()); // Track used questions

  const fetchQuestion = async (index: number) => {
    try {
      // Fetching question and options from question-json
      const response = await fetch("question-json/UK_Question.json");
      if (!response.ok) {
        throw new Error("Failed to fetch question.json");
      }
      const questionJson = await response.json();
      const questionData = questionJson.data.data[index];

      // Creating options array
      questionData.options = [
        questionData.answer1,
        questionData.answer2,
        questionData.answer3,
        questionData.answer4,
      ];

      setQuestion(questionData.question);
      setOptions(questionData.options);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  useEffect(() => {
    fetchQuestion(currentQuestionIndex);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers((prev) => [...prev, selectedOption]);
      setSelectedOption(""); // Reset selected option for the next question

      // Find the next unused question index
      let nextIndex = currentQuestionIndex + 1;
      while (usedQuestions.has(nextIndex)) {
        nextIndex++;
      }

      setUsedQuestions((prev) => new Set(prev).add(nextIndex));
      setCurrentQuestionIndex(nextIndex);
    }
  };

  return (
    <div className="card">
      <div className="text-right text-lg font-bold mb-4">
        Time Left: {formatTime(timeLeft)}
      </div>
      <h2 className="text-xl font-bold mb-4">Exam Page</h2>
      <p className="mb-4">{question}</p>
      <form>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <label className="text-sm">
              <input
                type="radio"
                name="options"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                className="mr-2 !w-auto"
              />
              {option}
            </label>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleNext}
          >
            Save
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
