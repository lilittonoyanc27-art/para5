/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trash2, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react';
import { CONSTRUCTOR_CHALLENGES } from './data';
import { sounds } from './SoundEffects';

interface Game3Props {
  onScoreAdd: (player: 'gor' | 'gayane', points: number) => void;
  activePlayer: 'gor' | 'gayane';
  onTurnToggle: () => void;
}

export default function Game3SentenceBlocks({ onScoreAdd, activePlayer, onTurnToggle }: Game3Props) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeChallenge = CONSTRUCTOR_CHALLENGES[challengeIdx];

  // Initialize available words shuffled
  useEffect(() => {
    if (activeChallenge) {
      setAvailableWords([...activeChallenge.options].sort(() => Math.random() - 0.5));
      setSelectedWords([]);
      setIsDone(false);
      setIsSuccess(false);
    }
  }, [challengeIdx]);

  const addWord = (word: string) => {
    sounds.playPop();
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter(w => w !== word));
  };

  const removeWord = (word: string) => {
    sounds.playPop();
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter(w => w !== word));
  };

  const clearSelection = () => {
    sounds.playPop();
    setAvailableWords([...activeChallenge.options].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
  };

  const checkSentence = () => {
    const isCorrect = selectedWords.join(' ') === activeChallenge.correctOrder.join(' ');
    setIsDone(true);
    setIsSuccess(isCorrect);

    if (isCorrect) {
      sounds.playCorrect();
      onScoreAdd(activePlayer, 100);
    } else {
      sounds.playWrong();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    onTurnToggle(); // Next turn alt
    if (challengeIdx < CONSTRUCTOR_CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setChallengeIdx(0); // Loop
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden" id="game3-container">
      {/* Visual glowing effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold bg-orange-500/10 px-2.5 py-1 rounded-md">
            ԽԱՂ 3 • 3D ԲԱՌ-ԲԼՈԿՆԵՐԻ ԿԱՌՈՒՑՈՂ
          </span>
          <h3 className="text-xl font-black font-sans mt-2 tracking-tight">
            Ստեղծիր ճիշտ իսպաներեն նախադասություն
          </h3>
        </div>
        <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 font-sans">
          Խաղացող՝ {activePlayer === 'gor' ? '🧑‍💻 Գոռ' : '👩‍💻 Գայանե'}
        </div>
      </div>

      <div className="space-y-6 relative z-10" id="game3-workspace">
        {/* The Armenian Goal Sentence */}
        <div className="p-5 bg-slate-955 rounded-2xl border border-slate-850">
          <div className="text-[10px] font-mono tracking-wider text-slate-500 font-bold uppercase mb-1">
            ԹԱՐԳՄԱՆՈՒԹՅՈՒՆԸ (ՀԱՅԵՐԵՆ)
          </div>
          <div className="text-base font-bold text-slate-100 flex items-start gap-2">
            <CornerDownRight className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
            <span>{activeChallenge.translation}</span>
          </div>
        </div>

        {/* Selected Word Stack (The 3D block board) */}
        <div className="bg-slate-950/70 p-6 rounded-2xl border-2 border-dashed border-slate-800 min-h-[90px] flex flex-wrap gap-2.5 items-center justify-center">
          {selectedWords.length === 0 && (
            <span className="text-xs font-mono text-slate-600 select-none">
              Կտտացրու բլոկներին՝ նրանց այստեղ 3D հաջորդականությամբ շարելու համար
            </span>
          )}
          <AnimatePresence>
            {selectedWords.map((word, idx) => (
              <motion.button
                key={`${word}-${idx}`}
                layout
                initial={{ scale: 0.8, y: -15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: 15, opacity: 0 }}
                onClick={() => removeWord(word)}
                className="px-4 py-2.5 bg-gradient-to-b from-indigo-500 to-indigo-700 text-white font-mono font-bold text-sm tracking-tight rounded-xl shadow-lg border-t border-indigo-300 hover:from-indigo-600 hover:to-indigo-800 transition-all flex items-center gap-1.5 cursor-pointer hover:translate-y-[-2px]"
                id={`selected-${word}-${idx}`}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Shuffled Available Words */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-400 font-bold">ԲԱՌԵՐԻ ՊԱՀԵՍՏ</div>
          <div className="flex flex-wrap gap-2.5 justify-center py-2">
            <AnimatePresence>
              {availableWords.map((word) => (
                <motion.button
                  key={word}
                  layout
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  onClick={() => addWord(word)}
                  disabled={isDone}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-100 font-mono text-sm font-semibold rounded-xl border border-slate-700/80 shadow-xs cursor-pointer active:scale-95 transition-all hover:scale-102"
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions Controls panel */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-slate-800">
          <div className="flex gap-2">
            <button
              onClick={clearSelection}
              disabled={isDone || selectedWords.length === 0}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl text-slate-400 hover:text-white hover:bg-slate-850 border border-transparent hover:border-slate-800 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Մաքրել
            </button>
          </div>

          <div className="flex gap-3">
            {selectedWords.length > 0 && !isDone && (
              <button
                onClick={checkSentence}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Ստուգել
              </button>
            )}

            {isDone && (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                Անցնել հաջորդին
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results Feedback Box */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-4 rounded-xl border-2 flex items-start gap-3 ${
                isSuccess
                  ? 'bg-emerald-600/10 border-emerald-500/30'
                  : 'bg-rose-600/10 border-rose-500/30'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 mt-0.5 ${isSuccess ? 'text-emerald-400' : 'text-rose-400'}`} />
              <div>
                <h5 className="font-extrabold text-sm">
                  {isSuccess ? '🏆 ՀՐԱՇԱԼԻ Է! +100 միավոր' : 'Օ՜խ, հաջորդ անգամ կստացվի։'}
                </h5>
                <p className="text-xs text-slate-350 mt-1 font-sans">
                  {isSuccess
                    ? `Բլոկները դասավորել եք կատարյալ հերթականությամբ։`
                    : `Ճիշտ ձևն էր՝ `}
                  {!isSuccess && (
                    <span className="font-mono text-white text-xs bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800 select-all block mt-1">
                      {activeChallenge.correctOrder.join(' ')}
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
