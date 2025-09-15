import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src', 'data', 'cv-data.ts');
    const content = readFileSync(filePath, 'utf-8');

    // Extract cvData object from the file
    const cvDataMatch = content.match(/export const cvData = ({[\s\S]*?});[\s]*$/);
    if (!cvDataMatch) {
      throw new Error('Could not parse CV data');
    }

    // Use eval to parse the object (note: this is safe since it's our own code)
    const cvDataStr = cvDataMatch[1];
    const cvData = eval(`(${cvDataStr})`);

    return NextResponse.json({ cvData });
  } catch (error) {
    console.error('Error reading CV data:', error);
    return NextResponse.json({ error: 'Failed to read CV data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { cvData } = await request.json();

    const filePath = join(process.cwd(), 'src', 'data', 'cv-data.ts');

    // Generate the new file content
    const newContent = `export const cvData = ${JSON.stringify(cvData, null, 2)};
`;

    writeFileSync(filePath, newContent, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving CV data:', error);
    return NextResponse.json({ error: 'Failed to save CV data' }, { status: 500 });
  }
}