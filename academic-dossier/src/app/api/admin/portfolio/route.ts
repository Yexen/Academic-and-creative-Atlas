import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src', 'data', 'portfolio-data.ts');
    const content = readFileSync(filePath, 'utf-8');

    // Extract portfolioData object from the file
    const portfolioDataMatch = content.match(/export const portfolioData = ({[\s\S]*?});[\s]*$/);
    if (!portfolioDataMatch) {
      throw new Error('Could not parse portfolio data');
    }

    // Use eval to parse the object (note: this is safe since it's our own code)
    const portfolioDataStr = portfolioDataMatch[1];
    const portfolioData = eval(`(${portfolioDataStr})`);

    return NextResponse.json({ portfolioData });
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return NextResponse.json({ error: 'Failed to read portfolio data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { portfolioData } = await request.json();

    const filePath = join(process.cwd(), 'src', 'data', 'portfolio-data.ts');

    // Generate the new file content
    const newContent = `export const portfolioData = ${JSON.stringify(portfolioData, null, 2)};
`;

    writeFileSync(filePath, newContent, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
  }
}