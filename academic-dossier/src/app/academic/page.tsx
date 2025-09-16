'use client';

import { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { academicData } from '@/data/academic-data';
import EditableText from '@/components/EditableText';

export default function AcademicPage() {
  const { currentLang } = useLanguage();
  const { isAdminMode } = useAdmin();
  const [activeSection, setActiveSection] = useState<string>('thesis');

  // Load initial data from localStorage or use defaults
  const getInitialAcademicContent = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('academic-editable-content');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing saved academic content:', error);
        }
      }
    }

    return {
      // Page headers
      pageTitle: 'Academic Work',
      pageSubtitle: 'Interdisciplinary research spanning philosophy, archaeology, and contemporary technology applications',
      researchPhilosophyTitle: 'Research Philosophy',
      researchPhilosophyDesc: 'My academic work is unified by a commitment to interdisciplinary synthesis that bridges theoretical investigation with practical application. From archaeological fieldwork to philosophical theory to contemporary AI research, each area of study informs and enriches the others, creating a holistic approach to understanding how meaning emerges across different domains of human experience.',

      // Academic data
      thesis: { ...academicData.thesis },
      archaeology: { ...academicData.archaeology },
      philosophy: { ...academicData.philosophy },
      ongoingResearch: [...academicData.ongoingResearch]
    };
  };

  // Editable content state
  const [editableContent, setEditableContent] = useState(getInitialAcademicContent);

  const handleContentSave = (field: string, newText: string) => {
    const newContent = { ...editableContent, [field]: newText };
    setEditableContent(newContent);

    // Save to localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('academic-editable-content', JSON.stringify(newContent));
    }

    console.log(`Saved ${field}:`, newText);
  };

  // Save to localStorage whenever editableContent changes (for complex updates)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('academic-editable-content', JSON.stringify(editableContent));
    }
  }, [editableContent]);

  const sections = [
    {
      id: 'thesis',
      label: 'Master\'s Thesis',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
    },
    {
      id: 'archaeology',
      label: 'Archaeological Research',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
    },
    {
      id: 'philosophy',
      label: 'Philosophical Work',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
    },
    {
      id: 'ongoing',
      label: 'Ongoing Research',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    }
  ];

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

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors academic-text font-medium ${
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

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Master's Thesis */}
        {activeSection === 'thesis' && (
          <section className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-8">
                <EditableText
                  onSave={(newText) => {
                    const newThesis = { ...editableContent.thesis, title: newText };
                    setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                  }}
                  className="text-3xl academic-heading mb-2"
                >
                  <h2 className="text-3xl academic-heading mb-2">{editableContent.thesis.title}</h2>
                </EditableText>
                <EditableText
                  onSave={(newText) => {
                    const newThesis = { ...editableContent.thesis, subtitle: newText };
                    setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                  }}
                  className="text-xl academic-text text-gray-700 mb-4"
                >
                  <h3 className="text-xl academic-text text-gray-700 mb-4">{editableContent.thesis.subtitle}</h3>
                </EditableText>
                <div className="grid md:grid-cols-2 gap-4 academic-text text-gray-600 max-w-2xl mx-auto">
                  <div>
                    <p><strong>University:</strong>
                      <EditableText
                        onSave={(newText) => {
                          const newThesis = { ...editableContent.thesis, university: newText };
                          setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                        }}
                        className="ml-1 inline"
                      >
                        <span className="ml-1">{editableContent.thesis.university}</span>
                      </EditableText>
                    </p>
                    <p><strong>Program:</strong>
                      <EditableText
                        onSave={(newText) => {
                          const newThesis = { ...editableContent.thesis, program: newText };
                          setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                        }}
                        className="ml-1 inline"
                      >
                        <span className="ml-1">{editableContent.thesis.program}</span>
                      </EditableText>
                    </p>
                  </div>
                  <div>
                    <p><strong>Grade:</strong>
                      <EditableText
                        onSave={(newText) => {
                          const newThesis = { ...editableContent.thesis, grade: newText };
                          setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                        }}
                        className="text-academic-brown font-bold ml-1 inline"
                      >
                        <span className="text-academic-brown font-bold ml-1">{editableContent.thesis.grade}</span>
                      </EditableText>
                    </p>
                    <p><strong>Average:</strong>
                      <EditableText
                        onSave={(newText) => {
                          const newThesis = { ...editableContent.thesis, average: newText };
                          setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                        }}
                        className="ml-1 inline"
                      >
                        <span className="ml-1">{editableContent.thesis.average}</span>
                      </EditableText>
                    </p>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl academic-heading mb-4">Abstract</h4>
                  <EditableText
                    onSave={(newText) => {
                      const newThesis = { ...editableContent.thesis, abstract: newText };
                      setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                    }}
                    className="academic-text text-gray-700 leading-relaxed"
                    multiline
                  >
                    <p className="academic-text text-gray-700 leading-relaxed">{editableContent.thesis.abstract}</p>
                  </EditableText>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg academic-heading mb-4">Key Contributions</h4>
                    <ul className="list-disc list-inside space-y-2 academic-text text-gray-700">
                      {editableContent.thesis.keyContributions.map((contribution, index) => (
                        <EditableText
                          key={index}
                          onSave={(newText) => {
                            const newThesis = { ...editableContent.thesis };
                            const newContributions = [...newThesis.keyContributions];
                            newContributions[index] = newText;
                            newThesis.keyContributions = newContributions;
                            setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                          }}
                          className="academic-text text-gray-700"
                          multiline
                        >
                          <li>{contribution}</li>
                        </EditableText>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg academic-heading mb-4">Methodology</h4>
                    <ul className="list-disc list-inside space-y-2 academic-text text-gray-700">
                      {editableContent.thesis.methodology.map((method, index) => (
                        <EditableText
                          key={index}
                          onSave={(newText) => {
                            const newThesis = { ...editableContent.thesis };
                            const newMethodology = [...newThesis.methodology];
                            newMethodology[index] = newText;
                            newThesis.methodology = newMethodology;
                            setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                          }}
                          className="academic-text text-gray-700"
                          multiline
                        >
                          <li>{method}</li>
                        </EditableText>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg academic-heading mb-4">Significance</h4>
                  <EditableText
                    onSave={(newText) => {
                      const newThesis = { ...editableContent.thesis, significance: newText };
                      setEditableContent(prev => ({ ...prev, thesis: newThesis }));
                    }}
                    className="academic-text text-gray-700 leading-relaxed"
                    multiline
                  >
                    <p className="academic-text text-gray-700 leading-relaxed">{editableContent.thesis.significance}</p>
                  </EditableText>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Archaeological Research */}
        {activeSection === 'archaeology' && (
          <section className="space-y-8">
            <div className="text-center mb-8">
              <EditableText
                onSave={(newText) => {
                  const newArchaeology = { ...editableContent.archaeology, title: newText };
                  setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                }}
                className="text-3xl academic-heading mb-4"
              >
                <h2 className="text-3xl academic-heading mb-4">{editableContent.archaeology.title}</h2>
              </EditableText>
              <EditableText
                onSave={(newText) => {
                  const newArchaeology = { ...editableContent.archaeology, period: newText };
                  setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                }}
                className="text-lg academic-text text-gray-600"
              >
                <p className="text-lg academic-text text-gray-600">{editableContent.archaeology.period}</p>
              </EditableText>
            </div>

            {/* Education */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Archaeological Education</h3>
              <div className="space-y-6">
                {editableContent.archaeology.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-academic-brown pl-6">
                    <EditableText
                      onSave={(newText) => {
                        const newArchaeology = { ...editableContent.archaeology };
                        const newEducation = [...newArchaeology.education];
                        newEducation[index] = { ...newEducation[index], degree: newText };
                        newArchaeology.education = newEducation;
                        setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                      }}
                      className="text-xl academic-heading mb-2"
                    >
                      <h4 className="text-xl academic-heading mb-2">{edu.degree}</h4>
                    </EditableText>
                    <EditableText
                      onSave={(newText) => {
                        const newArchaeology = { ...editableContent.archaeology };
                        const newEducation = [...newArchaeology.education];
                        newEducation[index] = { ...newEducation[index], university: newText };
                        newArchaeology.education = newEducation;
                        setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                      }}
                      className="text-academic-brown font-medium academic-text mb-1"
                    >
                      <p className="text-academic-brown font-medium academic-text mb-1">{edu.university}</p>
                    </EditableText>
                    <div className="flex gap-4 academic-text text-gray-600 mb-2">
                      <EditableText
                        onSave={(newText) => {
                          const newArchaeology = { ...editableContent.archaeology };
                          const newEducation = [...newArchaeology.education];
                          newEducation[index] = { ...newEducation[index], period: newText };
                          newArchaeology.education = newEducation;
                          setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                        }}
                        className="academic-text text-gray-600"
                      >
                        <span>{edu.period}</span>
                      </EditableText>
                      <span>•</span>
                      <EditableText
                        onSave={(newText) => {
                          const newArchaeology = { ...editableContent.archaeology };
                          const newEducation = [...newArchaeology.education];
                          newEducation[index] = { ...newEducation[index], grade: newText };
                          newArchaeology.education = newEducation;
                          setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                        }}
                        className="font-medium academic-text text-gray-600"
                      >
                        <span className="font-medium">{edu.grade}</span>
                      </EditableText>
                    </div>
                    <EditableText
                      onSave={(newText) => {
                        const newArchaeology = { ...editableContent.archaeology };
                        const newEducation = [...newArchaeology.education];
                        newEducation[index] = { ...newEducation[index], focus: newText };
                        newArchaeology.education = newEducation;
                        setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                      }}
                      className="academic-text text-gray-700"
                      multiline
                    >
                      <p className="academic-text text-gray-700">{edu.focus}</p>
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>

            {/* Fieldwork */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Fieldwork Experience</h3>
              {editableContent.archaeology.fieldwork.map((field, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <EditableText
                    onSave={(newText) => {
                      const newArchaeology = { ...editableContent.archaeology };
                      const newFieldwork = [...newArchaeology.fieldwork];
                      newFieldwork[index] = { ...newFieldwork[index], site: newText };
                      newArchaeology.fieldwork = newFieldwork;
                      setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                    }}
                    className="text-xl academic-heading mb-2"
                  >
                    <h4 className="text-xl academic-heading mb-2">{field.site}</h4>
                  </EditableText>
                  <div className="grid md:grid-cols-2 gap-4 academic-text text-gray-600 mb-4">
                    <div>
                      <p><strong>Location:</strong>
                        <EditableText
                          onSave={(newText) => {
                            const newArchaeology = { ...editableContent.archaeology };
                            const newFieldwork = [...newArchaeology.fieldwork];
                            newFieldwork[index] = { ...newFieldwork[index], location: newText };
                            newArchaeology.fieldwork = newFieldwork;
                            setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                          }}
                          className="ml-1 inline"
                        >
                          <span className="ml-1">{field.location}</span>
                        </EditableText>
                      </p>
                      <p><strong>Period:</strong>
                        <EditableText
                          onSave={(newText) => {
                            const newArchaeology = { ...editableContent.archaeology };
                            const newFieldwork = [...newArchaeology.fieldwork];
                            newFieldwork[index] = { ...newFieldwork[index], period: newText };
                            newArchaeology.fieldwork = newFieldwork;
                            setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                          }}
                          className="ml-1 inline"
                        >
                          <span className="ml-1">{field.period}</span>
                        </EditableText>
                      </p>
                    </div>
                    <div>
                      <p><strong>Role:</strong>
                        <EditableText
                          onSave={(newText) => {
                            const newArchaeology = { ...editableContent.archaeology };
                            const newFieldwork = [...newArchaeology.fieldwork];
                            newFieldwork[index] = { ...newFieldwork[index], role: newText };
                            newArchaeology.fieldwork = newFieldwork;
                            setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                          }}
                          className="ml-1 inline"
                        >
                          <span className="ml-1">{field.role}</span>
                        </EditableText>
                      </p>
                      <p><strong>Supervisor:</strong>
                        <EditableText
                          onSave={(newText) => {
                            const newArchaeology = { ...editableContent.archaeology };
                            const newFieldwork = [...newArchaeology.fieldwork];
                            newFieldwork[index] = { ...newFieldwork[index], supervisor: newText };
                            newArchaeology.fieldwork = newFieldwork;
                            setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                          }}
                          className="ml-1 inline"
                        >
                          <span className="ml-1">{field.supervisor}</span>
                        </EditableText>
                      </p>
                    </div>
                  </div>
                  <h5 className="academic-heading mb-2">Activities:</h5>
                  <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                    {field.activities.map((activity, actIndex) => (
                      <EditableText
                        key={actIndex}
                        onSave={(newText) => {
                          const newArchaeology = { ...editableContent.archaeology };
                          const newFieldwork = [...newArchaeology.fieldwork];
                          const newActivities = [...newFieldwork[index].activities];
                          newActivities[actIndex] = newText;
                          newFieldwork[index] = { ...newFieldwork[index], activities: newActivities };
                          newArchaeology.fieldwork = newFieldwork;
                          setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                        }}
                        className="academic-text text-gray-700"
                        multiline
                      >
                        <li>{activity}</li>
                      </EditableText>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Research Projects */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Research Projects</h3>
              {editableContent.archaeology.research.map((research, index) => (
                <div key={index} className="border-l-4 border-academic-brown pl-6">
                  <EditableText
                    onSave={(newText) => {
                      const newArchaeology = { ...editableContent.archaeology };
                      const newResearch = [...newArchaeology.research];
                      newResearch[index] = { ...newResearch[index], title: newText };
                      newArchaeology.research = newResearch;
                      setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                    }}
                    className="text-xl academic-heading mb-2"
                  >
                    <h4 className="text-xl academic-heading mb-2">{research.title}</h4>
                  </EditableText>
                  <div className="flex gap-4 academic-text text-gray-600 mb-3">
                    <EditableText
                      onSave={(newText) => {
                        const newArchaeology = { ...editableContent.archaeology };
                        const newResearch = [...newArchaeology.research];
                        newResearch[index] = { ...newResearch[index], type: newText };
                        newArchaeology.research = newResearch;
                        setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                      }}
                      className="academic-text text-gray-600"
                    >
                      <span>{research.type}</span>
                    </EditableText>
                    <span>•</span>
                    <EditableText
                      onSave={(newText) => {
                        const newArchaeology = { ...editableContent.archaeology };
                        const newResearch = [...newArchaeology.research];
                        newResearch[index] = { ...newResearch[index], period: newText };
                        newArchaeology.research = newResearch;
                        setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                      }}
                      className="academic-text text-gray-600"
                    >
                      <span>{research.period}</span>
                    </EditableText>
                  </div>
                  <EditableText
                    onSave={(newText) => {
                      const newArchaeology = { ...editableContent.archaeology };
                      const newResearch = [...newArchaeology.research];
                      newResearch[index] = { ...newResearch[index], description: newText };
                      newArchaeology.research = newResearch;
                      setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                    }}
                    className="academic-text text-gray-700 mb-4"
                    multiline
                  >
                    <p className="academic-text text-gray-700 mb-4">{research.description}</p>
                  </EditableText>
                  <h5 className="academic-heading mb-2">Methods:</h5>
                  <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                    {research.methods.map((method, methodIndex) => (
                      <EditableText
                        key={methodIndex}
                        onSave={(newText) => {
                          const newArchaeology = { ...editableContent.archaeology };
                          const newResearch = [...newArchaeology.research];
                          const newMethods = [...newResearch[index].methods];
                          newMethods[methodIndex] = newText;
                          newResearch[index] = { ...newResearch[index], methods: newMethods };
                          newArchaeology.research = newResearch;
                          setEditableContent(prev => ({ ...prev, archaeology: newArchaeology }));
                        }}
                        className="academic-text text-gray-700"
                        multiline
                      >
                        <li>{method}</li>
                      </EditableText>
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
              <EditableText
                onSave={(newText) => {
                  const newPhilosophy = { ...editableContent.philosophy, title: newText };
                  setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                }}
                className="text-3xl academic-heading mb-4"
              >
                <h2 className="text-3xl academic-heading mb-4">{editableContent.philosophy.title}</h2>
              </EditableText>
            </div>

            {/* Specializations */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Areas of Specialization</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {editableContent.philosophy.specializations.map((spec, index) => (
                  <div key={index} className="bg-academic-brown/5 rounded-lg p-4 text-center">
                    <EditableText
                      onSave={(newText) => {
                        const newPhilosophy = { ...editableContent.philosophy };
                        const newSpecializations = [...newPhilosophy.specializations];
                        newSpecializations[index] = newText;
                        newPhilosophy.specializations = newSpecializations;
                        setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                      }}
                      className="academic-text font-medium text-academic-brown"
                    >
                      <p className="academic-text font-medium text-academic-brown">{spec}</p>
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>

            {/* Theoretical Contributions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl academic-heading mb-6">Theoretical Contributions</h3>
              <div className="space-y-6">
                {editableContent.philosophy.theoreticalContributions.map((contrib, index) => (
                  <div key={index} className="border-l-4 border-academic-brown pl-6">
                    <EditableText
                      onSave={(newText) => {
                        const newPhilosophy = { ...editableContent.philosophy };
                        const newContributions = [...newPhilosophy.theoreticalContributions];
                        newContributions[index] = { ...newContributions[index], area: newText };
                        newPhilosophy.theoreticalContributions = newContributions;
                        setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                      }}
                      className="text-xl academic-heading mb-2"
                    >
                      <h4 className="text-xl academic-heading mb-2">{contrib.area}</h4>
                    </EditableText>
                    <EditableText
                      onSave={(newText) => {
                        const newPhilosophy = { ...editableContent.philosophy };
                        const newContributions = [...newPhilosophy.theoreticalContributions];
                        newContributions[index] = { ...newContributions[index], description: newText };
                        newPhilosophy.theoreticalContributions = newContributions;
                        setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                      }}
                      className="academic-text text-gray-700 mb-3"
                      multiline
                    >
                      <p className="academic-text text-gray-700 mb-3">{contrib.description}</p>
                    </EditableText>
                    <div>
                      <h5 className="academic-heading mb-2 text-sm">Applications:</h5>
                      <div className="flex flex-wrap gap-2">
                        {contrib.applications.map((app, appIndex) => (
                          <EditableText
                            key={appIndex}
                            onSave={(newText) => {
                              const newPhilosophy = { ...editableContent.philosophy };
                              const newContributions = [...newPhilosophy.theoreticalContributions];
                              const newApplications = [...newContributions[index].applications];
                              newApplications[appIndex] = newText;
                              newContributions[index] = { ...newContributions[index], applications: newApplications };
                              newPhilosophy.theoreticalContributions = newContributions;
                              setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                            }}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs academic-text"
                          >
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs academic-text">
                              {app}
                            </span>
                          </EditableText>
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
                {editableContent.philosophy.keyInfluences.map((influence, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <EditableText
                      onSave={(newText) => {
                        const newPhilosophy = { ...editableContent.philosophy };
                        const newInfluences = [...newPhilosophy.keyInfluences];
                        newInfluences[index] = { ...newInfluences[index], philosopher: newText };
                        newPhilosophy.keyInfluences = newInfluences;
                        setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                      }}
                      className="academic-heading text-lg mb-2"
                    >
                      <h4 className="academic-heading text-lg mb-2">{influence.philosopher}</h4>
                    </EditableText>
                    <p className="academic-text text-gray-700 text-sm mb-2">
                      <strong>Contribution:</strong>
                      <EditableText
                        onSave={(newText) => {
                          const newPhilosophy = { ...editableContent.philosophy };
                          const newInfluences = [...newPhilosophy.keyInfluences];
                          newInfluences[index] = { ...newInfluences[index], contribution: newText };
                          newPhilosophy.keyInfluences = newInfluences;
                          setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                        }}
                        className="ml-1 inline"
                        multiline
                      >
                        <span className="ml-1">{influence.contribution}</span>
                      </EditableText>
                    </p>
                    <p className="academic-text text-gray-600 text-sm">
                      <strong>Application:</strong>
                      <EditableText
                        onSave={(newText) => {
                          const newPhilosophy = { ...editableContent.philosophy };
                          const newInfluences = [...newPhilosophy.keyInfluences];
                          newInfluences[index] = { ...newInfluences[index], application: newText };
                          newPhilosophy.keyInfluences = newInfluences;
                          setEditableContent(prev => ({ ...prev, philosophy: newPhilosophy }));
                        }}
                        className="ml-1 inline"
                        multiline
                      >
                        <span className="ml-1">{influence.application}</span>
                      </EditableText>
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
              {editableContent.ongoingResearch.map((research, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <EditableText
                      onSave={(newText) => {
                        const newOngoing = [...editableContent.ongoingResearch];
                        newOngoing[index] = { ...newOngoing[index], title: newText };
                        setEditableContent(prev => ({ ...prev, ongoingResearch: newOngoing }));
                      }}
                      className="text-xl academic-heading"
                    >
                      <h3 className="text-xl academic-heading">{research.title}</h3>
                    </EditableText>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs academic-text font-medium">
                      {research.status}
                    </span>
                  </div>
                  <EditableText
                    onSave={(newText) => {
                      const newOngoing = [...editableContent.ongoingResearch];
                      newOngoing[index] = { ...newOngoing[index], period: newText };
                      setEditableContent(prev => ({ ...prev, ongoingResearch: newOngoing }));
                    }}
                    className="academic-text text-gray-600 mb-2"
                  >
                    <p className="academic-text text-gray-600 mb-2">{research.period}</p>
                  </EditableText>
                  <EditableText
                    onSave={(newText) => {
                      const newOngoing = [...editableContent.ongoingResearch];
                      newOngoing[index] = { ...newOngoing[index], description: newText };
                      setEditableContent(prev => ({ ...prev, ongoingResearch: newOngoing }));
                    }}
                    className="academic-text text-gray-700 mb-4"
                    multiline
                  >
                    <p className="academic-text text-gray-700 mb-4">{research.description}</p>
                  </EditableText>

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
        <EditableText
          onSave={(newText) => handleContentSave('researchPhilosophyTitle', newText)}
          className="text-2xl academic-heading mb-4"
        >
          <h2 className="text-2xl academic-heading mb-4">{editableContent.researchPhilosophyTitle}</h2>
        </EditableText>
        <EditableText
          onSave={(newText) => handleContentSave('researchPhilosophyDesc', newText)}
          className="academic-text text-gray-700 leading-relaxed max-w-4xl mx-auto"
          multiline
        >
          <p className="academic-text text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {editableContent.researchPhilosophyDesc}
          </p>
        </EditableText>
      </div>
    </div>
  );
}