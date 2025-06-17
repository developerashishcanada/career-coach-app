import React, { useState, useEffect } from 'react';
import { Upload, Users, MessageCircle, Target, CheckCircle, ArrowRight, Star, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

const CareerCoachingApp = () => {
  const [currentStep, setCurrentStep] = useState('home');
  const [tailwindLoaded, setTailwindLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentRole: '',
    targetIndustry: '',
    experience: '',
    careerGoal: '',
    resume: null
  });

  // Ensure Tailwind CSS is loaded
  useEffect(() => {
    // Check if Tailwind is already loaded
    const checkTailwind = () => {
      const testElement = document.createElement('div');
      testElement.className = 'bg-blue-500';
      document.body.appendChild(testElement);
      const styles = window.getComputedStyle(testElement);
      const hasBlueBackground = styles.backgroundColor === 'rgb(59, 130, 246)';
      document.body.removeChild(testElement);
      return hasBlueBackground;
    };

    if (checkTailwind()) {
      setTailwindLoaded(true);
    } else {
      // Load Tailwind if not already loaded
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      script.onload = () => setTailwindLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  const advisors = [
    {
      name: "Alex Chen",
      role: "Senior Portfolio Manager",
      company: "Mutual Fund Co.",
      expertise: "Finance, Investment, Portfolio Management",
      avatar: "AC"
    },
    {
      name: "Sarah Johnson",
      role: "Banking Advisor",
      company: "First National Bank",
      expertise: "Banking, Financial Services, Client Relations",
      avatar: "SJ"
    },
    {
      name: "Mike Rodriguez",
      role: "Executive Assistant",
      company: "Amazon",
      expertise: "Operations, C-Suite Support, Project Management",
      avatar: "MR"
    },
    {
      name: "Priya Patel",
      role: "Senior IT Developer",
      company: "Tech Services Inc.",
      expertise: "Software Development, Tech Leadership, System Architecture",
      avatar: "PP"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmit = () => {
    setCurrentStep('analysis');
    // Simulate AI analysis
    setTimeout(() => {
      setCurrentStep('results');
    }, 3000);
  };

  // Loading screen while Tailwind is loading
  if (!tailwindLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <h2 style={{ color: '#1e293b', marginBottom: '8px' }}>Loading CareerForward AI</h2>
          <p style={{ color: '#64748b' }}>Preparing your career coaching experience...</p>
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

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CareerForward AI
              </h1>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Land Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dream Job</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized career guidance from industry experts in Finance, Banking, Tech, and Corporate sectors. 
            AI-powered insights meet human expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentStep('discovery')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How CareerForward Works</h3>
            <p className="text-lg text-gray-600">Simple, effective, and personalized career coaching</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">1. Share Your Profile</h4>
                  <p className="text-gray-600">Upload your resume and tell us about your career goals. Our AI analyzes your profile instantly.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">2. Get Matched</h4>
                  <p className="text-gray-600">AI matches you with the perfect advisor from our team of industry experts.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">3. Coffee Chat & Guidance</h4>
                  <p className="text-gray-600">Have a personalized session with your advisor and get actionable career advice.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">95% Success Rate</h4>
                <p className="text-gray-600 mb-6">Our clients see significant career improvements within 3 months</p>
                <div className="flex justify-center">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Your Career Advisors</h3>
            <p className="text-lg text-gray-600">Industry experts with proven track records</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advisors.map((advisor, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{advisor.avatar}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{advisor.name}</h4>
                  <p className="text-blue-600 font-medium mb-2">{advisor.role}</p>
                  <p className="text-sm text-gray-500 mb-3">{advisor.company}</p>
                  <p className="text-sm text-gray-600">{advisor.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Accelerate Your Career?</h3>
          <p className="text-xl text-blue-100 mb-8">Join thousands of professionals who've transformed their careers with CareerForward</p>
          <button 
            onClick={() => setCurrentStep('discovery')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );

  const DiscoveryForm = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Yourself</h2>
            <p className="text-gray-600">Help us understand your career goals so we can provide the best guidance</p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., Software Engineer, Marketing Assistant"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Industry</label>
              <select
                name="targetIndustry"
                value={formData.targetIndustry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select target industry</option>
                <option value="finance">Finance & Investment</option>
                <option value="banking">Banking & Financial Services</option>
                <option value="technology">Technology & Software</option>
                <option value="corporate">Corporate & Operations</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select experience level</option>
                <option value="0-1">Fresh Graduate (0-1 years)</option>
                <option value="2-5">Early Career (2-5 years)</option>
                <option value="5-10">Mid Career (5-10 years)</option>
                <option value="10+">Senior (10+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Career Goal</label>
              <textarea
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe what you want to achieve in your career..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-300">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <div className="cursor-pointer" onClick={() => document.getElementById('resume-upload').click()}>
                  <span className="text-blue-600 font-medium">Click to upload</span>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                {formData.resume && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.resume.name} uploaded</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep('home')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-md transition-all duration-300"
              >
                Analyze My Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalysisLoading = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Profile</h3>
        <p className="text-gray-600 mb-6">Our AI is reviewing your resume and matching you with the perfect advisor...</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
        </div>
      </div>
    </div>
  );

  const ResultsPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete!</h2>
            <p className="text-gray-600">Here's your personalized career roadmap</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Matched Advisor</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">PP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Patel</h4>
                  <p className="text-sm text-gray-600">Senior IT Developer</p>
                  <p className="text-sm text-blue-600">95% match with your goals</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Resume Score</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">8.2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Good Foundation</h4>
                  <p className="text-sm text-gray-600">3 areas for improvement identified</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Recommended Action Plan</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Complete AWS Cloud Practitioner certification (2 months)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Update resume with quantified achievements</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Build a portfolio showcasing 2-3 key projects</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Network with 5 senior developers in target companies</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-md transition-all duration-300">
              Schedule Coffee Chat with Priya
            </button>
            <p className="text-sm text-gray-500 mt-2">30-minute session • Free consultation</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentStep === 'home' && <HomePage />}
      {currentStep === 'discovery' && <DiscoveryForm />}
      {currentStep === 'analysis' && <AnalysisLoading />}
      {currentStep === 'results' && <ResultsPage />}
    </div>
  );
};

export default CareerCoachingApp;
