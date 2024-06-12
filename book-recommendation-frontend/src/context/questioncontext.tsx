"use client";
import axios from "axios";
import { FC, ReactNode, createContext, useState } from "react";

interface QuestionContextType {
  questions: string[];
  response: string;
  addFav: () => void;
  setResponse: (index: number, answer: string) => void;
  submitResponses: () => void;
}

export interface Book {
  name: string;
  description: string;
}

export const QuestionContext = createContext<QuestionContextType | any>(
  undefined
);

const QuestionContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [questions] = useState<string[]>([
    "Favori kitabın nedir?",
    "Hangi türde kitap önerisi almak istersin?",
    "Hangi yazarın kitabı olsun?",
  ]);
  const [answers, setAnswers] = useState<any>(["", "", ""]);
  const [response, setResponse] = useState<Book>({ name: "", description: "" });

  const [favBook, setFavBook] = useState<Array<Book>>([]);
  const [start, setStart] = useState<Boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = inputValue;
    setAnswers(updatedAnswers);
    setInputValue("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setLoading(true);
      const answersObject = {
        favBook: answers[0],
        genre: answers[1],
        author: answers[2],
      };
      axios
        .post("http://localhost:8080/book", answersObject)
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
          console.log(response);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResponse({ name: "", description: "" });
  };

  const addFav = () => {
    setFavBook((prev) => [
      ...prev,
      { name: response.name, description: response.description },
    ]);
    console.log(favBook);
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        response,
        setResponse,
        answers,
        setAnswers,
        currentQuestionIndex,
        loading,
        handleSend,
        handleReset,
        start,
        setStart,
        inputValue,
        setInputValue,
        addFav,
        favBook,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
