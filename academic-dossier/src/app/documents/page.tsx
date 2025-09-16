'use client';

import { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import EditableText from '@/components/EditableText';

export default function DocumentsPage() {
  const { currentLang } = useLanguage();
  const { isAdminMode } = useAdmin();

  // Load initial data from localStorage or use defaults
  const getInitialDocumentsContent = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('documents-editable-content');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing saved documents content:', error);
        }
      }
    }

    return {
      // Page headers
      pageTitle: 'Documents & Resources',
      pageSubtitle: 'Essential documents and professional resources',

      // Document cards
      cvTitle: 'Download CV',
      cvDescription: 'Comprehensive academic and professional curriculum vitae with complete educational background, research experience, and achievements.',

      biographyTitle: 'Biography',
      biographyDescription: 'Detailed professional biography highlighting academic journey, research interests, and interdisciplinary approach to philosophy and digital humanities.',

      portfolioTitle: 'Download Portfolio',
      portfolioDescription: 'Complete creative portfolio showcasing interdisciplinary projects, artistic practice, and digital humanities work including detailed project documentation.',

      // Biography section
      biographySectionTitle: 'Professional Biography',
      biographyParagraph1: 'Yekta Jokar is an interdisciplinary researcher and creative practitioner working at the intersection of philosophy, digital humanities, and aesthetic theory. Currently pursuing a Master\'s degree in Digital Humanities at Université Paris 8, their work explores the philosophical dimensions of aesthetic language and its applications in contemporary digital contexts.',
      biographyParagraph2: 'With a strong foundation in archaeology (M.A., University of Tehran) and philosophy (M1, Université Paris 8), Yekta brings a unique perspective to questions of meaning, representation, and cultural expression. Their Master\'s thesis, "Aesthetic Language: The Interplay Between Language, Art, and the Sensible," received a distinction of 18/20 and examines how aesthetic experiences communicate beyond the limits of discursive language.',
      biographyParagraph3: 'As a creative practitioner, Yekta has developed several innovative projects including Shadowline, a comprehensive writing platform that integrates multiple AI systems for narrative development, and Mémoire en Livres, a digital heritage library preserving family literary collections. Their artistic practice extends to jewelry design through the Yexen brand, creating wearable sculptures that function as three-dimensional poems.',
      biographyParagraph4: 'Yekta\'s research interests include aesthetic theory, digital humanities methodologies, AI interaction frameworks, and the philosophy of language. They are particularly interested in how digital tools can enhance creative and scholarly practice while preserving the ineffable qualities of human expression.',

      // Additional documentation section
      additionalDocsTitle: 'Additional Documentation',
      additionalDocsIntro: 'Full dossier documents (recommendations, letters, attestations) are available upon request.',
      additionalDocsDesc: 'For access to complete academic transcripts, letters of recommendation, research papers, certification documents, or other professional credentials, please contact directly.',
      contactInfoTitle: 'Contact Information',
      disclaimerText: 'All academic documents are official and can be verified directly with issuing institutions.'
    };
  };

  // Editable content state
  const [editableContent, setEditableContent] = useState(getInitialDocumentsContent);

  const handleContentSave = (field: string, newText: string) => {
    const newContent = { ...editableContent, [field]: newText };
    setEditableContent(newContent);

    // Save to localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('documents-editable-content', JSON.stringify(newContent));
    }

    console.log(`Saved ${field}:`, newText);
  };

  // Save to localStorage whenever editableContent changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('documents-editable-content', JSON.stringify(editableContent));
    }
  }, [editableContent]);


  const handleCVDownload = () => {
    // In a real implementation, this would download the actual CV
    alert('CV download would happen here. This is a demo.');
  };

  const handlePortfolioDownload = () => {
    // In a real implementation, this would download the actual portfolio
    alert('Portfolio download would happen here. This is a demo.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <EditableText
          onSave={(newText) => handleContentSave('pageTitle', newText)}
          className="text-4xl academic-heading mb-4"
        >
          <h1 className="text-4xl academic-heading mb-4">
            {editableContent.pageTitle}
          </h1>
        </EditableText>
        <EditableText
          onSave={(newText) => handleContentSave('pageSubtitle', newText)}
          className="text-lg academic-text text-gray-600 max-w-2xl mx-auto"
        >
          <p className="text-lg academic-text text-gray-600 max-w-2xl mx-auto">
            {editableContent.pageSubtitle}
          </p>
        </EditableText>
      </div>

      {/* Available Documents */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Download CV */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 relative group">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <EditableText
              onSave={(newText) => handleContentSave('cvTitle', newText)}
              className="text-xl academic-heading mb-3"
            >
              <h3 className="text-xl academic-heading mb-3">{editableContent.cvTitle}</h3>
            </EditableText>
            <EditableText
              onSave={(newText) => handleContentSave('cvDescription', newText)}
              className="academic-text text-gray-600 mb-6 text-sm"
              multiline
            >
              <p className="academic-text text-gray-600 mb-6 text-sm">
                {editableContent.cvDescription}
              </p>
            </EditableText>
            <button
              onClick={handleCVDownload}
              className="bg-amber-800 text-white py-3 px-6 rounded-lg hover:bg-amber-900 active:bg-amber-900 transition-colors academic-text font-medium flex items-center justify-center gap-2 w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>

        {/* Biography */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 relative group">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <EditableText
              onSave={(newText) => handleContentSave('biographyTitle', newText)}
              className="text-xl academic-heading mb-3"
            >
              <h3 className="text-xl academic-heading mb-3">{editableContent.biographyTitle}</h3>
            </EditableText>
            <EditableText
              onSave={(newText) => handleContentSave('biographyDescription', newText)}
              className="academic-text text-gray-600 mb-6 text-sm"
              multiline
            >
              <p className="academic-text text-gray-600 mb-6 text-sm">
                {editableContent.biographyDescription}
              </p>
            </EditableText>
            <a
              href="#biography-section"
              className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors academic-text font-medium flex items-center justify-center gap-2 w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Biography
            </a>
          </div>
        </div>

        {/* Download Portfolio */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 relative group">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <EditableText
              onSave={(newText) => handleContentSave('portfolioTitle', newText)}
              className="text-xl academic-heading mb-3"
            >
              <h3 className="text-xl academic-heading mb-3">{editableContent.portfolioTitle}</h3>
            </EditableText>
            <EditableText
              onSave={(newText) => handleContentSave('portfolioDescription', newText)}
              className="academic-text text-gray-600 mb-6 text-sm"
              multiline
            >
              <p className="academic-text text-gray-600 mb-6 text-sm">
                {editableContent.portfolioDescription}
              </p>
            </EditableText>
            <button
              onClick={handlePortfolioDownload}
              className="bg-amber-800 text-white py-3 px-6 rounded-lg hover:bg-amber-900 active:bg-amber-900 transition-colors academic-text font-medium flex items-center justify-center gap-2 w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div id="biography-section" className="bg-academic-brown/5 rounded-lg p-8 mb-12">
        <EditableText
          onSave={(newText) => handleContentSave('biographySectionTitle', newText)}
          className="text-2xl academic-heading mb-6 text-center"
        >
          <h2 className="text-2xl academic-heading mb-6 text-center">{editableContent.biographySectionTitle}</h2>
        </EditableText>
        <div className="academic-text text-gray-700 space-y-4 leading-relaxed">
          <EditableText
            onSave={(newText) => handleContentSave('biographyParagraph1', newText)}
            className="academic-text text-gray-700 leading-relaxed"
            multiline
          >
            <p>
              {editableContent.biographyParagraph1}
            </p>
          </EditableText>
          <EditableText
            onSave={(newText) => handleContentSave('biographyParagraph2', newText)}
            className="academic-text text-gray-700 leading-relaxed"
            multiline
          >
            <p>
              {editableContent.biographyParagraph2}
            </p>
          </EditableText>
          <EditableText
            onSave={(newText) => handleContentSave('biographyParagraph3', newText)}
            className="academic-text text-gray-700 leading-relaxed"
            multiline
          >
            <p>
              {editableContent.biographyParagraph3}
            </p>
          </EditableText>
          <EditableText
            onSave={(newText) => handleContentSave('biographyParagraph4', newText)}
            className="academic-text text-gray-700 leading-relaxed"
            multiline
          >
            <p>
              {editableContent.biographyParagraph4}
            </p>
          </EditableText>
        </div>
      </div>

      {/* Document Request Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <EditableText
          onSave={(newText) => handleContentSave('additionalDocsTitle', newText)}
          className="text-2xl academic-heading mb-6 text-center"
        >
          <h2 className="text-2xl academic-heading mb-6 text-center">{editableContent.additionalDocsTitle}</h2>
        </EditableText>
        <div className="text-center academic-text text-gray-700 space-y-4">
          <EditableText
            onSave={(newText) => handleContentSave('additionalDocsIntro', newText)}
            className="text-lg academic-text text-gray-700"
          >
            <p className="text-lg">
              {editableContent.additionalDocsIntro}
            </p>
          </EditableText>
          <EditableText
            onSave={(newText) => handleContentSave('additionalDocsDesc', newText)}
            className="text-sm academic-text text-gray-700"
            multiline
          >
            <p className="text-sm">
              {editableContent.additionalDocsDesc}
            </p>
          </EditableText>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <EditableText
              onSave={(newText) => handleContentSave('contactInfoTitle', newText)}
              className="text-lg academic-heading mb-3"
            >
              <h3 className="text-lg academic-heading mb-3">{editableContent.contactInfoTitle}</h3>
            </EditableText>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong>
                <a href="mailto:yekta.kjs@gmail.com" className="text-academic-brown hover:text-academic-brown-dark ml-2">
                  yekta.kjs@gmail.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>
                <a href="tel:+33766714238" className="text-academic-brown hover:text-academic-brown-dark ml-2">
                  +33 766 714 238
                </a>
              </p>
            </div>
            <EditableText
              onSave={(newText) => handleContentSave('disclaimerText', newText)}
              className="text-xs text-gray-500 mt-4"
              multiline
            >
              <p className="text-xs text-gray-500 mt-4">
                {editableContent.disclaimerText}
              </p>
            </EditableText>
          </div>
        </div>
      </div>
    </div>
  );
}