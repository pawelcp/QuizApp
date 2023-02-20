import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from './store'

export const quizViewSlice = createSlice({
    name: 'result',
    initialState:{
        correct:0,
        incorrect:0
    },
    reducers: {
        incrementCorrect: (state) => {
          state.correct++
        },
        incrementIncorrect: (state) => {
            state.incorrect++
        },
        reset: (state) => {
            state.correct = 0,
            state.incorrect = 0
        }
}})

export const {incrementCorrect, incrementIncorrect, reset} = quizViewSlice.actions

export const correctState = (state:RootState) => state.quizView.correct
export const incorrectState = (state:RootState) => state.quizView.incorrect

export default quizViewSlice
