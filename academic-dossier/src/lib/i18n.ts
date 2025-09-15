export const languages = {
  en: 'English',
  fr: 'Français',
  fa: 'فارسی'
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    nav: {
      home: 'Home',
      resume: 'Resume',
      portfolio: 'Portfolio',
      academic: 'Academic Work',
      documents: 'Documents'
    },
    home: {
      title: 'Yekta Jokar',
      subtitle: 'Philosopher | AI Interaction Designer | Interdisciplinary Researcher',
      intro: 'A philosopher turned AI interaction designer, bridging theoretical reflection with innovative creative practice.',
      tagline: 'From archaeological excavation to aesthetic language in AI systems'
    },
    common: {
      download: 'Download',
      viewMore: 'View More',
      contact: 'Contact'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      resume: 'CV',
      portfolio: 'Portfolio',
      academic: 'Travaux Académiques',
      documents: 'Documents'
    },
    home: {
      title: 'Yekta Jokar',
      subtitle: 'Philosophe | Designer d\'Interactions IA | Chercheuse Interdisciplinaire',
      intro: 'Une philosophe devenue designer d\'interactions IA, reliant réflexion théorique et pratique créative innovante.',
      tagline: 'De l\'excavation archéologique au langage esthétique dans les systèmes IA'
    },
    common: {
      download: 'Télécharger',
      viewMore: 'Voir Plus',
      contact: 'Contact'
    }
  },
  fa: {
    nav: {
      home: 'خانه',
      resume: 'رزومه',
      portfolio: 'نمونه کارها',
      academic: 'کارهای آکادمیک',
      documents: 'اسناد'
    },
    home: {
      title: 'یکتا جوکار',
      subtitle: 'فیلسوف | طراح تعامل هوش مصنوعی | محقق بین‌رشته‌ای',
      intro: 'فیلسوفی که به طراح تعامل هوش مصنوعی تبدیل شده، پیوند دهنده تأمل نظری و عمل خلاقانه نوآورانه.',
      tagline: 'از کاوش باستان‌شناسی تا زبان زیبایی‌شناختی در سیستم‌های هوش مصنوعی'
    },
    common: {
      download: 'دانلود',
      viewMore: 'مشاهده بیشتر',
      contact: 'تماس'
    }
  }
};

export const getTranslation = (lang: Language, key: string) => {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};