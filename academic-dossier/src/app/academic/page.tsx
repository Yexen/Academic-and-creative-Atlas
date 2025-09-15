'use client';

import { useState, useEffect } from 'react';
import { Language, getTranslation } from '@/lib/i18n';
import { academicData } from '@/data/academic-data';

export default function AcademicPage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('thesis');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && ['en', 'fr', 'fa'].includes(storedLang)) {
      setCurrentLang(storedLang);
    }
  }, []);

  const sections = [
    { id: 'thesis', label: 'Master\'s Thesis', icon: '🎓' },
    { id: 'archaeology', label: 'Archaeological Research', icon: '🏛️' },
    { id: 'philosophy', label: 'Philosophical Work', icon: '💭' },
    { id: 'ongoing', label: 'Ongoing Research', icon: '🔬' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl academic-heading mb-4">
          {getTranslation(currentLang, 'nav.academic')}
        </h1>
        <p className="text-lg academic-text text-gray-600 max-w-3xl mx-auto">
          Interdisciplinary research spanning philosophy, archaeology, and contemporary technology applications
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors academic-text font-medium ${
              activeSection === section.id
                ? 'bg-academic-brown text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Master's Thesis */}
        {activeSection === 'thesis' && (
          <section className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl academic-heading mb-2">{academicData.thesis.title}</h2>
                <h3 className="text-xl academic-text text-gray-700 mb-4">{academicData.thesis.subtitle}</h3>
                <div className="grid md:grid-cols-2 gap-4 academic-text text-gray-600 max-w-2xl mx-auto">
                  <div>
                    <p><strong>University:</strong> {academicData.thesis.university}</p>
                    <p><strong>Program:</strong> {academicData.thesis.program}</p>
                  </div>
                  <div>
                    <p><strong>Grade:</strong> <span className="text-academic-brown font-bold">{academicData.thesis.grade}</span></p>
                    <p><strong>Average:</strong> {academicData.thesis.average}</p>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl academic-heading mb-4">Abstract</h4>
                  <p className="academic-text text-gray-700 leading-relaxed">{academicData.thesis.abstract}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg academic-heading mb-4">Key Contributions</h4>
                    <ul className="list-disc list-inside space-y-2 academic-text text-gray-700">
                      {academicData.thesis.keyContributions.map((contribution, index) => (
                        <li key={index}>{contribution}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg academic-heading mb-4">Methodology</h4>
                    <ul className="list-disc list-inside space-y-2 academic-text text-gray-700">
                      {academicData.thesis.methodology.map((method, index) => (
                        <li key={index}>{method}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg academic-heading mb-4">Significance</h4>
                  <p className="academic-text text-gray-700 leading-relaxed">{academicData.thesis.significance}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Archaeological Research */}
        {activeSection === 'archaeology' && (
          <section className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl academic-heading mb-4">{academicData.archaeology.title}</h2>
              <p className="text-lg academic-text text-gray-600">{academicData.archaeology.period}</p>
            </div>

            {/* Education */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Archaeological Education</h3>
              <div className="space-y-6">
                {academicData.archaeology.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-academic-brown pl-6">
                    <h4 className="text-xl academic-heading mb-2">{edu.degree}</h4>
                    <p className="text-academic-brown font-medium academic-text mb-1">{edu.university}</p>
                    <div className="flex gap-4 academic-text text-gray-600 mb-2">
                      <span>{edu.period}</span>
                      <span>•</span>
                      <span className="font-medium">{edu.grade}</span>
                    </div>
                    <p className="academic-text text-gray-700">{edu.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fieldwork */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Fieldwork Experience</h3>
              {academicData.archaeology.fieldwork.map((field, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-xl academic-heading mb-2">{field.site}</h4>
                  <div className="grid md:grid-cols-2 gap-4 academic-text text-gray-600 mb-4">
                    <div>
                      <p><strong>Location:</strong> {field.location}</p>
                      <p><strong>Period:</strong> {field.period}</p>
                    </div>
                    <div>
                      <p><strong>Role:</strong> {field.role}</p>
                      <p><strong>Supervisor:</strong> {field.supervisor}</p>
                    </div>
                  </div>
                  <h5 className="academic-heading mb-2">Activities:</h5>
                  <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                    {field.activities.map((activity, actIndex) => (
                      <li key={actIndex}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Research Projects */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Research Projects</h3>
              {academicData.archaeology.research.map((research, index) => (
                <div key={index} className="border-l-4 border-academic-brown pl-6">
                  <h4 className="text-xl academic-heading mb-2">{research.title}</h4>
                  <div className="flex gap-4 academic-text text-gray-600 mb-3">
                    <span>{research.type}</span>
                    <span>•</span>
                    <span>{research.period}</span>
                  </div>
                  <p className="academic-text text-gray-700 mb-4">{research.description}</p>
                  <h5 className="academic-heading mb-2">Methods:</h5>
                  <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                    {research.methods.map((method, methodIndex) => (
                      <li key={methodIndex}>{method}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Philosophical Work */}
        {activeSection === 'philosophy' && (
          <section className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl academic-heading mb-4">{academicData.philosophy.title}</h2>
            </div>

            {/* Specializations */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Areas of Specialization</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {academicData.philosophy.specializations.map((spec, index) => (
                  <div key={index} className="bg-academic-brown/5 rounded-lg p-4 text-center">
                    <p className="academic-text font-medium text-academic-brown">{spec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Theoretical Contributions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Theoretical Contributions</h3>
              <div className="space-y-6">
                {academicData.philosophy.theoreticalContributions.map((contrib, index) => (
                  <div key={index} className="border-l-4 border-academic-brown pl-6">
                    <h4 className="text-xl academic-heading mb-2">{contrib.area}</h4>
                    <p className="academic-text text-gray-700 mb-3">{contrib.description}</p>
                    <div>
                      <h5 className="academic-heading mb-2 text-sm">Applications:</h5>
                      <div className="flex flex-wrap gap-2">
                        {contrib.applications.map((app, appIndex) => (
                          <span key={appIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs academic-text">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Influences */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Key Philosophical Influences</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {academicData.philosophy.keyInfluences.map((influence, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="academic-heading text-lg mb-2">{influence.philosopher}</h4>
                    <p className="academic-text text-gray-700 text-sm mb-2">
                      <strong>Contribution:</strong> {influence.contribution}
                    </p>
                    <p className="academic-text text-gray-600 text-sm">
                      <strong>Application:</strong> {influence.application}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Ongoing Research */}
        {activeSection === 'ongoing' && (
          <section className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl academic-heading mb-4">Ongoing Research Projects</h2>
              <p className="text-lg academic-text text-gray-600">Current investigations and future directions</p>
            </div>

            <div className="grid gap-6">
              {academicData.ongoingResearch.map((research, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl academic-heading">{research.title}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs academic-text font-medium">
                      {research.status}
                    </span>
                  </div>
                  <p className="academic-text text-gray-600 mb-2">{research.period}</p>
                  <p className="academic-text text-gray-700 mb-4">{research.description}</p>

                  {research.collaborators && (
                    <div className="mb-4">
                      <h4 className="academic-heading text-sm mb-2">Collaborators:</h4>
                      <div className="flex flex-wrap gap-2">
                        {research.collaborators.map((collab, collabIndex) => (
                          <span key={collabIndex} className="bg-academic-brown/10 text-academic-brown px-2 py-1 rounded text-xs academic-text">
                            {collab}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {research.applications && (
                    <div>
                      <h4 className="academic-heading text-sm mb-2">Applications:</h4>
                      <div className="flex flex-wrap gap-2">
                        {research.applications.map((app, appIndex) => (
                          <span key={appIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs academic-text">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Research Philosophy */}
      <div className="mt-16 bg-academic-brown/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl academic-heading mb-4">Research Philosophy</h2>
        <p className="academic-text text-gray-700 leading-relaxed max-w-4xl mx-auto">
          My academic work is unified by a commitment to interdisciplinary synthesis that bridges theoretical
          investigation with practical application. From archaeological fieldwork to philosophical theory to
          contemporary AI research, each area of study informs and enriches the others, creating a holistic
          approach to understanding how meaning emerges across different domains of human experience.
        </p>
      </div>
    </div>
  );
}