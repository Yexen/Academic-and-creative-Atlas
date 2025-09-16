import { NextRequest, NextResponse } from 'next/server';

// Knowledge base about Yekta's academic work
const KNOWLEDGE_BASE = {
  personal: {
    name: "Yekta",
    title: "Philosophy PhD Candidate",
    email: "yekta.kjs@gmail.com",
    location: "Based in academic research",
  },
  research: {
    focus: "Digital humanities, philosophy, and interdisciplinary research combining traditional academic methods with modern technology",
    philosophy: "Each project represents a different facet of investigation into how aesthetic experiences can communicate what discursive language cannot fully capture",
    approach: "Bringing together digital humanities, creative practice, and philosophical inquiry to explore boundaries of meaningful expression"
  },
  projects: {
    shadowline: {
      title: "Shadowline",
      type: "Digital Humanities Platform",
      description: "An innovative digital humanities platform that bridges philosophical inquiry with interactive technology",
      technologies: ["Next.js", "React", "TypeScript", "Digital Humanities Tools"],
      significance: "Explores how digital mediums can enhance traditional academic discourse"
    },
    memoireEnLivres: {
      title: "Mémoire en Livres",
      type: "Literary Analysis Platform",
      description: "A comprehensive platform for literary memory and book analysis",
      focus: "French literature and digital archiving"
    },
    yexen: {
      title: "Yexen",
      type: "Creative Technology Project",
      description: "Experimental project combining creative practice with technical implementation"
    },
    literaryWorks: {
      title: "Literary Works",
      type: "Academic Publications",
      description: "Collection of academic writings and literary analysis"
    }
  },
  skills: {
    technical: [
      "JavaScript", "TypeScript", "Python", "React", "Next.js",
      "Digital Humanities Tools", "Web Development", "Data Analysis"
    ],
    academic: [
      "Philosophy", "Digital Humanities", "Research Methodology",
      "Academic Writing", "Literary Analysis", "Critical Theory"
    ],
    languages: ["French", "English", "Turkish"]
  },
  education: {
    current: "PhD in Philosophy",
    background: "Strong academic foundation in philosophy with technical skills in digital humanities"
  }
};

export async function POST(request: NextRequest) {
  try {
    const { question, context, conversationHistory } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const answer = await generateAnswer(question, context, conversationHistory);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Q&A Assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    );
  }
}

