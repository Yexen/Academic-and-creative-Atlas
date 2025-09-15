'use client';

import { useState, useEffect } from 'react';
import { Language, getTranslation } from '@/lib/i18n';

interface Document {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  filename: string;
  size: string;
  date: string;
  language: string;
}

const documents: Document[] = [
  // Academic Credentials
  {
    id: 'diploma-m1',
    title: 'Master 1 Philosophy Diploma',
    category: 'Academic Credentials',
    type: 'Diploma',
    description: 'Official diploma from Université Paris 8 - Philosophy: Analysis and Criticism of Art and Culture',
    filename: 'diplome-m1-philosophie.pdf',
    size: '2.3 MB',
    date: '2024',
    language: 'French'
  },
  {
    id: 'transcript-m1',
    title: 'Master 1 Philosophy Transcript',
    category: 'Academic Credentials',
    type: 'Transcript',
    description: 'Official transcript showing grades and course details (Average: 15.2)',
    filename: 'releve-notes-m1.pdf',
    size: '1.8 MB',
    date: '2024',
    language: 'French'
  },
  {
    id: 'thesis-certificate',
    title: 'Thesis Grade Certificate',
    category: 'Academic Credentials',
    type: 'Certificate',
    description: 'Official certificate for Master\'s thesis grade (18/20)',
    filename: 'thesis-grade-certificate.pdf',
    size: '1.2 MB',
    date: '2024',
    language: 'French'
  },
  {
    id: 'bachelor-archaeology',
    title: 'Bachelor\'s Degree in Archaeology',
    category: 'Academic Credentials',
    type: 'Diploma',
    description: 'Bachelor\'s degree from University of Tehran (Average: 15.04)',
    filename: 'bachelor-archaeology-diploma.pdf',
    size: '2.1 MB',
    date: '2017',
    language: 'Persian/English'
  },
  {
    id: 'ma-archaeology',
    title: 'M.A. Archaeology Transcript',
    category: 'Academic Credentials',
    type: 'Transcript',
    description: 'Advanced Archaeological Studies transcript (Average: 16.6)',
    filename: 'ma-archaeology-transcript.pdf',
    size: '1.9 MB',
    date: '2020',
    language: 'Persian/English'
  },

  // Research Papers
  {
    id: 'thesis-full',
    title: 'Aesthetic Language: The Interplay Between Language, Art, and the Sensible',
    category: 'Research Papers',
    type: 'Thesis',
    description: 'Complete Master\'s thesis (18/20) - 120 pages of original philosophical research',
    filename: 'memoire-aesthetic-language.pdf',
    size: '4.2 MB',
    date: '2024',
    language: 'French'
  },
  {
    id: 'ai-protocols',
    title: 'Aesthetic Engagement Protocols for Enhanced AI Interaction',
    category: 'Research Papers',
    type: 'Research Paper',
    description: 'Independent research on AI interaction frameworks with empirical testing results',
    filename: 'ai-aesthetic-protocols.pdf',
    size: '3.1 MB',
    date: '2025',
    language: 'English'
  },
  {
    id: 'internship-report',
    title: 'M1 Internship Report',
    category: 'Research Papers',
    type: 'Report',
    description: 'Comprehensive internship report documenting practical application of theoretical work',
    filename: 'rapport-stage-m1.pdf',
    size: '2.8 MB',
    date: '2024',
    language: 'French'
  },

  // Certifications
  {
    id: 'ecole42-enrollment',
    title: 'École 42 Enrollment Certificate',
    category: 'Certifications',
    type: 'Certificate',
    description: 'Enrollment certificate for intensive coding bootcamp completion',
    filename: 'ecole42-enrollment.pdf',
    size: '1.5 MB',
    date: '2024',
    language: 'French'
  },
  {
    id: 'english-c2',
    title: 'English Level C2 Certificate',
    category: 'Certifications',
    type: 'Language Certificate',
    description: 'Official certification of advanced English proficiency',
    filename: 'english-c2-certificate.pdf',
    size: '1.1 MB',
    date: '2023',
    language: 'English'
  },
  {
    id: 'french-scholarship',
    title: 'French Institute Scholarship Certificate',
    category: 'Certifications',
    type: 'Scholarship',
    description: 'Full scholarship award for French language and archaeological texts study',
    filename: 'french-scholarship-certificate.pdf',
    size: '1.3 MB',
    date: '2020',
    language: 'French'
  },

  // Letters of Recommendation
  {
    id: 'rec-schmezer',
    title: 'Letter of Recommendation - Dr. Gerhard Schmezer',
    category: 'Recommendations',
    type: 'Letter',
    description: 'Recommendation from thesis supervisor and Professor of Philosophy at Paris 8',
    filename: 'recommendation-schmezer.pdf',
    size: '0.8 MB',
    date: '2024',
    language: 'English'
  },
  {
    id: 'rec-laleh',
    title: 'Letter of Recommendation - Dr. Haeedeh Laleh',
    category: 'Recommendations',
    type: 'Letter',
    description: 'Academic recommendation from University of Tehran',
    filename: 'recommendation-laleh.pdf',
    size: '0.9 MB',
    date: '2024',
    language: 'English'
  },
  {
    id: 'rec-moini',
    title: 'Letter of Recommendation - Ali Moini',
    category: 'Recommendations',
    type: 'Letter',
    description: 'Professional recommendation from internationally acclaimed choreographer',
    filename: 'recommendation-moini.pdf',
    size: '0.7 MB',
    date: '2024',
    language: 'English'
  },
  {
    id: 'rec-danesh',
    title: 'Letter of Recommendation - Sepand Danesh',
    category: 'Recommendations',
    type: 'Letter',
    description: 'Artistic collaboration recommendation from plastic artist',
    filename: 'recommendation-danesh.pdf',
    size: '0.8 MB',
    date: '2024',
    language: 'English'
  },

  // Application Documents
  {
    id: 'motivation-letter',
    title: 'Motivation Letter - Master NET Program',
    category: 'Application Documents',
    type: 'Letter',
    description: 'Motivation letter for Master\'s program in Digital Humanities',
    filename: 'lettre-motivation-net.pdf',
    size: '0.6 MB',
    date: '2025',
    language: 'French'
  },
  {
    id: 'research-plan',
    title: 'Research Plan',
    category: 'Application Documents',
    type: 'Plan',
    description: 'Detailed research plan for continued academic work',
    filename: 'research-plan.pdf',
    size: '1.4 MB',
    date: '2025',
    language: 'English'
  },
  {
    id: 'cv-academic',
    title: 'Academic CV',
    category: 'Application Documents',
    type: 'CV',
    description: 'Comprehensive academic curriculum vitae',
    filename: 'cv-academic-yekta-jokar.pdf',
    size: '1.2 MB',
    date: '2025',
    language: 'English'
  },
  {
    id: 'creative-portfolio',
    title: 'Creative Portfolio',
    category: 'Application Documents',
    type: 'Portfolio',
    description: 'Comprehensive creative portfolio showcasing interdisciplinary artistic practice',
    filename: 'creative-portfolio.pdf',
    size: '5.1 MB',
    date: '2025',
    language: 'English'
  },

  // Work Experience
  {
    id: 'work-certificate',
    title: 'Work Experience Certificate',
    category: 'Work Experience',
    type: 'Certificate',
    description: 'Official certificate documenting professional experience',
    filename: 'work-experience-certificate.pdf',
    size: '0.9 MB',
    date: '2024',
    language: 'English'
  }
];

