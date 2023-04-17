import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Results } from "./ApiSlice";

export interface UserAnswer {
  questionNumber: number | undefined;
  answer: string | undefined;
}
export const gameSlice = createSlice({
  name: "result",
  initialState: {
    correct: 6,
    incorrect: 4,
    userAnswers: [] as UserAnswer[],
    gameQuestions: [] as unknown as Results[],
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
      state.userAnswers.push({
        questionNumber: action.payload.questionNumber,
        answer: action.payload.answer,
      });
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

export const getUserAnswers = (state: RootState) => state.game.userAnswers;
export const getGameQuestions = (state: RootState) => state.game.gameQuestions;
export default gameSlice.reducer;
