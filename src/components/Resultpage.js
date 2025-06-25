import React from "react";
import { CheckCircle } from "lucide-react";

const Resultpage = ({ formData }) => {
  // Determine matched advisor based on target industry
  const getMatchedAdvisor = () => {
    const industry = formData.targetIndustry;
    switch (industry) {
      case "finance":
        return { name: "Rahul Vekaria", role: "Senior Portfolio Manager", avatar: "RV", match: "98%" };
      case "banking":
        return { name: "Rujuta Jariwala", role: "Banking Advisor", avatar: "RJ", match: "95%" };
      case "technology":
        return { name: "Darshak Mota", role: "Senior IT Developer", avatar: "DM", match: "92%" };
      case "corporate":
        return { name: "Archana Nair", role: "Executive Assistant", avatar: "AN", match: "90%" };
      default:
        return { name: "Priya Patel", role: "Senior IT Developer", avatar: "PP", match: "95%" };
    }
  };

  const matchedAdvisor = getMatchedAdvisor();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Analysis Complete!
            </h2>
            <p className="text-gray-600">
              Here's your personalized career roadmap
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Your Matched Advisor
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{matchedAdvisor.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{matchedAdvisor.name}</h4>
                  <p className="text-sm text-gray-600">{matchedAdvisor.role}</p>
                  <p className="text-sm text-blue-600">
                    {matchedAdvisor.match} match with your goals
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                Resume Score
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">8.2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Good Foundation
                  </h4>
                  <p className="text-sm text-gray-600">
                    3 areas for improvement identified
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">
              Recommended Action Plan
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  Complete AWS Cloud Practitioner certification (2 months)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  Update resume with quantified achievements
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  Build a portfolio showcasing 2-3 key projects
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  Network with 5 senior developers in target companies
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-md transition-all duration-300">
              Schedule Coffee Chat with {matchedAdvisor.name.split(' ')[0]}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              30-minute session • Free consultation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultpage;
