'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import EditableText from '@/components/EditableText';
import QAAssistant from '@/components/QAAssistant';

export default function Home() {
  const { currentLang } = useLanguage();

  // Handle admin context safely for static generation
  let isAdminMode = false;
  let setEditing = (editing: boolean) => {};
  try {
    const adminContext = useAdmin();
    isAdminMode = adminContext.isAdminMode;
    setEditing = adminContext.setEditing;
  } catch (error) {
    // Admin context not available during static generation
    isAdminMode = false;
    setEditing = (editing: boolean) => {};
  }

  // Load initial content from localStorage or use translations
  const getInitialHomeContent = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('home-editable-content');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing saved home content:', error);
        }
      }
    }

    return {
      title: getTranslation(currentLang, 'home.title'),
      subtitle: getTranslation(currentLang, 'home.subtitle'),
      intro: getTranslation(currentLang, 'home.intro'),
      tagline: getTranslation(currentLang, 'home.tagline'),
      researchHighlights: getTranslation(currentLang, 'home.researchHighlights'),
      philosophyAI: getTranslation(currentLang, 'home.philosophyAI'),
      philosophyAIDesc: getTranslation(currentLang, 'home.philosophyAIDesc'),
      philosophyAIDetails: getTranslation(currentLang, 'home.philosophyAIDetails'),
      interdisciplinary: getTranslation(currentLang, 'home.interdisciplinary'),
      interdisciplinaryDesc: getTranslation(currentLang, 'home.interdisciplinaryDesc'),
      interdisciplinaryDetails: getTranslation(currentLang, 'home.interdisciplinaryDetails'),
    };
  };

  // Editable content state
  const [content, setContent] = useState(getInitialHomeContent);

  const handleContentSave = (field: string, newText: string) => {
    const newContent = { ...content, [field]: newText };
    setContent(newContent);

    // Save to localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('home-editable-content', JSON.stringify(newContent));
    }

    console.log(`Saved ${field}:`, newText);
  };

  // Save to localStorage whenever content changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('home-editable-content', JSON.stringify(content));
    }
  }, [content]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        {/* Profile Picture */}
        <div className="mb-8">
          <img
            src="/profile-photo.jpg"
            alt="Yekta Jokar"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover object-center shadow-lg border-4 border-academic-brown/20"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>

        <EditableText
          onSave={(newText) => handleContentSave('title', newText)}
          className="text-5xl md:text-6xl academic-heading mb-6"
        >
          <h1 className="text-5xl md:text-6xl academic-heading mb-6">
            {content.title}
          </h1>
        </EditableText>

        <EditableText
          onSave={(newText) => handleContentSave('subtitle', newText)}
          className="text-xl md:text-2xl text-gray-700 academic-text mb-8 max-w-4xl mx-auto"
          multiline
        >
          <h2 className="text-xl md:text-2xl text-gray-700 academic-text mb-8 max-w-4xl mx-auto">
            {content.subtitle}
          </h2>
        </EditableText>

        <EditableText
          onSave={(newText) => handleContentSave('intro', newText)}
          className="text-lg academic-text text-gray-600 max-w-3xl mx-auto mb-8"
          multiline
        >
          <p className="text-lg academic-text text-gray-600 max-w-3xl mx-auto mb-8">
            {content.intro}
          </p>
        </EditableText>

        <EditableText
          onSave={(newText) => handleContentSave('tagline', newText)}
          className="text-base academic-text text-academic-brown italic"
        >
          <p className="text-base academic-text text-academic-brown italic">
            {content.tagline}
          </p>
        </EditableText>
      </section>

      <div className="section-divider"></div>

      {/* Quick Navigation */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Link href="/resume" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.resume')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.resumeDesc')}
            </p>
          </div>
        </Link>

        <Link href="/portfolio" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.portfolio')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.portfolioDesc')}
            </p>
          </div>
        </Link>

        <Link href="/academic" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.academic')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.academicDesc')}
            </p>
          </div>
        </Link>

        <Link href="/documents" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.documents')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.documentsDesc')}
            </p>
          </div>
        </Link>
      </section>

      <div className="section-divider"></div>

      {/* Research Highlights */}
      <section className="mb-16">
        <EditableText
          onSave={(newText) => handleContentSave('researchHighlights', newText)}
          className="text-3xl academic-heading mb-8 text-center"
        >
          <h2 className="text-3xl academic-heading mb-8 text-center">{content.researchHighlights}</h2>
        </EditableText>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <EditableText
              onSave={(newText) => handleContentSave('philosophyAI', newText)}
              className="text-xl academic-heading mb-4"
            >
              <h3 className="text-xl academic-heading mb-4">{content.philosophyAI}</h3>
            </EditableText>

            <EditableText
              onSave={(newText) => handleContentSave('philosophyAIDesc', newText)}
              className="academic-text text-gray-700 mb-4"
              multiline
            >
              <p className="academic-text text-gray-700 mb-4">
                {content.philosophyAIDesc}
              </p>
            </EditableText>

            <EditableText
              onSave={(newText) => handleContentSave('philosophyAIDetails', newText)}
              className="text-sm text-academic-brown font-medium"
            >
              <div className="text-sm text-academic-brown font-medium">
                {content.philosophyAIDetails}
              </div>
            </EditableText>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <EditableText
              onSave={(newText) => handleContentSave('interdisciplinary', newText)}
              className="text-xl academic-heading mb-4"
            >
              <h3 className="text-xl academic-heading mb-4">{content.interdisciplinary}</h3>
            </EditableText>

            <EditableText
              onSave={(newText) => handleContentSave('interdisciplinaryDesc', newText)}
              className="academic-text text-gray-700 mb-4"
              multiline
            >
              <p className="academic-text text-gray-700 mb-4">
                {content.interdisciplinaryDesc}
              </p>
            </EditableText>

            <EditableText
              onSave={(newText) => handleContentSave('interdisciplinaryDetails', newText)}
              className="text-sm text-academic-brown font-medium"
            >
              <div className="text-sm text-academic-brown font-medium">
                {content.interdisciplinaryDetails}
              </div>
            </EditableText>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="text-center bg-academic-brown/5 rounded-lg p-8">
        <h2 className="text-2xl academic-heading mb-4">{getTranslation(currentLang, 'common.contact')}</h2>
        <div className="academic-text text-gray-700 space-y-2">
          <p>
            <strong>{getTranslation(currentLang, 'common.email')}:</strong>{" "}
            <a href="mailto:yekta.kjs@gmail.com" className="text-academic-brown hover:text-academic-brown-dark">
              yekta.kjs@gmail.com
            </a>
          </p>
          <p>
            <strong>{getTranslation(currentLang, 'common.phone')}:</strong>{" "}
            <a href="tel:+33766714238" className="text-academic-brown hover:text-academic-brown-dark">
              +33 766 714 238
            </a>
          </p>
          <p><strong>{getTranslation(currentLang, 'common.location')}:</strong> 3 Rue Victor Hugo, 95100 Argenteuil, France</p>
        </div>
      </section>

      {/* Q&A Assistant - Available to all users */}
      <QAAssistant context="home" />
    </div>
  );
}
