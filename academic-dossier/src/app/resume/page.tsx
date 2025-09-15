'use client';

import { useState } from 'react';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvData } from '@/data/cv-data';

export default function ResumePage() {
  const { currentLang } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('education');

  const sections = [
    {
      id: 'education',
      label: getTranslation(currentLang, 'resume.education'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
    },
    {
      id: 'experience',
      label: getTranslation(currentLang, 'resume.experience'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
    },
    {
      id: 'research',
      label: getTranslation(currentLang, 'resume.research'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    },
    {
      id: 'skills',
      label: getTranslation(currentLang, 'resume.skills'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
    },
    {
      id: 'workshops',
      label: getTranslation(currentLang, 'resume.workshops'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
    },
    {
      id: 'awards',
      label: getTranslation(currentLang, 'resume.awards'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    }
  ];

  const handleDownloadCV = () => {
    // This will be implemented when PDF is available
    alert('CV download will be available soon');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl academic-heading mb-4">
          {getTranslation(currentLang, 'resume.title')}
        </h1>
        <div className="flex justify-center">
          <button
            onClick={handleDownloadCV}
            className="bg-academic-brown text-white px-6 py-3 rounded-lg hover:bg-academic-brown-dark active:bg-academic-brown-dark transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'resume.downloadPDF')}
          </button>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors academic-text font-medium ${
              activeSection === section.id
                ? 'bg-amber-800 text-white active:bg-amber-900'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {/* Profile Section */}
        <section>
          <h2 className="text-3xl academic-heading mb-6 text-center">{cvData.profile.name}</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="academic-text text-lg text-gray-700 mb-6 text-center italic">
              {cvData.profile.title}
            </p>
            <div className="grid md:grid-cols-2 gap-4 academic-text text-gray-700">
              <div>
                <p><strong>Email:</strong> <a href={`mailto:${cvData.profile.email}`} className="text-academic-brown hover:text-academic-brown-dark">{cvData.profile.email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${cvData.profile.phone}`} className="text-academic-brown hover:text-academic-brown-dark">{cvData.profile.phone}</a></p>
              </div>
              <div>
                <p><strong>Address:</strong> {cvData.profile.address}</p>
                <p><strong>Born:</strong> {cvData.profile.birthDate}, {cvData.profile.birthPlace}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Education */}
        <section id="education">
          <h2 className="text-2xl academic-heading mb-6">{getTranslation(currentLang, 'resume.education')}</h2>
          <div className="space-y-6">
            {cvData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-academic-brown pl-6">
                <h3 className="text-xl academic-heading mb-2">{edu.degree}</h3>
                <p className="text-academic-brown font-medium academic-text mb-1">{edu.institution}</p>
                <p className="text-gray-600 academic-text mb-2">{edu.period}</p>
                {edu.grade && (
                  <p className="text-gray-700 academic-text font-medium mb-2">{edu.grade}</p>
                )}
                {edu.thesis && (
                  <p className="text-gray-700 academic-text italic mb-2"><strong>Thesis:</strong> {edu.thesis}</p>
                )}
                <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                  {edu.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Work Experience */}
        <section id="experience">
          <h2 className="text-2xl academic-heading mb-6">{getTranslation(currentLang, 'resume.experience')}</h2>
          <div className="space-y-6">
            {cvData.workExperience.map((work, index) => (
              <div key={index} className="border-l-4 border-academic-brown pl-6">
                <h3 className="text-xl academic-heading mb-2">{work.position}</h3>
                <p className="text-academic-brown font-medium academic-text mb-1">{work.company}</p>
                <p className="text-gray-600 academic-text mb-2">{work.period}</p>
                <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                  {work.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Research Projects */}
        <section id="research">
          <h2 className="text-2xl academic-heading mb-6">{getTranslation(currentLang, 'resume.research')}</h2>
          <div className="space-y-6">
            {cvData.researchProjects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl academic-heading mb-2">{project.title}</h3>
                <div className="flex gap-4 mb-3 academic-text text-gray-600">
                  <span>{project.period}</span>
                  <span className="text-academic-brown">•</span>
                  <span>{project.type}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                  {project.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Skills */}
        <section id="skills">
          <h2 className="text-2xl academic-heading mb-6">{getTranslation(currentLang, 'resume.skills')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Languages */}
            <div>
              <h3 className="text-lg academic-heading mb-4">{getTranslation(currentLang, 'resume.languages')}</h3>
              <div className="space-y-2">
                {cvData.skills.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between academic-text">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-gray-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-lg academic-heading mb-4">{getTranslation(currentLang, 'resume.technical')}</h3>
              <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                {cvData.skills.technical.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Qualities */}
          <div className="mt-8">
            <h3 className="text-lg academic-heading mb-4">{getTranslation(currentLang, 'resume.qualities')}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {cvData.skills.qualities.map((quality, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <p className="academic-text text-gray-700 text-sm">{quality}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Workshops & Training */}
        <section id="workshops">
          <h2 className="text-2xl academic-heading mb-6">{getTranslation(currentLang, 'resume.workshops')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {cvData.workshops.map((workshop, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="academic-heading text-lg mb-1">{workshop.name}</h3>
                <p className="academic-text text-gray-700 text-sm mb-1">{workshop.instructor}</p>
                <p className="academic-text text-academic-brown text-sm font-medium">{workshop.year}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Awards */}
        <section id="awards">
          <h2 className="text-2xl academic-heading mb-6">{getTranslation(currentLang, 'resume.awards')}</h2>
          <ul className="space-y-3">
            {cvData.awards.map((award, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-academic-brown rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="academic-text text-gray-700">{award}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}