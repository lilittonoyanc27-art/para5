/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TextbookSection, TenseType } from './types';

export const TEXTBOOK_DATA: TextbookSection[] = [
  {
    tense: 'perfecto',
    titleEsp: 'Pretérito Perfecto',
    titleArm: 'Անցյալ սակավակատար (ներկա վաղակատար)',
    topicEsp: 'Ropa / Experiencia de hoy',
    topicArm: 'Հագուստ / Այսօրվա փորձ',
    sentences: [
      {
        id: 'perf-1',
        spanish: 'Hoy he comprado una camiseta blanca y unos zapatos negros.',
        armenian: 'Այսօր ես գնել եմ սպիտակ շապիկ և սև կոշիկներ։',
        tense: 'perfecto',
        verbsInvolved: ['he comprado']
      },
      {
        id: 'perf-2',
        spanish: 'También he visto un abrigo muy bonito, pero no lo he comprado porque era caro.',
        armenian: 'Նաև տեսել եմ շատ գեղեցիկ վերարկու, բայց չեմ գնել, որովհետև թանկ էր։',
        tense: 'perfecto',
        verbsInvolved: ['he visto', 'he comprado']
      },
      {
        id: 'perf-3',
        spanish: 'Después he vuelto a casa y he probado la camiseta.',
        armenian: 'Հետո վերադարձել եմ տուն և փորձել եմ շապիկը։',
        tense: 'perfecto',
        verbsInvolved: ['he vuelto', 'he probado']
      },
      {
        id: 'perf-4',
        spanish: 'Me ha gustado mucho.',
        armenian: 'Այն ինձ շատ է դուր եկել։',
        tense: 'perfecto',
        verbsInvolved: ['ha gustado']
      }
    ],
    verbs: [
      { spanish: 'he comprado', armenian: 'գնել եմ' },
      { spanish: 'he visto', armenian: 'տեսել եմ' },
      { spanish: 'he vuelto', armenian: 'վերադարձել եմ' },
      { spanish: 'he probado', armenian: 'փորձել եմ' },
      { spanish: 'ha gustado', armenian: 'դուր է եկել' }
    ],
    summary: 'Այսօր / այս շաբաթ / արդեն արել եմ (կապված է ներկայի հետ)'
  },
  {
    tense: 'indefinido',
    titleEsp: 'Pretérito Indefinido',
    titleArm: 'Անցյալ կատարյալ',
    topicEsp: 'Compras de ayer',
    topicArm: 'Երեկվա գնումներ',
    sentences: [
      {
        id: 'indef-1',
        spanish: 'Ayer fui al centro comercial con mi amiga.',
        armenian: 'Երեկ ես գնացի առևտրի կենտրոն իմ ընկերուհու հետ։',
        tense: 'indefinido',
        verbsInvolved: ['fui']
      },
      {
        id: 'indef-2',
        spanish: 'Compré un vestido azul y ella compró una falda roja.',
        armenian: 'Ես գնեցի կապույտ զգեստ, իսկ նա գնեց կարմիր կիսաշրջազգեստ։',
        tense: 'indefinido',
        verbsInvolved: ['compré', 'compro']
      },
      {
        id: 'indef-3',
        spanish: 'Después entramos en una tienda pequeña y vimos muchas chaquetas.',
        armenian: 'Հետո մտանք մի փոքր խանութ և տեսանք շատ բաճկոններ։',
        tense: 'indefinido',
        verbsInvolved: ['entramos', 'vimos']
      },
      {
        id: 'indef-4',
        spanish: 'Al final tomamos un café y volvimos a casa.',
        armenian: 'Վերջում սուրճ խմեցինք և վերադարձանք տուն։',
        tense: 'indefinido',
        verbsInvolved: ['tomamos', 'volvimos']
      }
    ],
    verbs: [
      { spanish: 'fui', armenian: 'գնացի' },
      { spanish: 'compré', armenian: 'գնեցի' },
      { spanish: 'compró', armenian: 'գնեց' },
      { spanish: 'entramos', armenian: 'մտանք' },
      { spanish: 'vimos', armenian: 'տեսանք' },
      { spanish: 'tomamos', armenian: 'խմեցինք' },
      { spanish: 'volvimos', armenian: 'վերադարձանք' }
    ],
    summary: 'Երեկ / կոնկրետ ավարտված պահ անցյալում (կապ չունի ներկայի հետ)'
  },
  {
    tense: 'imperfecto',
    titleEsp: 'Pretérito Imperfecto',
    titleArm: 'Անցյալ անկատար',
    topicEsp: 'Ropa de la infancia',
    topicArm: 'Մանկության հագուստ',
    sentences: [
      {
        id: 'imp-1',
        spanish: 'Cuando era niña, me gustaba llevar vestidos largos.',
        armenian: 'Երբ ես փոքր էի, ինձ դուր էր գալիս երկար զգեստներ հագնել։',
        tense: 'imperfecto',
        verbsInvolved: ['era', 'gustaba']
      },
      {
        id: 'imp-2',
        spanish: 'En invierno llevaba un abrigo grande, botas y un gorro.',
        armenian: 'Ձմռանը ես կրում էի մեծ վերարկու, երկարաճիտ կոշիկներ և գլխարկ։',
        tense: 'imperfecto',
        verbsInvolved: ['llevaba']
      },
      {
        id: 'imp-3',
        spanish: 'Mi madre siempre compraba ropa cómoda para mí.',
        armenian: 'Մայրս միշտ ինձ համար հարմար հագուստ էր գնում։',
        tense: 'imperfecto',
        verbsInvolved: ['compraba']
      },
      {
        id: 'imp-4',
        spanish: 'Yo no quería ponerme pantalones, porque prefería las faldas.',
        armenian: 'Ես չէի ուզում տաբատ հագնել, որովհետև նախընտրում էի կիսաշրջազգեստներ։',
        tense: 'imperfecto',
        verbsInvolved: ['quería', 'prefería']
      }
    ],
    verbs: [
      { spanish: 'era', armenian: 'էի' },
      { spanish: 'gustaba', armenian: 'դուր էր գալիս' },
      { spanish: 'llevaba', armenian: 'կրում էի' },
      { spanish: 'compraba', armenian: 'գնում էր' },
      { spanish: 'quería', armenian: 'ուզում էի' },
      { spanish: 'prefería', armenian: 'նախընտրում էի' }
    ],
    summary: 'Սովորություն / նկարագրություն / երկարատև գործողություն անցյալում'
  },
  {
    tense: 'pluscuamperfecto',
    titleEsp: 'Pretérito Pluscuamperfecto',
    titleArm: 'Անցյալ վաղակատար (Գերակատար)',
    topicEsp: 'Ya estaba listo/a',
    topicArm: 'Արդեն պատրաստ էի',
    sentences: [
      {
        id: 'plus-1',
        spanish: 'Cuando llegué a la fiesta, Ana ya se había puesto un vestido elegante.',
        armenian: 'Երբ ես հասա խնջույքին, Անան արդեն հագել էր էլեգանտ զգեստ։',
        tense: 'pluscuamperfecto',
        verbsInvolved: ['había puesto', 'llegué']
      },
      {
        id: 'plus-2',
        spanish: 'Yo también me había vestido bien, pero había olvidado mis gafas de sol en casa.',
        armenian: 'Ես նույնպես լավ էի հագնվել, բայց մոռացել էի իմ արևային ակնոցը տանը։',
        tense: 'pluscuamperfecto',
        verbsInvolved: ['había vestido', 'había olvidado']
      },
      {
        id: 'plus-3',
        spanish: 'Antes de salir, mi hermana me había dicho que hacía frío, por eso había tomado una chaqueta.',
        armenian: 'Դուրս գալուց առաջ քույրս ինձ ասել էր, որ ցուրտ է, դրա համար վերցրել էի բաճկոն։',
        tense: 'pluscuamperfecto',
        verbsInvolved: ['había dicho', 'había tomado']
      }
    ],
    verbs: [
      { spanish: 'había puesto', armenian: 'հագել էր / դրել էր իր վրա' },
      { spanish: 'había vestido', armenian: 'հագնվել էի' },
      { spanish: 'había olvidado', armenian: 'մոռացել էի' },
      { spanish: 'había dicho', armenian: 'ասել էր' },
      { spanish: 'había tomado', armenian: 'վերցրել էի' }
    ],
    summary: 'Ավելի վաղ անցյալ (նախորդող գործողություն), «արդեն արել էի»'
  }
];

