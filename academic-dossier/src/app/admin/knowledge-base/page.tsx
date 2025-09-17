'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PersonalInfo {
  name: string;
  dateOfBirth: string;
  gender: string;
  title: string;
  identity: string;
  currentStatus: string;
  email: string;
  phone: string;
  location: string;
  background: string;
  languageProfile: string;
  currentVision: string;
  [key: string]: any; // Allow dynamic sections
}

interface Education {
  masterThesis: {
    title: string;
    university: string;
    program: string;
    grade: string;
    year: string;
    supervisor: string;
  };
  archaeology: {
    degree: string;
    university: string;
    specialization: string;
  };
  philosophy: {
    degree: string;
    university: string;
    focus: string;
  };
  [key: string]: any; // Allow dynamic sections
}

interface Research {
  masterThesisCore: {
    centralConcept: string;
    mainTheme: string;
    coreQuestion: string;
    aestheticLanguageDefinition: string;
  };
  coreQuestions: string[];
  currentInvestigations: string[];
}

interface CreativeWork {
  shadowsOfGotham: {
    title: string;
    type: string;
    description: string;
    keyThemes: string[];
  };
  bezothera: {
    title: string;
    type: string;
    description: string;
    keyThemes: string[];
  };
  thievesOfTime: {
    title: string;
    type: string;
    description: string;
    keyThemes: string[];
  };
  poetry: {
    scope: string;
    themes: string;
    languages: string;
  };
}

interface Projects {
  shadowline: {
    title: string;
    type: string;
    description: string;
    technologies: string[];
    features: string[];
  };
  yexen: {
    title: string;
    type: string;
    description: string;
    philosophy: string;
  };
}

interface TechnicalExpertise {
  programming: {
    languages: string[];
    frameworks: string[];
    databases: string[];
  };
  digitalHumanities: {
    specialties: string[];
  };
  aiCollaboration: {
    platforms: string;
    philosophy: string;
  };
}

interface KnowledgeBase {
  personal: PersonalInfo;
  education: Education;
  research: Research;
  creativeWork: CreativeWork;
  projects: Projects;
  technicalExpertise: TechnicalExpertise;
}

