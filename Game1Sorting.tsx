/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, HelpCircle, RefreshCw, Trophy } from 'lucide-react';
import { ALL_VERBS_FLAT } from './data';
import { TenseType } from './types';
import { sounds } from './SoundEffects';

interface Game1Props {
  onScoreAdd: (player: 'gor' | 'gayane', points: number) => void;
  activePlayer: 'gor' | 'gayane';
  onTurnToggle: () => void;
}

const TENSE_LABELS: Record<TenseType, string> = {
  perfecto: 'Pretérito Perfecto (Այսօր)',
  indefinido: 'Pretérito Indefinido (Երեկ)',
  imperfecto: 'Pretérito Imperfecto (Մանկություն)',
  pluscuamperfecto: 'Pluscuamperfecto (Արդեն արել էի)',
};

export default function Game1Sorting({ onScoreAdd, activePlayer, onTurnToggle }: Game1Props) {
  const [deck, setDeck] = useState(() => 
    [...ALL_VERBS_FLAT].sort(() => Math.random() - 0.5)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<TenseType | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentVerb = deck[currentIndex];

  const handleGuess = (tense: TenseType) => {
    if (answered) return;
    setSelectedAnswer(tense);
    setAnswered(true);

    const isCorrect = currentVerb.tense === tense;
    setCorrect(isCorrect);

    if (isCorrect) {
      sounds.playCorrect();
      setStreak(prev => prev + 1);
      onScoreAdd(activePlayer, 50 + streak * 10);
    } else {
      sounds.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setAnswered(false);
    setSelectedAnswer(null);
    onTurnToggle(); // Alternate turn to make it a direct competition!
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Reshuffle
      setDeck([...ALL_VERBS_FLAT].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden" id="game1-container">
      {/* 3D background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">
            ԽԱՂ 1 • 3D Ժամանակների Տեսակավորում
          </span>
          <h3 className="text-xl font-black font-sans mt-2 tracking-tight">
            Իսպաներեն բայերի 3D քարտեր
          </h3>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-slate-400">Streak</div>
          <div className="text-lg font-black text-yellow-400 font-sans">{streak} 🔥</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {/* 3D Perspective Card Layout */}
        <div className="flex flex-col items-center justify-center py-6 [perspective:1000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ rotateY: -70, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: 70, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="w-full max-w-xs aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-950 p-6 rounded-2xl border-2 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden transform group hover:border-indigo-400/50 transition-colors"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl">🇪🇸</span>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  VERBO PASADO
                </span>
              </div>

              <div className="text-center py-4">
                <blockquote className="text-3xl font-black font-mono tracking-tight text-white select-none">
                  {currentVerb.spanish}
                </blockquote>
                <p className="text-xs font-medium text-slate-400 mt-2 font-sans italic">
                  ({currentVerb.armenian})
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-800 pt-3">
                <span className="text-xs font-semibold text-indigo-400">
                  {activePlayer === 'gor' ? 'Գոռի հերթը 🧑‍💻' : 'Գայանեի հերթը 👩‍💻'}
                </span>
                <HelpCircle className="w-4 h-4 text-slate-500 hover:text-white cursor-help" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Categories Controls */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-2">
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Որոշի՛ր, թե սույն բայը ո՛ր անցյալ ժամանակաձևին է պատկանում։ Յուրաքանչյուր ճիշտ պատասխանը բերում է <span className="text-yellow-400 font-bold">50 միավոր</span> + streak բոնուս։
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {(Object.keys(TENSE_LABELS) as TenseType[]).map((tenseKey) => {
              const isSelected = selectedAnswer === tenseKey;
              const isCorrectAnswer = currentVerb.tense === tenseKey;

              let btnStyle = 'border-slate-800 bg-slate-800 hover:bg-slate-750 text-white';
              if (answered) {
                if (isCorrectAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                } else {
                  btnStyle = 'border-slate-850 bg-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={tenseKey}
                  onClick={() => handleGuess(tenseKey)}
                  disabled={answered}
                  className={`p-4 rounded-xl text-left font-sans font-bold text-sm tracking-wide border-2 transition-all duration-200 ${btnStyle} flex justify-between items-center`}
                >
                  <span>{TENSE_LABELS[tenseKey]}</span>
                  {answered && isCorrectAnswer && (
                    <span className="text-emerald-400 text-xs font-mono font-bold">✓ Ճիշտ է</span>
                  )}
                  {answered && isSelected && !isCorrectAnswer && (
                    <span className="text-rose-400 text-xs font-mono font-bold">✗ Սխալ</span>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 flex gap-3"
              >
                <div className={`flex-1 p-3.5 rounded-xl border text-sm flex items-center gap-2 ${
                  correct ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'
                }`}>
                  <ShieldCheck className={`w-5 h-5 ${correct ? 'text-emerald-400' : 'text-rose-400'}`} />
                  <div>
                    <div className="font-bold text-xs">
                      {correct ? 'Հիանալի է՛' : 'Օ՜խ, սխալ է'}
                    </div>
                    <div className="text-xs text-slate-350 mt-0.5">
                      {correct
                        ? `Դուք ստացաք ${50 + streak * 10} միավոր։`
                        : `Ճիշտ պատասխանն էր՝ ${TENSE_LABELS[currentVerb.tense]}`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="px-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold uppercase rounded-xl flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Հաջորդը
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
