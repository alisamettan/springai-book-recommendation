"use client";
import { QuestionContext, Book } from "@/context/questioncontext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoPencil, IoSearch } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";

const SideBar = () => {
  const id = localStorage.getItem("id");
  const { favBook, setFavBook, handleSearchOnGoogle } =
    useContext(QuestionContext);

  const [open, setOpen] = useState<boolean>(true);

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setOpen(!open);
    console.log(favBook);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/favBook/${id}`)
      .then((res) => {
        setFavBook(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className={open ? "w-[17rem] p-3 bg-slate-300 h-screen" : "hidden"}>
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex justify-between px-1">
            <MdMenuOpen onClick={handleToggle} className="w-8 h-8 block" />
            <IoPencil className="w-8 h-8 block" />
          </div>
          <ul className="flex flex-col gap-4">
            {favBook &&
              favBook.map((book: Book, index: any) => {
                return (
                  <li
                    key={index}
                    className="border-2 border-gray-400 rounded-lg bg-blue-200 shadow-2xl py-4 px-2  w-[90%] m-auto flex justify-between"
                  >
                    <span>{book.name}</span>
                    <IoSearch
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleSearchOnGoogle(book.name)}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {open == false && (
        <div className="flex bg-gray-400 p-2 gap-1">
          <MdMenuOpen onClick={handleToggle} className="w-6 h-6 block" />
          <IoPencil className="w-6 h-6 block" />
        </div>
      )}
    </>
  );
};

export default SideBar;
