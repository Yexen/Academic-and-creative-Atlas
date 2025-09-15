'use client';

import { useState } from 'react';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioData } from '@/data/portfolio-data';

export default function PortfolioPage() {
  const { currentLang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = Object.entries(portfolioData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl academic-heading mb-4">
          {getTranslation(currentLang, 'portfolio.title')}
        </h1>
        <p className="text-lg academic-text text-gray-600 max-w-3xl mx-auto">
          {getTranslation(currentLang, 'portfolio.subtitle')}
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {projects.map(([key, project]) => (
          <div
            key={key}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
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
                <h2 className="text-2xl academic-heading">{project.title}</h2>
                <span className="text-academic-brown text-sm academic-text">{project.type}</span>
              </div>
              <h3 className="text-lg academic-text text-gray-700 mb-2">{project.subtitle}</h3>
              <p className="text-sm academic-text text-gray-600 mb-4">{project.period}</p>
              <p className="academic-text text-gray-700 line-clamp-3">{project.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <button className="text-academic-brown hover:text-academic-brown-dark active:text-academic-brown-dark font-medium academic-text">
                  {selectedProject === key ? getTranslation(currentLang, 'portfolio.showLess') : getTranslation(currentLang, 'portfolio.showMore')}
                </button>
                <div className="flex gap-2">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="text-sm bg-academic-brown text-white px-3 py-1 rounded hover:bg-academic-brown-dark active:bg-academic-brown-dark transition-colors"
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
                        <li key={index} className="text-sm">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Significance */}
                  <div>
                    <h4 className="text-lg academic-heading mb-3">{getTranslation(currentLang, 'portfolio.significance')}</h4>
                    <p className="academic-text text-gray-700 text-sm leading-relaxed">
                      {project.significance}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg academic-heading mb-3">{getTranslation(currentLang, 'portfolio.technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-academic-brown/10 text-academic-brown px-2 py-1 rounded text-xs academic-text"
                        >
                          {tech}
                        </span>
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
        <h2 className="text-2xl academic-heading mb-6">{getTranslation(currentLang, 'portfolio.integration')}</h2>
        <p className="academic-text text-gray-700 leading-relaxed mb-6">
          {getTranslation(currentLang, 'portfolio.integrationDesc')}
        </p>
        <p className="academic-text text-gray-700 leading-relaxed">
          {getTranslation(currentLang, 'portfolio.integrationDesc2')}
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center bg-academic-brown/5 rounded-lg p-8">
        <h2 className="text-2xl academic-heading mb-4">{getTranslation(currentLang, 'portfolio.exploreFurther')}</h2>
        <p className="academic-text text-gray-700 mb-6">
          {getTranslation(currentLang, 'portfolio.exploreDesc')}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:yekta.kjs@gmail.com"
            className="bg-academic-brown text-white px-6 py-3 rounded-lg hover:bg-academic-brown-dark active:bg-academic-brown-dark transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'portfolio.contactCollaboration')}
          </a>
          <a
            href="/academic"
            className="border border-academic-brown text-academic-brown px-6 py-3 rounded-lg hover:bg-academic-brown hover:text-white active:bg-academic-brown-dark active:border-academic-brown-dark transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'portfolio.viewAcademicWork')}
          </a>
        </div>
      </section>
    </div>
  );
}