async function generateAnswer(question: string, context: string, conversationHistory: any[]): Promise<string> {
  const lowerQuestion = question.toLowerCase();

  // Research focus questions
  if (lowerQuestion.includes('research') && (lowerQuestion.includes('focus') || lowerQuestion.includes('about') || lowerQuestion.includes('what'))) {
    return `Yekta's research focuses on ${KNOWLEDGE_BASE.research.focus}. Their approach involves ${KNOWLEDGE_BASE.research.approach}. ${KNOWLEDGE_BASE.research.philosophy}.`;
  }

  // Project-specific questions
  if (lowerQuestion.includes('shadowline')) {
    const project = KNOWLEDGE_BASE.projects.shadowline;
    return `Shadowline is ${project.description}. It's built using ${project.technologies.join(', ')} and ${project.significance}. This project represents Yekta's commitment to bridging traditional academic discourse with modern digital tools.`;
  }

  if (lowerQuestion.includes('mémoire') || lowerQuestion.includes('memoire') || lowerQuestion.includes('livres')) {
    const project = KNOWLEDGE_BASE.projects.memoireEnLivres;
    return `${project.title} is ${project.description} with a ${project.focus}. This project demonstrates Yekta's expertise in combining literary analysis with digital archiving methods.`;
  }

  if (lowerQuestion.includes('yexen')) {
    const project = KNOWLEDGE_BASE.projects.yexen;
    return `Yexen is an ${project.description}. It showcases Yekta's ability to merge creative practice with technical implementation in innovative ways.`;
  }

  if (lowerQuestion.includes('literary works') || lowerQuestion.includes('publications')) {
    const project = KNOWLEDGE_BASE.projects.literaryWorks;
    return `Yekta's literary works include ${project.description}. These demonstrate their strong academic writing capabilities and expertise in literary analysis and critical theory.`;
  }

  // Technical skills questions
  if (lowerQuestion.includes('technical') || lowerQuestion.includes('programming') || lowerQuestion.includes('technology')) {
    return `Yekta has strong technical skills including: ${KNOWLEDGE_BASE.skills.technical.join(', ')}. They combine these technical abilities with their philosophical background to create innovative digital humanities projects.`;
  }

  // Language questions
  if (lowerQuestion.includes('language') && !lowerQuestion.includes('programming')) {
    return `Yekta speaks ${KNOWLEDGE_BASE.skills.languages.join(', ')}, which supports their international academic research and multicultural approach to digital humanities.`;
  }

  // Academic background questions
  if (lowerQuestion.includes('education') || lowerQuestion.includes('academic') || lowerQuestion.includes('background')) {
    return `Yekta is currently a ${KNOWLEDGE_BASE.education.current} with ${KNOWLEDGE_BASE.education.background}. Their academic skills include ${KNOWLEDGE_BASE.skills.academic.join(', ')}.`;
  }

  // Philosophy questions
  if (lowerQuestion.includes('philosophy') || lowerQuestion.includes('philosophical')) {
    return `Yekta's philosophical approach centers on the idea that ${KNOWLEDGE_BASE.research.philosophy}. They work at the intersection of traditional philosophical inquiry and modern digital methods, exploring how technology can enhance rather than replace classical academic discourse.`;
  }

  // Contact questions
  if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('reach')) {
    return `You can contact Yekta at ${KNOWLEDGE_BASE.personal.email}. They're always interested in collaboration opportunities and discussions about digital humanities, philosophy, and interdisciplinary research.`;
  }

  // Projects overview
  if (lowerQuestion.includes('projects') && !lowerQuestion.includes('shadowline') && !lowerQuestion.includes('yexen')) {
    return `Yekta has worked on several notable projects: Shadowline (digital humanities platform), Mémoire en Livres (literary analysis platform), Yexen (creative technology project), and various literary works. Each project demonstrates their ability to bridge philosophical inquiry with practical technical implementation.`;
  }

  // Skills overview
  if (lowerQuestion.includes('skills') || lowerQuestion.includes('abilities') || lowerQuestion.includes('expertise')) {
    return `Yekta combines strong technical skills (${KNOWLEDGE_BASE.skills.technical.slice(0, 5).join(', ')}) with deep academic expertise (${KNOWLEDGE_BASE.skills.academic.slice(0, 4).join(', ')}). This unique combination allows them to create innovative solutions in digital humanities.`;
  }

  // General/introductory questions
  if (lowerQuestion.includes('who') || lowerQuestion.includes('tell me about') || lowerQuestion.includes('introduce')) {
    return `Yekta is a ${KNOWLEDGE_BASE.personal.title} whose work focuses on ${KNOWLEDGE_BASE.research.focus}. They're particularly interested in how aesthetic experiences can communicate what traditional discourse cannot fully capture, combining digital humanities, creative practice, and philosophical inquiry.`;
  }

  // Default response for unmatched questions
  return `I can help you learn about Yekta's research in digital humanities and philosophy, their projects (Shadowline, Mémoire en Livres, Yexen), technical skills, academic background, and approach to interdisciplinary research. What specific aspect would you like to know more about?`;
}

// For production, you might integrate with OpenAI or Claude:
/*
async function generateAnswerWithAI(question: string, context: string, conversationHistory: any[]): Promise<string> {
  const knowledgeContext = JSON.stringify(KNOWLEDGE_BASE, null, 2);

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
          content: `You are a helpful assistant answering questions about Yekta's academic work and projects.
                   Use this knowledge base: ${knowledgeContext}
                   Be informative, professional, and accurate. If you don't know something, say so.
                   Keep responses concise but comprehensive.`,
        },
        ...conversationHistory.map(msg => ({
          role: msg.type === 'question' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('AI API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
*/