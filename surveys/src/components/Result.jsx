import React from "react";
import { useSurveyStore } from "../store/useSurveyStore";
import { useUserStore } from "../store/useUserStore";
import { useTranslation } from "react-i18next";

const Result = () => {
  const { scores, totalResult } = useSurveyStore();
  const user = useUserStore((state) => state);
  const { t } = useTranslation();

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {t("Results")}
      </h2>

      {/* Overall Stress Result */}
      {totalResult && (
        <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 shadow-sm">
          <h3 className="font-bold text-lg mb-2">{t("Overall Result")}</h3>
          <p className="text-sm">
            {t(totalResult)} ({scores.total?.score})
          </p>
        </div>
      )}
    </div>
  );
};

export default Result;
