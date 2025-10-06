"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Exam() {
  const router = useRouter(); // Initialize useRouter
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null); // Store the index of the selected option
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes in seconds
  const [answers, setAnswers] = useState<string[]>([]); // Array to store selected answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set()); // Track used questions
  const [correctAnswer, setCorrectAnswer] = useState<number>(0); // Store the correct answer
  const [showDialog, setShowDialog] = useState<boolean>(false); // Control dialog visibility
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false); // Control exit dialog visibility

  const fetchQuestion = async (index: number) => {
    try {
      const response = await fetch("json/UK_Question.json"); // Fetch from the public directory
      if (!response.ok) {
        throw new Error("Failed to fetch UK_Question.json");
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
      getCorrectAnswer(questionData.correct_Answer);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  const getCorrectAnswer = (correctAnswer: string) => {
    console.log(correctAnswer);
    if (correctAnswer === "A") {
      setCorrectAnswer(1);
    } else if (correctAnswer === "B") {
      setCorrectAnswer(2);
    } else if (correctAnswer === "C") {
      setCorrectAnswer(3);
    } else if (correctAnswer === "D") {
      setCorrectAnswer(4);
    }

    // This function can be used to get the correct answer for a given question index
    // For simplicity, we assume the correct answer is part of the question data
    // return correctAnswer;
  }

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

  const handleOptionChange = (option: string,index:number) => {
    setSelectedOption(option);
    setSelectedOptionIndex(index + 1); // Store the index of the selected option (1-based)
  };

  const handleNext = () => {
    if (selectedOption) {
      console.log("Selected Option:", selectedOptionIndex, correctAnswer);
      setAnswers((prev) => [...prev, selectedOption]);
      if(selectedOptionIndex === correctAnswer){
        console.log("Correct Answer");
      } else {
        console.log("Wrong Answer");
      }
      setShowDialog(true); // Show the dialog box
    }
  };

  const handleContinue = () => {
    setShowDialog(false); // Hide the dialog box
    setSelectedOption(""); // Reset selected option for the next question

    // Find the next unused question index
    let nextIndex = currentQuestionIndex + 1;
    while (usedQuestions.has(nextIndex)) {
      nextIndex++;
    }

    setUsedQuestions((prev) => new Set(prev).add(nextIndex));
    setCurrentQuestionIndex(nextIndex);
  };

  const handleExit = () => {
    setShowExitDialog(true); // Show the exit confirmation dialog
  };

  const confirmExit = () => {
    router.push("/"); // Redirect to the home page
  };

  const cancelExit = () => {
    setShowExitDialog(false); // Hide the exit confirmation dialog
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <div className="text-left text-lg font-bold">
          Time Left: {formatTime(timeLeft)}
        </div>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleExit}
        >
          Exit
        </button>
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
                onChange={() => handleOptionChange(option, index)}
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
            Next
          </button>
        </div>
      </form>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Correct Answer</h3>
            <p className="mb-4">{correctAnswer}</p>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showExitDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to quit?</h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmExit}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={cancelExit}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
