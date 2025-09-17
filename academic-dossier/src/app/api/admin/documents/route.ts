import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DOCUMENTS_FILE = path.join(process.cwd(), 'src/data/documents.json');

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

function ensureDocumentsFile() {
  if (!fs.existsSync(DOCUMENTS_FILE)) {
    const initialData: Document[] = [];
    fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(initialData, null, 2));
  }
}

function getDocuments(): Document[] {
  ensureDocumentsFile();
  const data = fs.readFileSync(DOCUMENTS_FILE, 'utf8');
  return JSON.parse(data);
}

function saveDocuments(documents: Document[]) {
  fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(documents, null, 2));
}

export async function GET() {
  try {
    const documents = getDocuments();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error reading documents:', error);
    return NextResponse.json({ error: 'Failed to read documents' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, document: docData, id } = body;

    const documents = getDocuments();

    switch (action) {
      case 'create': {
        const newDocument: Document = {
          id: Date.now().toString(),
          title: docData.title,
          content: docData.content,
          category: docData.category,
          tags: docData.tags || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          wordCount: docData.content.split(/\s+/).filter(word => word.length > 0).length
        };
        documents.push(newDocument);
        saveDocuments(documents);
        return NextResponse.json(newDocument);
      }

      case 'update': {
        const index = documents.findIndex(doc => doc.id === id);
        if (index === -1) {
          return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }
        documents[index] = {
          ...documents[index],
          title: docData.title,
          content: docData.content,
          category: docData.category,
          tags: docData.tags || [],
          updatedAt: new Date().toISOString(),
          wordCount: docData.content.split(/\s+/).filter(word => word.length > 0).length
        };
        saveDocuments(documents);
        return NextResponse.json(documents[index]);
      }

      case 'delete': {
        const filteredDocuments = documents.filter(doc => doc.id !== id);
        if (filteredDocuments.length === documents.length) {
          return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }
        saveDocuments(filteredDocuments);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing documents request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}