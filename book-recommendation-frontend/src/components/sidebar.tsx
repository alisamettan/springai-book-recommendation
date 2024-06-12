"use client";
import { QuestionContext, Book } from "@/context/questioncontext";
import { useContext, useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";

const SideBar = () => {
  let books: any = [];
  const { favBook, addFav } = useContext(QuestionContext);

  const [open, setOpen] = useState<boolean>(true);

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setOpen(!open);
    console.log(favBook);
  };

  // useEffect(() => {
  //   favBook;
  //   console.log(favBook);
  // }, [favBook]);

  return (
    <>
      <div className={open ? "w-[17rem] p-3 bg-slate-300 h-screen" : "hidden"}>
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex justify-between px-1">
            <MdMenuOpen onClick={handleToggle} className="w-8 h-8 block" />
            <IoPencil className="w-8 h-8 block" />
          </div>
          <ul className="flex flex-col">
            {favBook &&
              favBook.map((book: Book, index: any) => {
                return (
                  <li
                    key={index}
                    className="border-2 border-gray-400 rounded-lg bg-blue-200 shadow-2xl py-4 px-2  w-[90%] m-auto flex items-center justify-center"
                  >
                    {book.name}
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
