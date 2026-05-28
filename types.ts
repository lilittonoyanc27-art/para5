/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TenseType = 'perfecto' | 'indefinido' | 'imperfecto' | 'pluscuamperfecto';

export interface SentenceItem {
  id: string;
  spanish: string;
  armenian: string;
  tense: TenseType;
  verbsInvolved: string[]; // e.g. ["he comprado"]
}

export interface VerbExplanation {
  spanish: string;
  armenian: string;
}

export interface TextbookSection {
  tense: TenseType;
  titleArm: string;
  titleEsp: string;
  topicArm: string;
  topicEsp: string;
  sentences: SentenceItem[];
  verbs: VerbExplanation[];
  summary: string;
}

export interface GameScore {
  gor: number;
  gayane: number;
}

export interface ScoreBoard {
  activePlayer: 'gor' | 'gayane';
  scores: GameScore;
}
