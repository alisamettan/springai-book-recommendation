"use client";

import { QuestionContext } from "@/context/questioncontext";
import { InputAdornment, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { IoMdSend } from "react-icons/io";

const Main = () => {
  const context = useContext(QuestionContext);
  const {
    questions,
    response,
    answers,
    currentQuestionIndex,
    loading,
    handleSend,
    handleReset,
    start,
    setStart,
    inputValue,
    setInputValue,
    addFav,
  } = context;

  return (
    <div className="bg-gray-400 w-full h-screen">
      <div className="flex flex-col items-center h-full justify-between pb-4">
        {response ? (
          <div>
            <p>{response}</p>
            <div className="flex gap-2">
              <button
                className="py-2 px-4 bg-gray-500 rounded-md mt-3"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                onClick={addFav}
                className="py-2 px-4 bg-gray-500 rounded-md mt-3"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ) : (
          <>
            {start ? (
              <>
                <div className="w-full h-full flex flex-col items-start p-4 overflow-y-auto">
                  {questions
                    .slice(0, currentQuestionIndex + 1)
                    .map((question: any, index: any) => (
                      <div key={index} className="mb-4">
                        <div className="bg-blue-300 p-2 rounded-md shadow-md mb-1">
                          {question}
                        </div>
                        {answers[index] && (
                          <div className="bg-gray-300 p-2 rounded-md shadow-md ml-4 ">
                            {answers[index]}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="h-full flex gap-1 items-center flex-col">
                <h6 className="text-3xl h-full flex gap-1 items-center">
                  <span className="font-thin">Welcome To </span> ASK BOOK APP
                </h6>
                <button
                  onClick={() => setStart(true)}
                  className="border-2 border-black px-2 text-xl mb-5 bg-slate-500 text-white rounded-lg cursor-pointer hover:text-gray-300"
                >
                  Start
                </button>
              </div>
            )}

            {start && currentQuestionIndex < questions.length && (
              <>
                <TextField
                  className="w-[70%]"
                  label="askAPI"
                  id="fullWidth"
                  name="answer"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IoMdSend
                          className="w-6 h-6 cursor-pointer hover:text-gray-900"
                          onClick={handleSend}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            {loading && <div>loading.......</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
