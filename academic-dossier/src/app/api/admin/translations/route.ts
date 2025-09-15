import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src', 'lib', 'i18n.ts');
    const content = readFileSync(filePath, 'utf-8');

    // Extract translations object from the file
    const translationsMatch = content.match(/export const translations = ({[\s\S]*?});/);
    if (!translationsMatch) {
      throw new Error('Could not parse translations');
    }

    // Use eval to parse the object (note: this is safe since it's our own code)
    const translationsStr = translationsMatch[1];
    const translations = eval(`(${translationsStr})`);

    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Error reading translations:', error);
    return NextResponse.json({ error: 'Failed to read translations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { translations } = await request.json();

    const filePath = join(process.cwd(), 'src', 'lib', 'i18n.ts');

    // Generate the new file content
    const newContent = `export const languages = {
  en: 'English',
  fr: 'Français',
  fa: 'فارسی'
} as const;

export type Language = keyof typeof languages;

export const translations = ${JSON.stringify(translations, null, 2)};

export const getTranslation = (lang: Language, key: string) => {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
`;

    writeFileSync(filePath, newContent, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving translations:', error);
    return NextResponse.json({ error: 'Failed to save translations' }, { status: 500 });
  }
}