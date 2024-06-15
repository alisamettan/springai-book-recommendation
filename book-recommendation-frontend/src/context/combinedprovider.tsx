import { FC, ReactNode } from "react";
import UserContextProvider from "./usercontext";
import QuestionContextProvider from "./questioncontext";

const CombinedProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QuestionContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </QuestionContextProvider>
  );
};

export default CombinedProviders;
