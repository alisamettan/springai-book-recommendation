"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, ReactNode, createContext, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuestionContext } from "./questioncontext";

export const UserContext = createContext<any>(undefined);

export interface Inputs {
  email: string;
  password: string;
}

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useRouter();
  const { setFavBook } = useContext(QuestionContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setFavBook([]);
    navigate.push("/login");
  };

  const submitHandler = (formData: Inputs) => {
    axios
      .post("http://localhost:8080/auth/login", formData)
      .then((res) => {
        console.log(res.data);
        const basicAuth =
          "Basic" + btoa(formData.email + ":" + formData.password);
        localStorage.setItem("token", basicAuth);
        const { id } = res.data;
        console.log(id);
        localStorage.setItem("id", id);

        toast.success("Welcome!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate.push("/");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Email or Password is wrong!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <UserContext.Provider value={{ logout, submitHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
