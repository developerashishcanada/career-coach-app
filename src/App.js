import React, { useState, useEffect, useCallback } from "react";
import HomePage from "./components/HomePage";
import DiscoveryForm from "./components/DiscoveryForm";
import AnalysisLoading from "./components/AnalysisLoading";
import Resultpage from "./components/Resultpage";
import advisors from "./components/Advisors";

const CareerCoachingApp = () => {
  const [currentStep, setCurrentStep] = useState("home");
  const [tailwindLoaded, setTailwindLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    targetIndustry: "",
    experience: "",
    careerGoal: "",
    resume: null,
  });

  // Ensure Tailwind CSS is loaded
  useEffect(() => {
    // Check if Tailwind is already loaded
    const checkTailwind = () => {
      const testElement = document.createElement("div");
      testElement.className = "bg-blue-500";
      document.body.appendChild(testElement);
      const styles = window.getComputedStyle(testElement);
      const hasBlueBackground = styles.backgroundColor === "rgb(59, 130, 246)";
      document.body.removeChild(testElement);
      return hasBlueBackground;
    };

    if (checkTailwind()) {
      setTailwindLoaded(true);
    } else {
      // Load Tailwind if not already loaded
      const script = document.createElement("script");
      script.src = "https://cdn.tailwindcss.com";
      script.onload = () => setTailwindLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmit = () => {
    setCurrentStep("analysis");
    // Simulate AI analysis
    setTimeout(() => {
      setCurrentStep("results");
    }, 3000);
  };

  // Loading screen while Tailwind is loading
  if (!tailwindLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #e2e8f0",
              borderTop: "4px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <h2 style={{ color: "#1e293b", marginBottom: "8px" }}>
            Loading CareerForward AI
          </h2>
          <p style={{ color: "#64748b" }}>
            Preparing your career coaching experience...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {currentStep === "home" && (
        <HomePage setCurrentStep={setCurrentStep} advisors={advisors} />
      )}
      {currentStep === "discovery" && (
        <DiscoveryForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileUpload={handleFileUpload}
          setCurrentStep={setCurrentStep}
          handleSubmit={handleSubmit}
        />
      )}
      {currentStep === "analysis" && <AnalysisLoading />}
      {currentStep === "results" && <Resultpage formData={formData} />}
    </div>
  );
};

export default CareerCoachingApp;
