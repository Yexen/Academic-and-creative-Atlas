import { NextRequest, NextResponse } from 'next/server';

// Comprehensive knowledge base about Yekta's academic work and intellectual context
const KNOWLEDGE_BASE = {
  personal: {
    name: "Yekta Jokar",
    dateOfBirth: "July 13, 1995",
    gender: "Female",
    title: "Philosopher, Writer, and Interdisciplinary Artist",
    identity: "Bridges boundaries between theory and practice, technology and aesthetics, heritage and innovation",
    currentStatus: "Born in Iran, now based in Paris",
    email: "yekta.kjs@gmail.com",
    phone: "+33 766 714 238",
    location: "3 Rue Victor Hugo, 95100 Argenteuil, France",
    background: "Iranian-born scholar working at the intersection of philosophy, digital humanities, and aesthetic theory",
    languageProfile: "Works in three languages — Persian, French, and English — each shaping a distinct facet of intellectual and creative voice",
    currentVision: "Developing a framework where philosophy, art, and AI converge to create new forms of meaning, contributing to academic research, digital innovation, and artistic practice simultaneously",
    culturalHeritage: {
      iranianInfluences: "Deep connection to Persian philosophical traditions, poetry (especially Hafez and Rumi), and Zoroastrian mythology",
      linguisticHeritage: "Persian as native heritage language providing access to classical texts and philosophical concepts unavailable in translation",
      migrationExperience: "Migration from Iran to Europe providing unique perspective on cultural translation and identity formation",
      culturalBridging: "Work serves as bridge between Persian intellectual traditions and contemporary European academic discourse"
    },
    futurePlans: {
      phdApplications: "Currently preparing PhD applications for 2025 entry in Philosophy programs focusing on aesthetic theory and digital humanities",
      researchDirection: "Continuing exploration of aesthetic language, AI collaboration, and interdisciplinary methodologies",
      academicGoals: "Publishing scholarly articles, conference presentations, and developing innovative research methodologies"
    }
  },

  education: {
    masterThesis: {
      title: "Aesthetic Language: The Interplay Between Language, Art, and the Sensible",
      university: "Université Paris 8",
      program: "Philosophy",
      grade: "18/20 (Distinction)",
      year: "2024",
      supervisor: "Dr. Gerhard Schmezer (Paris 8)",
      keyContributions: [
        "Developed framework for understanding aesthetic communication beyond discursive language",
        "Bridged Continental philosophy with digital humanities methodologies",
        "Explored phenomenology of aesthetic experience in digital contexts"
      ]
    },
    archaeology: {
      degree: "Advanced studies in Archaeology",
      university: "Université de Téhéran",
      specialization: "Cultural heritage and material culture studies",
      fieldworkExperience: "Extensive excavation and research experience in Iran",
      skills: "Archaeological methodology, cultural analysis, heritage preservation"
    },
    philosophy: {
      degree: "Master's in Philosophy",
      university: "Université Paris 8",
      focus: "Continental philosophy, aesthetics, phenomenology, and language theory",
      grade: "Mémoire graded 18/20 on the theory of aesthetic language"
    },
    computerScience: {
      institution: "École 42",
      focus: "Advanced studies cultivating technical development skills",
      significance: "Creates rare profile uniting humanities, research, and technical development"
    }
  },

  research: {
    masterThesisCore: {
      centralConcept: "Aesthetic Language: how language can transcend its logical limitations to engage with the realm of the sensible",
      mainTheme: "Exploration into how language can transcend conventional logical and discursive limitations to access and express the 'realm of the sensible'",
      aestheticDefinition: "Not language dealing with beauty, but language that belongs to and interacts with sensibility - 'the investigation of that which belongs to the realm of sensibility' contrasting with conceptual domain of logic",
      coreQuestion: "How can language, a logical structure, interact with the sensible?",
      aestheticLanguageDefinition: "A kind of language that goes beyond its logical limitations, a kind of language that shows instead of saying",
      wittgensteinFoundation: "Starting from Wittgenstein's assertion: 'There are, indeed, things that cannot be put into words. They make themselves manifest. They are what is mystical' (Tractus 6.522)",
      mysticalConcept: "In early Wittgenstein, mystical referred to what cannot be said, what lies beyond limitation of language, what shows itself - aspect of reality that eludes language's capacity to describe because language is constructed around logical structure",
      laterWittgenstein: "While term 'mystical' disappears from later work, concept of ineffable persists, referring to that which we accept as part of our form of life and background against which we understand world",
      deleuzeConnection: "Uses Deleuze's term 'sensible' to describe parts of reality that are immediately experienced or perceived, combining Deleuze's sensible with Wittgenstein's mystical to enrich understanding of language shaping human experience",
      languageArtInterplay: "Encourages viewing language as form of art and art as form of language - despite being distinct concepts, they have numerous similarities and interconnectedness allowing them to function interchangeably",
      philosophicalSynthesis: "Uniquely combines perspectives of three influential 20th-century philosophers from distinct traditions: Wittgenstein (analytic), Deleuze (continental), and Dewey (pragmatic)"
    },
    coreQuestions: [
      "How does language transcend logical limitations to engage with the realm of the sensible?",
      "What constitutes 'aesthetic language' as expression that shows rather than says?",
      "How do visual forms capture experiences that escape verbal articulation?",
      "What role can sustained aesthetic engagement play in human-AI interaction?"
    ],
    methodology: {
      approach: "Philosophical investigation combined with practical artistic experience and experimental AI interaction protocols",
      influences: "Wittgenstein, Deleuze, Dewey, Merleau-Ponty - emphasizing anti-essentialist positions and fluid, contextual meaning-making",
      innovation: "Bridging philosophical theory with hands-on artistic practice and cutting-edge AI collaboration research"
    },
    theoreticalFramework: {
      aestheticLanguage: "Language as creative force engaging with sensibility and expressing ineffable aspects of human experience, operating between representation and reality",
      philosophicalCommonalities: {
        antiEssentialism: "All three philosophers consistently argue against different aspects of essentialism",
        wittgensteinAntiEssential: "Argues against idea of fixed, essential meaning for words or concepts, highlighting fluidity and dependence on context and use: 'The meaning of a word is its use in language' (§43)",
        deweyAntiEssential: "Argued against fixed, static conceptions of reality, knowledge, and human nature, emphasizing importance of context, process, and change",
        deleuzeAntiEssential: "Philosophy characterized by rejection of essentialism and focus on becoming, difference and multiplicity: 'The concept is not a representation that reflects a pre-existing object... It is a process of differentiation' (1994, p.171)",
        fluidMeaning: "Direct consequence of anti-essentialism - words do not have fixed, pre-determined meanings. Language is fluid and meaning is contextual",
        activeLanguage: "Language is not merely passive representation of reality but creative and productive force that generates meaning rather than merely transmits it"
      },
      individualContributions: {
        deleuzeContribution: "Emphasizes language and art as active forces that contribute to creation and transformation of reality, blurring boundaries between logical and aesthetic. Framework suggests exploration of how language can engage with sensibility, evoking and communicating sensory experiences beyond traditional linguistic boundaries",
        deweyContribution: "Highlights integration of aesthetic experiences into everyday life, stressing contextual significance of encounters, acknowledging role of social interaction in shaping meaning. Views aesthetic encounters as integral to daily activities, expanding scope of aesthetic language beyond traditional art forms. 'Language is social product; it is not mere instrument for communication of ready-made ideas, but means for creating them' (1916, Ch.8)",
        wittgensteinContribution: "Concepts of language games and mystical highlight ways language can show rather than say, illuminating expressive power beyond logical structure. Emphasizes practical use of language and context-dependent nature of meaning, enabling articulation of unsayable aspects of human experience"
      },
      spatialPhilosophy: "Inspired by work with Sepand Danesh - understanding how spatial forms (cubes, corners, voxels) create meaning through compositional context",
      temporalEcologies: "Three temporal modes: reading (immediate present), translation (sequential historical interpretation), writing (infinite temporal projection)",
      aiAestheticEngagement: "Framework for enhanced human-AI interaction through sustained aesthetic engagement protocols rather than purely functional exchange",
      examplesImportance: "Examples essential for understanding aesthetic language from each philosophical view - provide light on subtle links between language, experience, and expression. Wittgenstein's later philosophy emphasizes examples where meaning is based on use within language games or settings"
    },
    practicalApplications: {
      studioInternship: "Six-month transformative experience with contemporary artist Sepand Danesh working on 'Faire Corps' exhibition sculptures",
      aiInteractionResearch: "Extended observations with Claude, ChatGPT, and Gemini identifying patterns of aesthetically-informed dialogue",
      sculpturalUnderstanding: "Manufacturing wooden cubes, assembling 3D structures, applying multi-tonal color schemes - understanding how individual elements gain meaning through context"
    },
    currentInvestigations: [
      "Aesthetic engagement protocols for enhanced AI interaction design",
      "Philosophical implications of treating AI systems as dialogue partners rather than tools",
      "Spatial perception and meaning-making through sculptural practice",
      "Trauma, expression, and the failure of language in artistic practice",
      "Integration of Persian philosophical traditions with contemporary European academic discourse",
      "Digital preservation methodologies for cultural heritage and family literary collections",
      "Phenomenology of multilingual meaning-making and cultural translation",
      "Ethics and aesthetics of human-AI collaboration in creative and scholarly contexts",
      "Temporal ecologies in reading, translation, and writing practices"
    ],
    illustrativeExamples: {
      sisyphusExample: "Myth of Sisyphus, whether through Titian's painting or Camus' essay, encapsulates profound themes and emotions that transcend literal narrative, communicating existential insights echoing Wittgenstein's notion of 'showing versus saying'",
      sepandSculpturesExample: "Sculptures composed of individual cubes that gain unique meaning through arrangement challenge understanding of world and ourselves, presenting different interpretations based on context, illustrating essence of aesthetic language where distinction between representation and reality becomes increasingly nuanced"
    }
  },

  studioExperience: {
    sepandDaneshInternship: {
      duration: "Six-month transformative internship experience",
      artist: "Sepand Danesh - contemporary artist born Tehran 1984, immigrated to France at age 12 due to war trauma",
      artistBackground: "Discovered drawing and painting as means of expression when language failed him due to linguistic and cultural challenges",
      artistStyle: "Known for geometric forms, vibrant colors, trompe-l'œil effects, particularly renowned 'corner' paintings exploring isolation and reflection",
      practicalWork: "Manufactured identical wooden cubes using precision tools, assembled complex 3D structures, applied multi-tonal color schemes for 'Faire Corps' exhibition May 2024",
      sculpturesConcept: "Inspired by Cézanne's brushstrokes, transform 2D painting techniques into volumetric 'voxels' or 3D pixels",
      meaningMaking: "Each cube gains unique meaning through compositional context while contributing to unified wholes challenging perceptions of reality",
      thesisExample: "Sculptures composed of individual cubes that gain unique meaning through their arrangement challenge understanding of world and ourselves, presenting different interpretations based on context, illustrating essence of aesthetic language where distinction between representation and reality becomes increasingly nuanced",
      theoreticalInsights: "Extensive philosophical discussions about art, language, and meaning-making",
      keyInsight: "Early systematic drawings of squares served not as virtuosity displays but urgent expressions of post-traumatic experience when language failed",
      linguisticConnection: "Corner paintings connected to Farsi word 'konjkāv' (curiosity), etymologically from 'konj' (corner) and 'kāv' (to search)",
      spatialPhilosophy: "Cube as fractal reduction of corner with additional dimension providing volume; work produces space rather than representing objects",
      temporalFramework: "Creates three temporal ecologies: reading (immediate present), translation (sequential historical interpretation), writing (infinite temporal projection)",
      languagePhilosophy: "Rejects hierarchical distinctions between visual and verbal languages, emphasizing aesthetic systemic relationships",
      researchImpact: "Provided crucial insights for Master's thesis research on how language transcends logical limitations to engage with the sensible"
    }
  },

  aiResearchFramework: {
    aestheticEngagementProtocols: {
      definition: "Framework for enhanced human-AI interaction based on sustained aesthetic engagement rather than purely functional exchange",
      theoreticalBasis: "Integrates Wittgenstein's 'meaning as use' within 'forms of life', Dewey's experiential interaction, Deleuze's difference and repetition, Merleau-Ponty's embodied language",
      methodology: "Consistent long-term interaction patterns, aesthetic attention prioritizing form and relational dynamics, narrative consistency, emotional transparency",
      practicalTechniques: "Contextual priming through metaphor, creative prompting with philosophical questions, iterative refinement building on previous interactions",
      observedPatterns: "Enhanced contextual coherence, increased creative and philosophical sophistication, apparent pattern recognition by AI systems, improved user satisfaction",
      keyInsight: "Treating AI systems as dialogue partners rather than mere tools produces qualitatively superior results",
      applications: "Prompt engineering, user training, human-computer interaction design",
      philosophicalImplication: "Challenges purely instrumental views of AI, demonstrates interaction style significantly affects dialogue quality"
    },
    researchScope: "Extended observations with Claude, ChatGPT, and Gemini identifying patterns suggesting aesthetically-informed, emotionally engaged dialogue produces qualitatively different outcomes",
    intersubjectiveSpace: "Optimal human-AI interaction occurs within co-created space through consistent relational dynamics, treating AI responses as contributions to ongoing meaning-making rather than isolated outputs"
  },

  creativeWork: {
    shadowsOfGotham: {
      title: "Shadows of Gotham",
      type: "Six-volume saga",
      description: "Integrating Zoroastrian mythology with contemporary storytelling",
      significance: "Living experiment in how philosophy and digital design can meet",
      corePhilosophy: {
        dualityAndBalance: "Central philosophy navigating opposing forces: mortal and divine, shadow and light, pragmatism and idealism. Balance is paramount, valued above absolute extremes, with solutions lying in navigating shades of gray rather than rigid black-and-white principles",
        selfMadeIdentity: "Identity is forged through survival, defiance, and conscious choice rather than birth or past traumas. Characters actively 'rewrite their endings' and 'make themselves from scratch,' reclaiming suppressed parts of themselves",
        redefinedMorality: "Challenges conventional justice with fluid moral compass shaped by experience, pragmatism, and compassion. 'Justice is just what the powerful call their side of the story' - actions driven by need to pay debts, protect vulnerable, restore equilibrium",
        languageAsPower: "Language presented not merely as logical system but as creative force shaping perception, identity, and power. Poetry and writing become sanctuary for expressing profound pain, declaring independence, giving voice to the 'ineffable'",
        vulnerabilityAsStrength: "True strength comes from allowing oneself to be seen, connect with others, lean on chosen family. 'Softness is not weakness' - shared pain leads to shared strength, love as transformative force",
        survivalAndResilience: "Gotham as world of 'shadows and secrets,' wounded animal where survival is paramount. Philosophy extends beyond endurance to fierce determination to thrive, adapt, rewrite narrative despite odds",
        heavenAsCage: "Profound concept that 'heaven' with demands for purity, obedience, isolation can be suffocating cage, while 'hell,' chosen for truth and honesty, might be only place where one can truly breathe. Rejection of imposed doctrine for authentic self-determination"
      },
      keyCharacters: {
        livFreya: "Also known as Liv or Nomad - embodies pragmatic morality, 'writing herself back from death' through poetry, refusing to be silenced",
        philosophicalThemes: "Wrath as manifestation of grief, hope in redemption, survival of trauma, chosen family, authentic self-determination"
      },
      narrativeStyle: "Explores complex, contradictory nature of existence where personal philosophy is vital tool for survival, healing, and self-definition"
    },
    bezothera: {
      title: "Bezothera",
      type: "Science fiction narrative universe",
      description: "Advanced alien civilization exploring the philosophy of emotions as the most powerful force in existence",
      corePhilosophy: {
        emotionAsPower: "Emotions are the most powerful force in existence. Unlike other species, Bezotherans do not separate logic from feeling; they view emotion as energy that can be harnessed, controlled, and manipulated. Highest wisdom achieved through mastery over emotions, not suppression",
        sacredLove: "Love is considered sacred and eternal. Once true love forms, it creates an unbreakable bond that never fades, even if separated by circumstances. Loss of such love is tragedy with no cure, capable of destroying the most powerful empaths",
        auroraSacred: "Auroras in their sky are voices of past rulers; meditation under these skies is sacred ritual for guidance",
        balanceAndControl: "Society thrives on duality of strength and restraint, technology and tradition, isolation and influence. Defense philosophy emphasizes preparedness and strategy over initiating conflict"
      },
      society: {
        matriarchalLeadership: "Matriarchal society with women dominating leadership and warrior roles due to heightened attunement to emotional energies",
        empathicGovernance: "Rulers chosen based on strong empathic connection to their people, acting as 'anchor of Bezothera's emotional balance'",
        hiddenInfluence: "Mysterious 'hidden jewel of the galaxy' that deliberately conceals location and advanced technology from outsiders. While not conquerors, their unique knowledge, technology, diplomacy, and elite warriors give them significant, though often unseen, influence",
        emotionalWarfare: "Warriors fight with emotional control and precision, sensing and predicting opponents' movements through emotional attunement"
      },
      mainThemes: {
        emotionAsWisdom: "Emotions are not weaknesses to be suppressed, but fundamental force to be understood, mastered, and leveraged",
        eternalLove: "Explores Bezotheran belief in eternal, unbreakable love and devastating consequences when such love is lost",
        dutyVersusChoice: "Characters caught between expectations of heritage and desire for personal freedom, questioning whether fate is decided",
        dualIdentity: "Experience of being 'child of two worlds' - emotionally attuned yet fiercely guarded, bound by fate yet yearning for choice"
      },
      keyCharacters: {
        selene: "Half-Bezotheran, half-human character embodying duality theme - born to lead and fulfill royal destiny but yearns for personal freedom. Her makeup serves as 'quiet rebellion' and 'shield' reflecting dual heritage"
      }
    },
    whispersAndVows: {
      title: "Whispers and Vows",
      type: "Historical romantic narrative",
      description: "Story of Edward and Aura exploring ethical progress, compassionate action, and transformative power of love and purpose in historical England",
      corePhilosophy: {
        ethicalProgress: "Deeply rooted in ethical progress, compassionate action, and transformative power of love and purpose. Both characters driven by desire to create 'better, freer life' while disillusioned by societal restrictions",
        healingThroughPurpose: "Core tenet of healing trauma through purpose and compassion. Aura finds strength and healing by immersing herself in charity work, transforming both herself and community into 'beacon of hope'",
        loveAsTransformativeForce: "Love acts as generative, transformative force enabling characters to confront tradition and tyranny, creating lasting legacy remembered for 'light and change they brought'",
        socialJustice: "Active transformation of community through establishing schools, hospitals, orphanages, employment programs for women, ensuring fair wages and ethical practices"
      },
      characters: {
        edward: "Brilliant, compassionate, protective with sharp mind for philosophy and ethical business. Felt sense of purpose from young age to protect Aura and others. Built trade empire based on ethical practices including profit-sharing with workers and safe conditions",
        aura: "Passionate about art, music, philosophy, and fashion. Contributes significantly to shared philosophy through intellectual sanctuary and charity work. Finds healing through helping others"
      },
      setting: {
        brightmoor: "Shared estate embodying their ideals: place of beauty, knowledge, progress, community, and sanctuary. Library serves as 'intellectual sanctuary' containing works on philosophy, science, law, economics, literature, poetry, including dedicated section for women's rights"
      },
      themes: {
        ethicalBusiness: "Edward's business guided by 'ethical business principles' refined through 'progressive, anti-slavery intellectual circles'",
        communityTransformation: "Joint legacy built on justice and beauty, running estate as beacon of 'fair employment, education, and compassion'",
        intellectualSanctuary: "Creation of spaces for learning, art, and progressive thought as foundation for social change",
        womenRights: "Active support for women's rights, employment programs, and educational opportunities"
      },
      significance: "Exemplifies how personal love and ethical conviction can create lasting social change, demonstrating integration of romantic narrative with social justice themes"
    },
    celesteAndWilliam: {
      title: "Celeste and William",
      type: "Historical war narrative",
      description: "Story exploring resilience, independence, and enduring power of human connection and creation in face of immense loss and societal pressures during wartime",
      corePhilosophy: {
        resilienceAndSurvival: "Centers on themes of resilience, independence, and enduring power of human connection and creation in face of immense loss and societal pressures",
        artisticExpression: "Art and intellectual work as fundamental means of processing suffering and making sense of existence, with creative expression serving as channel for grief and continuation of life",
        complexLoveAndGrief: "Emphasizes complex interplay of love, grief, and survival, exploring how individuals navigate historical upheaval and personal tragedy",
        meaningMaking: "Suggests that finding meaning through art, intellectual work, or relationships is fundamental aspect of human experience"
      },
      characters: {
        celeste: "Embodies fierce independence and artistic expression, defying societal expectations and traditional views. Chooses to shape own destiny through business empire and art. Paintings and films serve as outlets where soul speaks, depicting raw emotions and human pain as channel for grief. Embraces humanitarianism, dedicating fortune to aid others during wartime. Despite haunted by ghosts of past, driving principle is resolute continuation: 'what else is there to do?'",
        william: "Explores duty, introspection, and intellectual pursuit of understanding war, philosophy, and human nature. Thrust into significant responsibility by circumstance, questioning place in world and expectations of royal bloodline. Calm, composed demeanor hides deep internal struggle with war trauma and loss of friends. Writing becomes primary avenue for exploring complex themes. Characterized by deep moral code and loyalty to loved ones"
      },
      themes: {
        artisticProcessing: "Art and creative expression as means of processing trauma, grief, and continuing to live despite profound losses",
        intellectualReflection: "Power of intellect and reflection to process suffering and make sense of existence through writing and philosophical exploration",
        dutiesAndExpectations: "Navigation of societal and familial expectations, particularly royal bloodline responsibilities versus personal desires",
        wartimeHumanity: "Exploration of how individuals maintain humanity, morality, and connection during historical upheaval and war",
        independenceVsConnection: "Balance between fierce independence and need for human connection as grounding force"
      },
      relationshipDynamics: {
        groundingForce: "Their relationship serves as grounding force for William while being source of both solace and poignant reminder of loss for Celeste",
        sharedTrauma: "Both characters grapple with weight of past and pain of survival, finding meaning through different but complementary approaches",
        complementaryPhilosophies: "Celeste's artistic defiance complements William's intellectual introspection in processing shared historical trauma"
      },
      significance: "Explores how people navigate weight of past and pain of survival, demonstrating that meaning-making through art, intellectual work, and relationships is fundamental to human experience during times of historical upheaval"
    },
    thievesOfTime: {
      title: "Thieves of Time",
      type: "Science fiction series",
      description: "Exploring what it means to live across time without losing yourself, examining ethical dilemmas and existential questions in a future where time travel is real but highly regulated",
      corePhilosophy: {
        temporalIdentity: "Explores what it means to live across time without losing yourself, investigating how person's sense of self is shaped and maintained when moving through various eras and potentially adopting false personas",
        ethicalDilemmas: "Examines philosophy in broader sense, considering ethical dilemmas and existential questions around time travel and historical intervention",
        languageEvolution: "Considers how language might evolve or be perceived across different historical contexts when individuals traverse time",
        memoryAndContinuity: "Explores role memory plays in individual's continuity and understanding of history when living across timelines, particularly through characters with enhanced memory capabilities"
      },
      worldBuilding: {
        universalGovernment: "Set in future where time travel is real but highly regulated by oppressive Universal Government that considers tampering with timelines punishable and history sacred",
        timelinePreservation: "Foundational ethical dilemma: sanctity of history versus desire or need to interact with it. Protagonists adhere to unspoken rule: never damage timeline, suggesting philosophical stance on preservation of history even for those operating outside law",
        powerAndManipulation: "Universal Government discovered using timeline manipulation to erase dissent and control history itself, introducing profound philosophical conflict regarding truth, power, and freedom of historical narrative"
      },
      characters: {
        celeste: "Hides behind false name and many secrets, with real past being mystery even to many in The Circle. Fake identity eventually begins to unravel, putting her at odds with herself. Genetically enhanced with eidetic memory",
        robert: "Fellow rogue time-traveler operating outside law while maintaining ethical stance on timeline preservation",
        theCircle: "Morally gray resistance group investigating timeline manipulation, highlighting struggle between control and uncovering hidden truths"
      },
      themes: {
        identityAcrossTime: "How identity is maintained when moving through different historical eras and adopting false personas",
        sanctityOfHistory: "Tension between preserving historical integrity and need for intervention or interaction",
        powerAndTruth: "Struggle between governmental control of historical narrative and resistance efforts to uncover hidden truths",
        memoryAndSelf: "Role of memory in maintaining personal continuity across temporal experiences",
        ethicalTimeTravel: "Moral responsibilities of those who can traverse time, even when operating outside legal frameworks"
      },
      philosophicalFramework: {
        temporalEthics: "Series establishes complex ethical framework around time travel, balancing individual agency with historical preservation",
        identityTheory: "Explores philosophical questions of personal identity across temporal displacement and false personas",
        politicalPhilosophy: "Examines abuse of power through control of historical narrative and resistance against authoritarian manipulation of truth"
      },
      significance: "Combines science fiction concepts with deep philosophical exploration of identity, memory, ethics, and power, demonstrating how speculative fiction can examine fundamental questions about selfhood, truth, and responsibility across temporal contexts"
    },
    poetry: {
      scope: "Written across three languages",
      themes: "Identity, transcendence, and cultural memory",
      languages: "Persian, French, and English - each shaping distinct facets of creative voice"
    }
  },

  projects: {
    shadowline: {
      title: "Shadowline",
      type: "Gotham-inspired Writing Platform",
      description: "A sophisticated digital platform integrating multiple AI systems for narrative development, creative writing, and scholarly discourse",
      technologies: ["Next.js", "React", "TypeScript", "Multiple AI APIs", "Advanced Text Processing"],
      significance: "Living experiment in how philosophy and digital design can meet",
      philosophy: "Technology as amplifier of human creativity rather than replacement",
      features: ["Multi-AI integration", "Narrative development tools", "Scholarly writing assistance", "Creative workflow optimization"],
      userBase: "Writers, scholars, and creative practitioners seeking enhanced digital writing environments"
    },
    memoireEnLivres: {
      title: "Mémoire en Livres",
      type: "Digital Heritage Library Platform",
      description: "A digital heritage library preserving and organizing family literary collections with advanced search and analysis capabilities",
      focus: "French literature, family heritage preservation, digital archiving methodologies",
      significance: "Bridges personal heritage with broader cultural preservation efforts",
      technicalApproach: "Combines digital archiving with literary analysis tools",
      culturalImpact: "Preserves family literary traditions while making them accessible for future generations"
    },
    yexen: {
      title: "Yexen Jewelry Brand",
      type: "Material Practice and Wearable Poetry",
      description: "Each piece conceived as a fragment of a poetic narrative",
      philosophy: "Objects as carriers of aesthetic and philosophical meaning",
      approach: "Each piece embodies philosophical concepts through form, material, and symbolic content",
      significance: "Material practice extending artistic research into tangible forms",
      audience: "Those seeking meaningful, philosophically-informed aesthetic objects"
    },
    academicWriting: {
      title: "Scholarly Publications and Literary Analysis",
      type: "Academic Research and Critical Writing",
      description: "Ongoing scholarly work in philosophy, digital humanities, and aesthetic theory",
      publications: "Articles on aesthetic language, digital humanities methodologies, and interdisciplinary research",
      conferences: "Presentations at academic conferences on philosophy and digital humanities"
    }
  },

  technicalExpertise: {
    programming: {
      languages: [
        "TypeScript/JavaScript (intermediate to advanced)",
        "HTML/CSS (advanced, especially Tailwind)",
        "Python (for RAG, vector databases)",
        "Shell/CLI tools (learning through École 42)"
      ],
      frameworks: ["React", "Next.js 14 (core)", "Tailwind", "shadcn/ui", "Firebase (exploration)"],
      databases: ["Supabase/pgvector", "Pinecone", "ChromaDB for RAG"],
      tools: ["Git", "Multiple AI APIs integration", "Vector databases", "RAG frameworks"]
    },
    digitalHumanities: {
      customPlatforms: "Building Shadowline (multi-AI writing platform) and Mémoire en Livres (digital heritage library)",
      ragSystems: "NotebookLM-like RAG systems with LangChain, LlamaIndex",
      archivalMethods: "Digital preservation and organization of family literary collections",
      research: "Practice-based research methodology combining theory with technical implementation"
    },
    aiCollaboration: {
      platforms: "OpenAI GPT, Claude, Gemini with task routing integration in Shadowline",
      multimodalAI: "ElevenLabs for TTS, DALL·E for image generation",
      philosophy: "AI as collaborative partner in aesthetic co-creation rather than replacement tool",
      applications: "Multi-AI integration, narrative development, creative workflow optimization",
      ethics: "Treating AI systems as dialogue partners, emphasizing aesthetic engagement protocols"
    }
  },

  intellectualInfluences: {
    philosophy: {
      continental: "Heidegger, Merleau-Ponty, Gadamer - phenomenology and hermeneutics",
      aesthetics: "Adorno, Benjamin, Rancière - critical theory and aesthetic experience",
      language: "Wittgenstein, Derrida - philosophy of language and meaning",
      contemporary: "Current debates in digital humanities and technology philosophy"
    },
    interdisciplinary: {
      approach: "Drawing insights from archaeology, anthropology, literature, and technology studies",
      synthesis: "Creating new knowledge through combination of diverse methodological approaches"
    }
  },

  practicalSkills: {
    languages: {
      french: "Professional proficiency - academic and research contexts",
      english: "Native-level proficiency - academic writing and international collaboration",
      turkish: "Cultural and family heritage language",
      persian: "Native heritage language"
    },
    research: [
      "Qualitative and quantitative research methods",
      "Academic writing and publication",
      "Conference presentation and public speaking",
      "Grant writing and project management",
      "Cross-cultural and multilingual research"
    ],
    creative: [
      "Jewelry design and craftsmanship",
      "Creative writing and narrative development",
      "Digital art and design",
      "Curatorial and archival work"
    ]
  },

  academicCreativeConnection: {
    theoreticalFramework: {
      aestheticLanguageInPractice: "Five narrative universes serve as practical laboratories for theoretical frameworks developed in academic work, creating unique synthesis where philosophical inquiry and creative expression mutually inform and enrich each other",
      masterThesisManifestations: "Each narrative demonstrates how language transcends logical limitations to engage with realm of sensible - Shadows of Gotham shows aesthetic language through Liv's poetry as sanctuary for ineffable experiences; Bezothera treats emotions as aesthetic communication; Thieves of Time explores language evolution across temporal contexts",
      philosophicalArchitecture: "Synthesis of Wittgenstein, Deleuze, and Dewey creates narrative structure - language games establish meaning-making rules, difference and repetition manifest recurring themes across contexts, experiential pragmatism grounds stories in lived experience"
    },
    spatialInfluence: {
      sepandDaneshImpact: "Internship profoundly influences narrative construction - like wooden cubes gaining meaning through compositional context, characters and themes achieve significance through relational dynamics within universe frameworks",
      cornerPaintingsConcept: "Isolation and reflection creating meaning appears throughout work - characters in liminal spaces forging new identities and meanings, reflecting understanding of how individual elements gain meaning through context while contributing to unified wholes"
    },
    aiCollaborationIntegration: {
      aestheticEngagementInCreation: "Research on aesthetic engagement protocols directly influences creative process - narratives demonstrate same principles identified for AI collaboration, treating story elements as dialogue partners, creating intersubjective spaces where meaning emerges",
      practiceBasedResearch: "Creative work serves as testing ground for theories about how philosophy, art, and AI converge to create new forms of meaning"
    },
    culturalTranslation: {
      multilingualIdentity: "Persian heritage and multilingual capability create unique perspectives informing both academic and creative work",
      childOfTwoWorlds: "Theme mirrors own experience bridging Persian intellectual traditions with European academic discourse, phenomenology of multilingual meaning-making becomes lived reality in characters navigating multiple identities",
      temporalEcologies: "Three temporal modes (reading, translation, writing) structure creative work across different time periods and futures"
    },
    innovativeMethodology: {
      proofOfConcept: "Creative work serves as proof-of-concept for academic theories about convergence of philosophy, art, and AI",
      knowledgeCreation: "Stories don't merely illustrate academic concepts but actively extend and develop them, creating new knowledge through creative process itself",
      interdisciplinaryBoundaries: "Represents innovation where boundaries between theory and practice, philosophy and art, research and creation become productive rather than limiting"
    },
    significance: "Demonstrates how narrative universes become testing grounds for ideas about aesthetic language, temporal consciousness, cultural translation, and relationship between individual identity and larger systems, contributing to understanding of human meaning-making in digital contexts"
  },

  workingPhilosophy: {
    coreBeliefs: [
      "Technology should enhance rather than replace human creativity and wisdom",
      "Interdisciplinary work reveals dimensions invisible to single-discipline approaches",
      "Aesthetic experience contains forms of knowledge inaccessible to purely rational discourse",
      "Digital tools can preserve and transmit cultural heritage while opening new possibilities",
      "Academic work should engage with real-world applications and creative practice"
    ],
    methodology: "Combining rigorous theoretical investigation with hands-on creative and technical work",
    goals: "Contributing to understanding of human meaning-making in digital contexts while preserving cultural heritage and wisdom traditions"
  },

  currentContext: {
    academicGoals: "Pursuing advanced research in philosophy with focus on aesthetic theory and digital applications",
    professionalInterests: "Academic research, digital humanities consulting, creative practice",
    collaborationInterests: "Interdisciplinary projects, AI ethics, cultural preservation, creative technology",
    futureDirections: "PhD research, continued creative practice, development of innovative digital humanities methodologies"
  }
};

