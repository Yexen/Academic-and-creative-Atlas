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
              <div className="text-academic-brown text-6xl opacity-30">
                {key === 'shadowline' && '🏰'}
                {key === 'memoireEnLivres' && '📚'}
                {key === 'yexen' && '💎'}
                {key === 'literaryWorks' && '✍️'}
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
                <button className="text-academic-brown hover:text-academic-brown-dark font-medium academic-text">
                  {selectedProject === key ? getTranslation(currentLang, 'portfolio.showLess') : getTranslation(currentLang, 'portfolio.showMore')}
                </button>
                <div className="flex gap-2">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="text-sm bg-academic-brown text-white px-3 py-1 rounded hover:bg-academic-brown-dark transition-colors"
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
            className="bg-academic-brown text-white px-6 py-3 rounded-lg hover:bg-academic-brown-dark transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'portfolio.contactCollaboration')}
          </a>
          <a
            href="/academic"
            className="border border-academic-brown text-academic-brown px-6 py-3 rounded-lg hover:bg-academic-brown hover:text-white transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'portfolio.viewAcademicWork')}
          </a>
        </div>
      </section>
    </div>
  );
}