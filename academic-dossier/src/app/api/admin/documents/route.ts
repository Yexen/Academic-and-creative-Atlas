import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DOCUMENTS_PATH = path.join(process.cwd(), 'src', 'data', 'documents.json');

interface Document {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  wordCount: number;
}

function getDocuments(): Document[] {
  try {
    if (!fs.existsSync(DOCUMENTS_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(DOCUMENTS_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading documents:', error);
    return [];
  }
}

function saveDocuments(documents: Document[]): boolean {
  try {
    const jsonContent = JSON.stringify(documents, null, 2);
    fs.writeFileSync(DOCUMENTS_PATH, jsonContent, 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving documents:', error);
    return false;
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export async function GET() {
  try {
    const documents = getDocuments();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Failed to get documents:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, category, tags } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const documents = getDocuments();
    const now = new Date().toISOString();

    const newDocument: Document = {
      id: generateId(),
      title,
      content,
      category: category || 'General',
      tags: tags || [],
      createdAt: now,
      updatedAt: now,
      wordCount: countWords(content)
    };

    documents.push(newDocument);

    const success = saveDocuments(documents);

    if (success) {
      return NextResponse.json(newDocument, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save document' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to create document:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, content, category, tags } = await request.json();

    if (!id || !title || !content) {
      return NextResponse.json(
        { error: 'ID, title and content are required' },
        { status: 400 }
      );
    }

    const documents = getDocuments();
    const documentIndex = documents.findIndex(doc => doc.id === id);

    if (documentIndex === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    documents[documentIndex] = {
      ...documents[documentIndex],
      title,
      content,
      category: category || 'General',
      tags: tags || [],
      updatedAt: new Date().toISOString(),
      wordCount: countWords(content)
    };

    const success = saveDocuments(documents);

    if (success) {
      return NextResponse.json(documents[documentIndex]);
    } else {
      return NextResponse.json(
        { error: 'Failed to update document' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to update document:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const documents = getDocuments();
    const filteredDocuments = documents.filter(doc => doc.id !== id);

    if (filteredDocuments.length === documents.length) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    const success = saveDocuments(filteredDocuments);

    if (success) {
      return NextResponse.json({ message: 'Document deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete document' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to delete document:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}