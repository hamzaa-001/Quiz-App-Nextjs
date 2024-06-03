"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";

const DropDown = () => {
  const difficulty = ["Easy", "Medium", "High"];
  const Type = ["Multi Choice", "True/False"];
  const [categories, setCategories] = useState();
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      const { trivia_categories } = data;
      setCategories(trivia_categories);
    };
    getCategories();
  }, []);

  const dispatch = useDispatch();
  const handleDifficulty = () => {
    dispatch(setDifficulty(difficulty));
  };

  return (
    <div className="flex gap-20">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-black hover:bg-slate-900 hover:text-white shadow-lg px-5 py-2 rounded-lg transition-all border-2 border-black focus:border-2 focus:border-black">
          SELECT CATEGORY
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[200px]">
            {categories?.map((category, index) => (
              <DropdownMenuItem key={index}>{category.name}</DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="text-black hover:bg-slate-900 hover:text-white shadow-lg px-5 py-3 rounded-lg transition-all border-2 border-black focus:border-2 focus:border-black">
          SELECT DIFFICULTY
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Difficulty Level</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {difficulty.map((item, index) => (
            <DropdownMenuItem
              key={index}
              value={item}
              onClick={handleDifficulty}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="text-black hover:bg-slate-900 hover:text-white shadow-lg px-5 py-3 rounded-lg transition-all border-2 border-black focus:border-2 focus:border-black">
          SELECT TYPE
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Question Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Type.map((item, index) => (
            <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
