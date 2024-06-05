"use client";

import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    level: "",
    numberOfQuestion: "",
    category: {
      id: 0,
      name: "",
    },
    type: "",
    status: "",
    score: 0,
  },
  reducers: {
    setNumberOfQuestion: (state, action) => {
      state.numberOfQuestion = action.payload;
    },
    setCategories: (state, action) => {
      state.category = action.payload;
    },
    setDifficulty: (state, action) => {
      state.level = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    incrementScore: (state) => {
      state.score += 1;
    },
  },
});

export const {
  setNumberOfQuestion,
  setDifficulty,
  setType,
  setCategories,
  resetScore,
  incrementScore,
} = quizSlice.actions;
export default quizSlice.reducer;
