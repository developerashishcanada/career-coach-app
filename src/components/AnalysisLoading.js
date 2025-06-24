import React from "react";
import { Target } from "lucide-react";

const AnalysisLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Analyzing Your Profile
        </h3>
        <p className="text-gray-600 mb-6">
          Our AI is reviewing your resume and matching you with the perfect
          advisor...
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisLoading;
