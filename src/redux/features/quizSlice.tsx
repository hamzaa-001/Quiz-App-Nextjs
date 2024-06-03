"use client";

import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    level: "",
    numberOfQuestion: 10,
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
    setDifficulty: (state, action) => {
      state.level = action.payload;
    },
  },
});

export const { setNumberOfQuestion, setDifficulty } = quizSlice.actions;
export default quizSlice.reducer;
