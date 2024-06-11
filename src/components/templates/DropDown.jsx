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
import { useSelector, useDispatch } from "react-redux";
import {
  setDifficulty,
  setType,
  setCategories,
} from "@/redux/features/quizSlice";

const DropDown = () => {
  const dispatch = useDispatch();

  const [categories, setCategoriesState] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();
        const { trivia_categories } = data;
        setCategoriesState(trivia_categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesState([]);
      }
    };
    getCategories();
  }, []);

  // Set Categories in Quiz Slice
  const categoryFromSlice = useSelector((state) => state.quiz.category);
  const [newCategory, setNewCategory] = useState(categoryFromSlice.name);
  const handleCategoryChange = (category) => {
    setNewCategory(category.name);
    dispatch(setCategories({ id: category.id, name: category.name }));
  };

  // Set Difficulty in Quiz Slice
  const difficultyFromSlice = useSelector((state) => state.quiz.level);
  const difficulty = ["easy", "medium", "hard"];
  const [newDifficulty, setNewDifficulty] = useState(difficultyFromSlice);
  const handleDifficulty = (difficulty) => {
    setNewDifficulty(difficulty);
    dispatch(setDifficulty(difficulty));
  };

  // Set Type of Questions in Quiz Slice
  const typeFromSlice = useSelector((state) => state.quiz.type);
  const types = ["Multi Choice", "True/False"];
  const [newType, setNewType] = useState(typeFromSlice);
  const handleType = (type) => {
    setNewType(type);
    dispatch(setType(type));
  };

  return (
    <div className="flex lg:gap-20 gap-10 lg:flex-row flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-black hover:bg-slate-900 hover:text-white shadow-lg px-5 py-2 rounded-lg transition-all border-2 border-gray-300 focus:border-2 focus:border-black text-sm ">
          {categoryFromSlice && categoryFromSlice.name
            ? `${categoryFromSlice.name}`
            : "SELECT CATEGORY"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-[200px]">
            {Array.isArray(categories) &&
              categories.map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  value={category.name}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="text-black hover:bg-slate-900 hover:text-white shadow-lg px-5 py-3 rounded-lg transition-all border-2 border-gray-300 focus:border-2 focus:border-black text-sm">
          {difficultyFromSlice ? `${difficultyFromSlice}` : "SELECT DIFFICULTY"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Difficulty Level</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {difficulty.map((difficultyOption, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleDifficulty(difficultyOption)}
            >
              {difficultyOption}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="text-black hover:bg-slate-900 hover:text-white shadow-lg px-5 py-3 rounded-lg transition-all border-2 border-gray-300 focus:border-2 focus:border-black text-sm">
          {typeFromSlice ? `${typeFromSlice}` : "SELECT QUESTION TYPE"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Question Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {types.map((typeOption, index) => (
            <DropdownMenuItem
              key={index}
              value={typeOption}
              onClick={() => handleType(typeOption)}
            >
              {typeOption}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDown;
