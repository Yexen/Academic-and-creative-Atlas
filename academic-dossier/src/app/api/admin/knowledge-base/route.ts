import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the knowledge base JSON file
const KNOWLEDGE_BASE_PATH = path.join(process.cwd(), 'src', 'data', 'knowledge-base.json');

// Get knowledge base from JSON file
function getKnowledgeBase() {
  try {
    if (!fs.existsSync(KNOWLEDGE_BASE_PATH)) {
      throw new Error('Knowledge base file not found');
    }

    const fileContent = fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading knowledge base:', error);
    throw new Error(`Failed to read knowledge base: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Save knowledge base to JSON file
function saveKnowledgeBase(knowledgeBase: any): boolean {
  try {
    // Validate that it's a proper object
    if (!knowledgeBase || typeof knowledgeBase !== 'object') {
      throw new Error('Invalid knowledge base format');
    }

    // Write the updated content to the JSON file
    const jsonContent = JSON.stringify(knowledgeBase, null, 2);
    fs.writeFileSync(KNOWLEDGE_BASE_PATH, jsonContent, 'utf-8');

    return true;
  } catch (error) {
    console.error('Error saving knowledge base:', error);
    return false;
  }
}

export async function GET() {
  try {
    const knowledgeBase = getKnowledgeBase();
    return NextResponse.json(knowledgeBase);
  } catch (error) {
    console.error('Failed to get knowledge base:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve knowledge base' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newKnowledgeBase = await request.json();

    const success = saveKnowledgeBase(newKnowledgeBase);

    if (success) {
      return NextResponse.json({ message: 'Knowledge base updated successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to update knowledge base' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to update knowledge base:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}