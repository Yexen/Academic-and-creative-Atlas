import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the knowledge base JSON file
const KNOWLEDGE_BASE_PATH = path.join(process.cwd(), 'src', 'data', 'knowledge-base.json');
const DOCUMENTS_PATH = path.join(process.cwd(), 'src', 'data', 'documents.json');

// Load knowledge base from JSON file
function getKnowledgeBase() {
  try {
    if (!fs.existsSync(KNOWLEDGE_BASE_PATH)) {
      throw new Error('Knowledge base file not found');
    }
    const fileContent = fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading knowledge base:', error);
    // Return basic fallback structure
    return {
      personal: {
        name: "Yekta Jokar",
        title: "Philosopher, Writer, and Interdisciplinary Artist"
      },
      education: {
        masterThesis: {
          title: "Aesthetic Language: The Interplay Between Language, Art, and the Sensible",
          university: "Université Paris 8",
          grade: "18/20 (Distinction)"
        }
      },
      research: {
        coreQuestions: ["How does language transcend logical limitations?"]
      }
    };
  }
}

// Load documents from JSON file
function getDocuments() {
  try {
    if (!fs.existsSync(DOCUMENTS_PATH)) {
      return [];
    }
    const fileContent = fs.readFileSync(DOCUMENTS_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading documents:', error);
    return [];
  }
}

// Search documents for relevant content based on question
function searchDocuments(question: string) {
  const documents = getDocuments();
  const lowerQuestion = question.toLowerCase();

  return documents.filter(doc => {
    const searchableText = `${doc.title} ${doc.content} ${doc.category} ${doc.tags.join(' ')}`.toLowerCase();
    return searchableText.includes(lowerQuestion) ||
           doc.tags.some(tag => lowerQuestion.includes(tag.toLowerCase())) ||
           lowerQuestion.split(' ').some(word => searchableText.includes(word));
  });
}

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
  const KNOWLEDGE_BASE = getKnowledgeBase();

  // Search for relevant documents
  const relevantDocuments = searchDocuments(question);
  let documentContext = '';

  if (relevantDocuments.length > 0) {
    documentContext = '\n\nFrom custom documents:\n' +
      relevantDocuments.map(doc => `• "${doc.title}": ${doc.content.substring(0, 200)}...`).join('\n');
  }

  // Master's thesis and aesthetic language questions
  if (lowerQuestion.includes('thesis') || lowerQuestion.includes('master') || lowerQuestion.includes('aesthetic language')) {
    const thesis = KNOWLEDGE_BASE.education.masterThesis;
    const core = KNOWLEDGE_BASE.research.masterThesisCore;
    const framework = KNOWLEDGE_BASE.research.theoreticalFramework;

    if (lowerQuestion.includes('definition') || lowerQuestion.includes('define') || lowerQuestion.includes('what is')) {
      return `${core.aestheticDefinition}. ${core.aestheticLanguageDefinition}. The work asks: ${core.coreQuestion} It explores ${core.mainTheme}, drawing from ${core.wittgensteinFoundation}.${documentContext}`;
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

  // Recommendation letters and mentor perspectives
  if (lowerQuestion.includes('recommendation') || lowerQuestion.includes('mentor') || lowerQuestion.includes('letter') || lowerQuestion.includes('quality') || lowerQuestion.includes('haedeh') || lowerQuestion.includes('sepand') && lowerQuestion.includes('recommend') || lowerQuestion.includes('ali moini')) {
    const rec = KNOWLEDGE_BASE.recommendationLetterQualities;
    if (lowerQuestion.includes('academic') || lowerQuestion.includes('intellectual') || lowerQuestion.includes('research')) {
      const academic = rec.academicQualities;
      return `Academic mentors recognize several key qualities: ${academic.intellectualCuriosity}. ${academic.analyticalCapacity}. ${academic.rigorAndDepth}. ${academic.academicContribution}.`;
    }
    if (lowerQuestion.includes('creative') || lowerQuestion.includes('artistic') || lowerQuestion.includes('practice')) {
      const creative = rec.creativeQualities;
      return `Creative mentors highlight: ${creative.artisticBackground}. ${creative.practiceTheoryArticulation}. ${creative.creativitySensitivity} and ${creative.originality}.`;
    }
    if (lowerQuestion.includes('sepand') || lowerQuestion.includes('danesh')) {
      return `${rec.mentorsPerspectives.sepandDanesh}. He particularly notes her ability to transform artistic experience into a 'laboratoire de pensée'.`;
    }
    if (lowerQuestion.includes('ali') || lowerQuestion.includes('moini')) {
      return `${rec.mentorsPerspectives.aliMoini}. He emphasizes her intellectual maturity exceeded her age.`;
    }
    if (lowerQuestion.includes('haedeh') || lowerQuestion.includes('laleh')) {
      return `${rec.mentorsPerspectives.drHaedehLaleh}. She strongly recommends Yekta for projects of great interest in archaeology and cultural heritage.`;
    }
    return `Yekta's mentors consistently recognize her intellectual curiosity, analytical capacity, interdisciplinary linkages, and rare ability to articulate artistic practice with theoretical reflection. ${rec.academicQualities.academicAchievement}.`;
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

  // If no specific match found, check for relevant documents
  if (relevantDocuments.length > 0) {
    const docSummary = relevantDocuments.map(doc =>
      `"${doc.title}" (${doc.category}): ${doc.content.substring(0, 300)}...`
    ).join('\n\n');

    return `I found relevant documents in the knowledge base:\n\n${docSummary}\n\nWould you like me to elaborate on any of these documents or search for something more specific?`;
  }

  // Default response with enhanced context
  return `I can help you learn about Yekta's interdisciplinary research spanning philosophy, digital humanities, and creative practice. Topics include their Master's thesis on aesthetic language (grade 18/20), projects like Shadowline and Mémoire en Livres, archaeological background, multilingual capabilities, AI collaboration philosophy, and current work bridging ancient wisdom with contemporary technology. What specific aspect interests you?${documentContext}`;
}

async function generateAnswerWithOpenAI(question: string, context: string, conversationHistory: any[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const KNOWLEDGE_BASE = getKnowledgeBase();
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