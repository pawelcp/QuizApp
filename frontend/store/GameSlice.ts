import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Results } from "./ApiSlice";

export const gameSlice = createSlice({
  name: "result",
  initialState: {
    correct: 0,
    incorrect: 0,
    userAnswers: [{ questionNumber: 0, answer: "" }],
    gameQuestions: [] as unknown as Results,
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
    setUserAnswers: (state, action) => {
      state.userAnswers = [
        ...state.userAnswers,
        {
          questionNumber: action.payload.questionNumber,
          answer: action.payload.answer,
        },
      ];
    },
    setGameQuestions: (state, action) => {
      state.gameQuestions = action.payload;
    },
  },
});

export const {
  incrementCorrect,
  incrementIncorrect,
  resetGame,
  setUserAnswers,
  setGameQuestions,
} = gameSlice.actions;

export const correctAnswers = (state: RootState) => state.game.correct;
export const incorrectAnswers = (state: RootState) => state.game.incorrect;

export const userAnswers = (state: RootState) => state.game.userAnswers;
export const gameQuestions = (state: RootState) => state.game.gameQuestions;
export default gameSlice.reducer;
