"use client";

import { QuestionContext } from "@/context/questioncontext";
import { UserContext } from "@/context/usercontext";
import { InputAdornment, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const Main = () => {
  const questionContext = useContext(QuestionContext);
  const userContext = useContext(UserContext);
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
    handleSearchOnGoogle,
  } = questionContext;
  const { logout } = userContext;

  return (
    <div className="bg-gray-400 w-full h-screen">
      <CiLogout
        onClick={logout}
        className="absolute top-4 right-4 h-10 w-10 cursor-pointer"
      />
      <div className="flex flex-col items-center h-full justify-between pb-4">
        {response.name ? (
          <div className="flex flex-col items-center justify-center m-auto w-[70%] gap-4 border-2 border-gray-300 py-4 px-4 rounded-lg bg-blue-200 shadow-2xl">
            <div className="flex flex-col gap-6 justify-center">
              <div className="flex gap-4">
                <p className="text-2xl text-red-300">Suggested Book:</p>
                <p className="text-2xl">{response.name}</p>
                <IoSearch
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleSearchOnGoogle(response.name)}
                />
              </div>
              <div className="flex gap-4">
                <p className="text-2xl text-red-300">Description:</p>
                <p className="text-2xl">{response.description}</p>
              </div>
            </div>
            <div className="flex gap-2 w-[60%] justify-between">
              <button
                className="py-4 px-6 bg-gray-500 rounded-md mt-3"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                onClick={addFav}
                className="py-4 px-6 bg-gray-500 rounded-md mt-3"
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