// Helper for verb mapping
export const ALL_VERBS_FLAT = TEXTBOOK_DATA.flatMap((s) =>
  s.verbs.map((v) => ({ ...v, tense: s.tense }))
);

// Quiz data for Game 2 (The Quiz Show)
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  hint: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Hoy ____ una camiseta blanca y unos zapatos negros. (գնել եմ)',
    options: ['compré', 'he comprado', 'compraba', 'había comprado'],
    answer: 'he comprado',
    hint: 'Ժամանակաձև՝ Pretérito Perfecto (Անցյալ կատարյալ / սակավակատար)։ Օգտագործվում է, երբ գործողությունը կապված է ներկայի հետ (Hoy - այսօր)։'
  },
  {
    id: 'q2',
    question: 'Ayer ____ al centro comercial con mi amiga. (գնացի)',
    options: ['fui', 'he ido', 'iba', 'había ido'],
    answer: 'fui',
    hint: 'Ժամանակաձև՝ Pretérito Indefinido (Անցյալ միակատար / կատարյալ)։ Օգտագործվում է անցյալի կոնկրետ ավարտված պահի համար (Ayer - երեկ)։'
  },
  {
    id: 'q3',
    question: 'Cuando ____ niña, me gustaba llevar vestidos largos. (փոքր էի)',
    options: ['fui', 'he sido', 'era', 'había sido'],
    answer: 'era',
    hint: 'Ժամանակաձև՝ Pretérito Imperfecto (Անցյալ անկատար)։ Օգտագործվում է անցյալում նկարագրության և երկարատև վիճակի համար (ser -> era)։'
  },
  {
    id: 'q4',
    question: 'Cuando llegué a la fiesta, Ana ya se ____ un vestido elegante. (հագել էր / դրել էր իր վրա)',
    options: ['puso', 'ha puesto', 'ponía', 'había puesto'],
    answer: 'había puesto',
    hint: 'Ժամանակաձև՝ Pretérito Pluscuamperfecto (Անցյալ վաղակատար / Գերակատար)։ Ցույց է տալիս գործողություն, որն արդեն ավարտվել էր մինչև մեկ այլ անցյալ գործողություն։'
  },
  {
    id: 'q5',
    question: 'Antes de salir, mi hermana me ____ dicho que hacía frío. (ասել էր)',
    options: ['ha', 'dijo', 'había', 'decía'],
    answer: 'había',
    hint: 'Ժամանակաձև՝ Pretérito Pluscuamperfecto (Անցյալ վաղակատար / Գերակատար)։ Բանաձևն է Haber + Participio (dicho) -> "había dicho" (ասել էր)։'
  },
  {
    id: 'q6',
    question: 'Ayer compré un vestido azul y ella ____ una falda roja. (գնեց)',
    options: ['compara', 'compró', 'ha comprado', 'había comprado'],
    answer: 'compró',
    hint: 'Ժամանակաձև՝ Pretérito Indefinido (Անցյալ միակատար / կատարյալ)։ Ցույց է տալիս կոնկրետ ավարտված գործողություն անցյալում (Ella bought -> compró)։'
  },
  {
    id: 'q7',
    question: 'Despues ____ a casa y he probado la camiseta. (վերադարձել եմ)',
    options: ['volví', 'he vuelto', 'volvía', 'había vuelto'],
    answer: 'he vuelto',
    hint: 'Ժամանակաձև՝ Pretérito Perfecto (Անցյալ կատարյալ / սակավակատար)։ El Perfecto-ն կազմվում է Haber + Participio-ով, համապատասխանում է hayeren «վերադարձել եմ» տարբերակին։'
  },
  {
    id: 'q8',
    question: 'Mi madre siempre ____ ropa cómoda para mí. (գնում էր)',
    options: ['compró', 'compraba', 'he comprado', 'había comprado'],
    answer: 'compraba',
    hint: 'Ժամանակաձև՝ Pretérito Imperfecto (Անցյալ անկատար)։ Օգտագործվում է անցյալում սովորական կամ կրկնվող գործողությունների համար (Siempre compraba - միշտ գնում էր)։'
  }
];

