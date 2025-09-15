'use client';

import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { cvData } from '@/data/cv-data';

export default function ResumePage() {
  const { currentLang } = useLanguage();

  const handleDownloadCV = () => {
    // This will be implemented when PDF is available
    alert('CV download will be available soon');
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
            className="bg-academic-brown text-white px-6 py-3 rounded-lg hover:bg-academic-brown-dark transition-colors academic-text font-medium"
          >
            {getTranslation(currentLang, 'resume.downloadPDF')}
          </button>
        </div>
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
        <section>
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
        <section>
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
        <section>
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
        <section>
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
        <section>
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
        <section>
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