export async function POST(request: NextRequest) {
  try {
    const { question, context, conversationHistory } = await request.json();
    console.log('Q&A API called with question:', question);

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    let answer: string;

    // Try OpenAI first, fallback to knowledge base
    try {
      answer = await generateAnswerWithOpenAI(question, context, conversationHistory);
    } catch (error) {
      console.log('OpenAI failed, using knowledge base fallback:', error);
      try {
        answer = await generateAnswer(question, context, conversationHistory);
      } catch (fallbackError) {
        console.error('Knowledge base fallback also failed:', fallbackError);
        answer = `I can help you learn about Yekta's research in digital humanities and philosophy, their projects (Shadowline, Mémoire en Livres, Yexen), technical skills, academic background, and approach to interdisciplinary research. What specific aspect would you like to know more about?`;
      }
    }

    console.log('Q&A API returning answer:', answer.substring(0, 100) + '...');
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Q&A Assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    );
  }
}

async function generateAnswer(question: string, context: string, conversationHistory: any[]): Promise<string> {
  const lowerQuestion = question.toLowerCase();

  // Master's thesis and aesthetic language questions
  if (lowerQuestion.includes('thesis') || lowerQuestion.includes('master') || lowerQuestion.includes('aesthetic language')) {
    const thesis = KNOWLEDGE_BASE.education.masterThesis;
    const core = KNOWLEDGE_BASE.research.masterThesisCore;
    const framework = KNOWLEDGE_BASE.research.theoreticalFramework;

    if (lowerQuestion.includes('definition') || lowerQuestion.includes('define') || lowerQuestion.includes('what is')) {
      return `${core.aestheticDefinition}. ${core.aestheticLanguageDefinition}. The work asks: ${core.coreQuestion} It explores ${core.mainTheme}, drawing from ${core.wittgensteinFoundation}.`;
    }
    if (lowerQuestion.includes('mystical') || lowerQuestion.includes('ineffable') || lowerQuestion.includes('sensible')) {
      return `${core.mysticalConcept}. ${core.laterWittgenstein}. Yekta ${core.deleuzeConnection}, creating a bridge between analytic and continental philosophy.`;
    }
    if (lowerQuestion.includes('philosopher') || lowerQuestion.includes('wittgenstein') || lowerQuestion.includes('deleuze') || lowerQuestion.includes('dewey')) {
      const commonalities = framework.philosophicalCommonalities;
      return `${core.philosophicalSynthesis}. All three share ${commonalities.antiEssentialism}: ${commonalities.wittgensteinAntiEssential}; ${commonalities.deweyAntiEssential}; ${commonalities.deleuzeAntiEssential}. They agree that ${commonalities.fluidMeaning} and that ${commonalities.activeLanguage}.`;
    }
    if (lowerQuestion.includes('art') || lowerQuestion.includes('interplay') || lowerQuestion.includes('language and art')) {
      return `The thesis ${core.languageArtInterplay}. This demonstrates how ${framework.examplesImportance}, with examples like ${KNOWLEDGE_BASE.research.illustrativeExamples.sisyphusExample}.`;
    }
    return `Yekta's Master's thesis "${thesis.title}" at ${thesis.university} received a grade of ${thesis.grade}. ${core.mainTheme}. The work ${core.philosophicalSynthesis}, exploring how language can transcend logical limitations to engage with the realm of the sensible.`;
  }

  // Sepand Danesh internship and studio experience
  if (lowerQuestion.includes('sepand') || lowerQuestion.includes('danesh') || lowerQuestion.includes('internship') || lowerQuestion.includes('studio') || lowerQuestion.includes('faire corps')) {
    const studio = KNOWLEDGE_BASE.studioExperience.sepandDaneshInternship;
    return `Yekta completed a ${studio.duration} with ${studio.artist}. ${studio.artistBackground}. The practical work involved ${studio.practicalWork}. ${studio.sculpturesConcept}. Key insight: ${studio.keyInsight}. The corner paintings connect to the ${studio.linguisticConnection}. This experience ${studio.researchImpact}.`;
  }

  // AI research and aesthetic engagement protocols
  if (lowerQuestion.includes('ai') && (lowerQuestion.includes('protocol') || lowerQuestion.includes('engagement') || lowerQuestion.includes('interaction') || lowerQuestion.includes('research'))) {
    const ai = KNOWLEDGE_BASE.aiResearchFramework.aestheticEngagementProtocols;
    return `Yekta developed a ${ai.definition}. The theoretical basis ${ai.theoreticalBasis}. Methodology includes ${ai.methodology}. Through ${KNOWLEDGE_BASE.aiResearchFramework.researchScope}, observed patterns include ${ai.observedPatterns}. Key insight: ${ai.keyInsight}. ${ai.philosophicalImplication}.`;
  }

  // Research focus and methodology questions
  if (lowerQuestion.includes('research') && (lowerQuestion.includes('focus') || lowerQuestion.includes('methodology') || lowerQuestion.includes('approach'))) {
    const research = KNOWLEDGE_BASE.research;
    return `Yekta's research addresses core questions including: ${research.coreQuestions.join('; ')}. Their methodology involves ${research.methodology.approach}, drawing from ${research.methodology.influences}. Current investigations include ${research.currentInvestigations.slice(0, 2).join(' and ')}.`;
  }

  // Wittgenstein, mystical, language games
  if (lowerQuestion.includes('wittgenstein') || lowerQuestion.includes('mystical') || lowerQuestion.includes('language game')) {
    const core = KNOWLEDGE_BASE.research.masterThesisCore;
    return `Yekta's work builds on ${core.wittgensteinFoundation}. The research explores Wittgenstein's concept of the 'mystical' as what lies beyond language's logical structure, while his later philosophy emphasizes how meaning emerges through use in specific contexts. This connects to Yekta's argument that ${core.aestheticLanguageDefinition}.`;
  }

  // Trauma, expression, language failure
  if (lowerQuestion.includes('trauma') || lowerQuestion.includes('expression') || lowerQuestion.includes('language fail')) {
    const studio = KNOWLEDGE_BASE.studioExperience.sepandDaneshInternship;
    return `Through the studio internship with Sepand Danesh, Yekta explored how ${studio.keyInsight}. ${studio.artistBackground}. This illuminated connections between trauma, expression, spatial perception, and philosophical inquiry, demonstrating how visual forms can capture experiences that escape verbal articulation.`;
  }

  // Cubes, voxels, spatial philosophy
  if (lowerQuestion.includes('cube') || lowerQuestion.includes('voxel') || lowerQuestion.includes('spatial') || lowerQuestion.includes('corner')) {
    const studio = KNOWLEDGE_BASE.studioExperience.sepandDaneshInternship;
    return `Yekta's practical experience involved ${studio.practicalWork}. ${studio.sculpturesConcept}. ${studio.meaningMaking}. The artist's philosophy: ${studio.spatialPhilosophy}. This work ${studio.temporalFramework} and ${studio.languagePhilosophy}.`;
  }

  // Philosophical influences and theoretical framework
  if (lowerQuestion.includes('philosophy') || lowerQuestion.includes('philosophical') || lowerQuestion.includes('theoretical')) {
    const influences = KNOWLEDGE_BASE.intellectualInfluences.philosophy;
    const framework = KNOWLEDGE_BASE.research.theoreticalFramework;
    const core = KNOWLEDGE_BASE.research.masterThesisCore;
    return `Yekta's philosophical work ${core.philosophicalSynthesis}. Drawing from ${influences.continental} in phenomenology, ${influences.aesthetics} in critical theory, and ${influences.language} in language philosophy. Their theoretical framework explores ${framework.aestheticLanguage}, emphasizing how ${framework.spatialPhilosophy}.`;
  }

  // Shadowline detailed questions
  if (lowerQuestion.includes('shadowline')) {
    const project = KNOWLEDGE_BASE.projects.shadowline;
    return `Shadowline is ${project.description}. Built with ${project.technologies.join(', ')}, it features ${project.features.join(', ')}. The project embodies Yekta's philosophy that ${project.philosophy}, serving ${project.userBase}. ${project.significance}.`;
  }

  // Mémoire en Livres detailed questions
  if (lowerQuestion.includes('mémoire') || lowerQuestion.includes('memoire') || lowerQuestion.includes('livres') || lowerQuestion.includes('heritage')) {
    const project = KNOWLEDGE_BASE.projects.memoireEnLivres;
    return `${project.title} is ${project.description}, focusing on ${project.focus}. ${project.significance} through ${project.technicalApproach}. ${project.culturalImpact}.`;
  }

  // Yexen jewelry and creative practice
  if (lowerQuestion.includes('yexen') || lowerQuestion.includes('jewelry') || lowerQuestion.includes('creative practice')) {
    const project = KNOWLEDGE_BASE.projects.yexen;
    return `Yexen represents ${project.description}. The philosophy behind this work is that ${project.philosophy}. ${project.approach}, ${project.significance}. This appeals to ${project.audience}.`;
  }

  // Technical expertise and programming
  if (lowerQuestion.includes('technical') || lowerQuestion.includes('programming') || lowerQuestion.includes('coding') || lowerQuestion.includes('development')) {
    const tech = KNOWLEDGE_BASE.technicalExpertise;
    return `Yekta's technical expertise spans ${tech.programming.languages.join(', ')} programming languages, ${tech.programming.frameworks.join(', ')} frameworks, and ${tech.programming.databases.join(', ')} databases. In digital humanities, they specialize in ${tech.digitalHumanities.customPlatforms}, ${tech.digitalHumanities.ragSystems}, and ${tech.digitalHumanities.archivalMethods}.`;
  }

  // AI collaboration and ethics
  if (lowerQuestion.includes('ai') || lowerQuestion.includes('artificial intelligence') || lowerQuestion.includes('collaboration')) {
    const ai = KNOWLEDGE_BASE.technicalExpertise.aiCollaboration;
    return `Yekta works with ${ai.platforms}, with a philosophy that views ${ai.philosophy}. Their applications include ${ai.applications}, and they are ${ai.ethics}. This reflects their broader belief that technology should enhance rather than replace human creativity.`;
  }

  // Archaeological background
  if (lowerQuestion.includes('archaeology') || lowerQuestion.includes('archaeological') || lowerQuestion.includes('excavation') || lowerQuestion.includes('fieldwork')) {
    const arch = KNOWLEDGE_BASE.education.archaeology;
    return `Yekta holds an ${arch.degree} from ${arch.university}, specializing in ${arch.specialization}. They have ${arch.fieldworkExperience} and developed expertise in ${arch.skills}. This archaeological background informs their interdisciplinary approach to cultural analysis and heritage preservation.`;
  }

  // Language skills and multilingual research
  if (lowerQuestion.includes('language') && !lowerQuestion.includes('programming') && !lowerQuestion.includes('aesthetic language')) {
    const langs = KNOWLEDGE_BASE.practicalSkills.languages;
    return `Yekta speaks French (${langs.french}), English (${langs.english}), Turkish (${langs.turkish}), and Persian (${langs.persian}). This multilingual capability supports their international research collaboration and cross-cultural academic work.`;
  }

  // Educational background comprehensive
  if (lowerQuestion.includes('education') || lowerQuestion.includes('academic background') || lowerQuestion.includes('university')) {
    const ed = KNOWLEDGE_BASE.education;
    return `Yekta's educational journey includes an M.A. in Archaeology from University of Tehran, M1 Philosophy at Université Paris 8 (${ed.philosophy.focus}), and is currently completing a Master's in Digital Humanities at Université Paris 8. Their thesis "${ed.masterThesis.title}" received ${ed.masterThesis.grade}.`;
  }

  // Working philosophy and core beliefs
  if (lowerQuestion.includes('philosophy') && (lowerQuestion.includes('working') || lowerQuestion.includes('belief') || lowerQuestion.includes('approach'))) {
    const wp = KNOWLEDGE_BASE.workingPhilosophy;
    return `Yekta's working philosophy is guided by core beliefs: ${wp.coreBeliefs.slice(0, 3).join('; ')}. Their methodology involves ${wp.methodology}, with goals of ${wp.goals}.`;
  }

  // Current context and future directions
  if (lowerQuestion.includes('current') || lowerQuestion.includes('future') || lowerQuestion.includes('goals') || lowerQuestion.includes('direction')) {
    const current = KNOWLEDGE_BASE.currentContext;
    return `Currently, Yekta is ${current.academicGoals}. Their professional interests include ${current.professionalInterests}, with collaboration interests in ${current.collaborationInterests}. Future directions involve ${current.futureDirections}.`;
  }

  // Contact and collaboration
  if (lowerQuestion.includes('contact') || lowerQuestion.includes('email') || lowerQuestion.includes('collaboration') || lowerQuestion.includes('reach')) {
    const personal = KNOWLEDGE_BASE.personal;
    const collab = KNOWLEDGE_BASE.currentContext.collaborationInterests;
    return `You can contact Yekta at ${personal.email} or ${personal.phone}. They're located at ${personal.location} and are particularly interested in collaborations involving ${collab}.`;
  }

  // Projects overview
  if (lowerQuestion.includes('projects') && !lowerQuestion.includes('shadowline') && !lowerQuestion.includes('yexen') && !lowerQuestion.includes('mémoire')) {
    return `Yekta's major projects include: Shadowline (comprehensive writing and narrative platform), Mémoire en Livres (digital heritage library), Yexen (jewelry as wearable poetry), and ongoing scholarly publications. Each project demonstrates their interdisciplinary approach combining philosophy, technology, and creative practice.`;
  }

  // Skills comprehensive overview
  if (lowerQuestion.includes('skills') || lowerQuestion.includes('abilities') || lowerQuestion.includes('expertise')) {
    const practical = KNOWLEDGE_BASE.practicalSkills;
    return `Yekta's skills span research (${practical.research.slice(0, 3).join(', ')}), creative practice (${practical.creative.join(', ')}), and technical expertise. This interdisciplinary skill set enables their unique approach to digital humanities and philosophical research.`;
  }

  // Academic-Creative Connection
  if (lowerQuestion.includes('connection') && (lowerQuestion.includes('academic') || lowerQuestion.includes('literary') || lowerQuestion.includes('creative') || lowerQuestion.includes('narrative'))) {
    const connection = KNOWLEDGE_BASE.academicCreativeConnection;
    if (lowerQuestion.includes('theory') || lowerQuestion.includes('thesis') || lowerQuestion.includes('aesthetic language')) {
      const theory = connection.theoreticalFramework;
      return `${theory.aestheticLanguageInPractice}. ${theory.masterThesisManifestations}. ${theory.philosophicalArchitecture}.`;
    }
    if (lowerQuestion.includes('sepand') || lowerQuestion.includes('spatial') || lowerQuestion.includes('sculpture')) {
      const spatial = connection.spatialInfluence;
      return `${spatial.sepandDaneshImpact}. ${spatial.cornerPaintingsConcept}.`;
    }
    if (lowerQuestion.includes('ai') || lowerQuestion.includes('collaboration')) {
      const ai = connection.aiCollaborationIntegration;
      return `${ai.aestheticEngagementInCreation}. ${ai.practiceBasedResearch}.`;
    }
    if (lowerQuestion.includes('culture') || lowerQuestion.includes('persian') || lowerQuestion.includes('multilingual')) {
      const cultural = connection.culturalTranslation;
      return `${cultural.multilingualIdentity}. ${cultural.childOfTwoWorlds}. ${cultural.temporalEcologies}.`;
    }
    if (lowerQuestion.includes('methodology') || lowerQuestion.includes('innovation') || lowerQuestion.includes('boundary')) {
      const method = connection.innovativeMethodology;
      return `${method.proofOfConcept}. ${method.knowledgeCreation}. ${method.interdisciplinaryBoundaries}.`;
    }
    return `${connection.significance}. Yekta's five narrative universes serve as practical laboratories for theoretical frameworks, creating unique synthesis where philosophical inquiry and creative expression mutually inform and enrich each other.`;
  }

  // Interdisciplinary approach
  if (lowerQuestion.includes('interdisciplinary') || lowerQuestion.includes('multidisciplinary') || lowerQuestion.includes('cross-disciplinary')) {
    const influences = KNOWLEDGE_BASE.intellectualInfluences.interdisciplinary;
    return `Yekta's interdisciplinary approach involves ${influences.approach}, with the goal of ${influences.synthesis}. This methodology bridges archaeology, philosophy, digital humanities, and creative practice to reveal new dimensions of understanding.`;
  }

  // Shadows of Gotham philosophy and narrative themes
  if (lowerQuestion.includes('shadows of gotham') || lowerQuestion.includes('gotham') && !lowerQuestion.includes('bezothera') || lowerQuestion.includes('zoroastrian')) {
    const creative = KNOWLEDGE_BASE.creativeWork.shadowsOfGotham;
    if (lowerQuestion.includes('philosophy') || lowerQuestion.includes('duality') || lowerQuestion.includes('balance') || lowerQuestion.includes('morality')) {
      const phil = creative.corePhilosophy;
      return `The philosophy of Shadows of Gotham centers on ${phil.dualityAndBalance}. Key concepts include ${phil.selfMadeIdentity}, and ${phil.redefinedMorality}. The narrative explores how ${phil.languageAsPower}, while emphasizing that ${phil.vulnerabilityAsStrength}.`;
    }
    if (lowerQuestion.includes('character') || lowerQuestion.includes('liv') || lowerQuestion.includes('liv freya') || lowerQuestion.includes('nomad')) {
      const chars = creative.keyCharacters;
      return `The central character ${chars.livFreya}. The narrative explores ${chars.philosophicalThemes}, demonstrating ${creative.narrativeStyle}.`;
    }
    if (lowerQuestion.includes('heaven') || lowerQuestion.includes('hell') || lowerQuestion.includes('cage') || lowerQuestion.includes('freedom')) {
      return `A profound philosophical concept in Shadows of Gotham is ${creative.corePhilosophy.heavenAsCage}. This reflects the narrative's core theme of choosing authentic existence over imposed expectations.`;
    }
    return `${creative.title} is a ${creative.type} ${creative.description}. This work represents a ${creative.significance}, exploring ${creative.narrativeStyle} through seven core philosophical concepts including duality and balance, self-made identity, and redefined morality.`;
  }

  // Bezothera science fiction universe
  if (lowerQuestion.includes('bezothera') || lowerQuestion.includes('bezotheran') || lowerQuestion.includes('selene') && !lowerQuestion.includes('gotham')) {
    const bezothera = KNOWLEDGE_BASE.creativeWork.bezothera;
    if (lowerQuestion.includes('philosophy') || lowerQuestion.includes('emotion') || lowerQuestion.includes('love') || lowerQuestion.includes('feeling')) {
      const phil = bezothera.corePhilosophy;
      return `Bezothera's core philosophy centers on ${phil.emotionAsPower}. They believe that ${phil.sacredLove}. Their spiritual practices include ${phil.auroraSacred}, and their society is built on ${phil.balanceAndControl}.`;
    }
    if (lowerQuestion.includes('society') || lowerQuestion.includes('matriarch') || lowerQuestion.includes('government') || lowerQuestion.includes('culture')) {
      const society = bezothera.society;
      return `Bezotheran society features ${society.matriarchalLeadership}. Their governance system involves ${society.empathicGovernance}. They remain a ${society.hiddenInfluence}. In warfare, ${society.emotionalWarfare}.`;
    }
    if (lowerQuestion.includes('character') || lowerQuestion.includes('selene') || lowerQuestion.includes('dual') || lowerQuestion.includes('half')) {
      const char = bezothera.keyCharacters;
      const themes = bezothera.mainThemes;
      return `${char.selene}. This reflects the major theme of ${themes.dualIdentity}, exploring how characters are ${themes.dutyVersusChoice}.`;
    }
    if (lowerQuestion.includes('theme') || lowerQuestion.includes('main') || lowerQuestion.includes('central')) {
      const themes = bezothera.mainThemes;
      return `Bezothera explores themes including ${themes.emotionAsWisdom}, ${themes.eternalLove}, ${themes.dutyVersusChoice}, and ${themes.dualIdentity}. These themes reflect the complex philosophical framework of a civilization that views emotions as the fundamental force of existence.`;
    }
    return `${bezothera.title} is a ${bezothera.type} that ${bezothera.description}. It explores an advanced alien civilization where emotions are viewed as the most powerful force in existence, featuring a matriarchal society with empathic governance and themes of eternal love, duty versus choice, and dual identity.`;
  }

  // Whispers and Vows historical romantic narrative
  if (lowerQuestion.includes('whispers and vows') || lowerQuestion.includes('edward') || lowerQuestion.includes('aura') || lowerQuestion.includes('brightmoor')) {
    const whispers = KNOWLEDGE_BASE.creativeWork.whispersAndVows;
    if (lowerQuestion.includes('philosophy') || lowerQuestion.includes('ethical') || lowerQuestion.includes('progress') || lowerQuestion.includes('compassion')) {
      const phil = whispers.corePhilosophy;
      return `Whispers and Vows is ${phil.ethicalProgress}. The story demonstrates ${phil.healingThroughPurpose}. Central to the narrative is how ${phil.loveAsTransformativeForce}, with characters engaging in ${phil.socialJustice}.`;
    }
    if (lowerQuestion.includes('character') || lowerQuestion.includes('edward') || lowerQuestion.includes('aura')) {
      const chars = whispers.characters;
      return `Edward is ${chars.edward}. Aura is ${chars.aura}. Together they create a partnership that exemplifies the story's core philosophy of ethical progress and transformative love.`;
    }
    if (lowerQuestion.includes('brightmoor') || lowerQuestion.includes('estate') || lowerQuestion.includes('setting') || lowerQuestion.includes('sanctuary')) {
      const setting = whispers.setting;
      return `Brightmoor is their ${setting.brightmoor}. This estate serves as a physical manifestation of their shared ideals and commitment to social transformation.`;
    }
    if (lowerQuestion.includes('theme') || lowerQuestion.includes('business') || lowerQuestion.includes('women') || lowerQuestion.includes('community')) {
      const themes = whispers.themes;
      return `Key themes include ${themes.ethicalBusiness}, ${themes.communityTransformation}, ${themes.intellectualSanctuary}, and ${themes.womenRights}. The story demonstrates how personal conviction can drive social change.`;
    }
    return `${whispers.title} is a ${whispers.type} that ${whispers.description}. ${whispers.significance}, showcasing how love and ethical conviction can transform both personal lives and broader community structures in historical England.`;
  }

  // Celeste and William historical war narrative
  if (lowerQuestion.includes('celeste and william') || lowerQuestion.includes('celeste') || lowerQuestion.includes('william') && !lowerQuestion.includes('whispers')) {
    const celesteWilliam = KNOWLEDGE_BASE.creativeWork.celesteAndWilliam;
    if (lowerQuestion.includes('philosophy') || lowerQuestion.includes('resilience') || lowerQuestion.includes('grief') || lowerQuestion.includes('survival')) {
      const phil = celesteWilliam.corePhilosophy;
      return `Celeste and William's story ${phil.resilienceAndSurvival}. The narrative demonstrates how ${phil.artisticExpression}. Central to their story is ${phil.complexLoveAndGrief}, and ${phil.meaningMaking}.`;
    }
    if (lowerQuestion.includes('character') || lowerQuestion.includes('celeste') || lowerQuestion.includes('william')) {
      const chars = celesteWilliam.characters;
      if (lowerQuestion.includes('celeste')) {
        return `Celeste ${chars.celeste}. Her philosophy embodies fierce independence and humanitarian action during wartime.`;
      }
      if (lowerQuestion.includes('william')) {
        return `William ${chars.william}. His approach emphasizes intellectual processing of trauma and moral responsibility.`;
      }
      return `Celeste ${chars.celeste} William ${chars.william} Together they represent complementary approaches to processing shared historical trauma.`;
    }
    if (lowerQuestion.includes('theme') || lowerQuestion.includes('art') || lowerQuestion.includes('war') || lowerQuestion.includes('trauma')) {
      const themes = celesteWilliam.themes;
      return `Key themes include ${themes.artisticProcessing}, ${themes.intellectualReflection}, ${themes.dutiesAndExpectations}, ${themes.wartimeHumanity}, and ${themes.independenceVsConnection}. The story explores how individuals maintain humanity during historical upheaval.`;
    }
    if (lowerQuestion.includes('relationship') || lowerQuestion.includes('dynamic') || lowerQuestion.includes('connection')) {
      const dynamics = celesteWilliam.relationshipDynamics;
      return `${dynamics.groundingForce}. ${dynamics.sharedTrauma}, with ${dynamics.complementaryPhilosophies}. Their relationship demonstrates the complex balance between independence and human connection.`;
    }
    return `${celesteWilliam.title} is a ${celesteWilliam.type} that ${celesteWilliam.description}. ${celesteWilliam.significance}, focusing on how art, intellectual work, and relationships serve as fundamental means of processing trauma and finding meaning during wartime.`;
  }

  // Thieves of Time science fiction series
  if (lowerQuestion.includes('thieves of time') || lowerQuestion.includes('time travel') || lowerQuestion.includes('temporal') || lowerQuestion.includes('the circle') && lowerQuestion.includes('time')) {
    const thievesOfTime = KNOWLEDGE_BASE.creativeWork.thievesOfTime;
    if (lowerQuestion.includes('philosophy') || lowerQuestion.includes('identity') || lowerQuestion.includes('memory') || lowerQuestion.includes('ethics')) {
      const phil = thievesOfTime.corePhilosophy;
      const framework = thievesOfTime.philosophicalFramework;
      return `Thieves of Time ${phil.temporalIdentity}. The series ${phil.ethicalDilemmas} and ${phil.memoryAndContinuity}. The philosophical framework includes ${framework.temporalEthics}, ${framework.identityTheory}, and ${framework.politicalPhilosophy}.`;
    }
    if (lowerQuestion.includes('world') || lowerQuestion.includes('government') || lowerQuestion.includes('timeline') || lowerQuestion.includes('history')) {
      const world = thievesOfTime.worldBuilding;
      return `The series is ${world.universalGovernment}. This creates ${world.timelinePreservation}. A major plot element reveals ${world.powerAndManipulation}, creating complex ethical tensions around historical truth and governmental control.`;
    }
    if (lowerQuestion.includes('character') || lowerQuestion.includes('celeste') || lowerQuestion.includes('robert') || lowerQuestion.includes('circle')) {
      const chars = thievesOfTime.characters;
      if (lowerQuestion.includes('celeste')) {
        return `In Thieves of Time, Celeste ${chars.celeste}. Her character explores themes of identity, memory, and the psychological effects of temporal displacement.`;
      }
      if (lowerQuestion.includes('robert')) {
        return `Robert is a ${chars.robert}. He represents the ethical dimension of rogue time travel.`;
      }
      if (lowerQuestion.includes('circle')) {
        return `The Circle is a ${chars.theCircle}. They represent the resistance against authoritarian control of historical narrative.`;
      }
      return `Key characters include Celeste (identity and memory focus), Robert (ethical time traveler), and The Circle (resistance group investigating timeline manipulation).`;
    }
    if (lowerQuestion.includes('theme') || lowerQuestion.includes('time') || lowerQuestion.includes('power') || lowerQuestion.includes('truth')) {
      const themes = thievesOfTime.themes;
      return `Major themes include ${themes.identityAcrossTime}, ${themes.sanctityOfHistory}, ${themes.powerAndTruth}, ${themes.memoryAndSelf}, and ${themes.ethicalTimeTravel}. The series examines fundamental questions about selfhood, truth, and responsibility across temporal contexts.`;
    }
    return `${thievesOfTime.title} is a ${thievesOfTime.type} that ${thievesOfTime.description}. ${thievesOfTime.significance}, using time travel as a vehicle to explore deep philosophical questions about identity, memory, ethics, and the nature of historical truth.`;
  }

  // Poetry and multilingual work
  if (lowerQuestion.includes('poetry') || lowerQuestion.includes('poem') || lowerQuestion.includes('three languages')) {
    const poetry = KNOWLEDGE_BASE.creativeWork.poetry;
    const personal = KNOWLEDGE_BASE.personal;
    return `Yekta's poetry is ${poetry.scope}, exploring themes of ${poetry.themes}. ${personal.languageProfile}. This multilingual approach allows for different dimensions of expression and meaning-making across cultural contexts.`;
  }

  // École 42 and computer science background
  if (lowerQuestion.includes('école 42') || lowerQuestion.includes('computer science') || lowerQuestion.includes('technical') && lowerQuestion.includes('education')) {
    const cs = KNOWLEDGE_BASE.education.computerScience;
    return `Yekta pursued ${cs.focus} at ${cs.institution}. This ${cs.significance}, enabling a unique approach that bridges philosophical inquiry with practical technical implementation in projects like Shadowline and digital humanities research.`;
  }

  // Cultural heritage and Persian influences
  if (lowerQuestion.includes('iranian') || lowerQuestion.includes('persian') || lowerQuestion.includes('heritage') || lowerQuestion.includes('cultural') || lowerQuestion.includes('hafez') || lowerQuestion.includes('rumi') || lowerQuestion.includes('zoroastrian')) {
    const heritage = KNOWLEDGE_BASE.personal.culturalHeritage;
    return `Yekta has ${heritage.iranianInfluences}. ${heritage.linguisticHeritage}. Their ${heritage.migrationExperience}, and their ${heritage.culturalBridging}. This cultural foundation deeply informs their philosophical work and aesthetic theory.`;
  }

  // Future plans and PhD applications
  if (lowerQuestion.includes('phd') || lowerQuestion.includes('future') && lowerQuestion.includes('plan') || lowerQuestion.includes('next step') || lowerQuestion.includes('2025')) {
    const plans = KNOWLEDGE_BASE.personal.futurePlans;
    return `Yekta is ${plans.phdApplications}. Their research direction involves ${plans.researchDirection}. Academic goals include ${plans.academicGoals}. This represents a natural continuation of their interdisciplinary approach combining philosophy, digital humanities, and creative practice.`;
  }

  // Collaborations with Ali Moini and Sepand Danesh
  if (lowerQuestion.includes('collaboration') || lowerQuestion.includes('ali moini') || lowerQuestion.includes('choreographic')) {
    return `Yekta has contributed to the studio practice of visual artist Sepand Danesh and participated in choreographic explorations with Ali Moini. These collaborative experiences shaped their understanding of how aesthetic meaning emerges across different media and informed their interdisciplinary research approach.`;
  }

  // AI-generated images and aesthetic co-creation
  if (lowerQuestion.includes('ai') && (lowerQuestion.includes('image') || lowerQuestion.includes('video') || lowerQuestion.includes('co-creation'))) {
    const personal = KNOWLEDGE_BASE.personal;
    return `Yekta integrates AI-generated images and videos into their research as experiments in aesthetic co-creation, positioning technology as a collaborator rather than a tool. This approach aligns with their ${personal.currentVision} and demonstrates practical applications of their aesthetic engagement protocols.`;
  }

  // General/introductory questions
  if (lowerQuestion.includes('who') || lowerQuestion.includes('tell me about') || lowerQuestion.includes('introduce')) {
    const personal = KNOWLEDGE_BASE.personal;
    const research = KNOWLEDGE_BASE.research;
    return `Yekta Jokar is a ${personal.title} who ${personal.identity}. ${personal.currentStatus}, ${personal.languageProfile}. Their work addresses fundamental questions about ${research.coreQuestions[0]} ${personal.currentVision}.`;
  }

  // Default response with enhanced context
  return `I can help you learn about Yekta's interdisciplinary research spanning philosophy, digital humanities, and creative practice. Topics include their Master's thesis on aesthetic language (grade 18/20), projects like Shadowline and Mémoire en Livres, archaeological background, multilingual capabilities, AI collaboration philosophy, and current work bridging ancient wisdom with contemporary technology. What specific aspect interests you?`;
}

async function generateAnswerWithOpenAI(question: string, context: string, conversationHistory: any[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const knowledgeContext = JSON.stringify(KNOWLEDGE_BASE, null, 2);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant answering questions about Yekta's academic work and projects.
                   Use this knowledge base: ${knowledgeContext}
                   Be informative, professional, and accurate. If you don't know something, say so.
                   Keep responses concise but comprehensive.`,
        },
        ...conversationHistory.map(msg => ({
          role: msg.type === 'question' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}