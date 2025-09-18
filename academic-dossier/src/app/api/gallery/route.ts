import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GALLERY_FILE = path.join(process.cwd(), 'src/data/gallery.json');

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

function getGallery(): GalleryItem[] {
  try {
    if (!fs.existsSync(GALLERY_FILE)) {
      return [];
    }
    const data = fs.readFileSync(GALLERY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading gallery:', error);
    return [];
  }
}

function saveGallery(gallery: GalleryItem[]) {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(gallery, null, 2));
  } catch (error) {
    console.error('Error saving gallery:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    let gallery = getGallery();

    // Filter by category if specified
    if (category && category !== 'all') {
      gallery = gallery.filter(item => item.category === category);
    }

    // Filter by type if specified
    if (type && type !== 'all') {
      gallery = gallery.filter(item => item.type === type);
    }

    // Sort by creation date (newest first)
    gallery.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, type, url, thumbnail, category, tags } = body;

    if (!title || !type || !url || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const gallery = getGallery();
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || '',
      type: type as 'image' | 'video' | 'audio',
      url: url.trim(),
      thumbnail: thumbnail?.trim() || url.trim(),
      category: category.trim(),
      tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()) : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    gallery.unshift(newItem);
    saveGallery(gallery);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, type, url, thumbnail, category, tags } = body;

    if (!id || !title || !type || !url || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const gallery = getGallery();
    const itemIndex = gallery.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    gallery[itemIndex] = {
      ...gallery[itemIndex],
      title: title.trim(),
      description: description?.trim() || '',
      type: type as 'image' | 'video' | 'audio',
      url: url.trim(),
      thumbnail: thumbnail?.trim() || url.trim(),
      category: category.trim(),
      tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()) : [],
      updatedAt: new Date().toISOString()
    };

    saveGallery(gallery);

    return NextResponse.json(gallery[itemIndex]);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const gallery = getGallery();
    const itemIndex = gallery.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    const deletedItem = gallery.splice(itemIndex, 1)[0];
    saveGallery(gallery);

    return NextResponse.json({ message: 'Gallery item deleted', item: deletedItem });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}