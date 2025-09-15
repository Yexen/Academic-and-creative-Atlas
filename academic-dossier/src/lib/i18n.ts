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
      tagline: 'From archaeological excavation to aesthetic language in AI systems',
      researchHighlights: 'Research Highlights',
      philosophyAI: 'Philosophy & AI Interaction',
      philosophyAIDesc: 'Developing theoretical frameworks for aesthetic engagement protocols in AI systems, bridging continental philosophy with practical human-computer interaction design.',
      philosophyAIDetails: 'Master\'s Thesis: 18/20 • University Paris 8',
      interdisciplinary: 'Interdisciplinary Creative Practice',
      interdisciplinaryDesc: 'Synthesizing Persian cultural heritage with Western artistic traditions through innovative narrative frameworks, poetry, and digital creative platforms.',
      interdisciplinaryDetails: '7 Complete Narrative Universes • Multilingual Poetry Collection',
      quickNav: {
        resumeDesc: 'M1 Philosophy (18/20) • École 42 • Archaeological experience',
        portfolioDesc: 'Shadowline • Mémoire en Livres • Yexen • Literary Works',
        academicDesc: 'Aesthetic Language Theory • Philosophy • Archaeology Research',
        documentsDesc: 'Official transcripts • Certifications • Research papers'
      }
    },
    resume: {
      title: 'Resume',
      downloadPDF: 'Download PDF',
      education: 'Education',
      experience: 'Professional Experience',
      research: 'Research & Creative Projects',
      skills: 'Skills & Competencies',
      languages: 'Languages',
      technical: 'Technical Skills',
      qualities: 'Core Qualities',
      workshops: 'Workshops & Professional Development',
      awards: 'Awards & Honors'
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Four innovative projects demonstrating the integration of philosophy, technology, and creative practice',
      keyFeatures: 'Key Features',
      significance: 'Significance',
      technologies: 'Technologies & Methods',
      showLess: 'Show Less',
      showMore: 'Show More',
      integration: 'Interdisciplinary Integration',
      integrationDesc: 'These four projects represent a unified approach to creative and academic practice that bridges theoretical investigation with practical implementation. Each project demonstrates different aspects of how aesthetic language can operate across digital, material, and literary media.',
      integrationDesc2: 'From the AI interaction protocols of Shadowline to the material storytelling of Yexen jewelry, from the cultural preservation of Mémoire en Livres to the mythological frameworks of the literary works, this portfolio showcases the possibilities of integrating Persian philosophical traditions with contemporary creative technologies.',
      exploreFurther: 'Explore Further',
      exploreDesc: 'Interested in learning more about these projects or potential collaborations?',
      contactCollaboration: 'Contact for Collaboration',
      viewAcademicWork: 'View Academic Work'
    },
    academic: {
      title: 'Academic Work',
      thesis: 'Master\'s Thesis',
      archaeology: 'Archaeological Research',
      philosophy: 'Philosophical Work',
      ongoing: 'Ongoing Research'
    },
    documents: {
      title: 'Documents',
      subtitle: 'Complete collection of academic credentials, certifications, and official documentation',
      categories: {
        credentials: 'Academic Credentials',
        certifications: 'Certifications & Training',
        research: 'Research Papers',
        other: 'Other Documents'
      },
      download: 'Download',
      preview: 'Preview',
      filterAll: 'All Categories',
      searchPlaceholder: 'Search documents...',
      noResults: 'No documents found matching your criteria.',
      lastUpdated: 'Last Updated'
    },
    common: {
      download: 'Download',
      viewMore: 'View More',
      contact: 'Contact',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      save: 'Save',
      cancel: 'Cancel',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success'
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
      tagline: 'De l\'excavation archéologique au langage esthétique dans les systèmes IA',
      researchHighlights: 'Points Forts de la Recherche',
      philosophyAI: 'Philosophie & Interaction IA',
      philosophyAIDesc: 'Développement de cadres théoriques pour les protocoles d\'engagement esthétique dans les systèmes IA, reliant la philosophie continentale à la conception pratique d\'interaction humain-ordinateur.',
      philosophyAIDetails: 'Mémoire de Master : 18/20 • Université Paris 8',
      interdisciplinary: 'Pratique Créative Interdisciplinaire',
      interdisciplinaryDesc: 'Synthèse du patrimoine culturel persan avec les traditions artistiques occidentales à travers des cadres narratifs innovants, la poésie et les plateformes créatives numériques.',
      interdisciplinaryDetails: '7 Univers Narratifs Complets • Collection de Poésie Multilingue',
      quickNav: {
        resumeDesc: 'M1 Philosophie (18/20) • École 42 • Expérience archéologique',
        portfolioDesc: 'Shadowline • Mémoire en Livres • Yexen • Œuvres Littéraires',
        academicDesc: 'Théorie du Langage Esthétique • Philosophie • Recherche Archéologique',
        documentsDesc: 'Relevés officiels • Certifications • Articles de recherche'
      }
    },
    resume: {
      title: 'CV',
      downloadPDF: 'Télécharger PDF',
      education: 'Formation',
      experience: 'Expérience Professionnelle',
      research: 'Projets de Recherche & Créatifs',
      skills: 'Compétences & Qualifications',
      languages: 'Langues',
      technical: 'Compétences Techniques',
      qualities: 'Qualités Principales',
      workshops: 'Ateliers & Développement Professionnel',
      awards: 'Prix & Distinctions'
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Quatre projets innovants démontrant l\'intégration de la philosophie, de la technologie et de la pratique créative',
      keyFeatures: 'Caractéristiques Principales',
      significance: 'Signification',
      technologies: 'Technologies & Méthodes',
      showLess: 'Voir Moins',
      showMore: 'Voir Plus',
      integration: 'Intégration Interdisciplinaire',
      integrationDesc: 'Ces quatre projets représentent une approche unifiée de la pratique créative et académique qui relie l\'investigation théorique à l\'implémentation pratique. Chaque projet démontre différents aspects de la façon dont le langage esthétique peut opérer à travers les médias numériques, matériels et littéraires.',
      integrationDesc2: 'Des protocoles d\'interaction IA de Shadowline à la narration matérielle des bijoux Yexen, de la préservation culturelle de Mémoire en Livres aux cadres mythologiques des œuvres littéraires, ce portfolio présente les possibilités d\'intégration des traditions philosophiques persanes avec les technologies créatives contemporaines.',
      exploreFurther: 'Explorer Davantage',
      exploreDesc: 'Intéressé à en apprendre plus sur ces projets ou des collaborations potentielles ?',
      contactCollaboration: 'Contact pour Collaboration',
      viewAcademicWork: 'Voir les Travaux Académiques'
    },
    academic: {
      title: 'Travaux Académiques',
      thesis: 'Mémoire de Master',
      archaeology: 'Recherche Archéologique',
      philosophy: 'Travail Philosophique',
      ongoing: 'Recherche en Cours'
    },
    documents: {
      title: 'Documents',
      subtitle: 'Collection complète de références académiques, certifications et documentation officielle',
      categories: {
        credentials: 'Références Académiques',
        certifications: 'Certifications & Formation',
        research: 'Articles de Recherche',
        other: 'Autres Documents'
      },
      download: 'Télécharger',
      preview: 'Aperçu',
      filterAll: 'Toutes Catégories',
      searchPlaceholder: 'Rechercher des documents...',
      noResults: 'Aucun document trouvé correspondant à vos critères.',
      lastUpdated: 'Dernière Mise à Jour'
    },
    common: {
      download: 'Télécharger',
      viewMore: 'Voir Plus',
      contact: 'Contact',
      email: 'E-mail',
      phone: 'Téléphone',
      location: 'Localisation',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      success: 'Succès'
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
      tagline: 'از کاوش باستان‌شناسی تا زبان زیبایی‌شناختی در سیستم‌های هوش مصنوعی',
      researchHighlights: 'نکات برجسته پژوهشی',
      philosophyAI: 'فلسفه و تعامل هوش مصنوعی',
      philosophyAIDesc: 'توسعه چارچوب‌های نظری برای پروتکل‌های تعامل زیبایی‌شناختی در سیستم‌های هوش مصنوعی، پیوند دادن فلسفه قاره‌ای با طراحی عملی تعامل انسان-رایانه.',
      philosophyAIDetails: 'پایان‌نامه کارشناسی ارشد: ۱۸/۲۰ • دانشگاه پاریس ۸',
      interdisciplinary: 'رویکرد خلاقانه بین‌رشته‌ای',
      interdisciplinaryDesc: 'ترکیب میراث فرهنگی ایرانی با سنت‌های هنری غربی از طریق چارچوب‌های روایی نوآورانه، شعر و پلتفرم‌های خلاقانه دیجیتال.',
      interdisciplinaryDetails: '۷ جهان روایی کامل • مجموعه شعر چندزبانه',
      quickNav: {
        resumeDesc: 'کارشناسی ارشد فلسفه (۱۸/۲۰) • مدرسه ۴۲ • تجربه باستان‌شناسی',
        portfolioDesc: 'Shadowline • Mémoire en Livres • Yexen • آثار ادبی',
        academicDesc: 'نظریه زبان زیبایی‌شناختی • فلسفه • پژوهش باستان‌شناسی',
        documentsDesc: 'مدارک رسمی • گواهینامه‌ها • مقالات پژوهشی'
      }
    },
    resume: {
      title: 'رزومه',
      downloadPDF: 'دانلود PDF',
      education: 'تحصیلات',
      experience: 'تجربه حرفه‌ای',
      research: 'پروژه‌های پژوهشی و خلاقانه',
      skills: 'مهارت‌ها و صلاحیت‌ها',
      languages: 'زبان‌ها',
      technical: 'مهارت‌های فنی',
      qualities: 'ویژگی‌های اصلی',
      workshops: 'کارگاه‌ها و توسعه حرفه‌ای',
      awards: 'جوایز و افتخارات'
    },
    portfolio: {
      title: 'نمونه کارها',
      subtitle: 'چهار پروژه نوآورانه که ادغام فلسفه، فناوری و رویکرد خلاقانه را نشان می‌دهند',
      keyFeatures: 'ویژگی‌های کلیدی',
      significance: 'اهمیت',
      technologies: 'فناوری‌ها و روش‌ها',
      showLess: 'نمایش کمتر',
      showMore: 'نمایش بیشتر',
      integration: 'ادغام بین‌رشته‌ای',
      integrationDesc: 'این چهار پروژه نمایانگر رویکردی یکپارچه به رویکرد خلاقانه و آکادمیک است که تحقیق نظری را با پیاده‌سازی عملی پیوند می‌دهد. هر پروژه جنبه‌های مختلفی از نحوه عملکرد زبان زیبایی‌شناختی در رسانه‌های دیجیتال، مادی و ادبی را نشان می‌دهد.',
      integrationDesc2: 'از پروتکل‌های تعامل هوش مصنوعی Shadowline تا داستان‌سرایی مادی جواهرات Yexen، از حفظ فرهنگی Mémoire en Livres تا چارچوب‌های اساطیری آثار ادبی، این نمونه کارها امکانات ادغام سنت‌های فلسفی ایرانی با فناوری‌های خلاقانه معاصر را به نمایش می‌گذارد.',
      exploreFurther: 'کاوش بیشتر',
      exploreDesc: 'علاقه‌مند به یادگیری بیشتر درباره این پروژه‌ها یا همکاری‌های بالقوه هستید؟',
      contactCollaboration: 'تماس برای همکاری',
      viewAcademicWork: 'مشاهده کارهای آکادمیک'
    },
    academic: {
      title: 'کارهای آکادمیک',
      thesis: 'پایان‌نامه کارشناسی ارشد',
      archaeology: 'پژوهش باستان‌شناسی',
      philosophy: 'کار فلسفی',
      ongoing: 'پژوهش در حال انجام'
    },
    documents: {
      title: 'اسناد',
      subtitle: 'مجموعه کاملی از مدارک آکادمیک، گواهینامه‌ها و مستندات رسمی',
      categories: {
        credentials: 'مدارک آکادمیک',
        certifications: 'گواهینامه‌ها و آموزش',
        research: 'مقالات پژوهشی',
        other: 'سایر اسناد'
      },
      download: 'دانلود',
      preview: 'پیش‌نمایش',
      filterAll: 'همه دسته‌ها',
      searchPlaceholder: 'جستجوی اسناد...',
      noResults: 'هیچ سندی مطابق با معیارهای شما یافت نشد.',
      lastUpdated: 'آخرین به‌روزرسانی'
    },
    common: {
      download: 'دانلود',
      viewMore: 'مشاهده بیشتر',
      contact: 'تماس',
      email: 'ایمیل',
      phone: 'تلفن',
      location: 'موقعیت',
      save: 'ذخیره',
      cancel: 'لغو',
      loading: 'در حال بارگذاری...',
      error: 'خطایی رخ داده است',
      success: 'موفقیت‌آمیز'
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