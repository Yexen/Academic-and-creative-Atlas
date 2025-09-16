import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, context } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const content = await generateContentWithOpenAI(prompt, context);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

async function generateContentWithOpenAI(prompt: string, context: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant helping with academic content creation for Yekta's portfolio.
                   The current context is: ${context}.
                   Provide professional, academic-style content that is concise, relevant, and appropriate for an academic portfolio.
                   Focus on creating high-quality, polished text that would be suitable for academic and professional contexts.
                   Keep responses focused and actionable.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

// Fallback function for development or if OpenAI fails
async function generateContent(prompt: string, context: string): Promise<string> {
  // This is a placeholder implementation
  // In production, replace this with actual AI API calls

  const responses: Record<string, string[]> = {
    'professional summary': [
      'Accomplished philosophy PhD candidate with extensive experience in digital humanities and technical research. Combines rigorous analytical thinking with practical programming skills to bridge theoretical inquiry and technological innovation.',
      'Philosophy doctoral researcher specializing in interdisciplinary approaches to knowledge creation. Proficient in both traditional academic methods and modern digital tools, with a proven track record in research, teaching, and project management.',
    ],
    'experience bullets': [
      '• Conducted comprehensive research analysis resulting in 15+ peer-reviewed publications\n• Developed and maintained research databases using Python and SQL\n• Collaborated with interdisciplinary teams on grant-funded projects worth $200K+\n• Presented findings at 10+ international conferences and symposiums',
      '• Led research initiatives combining philosophical inquiry with data analysis\n• Designed and implemented digital humanities workflows using modern web technologies\n• Mentored undergraduate students in research methodology and academic writing\n• Created educational materials and resources used by 500+ students',
    ],
    'technical skills': [
      'Programming Languages: JavaScript, TypeScript, Python, R\nWeb Technologies: React, Next.js, Node.js, HTML/CSS\nDatabases: PostgreSQL, MongoDB, SQLite\nTools: Git, Docker, VS Code, Jupyter Notebooks\nDigital Humanities: TEI encoding, corpus analysis, data visualization',
    ],
    'project description': [
      'An innovative digital humanities platform that bridges philosophical inquiry with interactive technology. This project explores how digital mediums can enhance traditional academic discourse by creating immersive, collaborative spaces for intellectual exploration.',
      'A comprehensive web application designed to democratize access to philosophical resources. Features include interactive argument mapping, collaborative annotation tools, and dynamic content management systems.',
    ],
    'key features': [
      '• Interactive user interface with real-time collaboration capabilities\n• Advanced search and filtering system with semantic analysis\n• Responsive design optimized for mobile and desktop experiences\n• Comprehensive admin dashboard with content management tools\n• Integration with external APIs and data sources',
    ],
  };

  // Simple keyword matching for demo purposes
  const lowerPrompt = prompt.toLowerCase();

  for (const [key, values] of Object.entries(responses)) {
    if (lowerPrompt.includes(key)) {
      return values[Math.floor(Math.random() * values.length)];
    }
  }

  // Default responses based on context
  if (context === 'resume') {
    return 'I can help you create professional content for your resume. Please be more specific about what section you\'d like help with (experience, skills, education, etc.).';
  } else if (context === 'portfolio') {
    return 'I can help you craft compelling project descriptions. Please specify what aspect of your project you\'d like help with (overview, features, significance, etc.).';
  } else {
    return 'I can help you improve and create content for your academic portfolio. Please provide more specific details about what you\'d like assistance with.';
  }
}

// For production, here's how you might integrate with OpenAI:
/*
async function generateContentWithOpenAI(prompt: string, context: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant helping with academic content creation.
                   The current context is: ${context}.
                   Provide professional, academic-style content that is concise and relevant.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('OpenAI API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
*/