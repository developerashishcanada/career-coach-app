const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize services
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.-ms-word.document.macroEnabled.12'];
    cb(null, allowedTypes.includes(file.mimetype));
  }
});

// Advisor profiles
const advisors = [
  {
    id: 'alex_chen',
    name: 'Alex Chen',
    role: 'Senior Portfolio Manager',
    expertise: ['finance', 'investment', 'portfolio_management'],
    industry: 'finance',
    avatar: 'AC',
    calendar_link: 'https://calendly.com/alexchen'
  },
  {
    id: 'sarah_johnson',
    name: 'Sarah Johnson',
    role: 'Banking Advisor',
    expertise: ['banking', 'financial_services', 'client_relations'],
    industry: 'banking',
    avatar: 'SJ',
    calendar_link: 'https://calendly.com/sarahjohnson'
  },
  {
    id: 'mike_rodriguez',
    name: 'Mike Rodriguez',
    role: 'Executive Assistant',
    expertise: ['operations', 'executive_support', 'project_management'],
    industry: 'corporate',
    avatar: 'MR',
    calendar_link: 'https://calendly.com/mikerodriguez'
  },
  {
    id: 'priya_patel',
    name: 'Priya Patel',
    role: 'Senior IT Developer',
    expertise: ['software_development', 'tech_leadership', 'system_architecture'],
    industry: 'technology',
    avatar: 'PP',
    calendar_link: 'https://calendly.com/priyapatel'
  }
];

// Helper function to extract text from resume (simplified)
const extractResumeText = async (filePath) => {
  // In production, use libraries like pdf-parse, mammoth for docx
  // For now, return placeholder
  return "Sample resume text for analysis";
};

// AI-powered resume analysis
const analyzeResume = async (resumeText, targetIndustry) => {
  try {
    const prompt = `
    Analyze this resume for someone targeting the ${targetIndustry} industry:
    
    ${resumeText}
    
    Provide a JSON response with:
    1. ATS score (1-10)
    2. Top 3 strengths
    3. Top 3 improvement areas
    4. Skill gaps for target industry
    5. Specific recommendations
    
    Format as valid JSON.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Resume analysis error:', error);
    // Return fallback analysis
    return {
      ats_score: 7.5,
      strengths: ["Strong technical background", "Good communication skills", "Relevant experience"],
      improvements: ["Add quantified achievements", "Include more keywords", "Improve formatting"],
      skill_gaps: ["Cloud certifications", "Leadership experience", "Industry-specific tools"],
      recommendations: ["Complete AWS certification", "Build portfolio projects", "Network with industry professionals"]
    };
  }
};

// Smart advisor matching
const matchAdvisor = (clientProfile) => {
  const { targetIndustry, experience, careerGoal } = clientProfile;
  
  // Simple matching logic - can be enhanced with AI
  let bestMatch = advisors[0];
  let highestScore = 0;

  advisors.forEach(advisor => {
    let score = 0;
    
    // Industry match
    if (advisor.industry === targetIndustry) score += 50;
    
    // Experience level match
    if (experience === '0-1' && advisor.expertise.includes('mentoring')) score += 20;
    if (experience === '10+' && advisor.role.includes('Senior')) score += 20;
    
    // Career goal keywords
    const goalWords = careerGoal.toLowerCase().split(' ');
    advisor.expertise.forEach(skill => {
      if (goalWords.some(word => skill.includes(word))) score += 10;
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = advisor;
    }
  });

  return { advisor: bestMatch, matchScore: Math.min(95, highestScore + 45) };
};

// Generate career action plan
const generateActionPlan = async (profile, analysis) => {
  try {
    const prompt = `
    Create a personalized 6-month career action plan for:
    - Current Role: ${profile.currentRole}
    - Target Industry: ${profile.targetIndustry}
    - Experience: ${profile.experience}
    - Goal: ${profile.careerGoal}
    - Resume Analysis: ${JSON.stringify(analysis)}
    
    Provide 4-6 specific, actionable steps with timeframes.
    Return as JSON array of objects with 'action' and 'timeframe' fields.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Action plan generation error:', error);
    return [
      { action: "Complete relevant certification", timeframe: "2 months" },
      { action: "Update resume with quantified achievements", timeframe: "1 week" },
      { action: "Build portfolio showcasing key projects", timeframe: "1 month" },
      { action: "Network with 5 professionals in target industry", timeframe: "Ongoing" }
    ];
  }
};

// API Routes

// User registration and profile creation
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, phone, currentRole, targetIndustry, experience, careerGoal } = req.body;
    
    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([{ name, email, phone }])
      .select()
      .single();

    if (userError) throw userError;

    // Create profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([{
        user_id: user.id,
        current_role: currentRole,
        target_industry: targetIndustry,
        experience_level: experience,
        career_goal: careerGoal
      }])
      .select()
      .single();

    if (profileError) throw profileError;

    res.json({ success: true, user, profile });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Resume upload and analysis
app.post('/api/resume/analyze', upload.single('resume'), async (req, res) => {
  try {
    const { userId, targetIndustry } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    // Extract text from resume
    const resumeText = await extractResumeText(req.file.path);
    
    // Analyze with AI
    const analysis = await analyzeResume(resumeText, targetIndustry);
    
    // Store analysis in database
    const { error } = await supabase
      .from('profiles')
      .update({ 
        resume_url: req.file.path,
        analysis_data: analysis 
      })
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ error: 'Resume analysis failed' });
  }
});

// Get advisor match
app.post('/api/matching/advisor', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Get user profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    // Match advisor
    const match = matchAdvisor(profile);
    
    res.json({ success: true, match });
  } catch (error) {
    console.error('Advisor matching error:', error);
    res.status(500).json({ error: 'Advisor matching failed' });
  }
});

// Generate complete analysis and recommendations
app.post('/api/analysis/complete', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Get user profile and analysis
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    // Generate action plan
    const actionPlan = await generateActionPlan(profile, profile.analysis_data);
    
    // Match advisor
    const advisorMatch = matchAdvisor(profile);
    
    const completeAnalysis = {
      resumeScore: profile.analysis_data?.ats_score || 7.5,
      advisor: advisorMatch.advisor,
      matchScore: advisorMatch.matchScore,
      actionPlan,
      strengths: profile.analysis_data?.strengths || [],
      improvements: profile.analysis_data?.improvements || [],
      skillGaps: profile.analysis_data?.skill_gaps || []
    };

    res.json({ success: true, analysis: completeAnalysis });
  } catch (error) {
    console.error('Complete analysis error:', error);
    res.status(500).json({ error: 'Analysis generation failed' });
  }
});

// Book coffee chat session
app.post('/api/sessions/book', async (req, res) => {
  try {
    const { userId, advisorId, scheduledAt } = req.body;
    
    const { data: session, error } = await supabase
      .from('sessions')
      .insert([{
        user_id: userId,
        advisor_id: advisorId,
        status: 'scheduled',
        scheduled_at: scheduledAt
      }])
      .select()
      .single();

    if (error) throw error;

    // Here you would typically:
    // 1. Send confirmation emails
    // 2. Create calendar invites
    // 3. Send SMS reminders

    res.json({ success: true, session });
  } catch (error) {
    console.error('Session booking error:', error);
    res.status(500).json({ error: 'Session booking failed' });
  }
});

// Get all advisors
app.get('/api/advisors', (req, res) => {
  res.json({ success: true, advisors });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`CareerForward API running on port ${port}`);
});

module.exports = app;