export default function DocumentsPage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && ['en', 'fr', 'fa'].includes(storedLang)) {
      setCurrentLang(storedLang);
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(documents.map(doc => doc.category)))];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (document: Document) => {
    // In a real implementation, this would download the actual file
    alert(`Downloading: ${document.title}\nFile: ${document.filename}\nThis is a demo - actual file download would happen here.`);
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'diploma': return '🎓';
      case 'transcript': return '📊';
      case 'certificate': return '📜';
      case 'thesis': return '📖';
      case 'research paper': return '🔬';
      case 'report': return '📋';
      case 'letter': return '✉️';
      case 'cv': return '📄';
      case 'portfolio': return '🎨';
      case 'plan': return '📝';
      case 'scholarship': return '🏆';
      case 'language certificate': return '🗣️';
      default: return '📄';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl academic-heading mb-4">
          {getTranslation(currentLang, 'nav.documents')}
        </h1>
        <p className="text-lg academic-text text-gray-600 max-w-3xl mx-auto">
          Official academic documents, certifications, research papers, and professional credentials
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg academic-text font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-academic-brown text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-academic-brown focus:border-transparent academic-text"
          />
        </div>
      </div>

      {/* Document Count */}
      <div className="text-center mb-8">
        <p className="academic-text text-gray-600">
          Showing {filteredDocuments.length} of {documents.length} documents
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map(document => (
          <div key={document.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{getTypeIcon(document.type)}</div>
              <span className="bg-academic-brown/10 text-academic-brown px-2 py-1 rounded text-xs academic-text font-medium">
                {document.type}
              </span>
            </div>

            <h3 className="text-lg academic-heading mb-2 line-clamp-2">{document.title}</h3>
            <p className="academic-text text-gray-600 text-sm mb-4 line-clamp-3">{document.description}</p>

            <div className="space-y-2 academic-text text-xs text-gray-500 mb-4">
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="text-academic-brown font-medium">{document.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span>{document.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{document.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <span>{document.language}</span>
              </div>
            </div>

            <button
              onClick={() => handleDownload(document)}
              className="w-full bg-academic-brown text-white py-2 px-4 rounded-lg hover:bg-academic-brown-dark transition-colors academic-text font-medium flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl academic-heading mb-2">No documents found</h3>
          <p className="academic-text text-gray-600">Try adjusting your search terms or category filter</p>
        </div>
      )}

      {/* Download Instructions */}
      <div className="mt-16 bg-academic-brown/5 rounded-lg p-8">
        <h2 className="text-2xl academic-heading mb-4 text-center">Document Access</h2>
        <div className="grid md:grid-cols-2 gap-8 academic-text text-gray-700">
          <div>
            <h3 className="text-lg academic-heading mb-3">Available Documents</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>All academic transcripts and diplomas</li>
              <li>Complete Master\'s thesis (18/20)</li>
              <li>Professional certifications</li>
              <li>Letters of recommendation from academic and artistic collaborators</li>
              <li>Research papers and reports</li>
              <li>Creative portfolio documentation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg academic-heading mb-3">Document Verification</h3>
            <p className="text-sm mb-3">
              All academic documents are official and can be verified directly with issuing institutions.
              For verification requests or additional documentation, please contact:
            </p>
            <div className="text-sm">
              <p><strong>Email:</strong> <a href="mailto:yekta.kjs@gmail.com" className="text-academic-brown hover:text-academic-brown-dark">yekta.kjs@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+33766714238" className="text-academic-brown hover:text-academic-brown-dark">+33 766 714 238</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}