export default function KnowledgeBaseEditor() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null);
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [showAddSection, setShowAddSection] = useState<{[key: string]: boolean}>({});
  const [newSectionName, setNewSectionName] = useState<string>('');

  // Load the current knowledge base
  useEffect(() => {
    fetchKnowledgeBase();
  }, []);

  const fetchKnowledgeBase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/knowledge-base');
      if (response.ok) {
        const data = await response.json();
        setKnowledgeBase(data);
      }
    } catch (error) {
      console.error('Failed to fetch knowledge base:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveKnowledgeBase = async () => {
    if (!knowledgeBase) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/admin/knowledge-base', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(knowledgeBase),
      });

      if (response.ok) {
        setSaveMessage('✅ Knowledge base saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('❌ Failed to save knowledge base');
      }
    } catch (error) {
      console.error('Failed to save knowledge base:', error);
      setSaveMessage('❌ Error saving knowledge base');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    if (!knowledgeBase) return;
    setKnowledgeBase({
      ...knowledgeBase,
      personal: {
        ...knowledgeBase.personal,
        [field]: value
      }
    });
  };

  const updateEducation = (section: keyof Education, field: string, value: string) => {
    if (!knowledgeBase) return;
    setKnowledgeBase({
      ...knowledgeBase,
      education: {
        ...knowledgeBase.education,
        [section]: {
          ...knowledgeBase.education[section],
          [field]: value
        }
      }
    });
  };

  const updateResearch = (field: string, value: string | string[]) => {
    if (!knowledgeBase) return;
    if (field === 'coreQuestions' || field === 'currentInvestigations') {
      const arrayValue = typeof value === 'string' ? value.split('\n').filter(item => item.trim()) : value;
      setKnowledgeBase({
        ...knowledgeBase,
        research: {
          ...knowledgeBase.research,
          [field]: arrayValue
        }
      });
    } else if (field.includes('.')) {
      const [section, subField] = field.split('.');
      setKnowledgeBase({
        ...knowledgeBase,
        research: {
          ...knowledgeBase.research,
          [section]: {
            ...knowledgeBase.research[section as keyof Research],
            [subField]: value
          }
        }
      });
    }
  };

  const updateCreativeWork = (section: string, field: string, value: string | string[]) => {
    if (!knowledgeBase) return;
    if (field === 'keyThemes') {
      const arrayValue = typeof value === 'string' ? value.split('\n').filter(item => item.trim()) : value;
      setKnowledgeBase({
        ...knowledgeBase,
        creativeWork: {
          ...knowledgeBase.creativeWork,
          [section]: {
            ...knowledgeBase.creativeWork[section as keyof CreativeWork],
            [field]: arrayValue
          }
        }
      });
    } else {
      setKnowledgeBase({
        ...knowledgeBase,
        creativeWork: {
          ...knowledgeBase.creativeWork,
          [section]: {
            ...knowledgeBase.creativeWork[section as keyof CreativeWork],
            [field]: value
          }
        }
      });
    }
  };

  const updateProjects = (section: string, field: string, value: string | string[]) => {
    if (!knowledgeBase) return;
    if (field === 'technologies' || field === 'features') {
      const arrayValue = typeof value === 'string' ? value.split('\n').filter(item => item.trim()) : value;
      setKnowledgeBase({
        ...knowledgeBase,
        projects: {
          ...knowledgeBase.projects,
          [section]: {
            ...knowledgeBase.projects[section as keyof Projects],
            [field]: arrayValue
          }
        }
      });
    } else {
      setKnowledgeBase({
        ...knowledgeBase,
        projects: {
          ...knowledgeBase.projects,
          [section]: {
            ...knowledgeBase.projects[section as keyof Projects],
            [field]: value
          }
        }
      });
    }
  };

  const updateTechnicalExpertise = (section: string, field: string, value: string | string[]) => {
    if (!knowledgeBase) return;
    if (field === 'languages' || field === 'frameworks' || field === 'databases' || field === 'specialties') {
      const arrayValue = typeof value === 'string' ? value.split('\n').filter(item => item.trim()) : value;
      setKnowledgeBase({
        ...knowledgeBase,
        technicalExpertise: {
          ...knowledgeBase.technicalExpertise,
          [section]: {
            ...knowledgeBase.technicalExpertise[section as keyof TechnicalExpertise],
            [field]: arrayValue
          }
        }
      });
    } else {
      setKnowledgeBase({
        ...knowledgeBase,
        technicalExpertise: {
          ...knowledgeBase.technicalExpertise,
          [section]: {
            ...knowledgeBase.technicalExpertise[section as keyof TechnicalExpertise],
            [field]: value
          }
        }
      });
    }
  };

  const addNewSection = (tabType: string, sectionName: string) => {
    if (!knowledgeBase || !sectionName.trim()) return;

    const sanitizedName = sectionName.toLowerCase().replace(/[^a-z0-9]/g, '');

    switch (tabType) {
      case 'personal':
        setKnowledgeBase({
          ...knowledgeBase,
          personal: {
            ...knowledgeBase.personal,
            [sanitizedName]: {
              title: sectionName,
              description: '',
              details: ''
            }
          }
        });
        break;
      case 'education':
        setKnowledgeBase({
          ...knowledgeBase,
          education: {
            ...knowledgeBase.education,
            [sanitizedName]: {
              title: sectionName,
              institution: '',
              year: '',
              description: '',
              achievements: []
            }
          }
        });
        break;
      case 'research':
        setKnowledgeBase({
          ...knowledgeBase,
          research: {
            ...knowledgeBase.research,
            [sanitizedName]: {
              title: sectionName,
              description: '',
              keyPoints: []
            }
          }
        });
        break;
      case 'creative':
        setKnowledgeBase({
          ...knowledgeBase,
          creativeWork: {
            ...knowledgeBase.creativeWork,
            [sanitizedName]: {
              title: sectionName,
              type: '',
              description: '',
              keyThemes: []
            }
          }
        });
        break;
      case 'projects':
        setKnowledgeBase({
          ...knowledgeBase,
          projects: {
            ...knowledgeBase.projects,
            [sanitizedName]: {
              title: sectionName,
              type: '',
              description: '',
              technologies: [],
              features: []
            }
          }
        });
        break;
      case 'technical':
        setKnowledgeBase({
          ...knowledgeBase,
          technicalExpertise: {
            ...knowledgeBase.technicalExpertise,
            [sanitizedName]: {
              specialties: [],
              tools: [],
              experience: ''
            }
          }
        });
        break;
    }

    setShowAddSection({...showAddSection, [tabType]: false});
    setNewSectionName('');
  };

  const removeSection = (tabType: string, sectionKey: string) => {
    if (!knowledgeBase) return;

    switch (tabType) {
      case 'personal':
        const newPersonal = {...knowledgeBase.personal};
        delete newPersonal[sectionKey];
        setKnowledgeBase({...knowledgeBase, personal: newPersonal});
        break;
      case 'education':
        const newEducation = {...knowledgeBase.education};
        delete newEducation[sectionKey];
        setKnowledgeBase({...knowledgeBase, education: newEducation});
        break;
      case 'research':
        const newResearch = {...knowledgeBase.research};
        delete newResearch[sectionKey as keyof Research];
        setKnowledgeBase({...knowledgeBase, research: newResearch});
        break;
      case 'creative':
        const newCreativeWork = {...knowledgeBase.creativeWork};
        delete newCreativeWork[sectionKey as keyof CreativeWork];
        setKnowledgeBase({...knowledgeBase, creativeWork: newCreativeWork});
        break;
      case 'projects':
        const newProjects = {...knowledgeBase.projects};
        delete newProjects[sectionKey as keyof Projects];
        setKnowledgeBase({...knowledgeBase, projects: newProjects});
        break;
      case 'technical':
        const newTechnicalExpertise = {...knowledgeBase.technicalExpertise};
        delete newTechnicalExpertise[sectionKey as keyof TechnicalExpertise];
        setKnowledgeBase({...knowledgeBase, technicalExpertise: newTechnicalExpertise});
        break;
    }
  };

  const renderDynamicSection = (tabType: string, sectionKey: string, sectionData: any) => {
    const isBuiltIn = ['name', 'dateOfBirth', 'gender', 'title', 'identity', 'currentStatus', 'email', 'phone', 'location', 'background', 'languageProfile', 'currentVision', 'masterThesis', 'archaeology', 'philosophy', 'masterThesisCore', 'coreQuestions', 'currentInvestigations', 'shadowsOfGotham', 'bezothera', 'thievesOfTime', 'poetry', 'shadowline', 'yexen', 'programming', 'digitalHumanities', 'aiCollaboration'].includes(sectionKey);

    return (
      <div key={sectionKey} className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 capitalize">
            {sectionData.title || sectionKey.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          {!isBuiltIn && (
            <button
              onClick={() => removeSection(tabType, sectionKey)}
              className="text-red-600 hover:text-red-800 text-sm"
              title="Remove section"
            >
              ✕ Remove
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectionData.title !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={sectionData.title || ''}
                onChange={(e) => {
                  if (!knowledgeBase) return;
                  if (tabType === 'personal') {
                    setKnowledgeBase({
                      ...knowledgeBase,
                      personal: {
                        ...knowledgeBase.personal,
                        [sectionKey]: {
                          ...knowledgeBase.personal[sectionKey],
                          title: e.target.value
                        }
                      }
                    });
                  } else if (tabType === 'education') updateEducation(sectionKey, 'title', e.target.value);
                  else if (tabType === 'creative') updateCreativeWork(sectionKey, 'title', e.target.value);
                  else if (tabType === 'projects') updateProjects(sectionKey, 'title', e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.type !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <input
                type="text"
                value={sectionData.type || ''}
                onChange={(e) => {
                  if (tabType === 'creative') updateCreativeWork(sectionKey, 'type', e.target.value);
                  else if (tabType === 'projects') updateProjects(sectionKey, 'type', e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.institution !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
              <input
                type="text"
                value={sectionData.institution || ''}
                onChange={(e) => updateEducation(sectionKey, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.year !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="text"
                value={sectionData.year || ''}
                onChange={(e) => updateEducation(sectionKey, 'year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.description !== undefined && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={sectionData.description || ''}
                onChange={(e) => {
                  if (!knowledgeBase) return;
                  if (tabType === 'personal') {
                    setKnowledgeBase({
                      ...knowledgeBase,
                      personal: {
                        ...knowledgeBase.personal,
                        [sectionKey]: {
                          ...knowledgeBase.personal[sectionKey],
                          description: e.target.value
                        }
                      }
                    });
                  } else if (tabType === 'education') updateEducation(sectionKey, 'description', e.target.value);
                  else if (tabType === 'creative') updateCreativeWork(sectionKey, 'description', e.target.value);
                  else if (tabType === 'projects') updateProjects(sectionKey, 'description', e.target.value);
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.details !== undefined && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
              <textarea
                value={sectionData.details || ''}
                onChange={(e) => {
                  if (!knowledgeBase) return;
                  setKnowledgeBase({
                    ...knowledgeBase,
                    personal: {
                      ...knowledgeBase.personal,
                      [sectionKey]: {
                        ...knowledgeBase.personal[sectionKey],
                        details: e.target.value
                      }
                    }
                  });
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.achievements !== undefined && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements (one per line)</label>
              <textarea
                value={sectionData.achievements?.join('\n') || ''}
                onChange={(e) => {
                  if (!knowledgeBase) return;
                  const achievements = e.target.value.split('\n').filter(item => item.trim());
                  setKnowledgeBase({
                    ...knowledgeBase,
                    education: {
                      ...knowledgeBase.education,
                      [sectionKey]: {
                        ...knowledgeBase.education[sectionKey],
                        achievements: achievements
                      }
                    }
                  });
                }}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.keyThemes !== undefined && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Themes (one per line)</label>
              <textarea
                value={sectionData.keyThemes?.join('\n') || ''}
                onChange={(e) => updateCreativeWork(sectionKey, 'keyThemes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.technologies !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (one per line)</label>
              <textarea
                value={sectionData.technologies?.join('\n') || ''}
                onChange={(e) => updateProjects(sectionKey, 'technologies', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}

          {sectionData.features !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
              <textarea
                value={sectionData.features?.join('\n') || ''}
                onChange={(e) => updateProjects(sectionKey, 'features', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading knowledge base...</p>
        </div>
      </div>
    );
  }

  if (!knowledgeBase) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load knowledge base</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'research', label: 'Research', icon: '🔬' },
    { id: 'creative', label: 'Creative Work', icon: '🎨' },
    { id: 'projects', label: 'Projects', icon: '💻' },
    { id: 'technical', label: 'Technical Skills', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/admin" className="text-amber-600 hover:text-amber-700 mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Knowledge Base Editor</h1>
            </div>
            <div className="flex items-center space-x-3">
              {saveMessage && (
                <span className="text-sm font-medium">{saveMessage}</span>
              )}
              <button
                onClick={saveKnowledgeBase}
                disabled={isSaving}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {activeTab === 'personal' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setShowAddSection({...showAddSection, personal: !showAddSection.personal})}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm"
                >
                  + Add New Personal Section
                </button>
              </div>

              {/* Add New Section Form */}
              {showAddSection.personal && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Personal Section</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="Enter section name (e.g., 'Hobbies & Interests')"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button
                      onClick={() => addNewSection('personal', newSectionName)}
                      disabled={!newSectionName.trim()}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSection({...showAddSection, personal: false});
                        setNewSectionName('');
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={knowledgeBase.personal.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="text"
                    value={knowledgeBase.personal.dateOfBirth}
                    onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                  <input
                    type="text"
                    value={knowledgeBase.personal.title}
                    onChange={(e) => updatePersonalInfo('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={knowledgeBase.personal.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={knowledgeBase.personal.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={knowledgeBase.personal.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Identity</label>
                  <textarea
                    value={knowledgeBase.personal.identity}
                    onChange={(e) => updatePersonalInfo('identity', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                  <textarea
                    value={knowledgeBase.personal.background}
                    onChange={(e) => updatePersonalInfo('background', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Vision</label>
                  <textarea
                    value={knowledgeBase.personal.currentVision}
                    onChange={(e) => updatePersonalInfo('currentVision', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Dynamic Sections */}
              {knowledgeBase.personal && Object.entries(knowledgeBase.personal).map(([key, section]) => {
                if (!['name', 'dateOfBirth', 'gender', 'title', 'identity', 'currentStatus', 'email', 'phone', 'location', 'background', 'languageProfile', 'currentVision'].includes(key)) {
                  return renderDynamicSection('personal', key, section);
                }
                return null;
              })}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                <button
                  onClick={() => setShowAddSection({...showAddSection, education: !showAddSection.education})}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm"
                >
                  + Add New Education Section
                </button>
              </div>

              {/* Add New Section Form */}
              {showAddSection.education && (
                <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Education Section</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="Enter section name (e.g., 'Continuing Education')"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    <button
                      onClick={() => addNewSection('education', newSectionName)}
                      disabled={!newSectionName.trim()}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSection({...showAddSection, education: false});
                        setNewSectionName('');
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Master's Thesis */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Master's Thesis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thesis Title</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.masterThesis.title}
                      onChange={(e) => updateEducation('masterThesis', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.masterThesis.university}
                      onChange={(e) => updateEducation('masterThesis', 'university', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.masterThesis.program}
                      onChange={(e) => updateEducation('masterThesis', 'program', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.masterThesis.grade}
                      onChange={(e) => updateEducation('masterThesis', 'grade', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.masterThesis.year}
                      onChange={(e) => updateEducation('masterThesis', 'year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.masterThesis.supervisor}
                      onChange={(e) => updateEducation('masterThesis', 'supervisor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Philosophy Education */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Philosophy Studies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.philosophy.degree}
                      onChange={(e) => updateEducation('philosophy', 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.philosophy.university}
                      onChange={(e) => updateEducation('philosophy', 'university', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
                    <textarea
                      value={knowledgeBase.education.philosophy.focus}
                      onChange={(e) => updateEducation('philosophy', 'focus', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Archaeology Education */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Archaeology Studies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.archaeology.degree}
                      onChange={(e) => updateEducation('archaeology', 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                    <input
                      type="text"
                      value={knowledgeBase.education.archaeology.university}
                      onChange={(e) => updateEducation('archaeology', 'university', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <textarea
                      value={knowledgeBase.education.archaeology.specialization}
                      onChange={(e) => updateEducation('archaeology', 'specialization', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Sections */}
              {knowledgeBase.education && Object.entries(knowledgeBase.education).map(([key, section]) => {
                if (!['masterThesis', 'archaeology', 'philosophy'].includes(key)) {
                  return renderDynamicSection('education', key, section);
                }
                return null;
              })}
            </div>
          )}

          {activeTab === 'research' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Research</h2>
                <button
                  onClick={() => setShowAddSection({...showAddSection, research: !showAddSection.research})}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  + Add New Research Section
                </button>
              </div>

              {/* Add New Section Form */}
              {showAddSection.research && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Research Section</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="Enter section name (e.g., 'AI Ethics Research')"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      onClick={() => addNewSection('research', newSectionName)}
                      disabled={!newSectionName.trim()}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSection({...showAddSection, research: false});
                        setNewSectionName('');
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Master's Thesis Core */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Master's Thesis Core Concepts</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Central Concept</label>
                    <textarea
                      value={knowledgeBase.research?.masterThesisCore?.centralConcept || ''}
                      onChange={(e) => updateResearch('masterThesisCore.centralConcept', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                      placeholder="The main concept of your thesis research..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Theme</label>
                    <textarea
                      value={knowledgeBase.research?.masterThesisCore?.mainTheme || ''}
                      onChange={(e) => updateResearch('masterThesisCore.mainTheme', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                      placeholder="The primary theme your research explores..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Core Question</label>
                    <input
                      type="text"
                      value={knowledgeBase.research?.masterThesisCore?.coreQuestion || ''}
                      onChange={(e) => updateResearch('masterThesisCore.coreQuestion', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                      placeholder="The fundamental question your research addresses..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aesthetic Language Definition</label>
                    <textarea
                      value={knowledgeBase.research?.masterThesisCore?.aestheticLanguageDefinition || ''}
                      onChange={(e) => updateResearch('masterThesisCore.aestheticLanguageDefinition', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                      placeholder="How you define aesthetic language in your work..."
                    />
                  </div>
                </div>
              </div>

              {/* Core Questions */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Core Research Questions</h3>
                <label className="block text-sm font-medium text-gray-700 mb-2">Research Questions (one per line)</label>
                <textarea
                  value={knowledgeBase.research?.coreQuestions?.join('\n') || ''}
                  onChange={(e) => updateResearch('coreQuestions', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="Enter each research question on a new line..."
                />
              </div>

              {/* Current Investigations */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Investigations</h3>
                <label className="block text-sm font-medium text-gray-700 mb-2">Active Research Areas (one per line)</label>
                <textarea
                  value={knowledgeBase.research?.currentInvestigations?.join('\n') || ''}
                  onChange={(e) => updateResearch('currentInvestigations', e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="Enter each current investigation on a new line..."
                />
              </div>

              {/* Dynamic Sections */}
              {knowledgeBase.research && Object.entries(knowledgeBase.research).map(([key, section]) => {
                if (!['masterThesisCore', 'coreQuestions', 'currentInvestigations'].includes(key)) {
                  return renderDynamicSection('research', key, section);
                }
                return null;
              })}
            </div>
          )}

          {activeTab === 'creative' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Creative Work</h2>
                <button
                  onClick={() => setShowAddSection({...showAddSection, creative: !showAddSection.creative})}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm"
                >
                  + Add New Creative Work
                </button>
              </div>

              {/* Add New Section Form */}
              {showAddSection.creative && (
                <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Creative Work</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="Enter work name (e.g., 'New Novel Series')"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                      onClick={() => addNewSection('creative', newSectionName)}
                      disabled={!newSectionName.trim()}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSection({...showAddSection, creative: false});
                        setNewSectionName('');
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Shadows of Gotham */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shadows of Gotham</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.shadowsOfGotham?.title || ''}
                      onChange={(e) => updateCreativeWork('shadowsOfGotham', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.shadowsOfGotham?.type || ''}
                      onChange={(e) => updateCreativeWork('shadowsOfGotham', 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={knowledgeBase.creativeWork?.shadowsOfGotham?.description || ''}
                      onChange={(e) => updateCreativeWork('shadowsOfGotham', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Themes (one per line)</label>
                    <textarea
                      value={knowledgeBase.creativeWork?.shadowsOfGotham?.keyThemes?.join('\n') || ''}
                      onChange={(e) => updateCreativeWork('shadowsOfGotham', 'keyThemes', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Bezothera */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Bezothera</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.bezothera?.title || ''}
                      onChange={(e) => updateCreativeWork('bezothera', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.bezothera?.type || ''}
                      onChange={(e) => updateCreativeWork('bezothera', 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={knowledgeBase.creativeWork?.bezothera?.description || ''}
                      onChange={(e) => updateCreativeWork('bezothera', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Themes (one per line)</label>
                    <textarea
                      value={knowledgeBase.creativeWork?.bezothera?.keyThemes?.join('\n') || ''}
                      onChange={(e) => updateCreativeWork('bezothera', 'keyThemes', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Thieves of Time */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thieves of Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.thievesOfTime?.title || ''}
                      onChange={(e) => updateCreativeWork('thievesOfTime', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.thievesOfTime?.type || ''}
                      onChange={(e) => updateCreativeWork('thievesOfTime', 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={knowledgeBase.creativeWork?.thievesOfTime?.description || ''}
                      onChange={(e) => updateCreativeWork('thievesOfTime', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Themes (one per line)</label>
                    <textarea
                      value={knowledgeBase.creativeWork?.thievesOfTime?.keyThemes?.join('\n') || ''}
                      onChange={(e) => updateCreativeWork('thievesOfTime', 'keyThemes', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Poetry */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Poetry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scope</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.poetry?.scope || ''}
                      onChange={(e) => updateCreativeWork('poetry', 'scope', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <input
                      type="text"
                      value={knowledgeBase.creativeWork?.poetry?.languages || ''}
                      onChange={(e) => updateCreativeWork('poetry', 'languages', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Themes</label>
                    <textarea
                      value={knowledgeBase.creativeWork?.poetry?.themes || ''}
                      onChange={(e) => updateCreativeWork('poetry', 'themes', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Sections */}
              {knowledgeBase.creativeWork && Object.entries(knowledgeBase.creativeWork).map(([key, section]) => {
                if (!['shadowsOfGotham', 'bezothera', 'thievesOfTime', 'poetry'].includes(key)) {
                  return renderDynamicSection('creative', key, section);
                }
                return null;
              })}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                <button
                  onClick={() => setShowAddSection({...showAddSection, projects: !showAddSection.projects})}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  + Add New Project
                </button>
              </div>

              {/* Add New Section Form */}
              {showAddSection.projects && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Project</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="Enter project name (e.g., 'Digital Portfolio Website')"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                      onClick={() => addNewSection('projects', newSectionName)}
                      disabled={!newSectionName.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSection({...showAddSection, projects: false});
                        setNewSectionName('');
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Shadowline */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shadowline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={knowledgeBase.projects?.shadowline?.title || ''}
                      onChange={(e) => updateProjects('shadowline', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={knowledgeBase.projects?.shadowline?.type || ''}
                      onChange={(e) => updateProjects('shadowline', 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={knowledgeBase.projects?.shadowline?.description || ''}
                      onChange={(e) => updateProjects('shadowline', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (one per line)</label>
                    <textarea
                      value={knowledgeBase.projects?.shadowline?.technologies?.join('\n') || ''}
                      onChange={(e) => updateProjects('shadowline', 'technologies', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                    <textarea
                      value={knowledgeBase.projects?.shadowline?.features?.join('\n') || ''}
                      onChange={(e) => updateProjects('shadowline', 'features', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Yexen */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Yexen Jewelry Brand</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={knowledgeBase.projects?.yexen?.title || ''}
                      onChange={(e) => updateProjects('yexen', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={knowledgeBase.projects?.yexen?.type || ''}
                      onChange={(e) => updateProjects('yexen', 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={knowledgeBase.projects?.yexen?.description || ''}
                      onChange={(e) => updateProjects('yexen', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Philosophy</label>
                    <textarea
                      value={knowledgeBase.projects?.yexen?.philosophy || ''}
                      onChange={(e) => updateProjects('yexen', 'philosophy', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Sections */}
              {knowledgeBase.projects && Object.entries(knowledgeBase.projects).map(([key, section]) => {
                if (!['shadowline', 'yexen'].includes(key)) {
                  return renderDynamicSection('projects', key, section);
                }
                return null;
              })}
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Technical Skills</h2>
                <button
                  onClick={() => setShowAddSection({...showAddSection, technical: !showAddSection.technical})}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors text-sm"
                >
                  + Add New Skill Area
                </button>
              </div>

              {/* Add New Section Form */}
              {showAddSection.technical && (
                <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Technical Skill Area</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      placeholder="Enter skill area (e.g., 'Machine Learning')"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                    <button
                      onClick={() => addNewSection('technical', newSectionName)}
                      disabled={!newSectionName.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSection({...showAddSection, technical: false});
                        setNewSectionName('');
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Programming */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Programming</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages (one per line)</label>
                    <textarea
                      value={knowledgeBase.technicalExpertise?.programming?.languages?.join('\n') || ''}
                      onChange={(e) => updateTechnicalExpertise('programming', 'languages', e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frameworks (one per line)</label>
                    <textarea
                      value={knowledgeBase.technicalExpertise?.programming?.frameworks?.join('\n') || ''}
                      onChange={(e) => updateTechnicalExpertise('programming', 'frameworks', e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Databases (one per line)</label>
                    <textarea
                      value={knowledgeBase.technicalExpertise?.programming?.databases?.join('\n') || ''}
                      onChange={(e) => updateTechnicalExpertise('programming', 'databases', e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Digital Humanities */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Digital Humanities</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialties (one per line)</label>
                  <textarea
                    value={knowledgeBase.technicalExpertise?.digitalHumanities?.specialties?.join('\n') || ''}
                    onChange={(e) => updateTechnicalExpertise('digitalHumanities', 'specialties', e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* AI Collaboration */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI Collaboration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
                    <input
                      type="text"
                      value={knowledgeBase.technicalExpertise?.aiCollaboration?.platforms || ''}
                      onChange={(e) => updateTechnicalExpertise('aiCollaboration', 'platforms', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Philosophy</label>
                    <textarea
                      value={knowledgeBase.technicalExpertise?.aiCollaboration?.philosophy || ''}
                      onChange={(e) => updateTechnicalExpertise('aiCollaboration', 'philosophy', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Sections */}
              {knowledgeBase.technicalExpertise && Object.entries(knowledgeBase.technicalExpertise).map(([key, section]) => {
                if (!['programming', 'digitalHumanities', 'aiCollaboration'].includes(key)) {
                  return renderDynamicSection('technical', key, section);
                }
                return null;
              })}
            </div>
          )}
        </div>

        {/* Auto-save notice */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Changes are stored locally as you type. Click "Save All Changes" to update the AI's knowledge permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}