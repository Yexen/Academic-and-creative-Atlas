import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const KNOWLEDGE_BASE_FILE = path.join(process.cwd(), 'src/data/knowledge-base.json');

function getKnowledgeBase() {
  try {
    if (!fs.existsSync(KNOWLEDGE_BASE_FILE)) {
      // Create default knowledge base if file doesn't exist
      const defaultKnowledgeBase = {
        overview: "Yekta Jokar is an interdisciplinary researcher and creative practitioner working at the intersection of philosophy, digital humanities, and aesthetic theory.",
        personal: {
          background: {
            title: "Background",
            description: "Academic and creative background",
            details: "Currently pursuing Master's in Digital Humanities at Université Paris 8, with previous Master's in Archaeology from University of Tehran."
          }
        },
        education: {},
        creative: {},
        research: {},
        technical: {}
      };
      fs.writeFileSync(KNOWLEDGE_BASE_FILE, JSON.stringify(defaultKnowledgeBase, null, 2));
      return defaultKnowledgeBase;
    }

    const data = fs.readFileSync(KNOWLEDGE_BASE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading knowledge base:', error);
    return null;
  }
}

export async function GET() {
  try {
    const knowledgeBase = getKnowledgeBase();
    if (!knowledgeBase) {
      return NextResponse.json({ error: 'Failed to load knowledge base' }, { status: 500 });
    }
    return NextResponse.json(knowledgeBase);
  } catch (error) {
    console.error('Error in GET knowledge base:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const knowledgeBase = await request.json();

    // Save to file
    fs.writeFileSync(KNOWLEDGE_BASE_FILE, JSON.stringify(knowledgeBase, null, 2));

    return NextResponse.json({ success: true, message: 'Knowledge base updated successfully' });
  } catch (error) {
    console.error('Error saving knowledge base:', error);
    return NextResponse.json({ error: 'Failed to save knowledge base' }, { status: 500 });
  }
}