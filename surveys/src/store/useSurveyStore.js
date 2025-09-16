import { create } from "zustand";
import { persist } from "zustand/middleware";
import { skillMapping } from "../data/Questions";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "",
      answers: [], // array of numbers
      scores: {}, // per skill
      totalResult: null,
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
          const { answers } = state;
          const skillScores = {
            "النمط واقعي": 0,
            "النمط الاستكشافي": 0,
            "النمط الفني": 0,
            "النمط الاجتماعي": 0,
            "نمط الريادي و القيادي": 0,
            "النمط التقليدي": 0,
          };

          answers.forEach((val, i) => {
            const skill = skillMapping(i);
            if (skill && val) {
              skillScores[skill] += val;
            }
          });

          const finalScores = {};
          for (const [skill, total] of Object.entries(skillScores)) {
            finalScores[skill] = {
              score: total,
              level: total >= 36 ? "Strong" : "Needs Improvement",
            };
          }

          return {
            scores: finalScores,
            totalResult: "تم حساب النتائج",
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
