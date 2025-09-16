'use client';

import { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { portfolioData } from '@/data/portfolio-data';
import EditableText from '@/components/EditableText';

export default function PortfolioPage() {
  const { currentLang } = useLanguage();
  const { isAdminMode } = useAdmin();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Load initial data from localStorage or use defaults
  const getInitialPortfolioContent = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-editable-content');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing saved portfolio content:', error);
        }
      }
    }

    return {
      // Page content
      pageTitle: 'Creative Portfolio',
      pageSubtitle: 'A collection of interdisciplinary projects bridging philosophy, technology, and creative practice',
      integrationTitle: 'Integration & Philosophy',
      integrationDesc1: 'Each project represents a different facet of investigation into how aesthetic experiences can communicate what discursive language cannot fully capture.',
      integrationDesc2: 'By bringing together digital humanities, creative practice, and philosophical inquiry, these works explore the boundaries and possibilities of meaningful expression in contemporary contexts.',
      exploreTitle: 'Explore Further',
      exploreDesc: 'Interested in collaboration or learning more about these projects?',

      // Project data
      projects: { ...portfolioData }
    };
  };

  // Editable content state
  const [editableContent, setEditableContent] = useState(getInitialPortfolioContent);


  const projects = Object.entries(editableContent.projects);

  const handleContentSave = (field: string, newText: string) => {
    const newContent = { ...editableContent, [field]: newText };
    setEditableContent(newContent);

    // Save to localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-editable-content', JSON.stringify(newContent));
    }

    console.log(`Saved ${field}:`, newText);
  };

  // Save to localStorage whenever editableContent changes (for complex updates)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-editable-content', JSON.stringify(editableContent));
    }
  }, [editableContent]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          className="text-lg academic-text text-gray-600 max-w-3xl mx-auto"
          multiline
        >
          <p className="text-lg academic-text text-gray-600 max-w-3xl mx-auto">
            {editableContent.pageSubtitle}
          </p>
        </EditableText>
      </div>

      {/* Project Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {projects.map(([key, project]) => (
          <div
            key={key}
            className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer relative group"
            onClick={() => setSelectedProject(selectedProject === key ? null : key)}
          >
            {/* Project Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-academic-brown/20 to-academic-brown/5 flex items-center justify-center">
              <div className="text-academic-brown opacity-30">
                {key === 'shadowline' && (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                )}
                {key === 'memoireEnLivres' && (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                )}
                {key === 'yexen' && (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )}
                {key === 'literaryWorks' && (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <EditableText
                  onSave={(newText) => {
                    const newProjects = { ...editableContent.projects };
                    newProjects[key] = { ...newProjects[key], title: newText };
                    setEditableContent(prev => ({ ...prev, projects: newProjects }));
                  }}
                  className="text-2xl academic-heading"
                >
                  <h2 className="text-2xl academic-heading">{project.title}</h2>
                </EditableText>
                <EditableText
                  onSave={(newText) => {
                    const newProjects = { ...editableContent.projects };
                    newProjects[key] = { ...newProjects[key], type: newText };
                    setEditableContent(prev => ({ ...prev, projects: newProjects }));
                  }}
                  className="text-academic-brown text-sm academic-text"
                >
                  <span className="text-academic-brown text-sm academic-text">{project.type}</span>
                </EditableText>
              </div>
              <EditableText
                onSave={(newText) => {
                  const newProjects = { ...editableContent.projects };
                  newProjects[key] = { ...newProjects[key], subtitle: newText };
                  setEditableContent(prev => ({ ...prev, projects: newProjects }));
                }}
                className="text-lg academic-text text-gray-700 mb-2"
              >
                <h3 className="text-lg academic-text text-gray-700 mb-2">{project.subtitle}</h3>
              </EditableText>
              <EditableText
                onSave={(newText) => {
                  const newProjects = { ...editableContent.projects };
                  newProjects[key] = { ...newProjects[key], period: newText };
                  setEditableContent(prev => ({ ...prev, projects: newProjects }));
                }}
                className="text-sm academic-text text-gray-600 mb-4"
              >
                <p className="text-sm academic-text text-gray-600 mb-4">{project.period}</p>
              </EditableText>
              <EditableText
                onSave={(newText) => {
                  const newProjects = { ...editableContent.projects };
                  newProjects[key] = { ...newProjects[key], description: newText };
                  setEditableContent(prev => ({ ...prev, projects: newProjects }));
                }}
                className="academic-text text-gray-700 line-clamp-3"
                multiline
              >
                <p className="academic-text text-gray-700 line-clamp-3">{project.description}</p>
              </EditableText>

              <div className="mt-4 flex justify-between items-center">
                <button className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-amber-900 active:bg-amber-900 transition-colors font-medium academic-text">
                  {selectedProject === key ? getTranslation(currentLang, 'portfolio.showLess') : getTranslation(currentLang, 'portfolio.showMore')}
                </button>
                <div className="flex gap-2">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="text-sm bg-amber-800 text-white px-3 py-1 rounded hover:bg-amber-900 active:bg-amber-900 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedProject === key && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-lg academic-heading mb-3">{getTranslation(currentLang, 'portfolio.keyFeatures')}</h4>
                    <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                      {project.features.map((feature, index) => (
                        <EditableText
                          key={index}
                          onSave={(newText) => {
                            const newProjects = { ...editableContent.projects };
                            const newFeatures = [...newProjects[key].features];
                            newFeatures[index] = newText;
                            newProjects[key] = { ...newProjects[key], features: newFeatures };
                            setEditableContent(prev => ({ ...prev, projects: newProjects }));
                          }}
                          className="text-sm academic-text text-gray-700"
                          multiline
                        >
                          <li className="text-sm">{feature}</li>
                        </EditableText>
                      ))}
                    </ul>
                  </div>

                  {/* Significance */}
                  <div>
                    <h4 className="text-lg academic-heading mb-3">{getTranslation(currentLang, 'portfolio.significance')}</h4>
                    <EditableText
                      onSave={(newText) => {
                        const newProjects = { ...editableContent.projects };
                        newProjects[key] = { ...newProjects[key], significance: newText };
                        setEditableContent(prev => ({ ...prev, projects: newProjects }));
                      }}
                      className="academic-text text-gray-700 text-sm leading-relaxed"
                      multiline
                    >
                      <p className="academic-text text-gray-700 text-sm leading-relaxed">
                        {project.significance}
                      </p>
                    </EditableText>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg academic-heading mb-3">{getTranslation(currentLang, 'portfolio.technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <EditableText
                          key={index}
                          onSave={(newText) => {
                            const newProjects = { ...editableContent.projects };
                            const newTechnologies = [...newProjects[key].technologies];
                            newTechnologies[index] = newText;
                            newProjects[key] = { ...newProjects[key], technologies: newTechnologies };
                            setEditableContent(prev => ({ ...prev, projects: newProjects }));
                          }}
                          className="bg-academic-brown/10 text-academic-brown px-2 py-1 rounded text-xs academic-text"
                        >
                          <span className="bg-academic-brown/10 text-academic-brown px-2 py-1 rounded text-xs academic-text">
                            {tech}
                          </span>
                        </EditableText>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="section-divider"></div>

      {/* Integration Statement */}
      <section className="text-center max-w-4xl mx-auto">
        <EditableText
          onSave={(newText) => handleContentSave('integrationTitle', newText)}
          className="text-2xl academic-heading mb-6"
        >
          <h2 className="text-2xl academic-heading mb-6">{editableContent.integrationTitle}</h2>
        </EditableText>
        <EditableText
          onSave={(newText) => handleContentSave('integrationDesc1', newText)}
          className="academic-text text-gray-700 leading-relaxed mb-6"
          multiline
        >
          <p className="academic-text text-gray-700 leading-relaxed mb-6">
            {editableContent.integrationDesc1}
          </p>
        </EditableText>
        <EditableText
          onSave={(newText) => handleContentSave('integrationDesc2', newText)}
          className="academic-text text-gray-700 leading-relaxed"
          multiline
        >
          <p className="academic-text text-gray-700 leading-relaxed">
            {editableContent.integrationDesc2}
          </p>
        </EditableText>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center bg-academic-brown/5 rounded-lg p-8">
        <EditableText
          onSave={(newText) => handleContentSave('exploreTitle', newText)}
          className="text-2xl academic-heading mb-4"
        >
          <h2 className="text-2xl academic-heading mb-4">{editableContent.exploreTitle}</h2>
        </EditableText>
        <EditableText
          onSave={(newText) => handleContentSave('exploreDesc', newText)}
          className="academic-text text-gray-700 mb-6"
          multiline
        >
          <p className="academic-text text-gray-700 mb-6">
            {editableContent.exploreDesc}
          </p>
        </EditableText>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:yekta.kjs@gmail.com"
            className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 active:bg-amber-900 transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'portfolio.contactCollaboration')}
          </a>
          <a
            href="/academic"
            className="border border-amber-800 text-amber-800 px-6 py-3 rounded-lg hover:bg-amber-800 hover:text-white active:bg-amber-900 active:border-amber-900 transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'portfolio.viewAcademicWork')}
          </a>
        </div>
      </section>
    </div>
  );
}