import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const gameSlice = createSlice({
  name: "result",
  initialState: {
    correct: 0,
    incorrect: 0,
  },
  reducers: {
    incrementCorrect: (state) => {
      state.correct++;
    },
    incrementIncorrect: (state) => {
      state.incorrect++;
    },
    resetGame: (state) => {
      (state.correct = 0), (state.incorrect = 0);
    },
  },
});

export const { incrementCorrect, incrementIncorrect, resetGame } =
  gameSlice.actions;

export const correctAnswers = (state: RootState) => state.game.correct;
export const incorrectAnswers = (state: RootState) => state.game.incorrect;

export default gameSlice.reducer;
