'use client';

import Link from 'next/link';
import { getTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { currentLang } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        {/* Profile Picture */}
        <div className="mb-8">
          <img
            src="/profile-photo.jpg"
            alt="Yekta Jokar"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover object-center shadow-lg border-4 border-academic-brown/20"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>

        <h1 className="text-5xl md:text-6xl academic-heading mb-6">
          {getTranslation(currentLang, 'home.title')}
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700 academic-text mb-8 max-w-4xl mx-auto">
          {getTranslation(currentLang, 'home.subtitle')}
        </h2>
        <p className="text-lg academic-text text-gray-600 max-w-3xl mx-auto mb-8">
          {getTranslation(currentLang, 'home.intro')}
        </p>
        <p className="text-base academic-text text-academic-brown italic">
          {getTranslation(currentLang, 'home.tagline')}
        </p>
      </section>

      <div className="section-divider"></div>

      {/* Quick Navigation */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Link href="/resume" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.resume')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.resumeDesc')}
            </p>
          </div>
        </Link>

        <Link href="/portfolio" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.portfolio')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.portfolioDesc')}
            </p>
          </div>
        </Link>

        <Link href="/academic" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.academic')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.academicDesc')}
            </p>
          </div>
        </Link>

        <Link href="/documents" className="group">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 hover:border-academic-brown active:border-academic-brown-dark active:shadow-xl">
            <h3 className="text-xl academic-heading mb-3 group-hover:text-academic-brown-dark">
              {getTranslation(currentLang, 'nav.documents')}
            </h3>
            <p className="academic-text text-gray-600">
              {getTranslation(currentLang, 'home.quickNav.documentsDesc')}
            </p>
          </div>
        </Link>
      </section>

      <div className="section-divider"></div>

      {/* Research Highlights */}
      <section className="mb-16">
        <h2 className="text-3xl academic-heading mb-8 text-center">{getTranslation(currentLang, 'home.researchHighlights')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl academic-heading mb-4">{getTranslation(currentLang, 'home.philosophyAI')}</h3>
            <p className="academic-text text-gray-700 mb-4">
              {getTranslation(currentLang, 'home.philosophyAIDesc')}
            </p>
            <div className="text-sm text-academic-brown font-medium">
              {getTranslation(currentLang, 'home.philosophyAIDetails')}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl academic-heading mb-4">{getTranslation(currentLang, 'home.interdisciplinary')}</h3>
            <p className="academic-text text-gray-700 mb-4">
              {getTranslation(currentLang, 'home.interdisciplinaryDesc')}
            </p>
            <div className="text-sm text-academic-brown font-medium">
              {getTranslation(currentLang, 'home.interdisciplinaryDetails')}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="text-center bg-academic-brown/5 rounded-lg p-8">
        <h2 className="text-2xl academic-heading mb-4">{getTranslation(currentLang, 'common.contact')}</h2>
        <div className="academic-text text-gray-700 space-y-2">
          <p>
            <strong>{getTranslation(currentLang, 'common.email')}:</strong>{" "}
            <a href="mailto:yekta.kjs@gmail.com" className="text-academic-brown hover:text-academic-brown-dark">
              yekta.kjs@gmail.com
            </a>
          </p>
          <p>
            <strong>{getTranslation(currentLang, 'common.phone')}:</strong>{" "}
            <a href="tel:+33766714238" className="text-academic-brown hover:text-academic-brown-dark">
              +33 766 714 238
            </a>
          </p>
          <p><strong>{getTranslation(currentLang, 'common.location')}:</strong> 3 Rue Victor Hugo, 95100 Argenteuil, France</p>
        </div>
      </section>
    </div>
  );
}
