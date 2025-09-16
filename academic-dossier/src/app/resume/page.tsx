'use client';

import { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { cvData } from '@/data/cv-data';
import EditableText from '@/components/EditableText';

export default function ResumePage() {
  const { currentLang } = useLanguage();
  const { isAdminMode, setEditing } = useAdmin();
  const [activeSection, setActiveSection] = useState<string>('education');

  // Load initial data from localStorage or use defaults
  const getInitialContent = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resume-editable-content');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Error parsing saved content:', error);
        }
      }
    }

    return {
      // Profile data
      profileName: cvData.profile.name,
      profileTitle: cvData.profile.title,
      profileEmail: cvData.profile.email,
      profilePhone: cvData.profile.phone,
      profileAddress: cvData.profile.address,
      profileBirthDate: cvData.profile.birthDate,
      profileBirthPlace: cvData.profile.birthPlace,

      // Section titles
      educationTitle: 'Education',
      experienceTitle: 'Work Experience',
      researchTitle: 'Research Projects',
      skillsTitle: 'Skills',
      workshopsTitle: 'Workshops & Training',
      awardsTitle: 'Awards',

      // Education data (we'll make this dynamic)
      education: cvData.education,

      // Work experience data
      workExperience: cvData.workExperience,

      // Research projects
      researchProjects: cvData.researchProjects,

      // Skills data
      languages: cvData.skills.languages,
      technical: cvData.skills.technical,
      qualities: cvData.skills.qualities,

      // Workshops
      workshops: cvData.workshops,

      // Awards
      awards: cvData.awards
    };
  };

  // Editable content state - comprehensive state for all CV data
  const [editableContent, setEditableContent] = useState(getInitialContent);

  const handleContentSave = (field: string, newText: string) => {
    const newContent = { ...editableContent, [field]: newText };
    setEditableContent(newContent);

    // Save to localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem('resume-editable-content', JSON.stringify(newContent));
    }

    console.log(`Saved ${field}:`, newText);
  };

  // Save to localStorage whenever editableContent changes (for complex updates)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resume-editable-content', JSON.stringify(editableContent));
    }
  }, [editableContent]);

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
          <EditableText
            onSave={(newText) => handleContentSave('profileName', newText)}
            className="text-3xl academic-heading mb-6 text-center"
          >
            <h2 className="text-3xl academic-heading mb-6 text-center">{editableContent.profileName}</h2>
          </EditableText>
          <div className="bg-gray-50 rounded-lg p-6">
            <EditableText
              onSave={(newText) => handleContentSave('profileTitle', newText)}
              className="academic-text text-lg text-gray-700 mb-6 text-center italic"
              multiline
            >
              <p className="academic-text text-lg text-gray-700 mb-6 text-center italic">
                {editableContent.profileTitle}
              </p>
            </EditableText>

            <div className="grid md:grid-cols-2 gap-4 academic-text text-gray-700">
              <div>
                <p><strong>Email:</strong>
                  <EditableText
                    onSave={(newText) => handleContentSave('profileEmail', newText)}
                    className="text-academic-brown hover:text-academic-brown-dark ml-1"
                  >
                    <a href={`mailto:${editableContent.profileEmail}`} className="text-academic-brown hover:text-academic-brown-dark ml-1">
                      {editableContent.profileEmail}
                    </a>
                  </EditableText>
                </p>
                <p><strong>Phone:</strong>
                  <EditableText
                    onSave={(newText) => handleContentSave('profilePhone', newText)}
                    className="text-academic-brown hover:text-academic-brown-dark ml-1"
                  >
                    <a href={`tel:${editableContent.profilePhone}`} className="text-academic-brown hover:text-academic-brown-dark ml-1">
                      {editableContent.profilePhone}
                    </a>
                  </EditableText>
                </p>
              </div>
              <div>
                <p><strong>Address:</strong>
                  <EditableText
                    onSave={(newText) => handleContentSave('profileAddress', newText)}
                    className="ml-1"
                  >
                    <span className="ml-1">{editableContent.profileAddress}</span>
                  </EditableText>
                </p>
                <p><strong>Born:</strong>
                  <EditableText
                    onSave={(newText) => handleContentSave('profileBirthDate', newText)}
                    className="ml-1 inline"
                  >
                    <span className="ml-1">{editableContent.profileBirthDate}</span>
                  </EditableText>,
                  <EditableText
                    onSave={(newText) => handleContentSave('profileBirthPlace', newText)}
                    className="ml-1 inline"
                  >
                    <span className="ml-1">{editableContent.profileBirthPlace}</span>
                  </EditableText>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Education */}
        <section id="education">
          <EditableText
            onSave={(newText) => handleContentSave('educationTitle', newText)}
            className="text-2xl academic-heading mb-6"
          >
            <h2 className="text-2xl academic-heading mb-6">{editableContent.educationTitle}</h2>
          </EditableText>
          <div className="space-y-6">
            {editableContent.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-academic-brown pl-6">
                <EditableText
                  onSave={(newText) => {
                    const newEducation = [...editableContent.education];
                    newEducation[index] = { ...newEducation[index], degree: newText };
                    setEditableContent(prev => ({ ...prev, education: newEducation }));
                  }}
                  className="text-xl academic-heading mb-2"
                >
                  <h3 className="text-xl academic-heading mb-2">{edu.degree}</h3>
                </EditableText>

                <EditableText
                  onSave={(newText) => {
                    const newEducation = [...editableContent.education];
                    newEducation[index] = { ...newEducation[index], institution: newText };
                    setEditableContent(prev => ({ ...prev, education: newEducation }));
                  }}
                  className="text-academic-brown font-medium academic-text mb-1"
                >
                  <p className="text-academic-brown font-medium academic-text mb-1">{edu.institution}</p>
                </EditableText>

                <EditableText
                  onSave={(newText) => {
                    const newEducation = [...editableContent.education];
                    newEducation[index] = { ...newEducation[index], period: newText };
                    setEditableContent(prev => ({ ...prev, education: newEducation }));
                  }}
                  className="text-gray-600 academic-text mb-2"
                >
                  <p className="text-gray-600 academic-text mb-2">{edu.period}</p>
                </EditableText>

                {edu.grade && (
                  <EditableText
                    onSave={(newText) => {
                      const newEducation = [...editableContent.education];
                      newEducation[index] = { ...newEducation[index], grade: newText };
                      setEditableContent(prev => ({ ...prev, education: newEducation }));
                    }}
                    className="text-gray-700 academic-text font-medium mb-2"
                  >
                    <p className="text-gray-700 academic-text font-medium mb-2">{edu.grade}</p>
                  </EditableText>
                )}

                {edu.thesis && (
                  <EditableText
                    onSave={(newText) => {
                      const newEducation = [...editableContent.education];
                      newEducation[index] = { ...newEducation[index], thesis: newText };
                      setEditableContent(prev => ({ ...prev, education: newEducation }));
                    }}
                    className="text-gray-700 academic-text italic mb-2"
                    multiline
                  >
                    <p className="text-gray-700 academic-text italic mb-2"><strong>Thesis:</strong> {edu.thesis}</p>
                  </EditableText>
                )}

                <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                  {edu.details.map((detail, detailIndex) => (
                    <EditableText
                      key={detailIndex}
                      onSave={(newText) => {
                        const newEducation = [...editableContent.education];
                        const newDetails = [...newEducation[index].details];
                        newDetails[detailIndex] = newText;
                        newEducation[index] = { ...newEducation[index], details: newDetails };
                        setEditableContent(prev => ({ ...prev, education: newEducation }));
                      }}
                      className="academic-text text-gray-700"
                      multiline
                    >
                      <li>{detail}</li>
                    </EditableText>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Work Experience */}
        <section id="experience">
          <EditableText
            onSave={(newText) => handleContentSave('experienceTitle', newText)}
            className="text-2xl academic-heading mb-6"
          >
            <h2 className="text-2xl academic-heading mb-6">{editableContent.experienceTitle}</h2>
          </EditableText>
          <div className="space-y-6">
            {editableContent.workExperience.map((work, index) => (
              <div key={index} className="border-l-4 border-academic-brown pl-6">
                <EditableText
                  onSave={(newText) => {
                    const newWork = [...editableContent.workExperience];
                    newWork[index] = { ...newWork[index], position: newText };
                    setEditableContent(prev => ({ ...prev, workExperience: newWork }));
                  }}
                  className="text-xl academic-heading mb-2"
                >
                  <h3 className="text-xl academic-heading mb-2">{work.position}</h3>
                </EditableText>

                <EditableText
                  onSave={(newText) => {
                    const newWork = [...editableContent.workExperience];
                    newWork[index] = { ...newWork[index], company: newText };
                    setEditableContent(prev => ({ ...prev, workExperience: newWork }));
                  }}
                  className="text-academic-brown font-medium academic-text mb-1"
                >
                  <p className="text-academic-brown font-medium academic-text mb-1">{work.company}</p>
                </EditableText>

                <EditableText
                  onSave={(newText) => {
                    const newWork = [...editableContent.workExperience];
                    newWork[index] = { ...newWork[index], period: newText };
                    setEditableContent(prev => ({ ...prev, workExperience: newWork }));
                  }}
                  className="text-gray-600 academic-text mb-2"
                >
                  <p className="text-gray-600 academic-text mb-2">{work.period}</p>
                </EditableText>

                <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                  {work.responsibilities.map((resp, respIndex) => (
                    <EditableText
                      key={respIndex}
                      onSave={(newText) => {
                        const newWork = [...editableContent.workExperience];
                        const newResponsibilities = [...newWork[index].responsibilities];
                        newResponsibilities[respIndex] = newText;
                        newWork[index] = { ...newWork[index], responsibilities: newResponsibilities };
                        setEditableContent(prev => ({ ...prev, workExperience: newWork }));
                      }}
                      className="academic-text text-gray-700"
                      multiline
                    >
                      <li>{resp}</li>
                    </EditableText>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Research Projects */}
        <section id="research">
          <EditableText
            onSave={(newText) => handleContentSave('researchTitle', newText)}
            className="text-2xl academic-heading mb-6"
          >
            <h2 className="text-2xl academic-heading mb-6">{editableContent.researchTitle}</h2>
          </EditableText>
          <div className="space-y-6">
            {editableContent.researchProjects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <EditableText
                  onSave={(newText) => {
                    const newProjects = [...editableContent.researchProjects];
                    newProjects[index] = { ...newProjects[index], title: newText };
                    setEditableContent(prev => ({ ...prev, researchProjects: newProjects }));
                  }}
                  className="text-xl academic-heading mb-2"
                >
                  <h3 className="text-xl academic-heading mb-2">{project.title}</h3>
                </EditableText>
                <div className="flex gap-4 mb-3 academic-text text-gray-600">
                  <EditableText
                    onSave={(newText) => {
                      const newProjects = [...editableContent.researchProjects];
                      newProjects[index] = { ...newProjects[index], period: newText };
                      setEditableContent(prev => ({ ...prev, researchProjects: newProjects }));
                    }}
                    className="academic-text text-gray-600"
                  >
                    <span>{project.period}</span>
                  </EditableText>
                  <span className="text-academic-brown">•</span>
                  <EditableText
                    onSave={(newText) => {
                      const newProjects = [...editableContent.researchProjects];
                      newProjects[index] = { ...newProjects[index], type: newText };
                      setEditableContent(prev => ({ ...prev, researchProjects: newProjects }));
                    }}
                    className="academic-text text-gray-600"
                  >
                    <span>{project.type}</span>
                  </EditableText>
                </div>
                <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                  {project.description.map((desc, descIndex) => (
                    <EditableText
                      key={descIndex}
                      onSave={(newText) => {
                        const newProjects = [...editableContent.researchProjects];
                        const newDescription = [...newProjects[index].description];
                        newDescription[descIndex] = newText;
                        newProjects[index] = { ...newProjects[index], description: newDescription };
                        setEditableContent(prev => ({ ...prev, researchProjects: newProjects }));
                      }}
                      className="academic-text text-gray-700"
                      multiline
                    >
                      <li>{desc}</li>
                    </EditableText>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Skills */}
        <section id="skills">
          <EditableText
            onSave={(newText) => handleContentSave('skillsTitle', newText)}
            className="text-2xl academic-heading mb-6"
          >
            <h2 className="text-2xl academic-heading mb-6">{editableContent.skillsTitle}</h2>
          </EditableText>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Languages */}
            <div>
              <h3 className="text-lg academic-heading mb-4">{getTranslation(currentLang, 'resume.languages')}</h3>
              <div className="space-y-2">
                {editableContent.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between academic-text">
                    <EditableText
                      onSave={(newText) => {
                        const newLanguages = [...editableContent.languages];
                        newLanguages[index] = { ...newLanguages[index], name: newText };
                        setEditableContent(prev => ({ ...prev, languages: newLanguages }));
                      }}
                      className="font-medium"
                    >
                      <span className="font-medium">{lang.name}</span>
                    </EditableText>
                    <EditableText
                      onSave={(newText) => {
                        const newLanguages = [...editableContent.languages];
                        newLanguages[index] = { ...newLanguages[index], level: newText };
                        setEditableContent(prev => ({ ...prev, languages: newLanguages }));
                      }}
                      className="text-gray-600"
                    >
                      <span className="text-gray-600">{lang.level}</span>
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-lg academic-heading mb-4">{getTranslation(currentLang, 'resume.technical')}</h3>
              <ul className="list-disc list-inside space-y-1 academic-text text-gray-700">
                {editableContent.technical.map((skill, index) => (
                  <EditableText
                    key={index}
                    onSave={(newText) => {
                      const newTechnical = [...editableContent.technical];
                      newTechnical[index] = newText;
                      setEditableContent(prev => ({ ...prev, technical: newTechnical }));
                    }}
                    className="academic-text text-gray-700"
                  >
                    <li>{skill}</li>
                  </EditableText>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Qualities */}
          <div className="mt-8">
            <h3 className="text-lg academic-heading mb-4">{getTranslation(currentLang, 'resume.qualities')}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {editableContent.qualities.map((quality, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <EditableText
                    onSave={(newText) => {
                      const newQualities = [...editableContent.qualities];
                      newQualities[index] = newText;
                      setEditableContent(prev => ({ ...prev, qualities: newQualities }));
                    }}
                    className="academic-text text-gray-700 text-sm"
                    multiline
                  >
                    <p className="academic-text text-gray-700 text-sm">{quality}</p>
                  </EditableText>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Workshops & Training */}
        <section id="workshops">
          <EditableText
            onSave={(newText) => handleContentSave('workshopsTitle', newText)}
            className="text-2xl academic-heading mb-6"
          >
            <h2 className="text-2xl academic-heading mb-6">{editableContent.workshopsTitle}</h2>
          </EditableText>
          <div className="grid md:grid-cols-2 gap-4">
            {editableContent.workshops.map((workshop, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <EditableText
                  onSave={(newText) => {
                    const newWorkshops = [...editableContent.workshops];
                    newWorkshops[index] = { ...newWorkshops[index], name: newText };
                    setEditableContent(prev => ({ ...prev, workshops: newWorkshops }));
                  }}
                  className="academic-heading text-lg mb-1"
                >
                  <h3 className="academic-heading text-lg mb-1">{workshop.name}</h3>
                </EditableText>
                <EditableText
                  onSave={(newText) => {
                    const newWorkshops = [...editableContent.workshops];
                    newWorkshops[index] = { ...newWorkshops[index], instructor: newText };
                    setEditableContent(prev => ({ ...prev, workshops: newWorkshops }));
                  }}
                  className="academic-text text-gray-700 text-sm mb-1"
                >
                  <p className="academic-text text-gray-700 text-sm mb-1">{workshop.instructor}</p>
                </EditableText>
                <EditableText
                  onSave={(newText) => {
                    const newWorkshops = [...editableContent.workshops];
                    newWorkshops[index] = { ...newWorkshops[index], year: newText };
                    setEditableContent(prev => ({ ...prev, workshops: newWorkshops }));
                  }}
                  className="academic-text text-academic-brown text-sm font-medium"
                >
                  <p className="academic-text text-academic-brown text-sm font-medium">{workshop.year}</p>
                </EditableText>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Awards */}
        <section id="awards">
          <EditableText
            onSave={(newText) => handleContentSave('awardsTitle', newText)}
            className="text-2xl academic-heading mb-6"
          >
            <h2 className="text-2xl academic-heading mb-6">{editableContent.awardsTitle}</h2>
          </EditableText>
          <ul className="space-y-3">
            {editableContent.awards.map((award, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-academic-brown rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <EditableText
                  onSave={(newText) => {
                    const newAwards = [...editableContent.awards];
                    newAwards[index] = newText;
                    setEditableContent(prev => ({ ...prev, awards: newAwards }));
                  }}
                  className="academic-text text-gray-700"
                  multiline
                >
                  <p className="academic-text text-gray-700">{award}</p>
                </EditableText>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}