// Blocks constructors for Game 3
export interface ConstructorBlock {
  id: string;
  options: string[]; // Shuffled blocks
  correctOrder: string[]; // Correct sequence
  translation: string;
}

export const CONSTRUCTOR_CHALLENGES: ConstructorBlock[] = [
  {
    id: 'c1',
    options: ['Hoy', 'camiseta', 'blanca', 'he comprado', 'una'],
    correctOrder: ['Hoy', 'he comprado', 'una', 'camiseta', 'blanca'],
    translation: 'Այսօր ես գնել եմ սպիտակ շապիկ։'
  },
  {
    id: 'c2',
    options: ['con mi amiga', 'comercial', 'Ayer', 'fui al centro'],
    correctOrder: ['Ayer', 'fui al centro', 'comercial', 'con mi amiga'],
    translation: 'Երեկ ես գնացի առևտրի կենտրոն իմ ընկերուհու հետ։'
  },
  {
    id: 'c3',
    options: ['vestidos largos', 'me gustaba', 'era niña', 'Cuando', 'llevar'],
    correctOrder: ['Cuando', 'era niña', 'me gustaba', 'llevar', 'vestidos largos'],
    translation: 'Երբ ես փոքր էի, ինձ դուր էր գալիս երկար զգեստներ հագնել։'
  },
  {
    id: 'c4',
    options: ['olvidado', 'mis gafas', 'en casa', 'había', 'Yo'],
    correctOrder: ['Yo', 'había', 'olvidado', 'mis gafas', 'en casa'],
    translation: 'Ես մոռացել էի իմ ակնոցը տանը։'
  }
];

// Game 6 Indicator connections
export interface IndicatorMatcher {
  indicator: string;
  tense: TenseType;
  meaning: string;
  example: string;
}

export const INDICATOR_MATCHES: IndicatorMatcher[] = [
  { indicator: 'Hoy / Esta semana', tense: 'perfecto', meaning: 'Այսօր / Այս շաբաթ', example: 'Hoy he comprado...' },
  { indicator: 'Ayer / El año pasado', tense: 'indefinido', meaning: 'Երեկ / Անցյալ տարի', example: 'Ayer fui...' },
  { indicator: 'Cuando era niño/a / Siempre', tense: 'imperfecto', meaning: 'Երբ փոքր էի / Միշտ', example: 'Cuando era niña...' },
  { indicator: 'Ya / Antes de esto', tense: 'pluscuamperfecto', meaning: 'Արդեն / Մինչև այդ', example: 'Ana ya se había puesto...' }
];
