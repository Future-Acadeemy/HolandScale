import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "",
      answers: [], // flat array instead of sections
      scores: {}, // per-section or overall
      totalResult: null, // store overall stress result
      showResult: false,

      setPhone: (phone) => set({ phone }),

      setAnswer: (index, value) =>
        set((state) => {
          const updatedAnswers = [...state.answers];
          updatedAnswers[index] = Number(value);
          return { answers: updatedAnswers };
        }),

      updateScores: () =>
        set((state) => {
          const totalScore = state.answers.reduce(
            (sum, score) => sum + (score || 0),
            0
          );

          // classify overall stress
          const classifyStress = (score) => {
            if (score > 144) return "High level of professional stress";
            return "Moderate level of professional stress";
          };

          return {
            scores: { total: { score: totalScore } },
            totalResult: classifyStress(totalScore),
          };
        }),

      getSurveyData: () => {
        const { phone, answers, scores, totalResult } = get();
        return { phone, answers, scores, totalResult };
      },

      setShowResult: (value) => set({ showResult: value }),
    }),
    {
      name: "survey-storage",
      getStorage: () => localStorage,
    }
  )
);
