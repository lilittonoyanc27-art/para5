/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from './data';
import { sounds } from './SoundEffects';

interface Game2Props {
  onScoreAdd: (player: 'gor' | 'gayane', points: number) => void;
  activePlayer: 'gor' | 'gayane';
  onTurnToggle: () => void;
}

export default function Game2QuizPodium({ onScoreAdd, activePlayer, onTurnToggle }: Game2Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showClue, setShowClue] = useState(false);
  
  // Heights representing 3D heights of Gor and Gayane in the game show!
  const [podiumHeights, setPodiumHeights] = useState({ gor: 1, gayane: 1 });

  const activeQuestion = QUIZ_QUESTIONS[currentIdx];

  const getTenseLabel = (id: string) => {
    switch (id) {
      case 'q1':
      case 'q7':
        return { 
          spanish: 'Pretérito Perfecto', 
          armenian: 'Անցյալ կատարյալ / սակավակատար', 
          style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
        };
      case 'q2':
      case 'q6':
        return { 
          spanish: 'Pretérito Indefinido', 
          armenian: 'Անցյալ միակատար / կատարյալ', 
          style: 'bg-orange-500/20 text-orange-300 border-orange-500/40' 
        };
      case 'q3':
      case 'q8':
        return { 
          spanish: 'Pretérito Imperfecto', 
          armenian: 'Անցյալ անկատար', 
          style: 'bg-sky-500/20 text-sky-300 border-sky-500/40' 
        };
      case 'q4':
      case 'q5':
        return { 
          spanish: 'Pretérito Pluscuamperfecto', 
          armenian: 'Անցյալ վաղակատար / Գերակատար', 
          style: 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
        };
      default:
        return { 
          spanish: 'Pretérito', 
          armenian: 'Անցյալ ժամանակ', 
          style: 'bg-slate-500/20 text-slate-300 border-slate-500/40' 
        };
    }
  };

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAns(option);
    setIsAnswered(true);

    const match = activeQuestion.answer === option;
    setIsCorrect(match);

    if (match) {
      sounds.playCorrect();
      // Raise active player's 3D podium! Max height 5 levels
      setPodiumHeights(prev => ({
        ...prev,
        [activePlayer]: Math.min(prev[activePlayer] + 1, 5)
      }));
      onScoreAdd(activePlayer, 80);
    } else {
      sounds.playWrong();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setIsAnswered(false);
    setSelectedAns(null);
    setShowClue(false);
    onTurnToggle(); // Alternate turn
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Loop or restart quiz
      setCurrentIdx(0);
    }
  };

  const resetPodiums = () => {
    sounds.playPop();
    setPodiumHeights({ gor: 1, gayane: 1 });
    setCurrentIdx(0);
    setIsAnswered(false);
    setSelectedAns(null);
    setShowClue(false);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden" id="game2-container">
      {/* Visual background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent)] pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-1 rounded-md">
            ԽԱՂ 2 • 3D ՊՈԴԻՈՒՄԱՅԻՆ ՎԻԿՏՈՐԻՆԱ
          </span>
          <h3 className="text-xl font-black font-sans mt-2 tracking-tight">
            Գոռի և Գայանեի հագուստի մրցաշար
          </h3>
        </div>
        <button
          onClick={resetPodiums}
          className="text-xs bg-slate-805 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Վերագործարկել
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10" id="game2-grid">
        {/* Right: The Question Workspace */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                  <span className="text-indigo-400 font-bold">ՀԱՐՑ {currentIdx + 1} / {QUIZ_QUESTIONS.length}</span>
                  <span>•</span>
                  <span className="uppercase text-[10px]">ԹԵՄԱ՝ ՀԱԳՈՒՍՏ</span>
                </div>
                
                {/* Target pasture tense details badge */}
                <div className={`text-xs px-2.5 py-1 rounded-lg border font-black tracking-wide ${getTenseLabel(activeQuestion.id).style}`}>
                  ⏳ {getTenseLabel(activeQuestion.id).spanish} ({getTenseLabel(activeQuestion.id).armenian})
                </div>
              </div>
              
              <p className="text-lg md:text-xl font-bold font-sans tracking-tight leading-relaxed text-slate-100">
                {activeQuestion.question}
              </p>
            </div>

            {/* Hint Toggler */}
            <div className="mt-4 pt-3 border-t border-slate-900 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-sans">Դժվարանո՞ւմ եք պատասխանել։</span>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setShowClue(!showClue);
                  }}
                  className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 animate-bounce" />
                  {showClue ? 'Թաքցնել հուշումը' : 'Տեսնել հուշումը'}
                </button>
              </div>
              {showClue && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-250 mt-1 leading-relaxed shadow-sm flex items-start gap-2"
                >
                  <span className="text-base select-none">💡</span>
                  <div>
                    <span className="font-extrabold text-amber-400 block mb-1">ՀԱՐՑԻ ՀՈՒՇՈՒՄ՝</span>
                    {activeQuestion.hint}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeQuestion.options.map((opt, oIdx) => {
              const belongsToSelect = selectedAns === opt;
              const belongsToCorrect = activeQuestion.answer === opt;

              let wrapperStyle = 'border-slate-800 bg-slate-850 hover:bg-slate-800 hover:border-slate-700 text-white';
              if (isAnswered) {
                if (belongsToCorrect) {
                  wrapperStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-300';
                } else if (belongsToSelect) {
                  wrapperStyle = 'border-rose-500 bg-rose-500/15 text-rose-300';
                } else {
                  wrapperStyle = 'border-slate-850 bg-slate-950/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelect(opt)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl text-left font-sans font-bold text-sm tracking-wide border-2 transition-all duration-200 ${wrapperStyle} flex justify-between items-center`}
                >
                  <span className="font-mono">{opt}</span>
                  <span className="text-xs text-slate-500 select-none">[{vAlpha(oIdx)}]</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div className={`p-4 rounded-xl border text-sm ${
                  isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className={`w-4 h-4 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`} />
                    <span className="font-extrabold uppercase text-xs">
                      {isCorrect ? 'Ճիշտ է! (+80 միավոր)' : 'Անճիշտ տարբերակ'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-sans">
                    💡 <span className="font-bold">Հուշում՝</span> {activeQuestion.hint}
                  </p>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs text-slate-400 font-sans">
                    Հերթը փոխանցվում է մյուս խաղացողին:
                  </span>
                  <button
                    onClick={handleNext}
                    className="flex-1 max-w-xs p-3 bg-indigo-600 hover:bg-indigo-505 text-white text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/20 transition-all"
                  >
                    Հաջորդ հարցը
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Left: 3D Podiums Visual Competition */}
        <div className="lg:col-span-5 h-[340px] bg-slate-950/60 rounded-2xl border border-slate-850 p-4 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-2 left-2 text-[10px] tracking-widest font-mono text-slate-500 font-bold uppercase">
            3D ՊՈԴԻՈՒՄԻ ԲԱՐՁՐՈՒԹՅՈՒՆ
          </div>

          {/* 3D Scene View */}
          <div className="flex-1 grid grid-cols-2 gap-4 items-end justify-center px-4 pt-10">
            {/* Player 1: Gor */}
            <div className="flex flex-col items-center">
              {/* Avatar Icon */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className={`relative flex flex-col items-center mb-3 ${activePlayer === 'gor' ? 'scale-105' : 'opacity-85'}`}
              >
                <div className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-black border-2 border-blue-400 shadow-md">
                  🧑‍💻
                </div>
                {activePlayer === 'gor' && (
                  <span className="absolute -top-3 px-1.5 py-0.5 bg-indigo-500 text-[8px] tracking-widest uppercase font-black rounded-md animate-bounce">
                    ԱԿՏԻՎ
                  </span>
                )}
                <span className="text-xs font-extrabold mt-1">ԳՈՌ</span>
              </motion.div>

              {/* 3D Column Column */}
              <motion.div
                animate={{ height: podiumHeights.gor * 40 }}
                transition={{ type: 'spring', stiffness: 80 }}
                className="w-20 bg-gradient-to-t from-blue-900 via-blue-700 to-blue-500 rounded-t-xl shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)] border-t border-blue-300 relative flex items-center justify-center"
              >
                <span className="font-black text-white text-lg font-mono drop-shadow-md">
                  H:{podiumHeights.gor}
                </span>
                {/* 3D light top glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/45 rounded-t-xl" />
              </motion.div>
            </div>

            {/* Player 2: Gayane */}
            <div className="flex flex-col items-center">
              {/* Avatar Icon */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                className={`relative flex flex-col items-center mb-3 ${activePlayer === 'gayane' ? 'scale-105' : 'opacity-85'}`}
              >
                <div className="w-14 h-14 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-black border-2 border-rose-400 shadow-md">
                  👩‍💻
                </div>
                {activePlayer === 'gayane' && (
                  <span className="absolute -top-3 px-1.5 py-0.5 bg-rose-500 text-[8px] tracking-widest uppercase font-black rounded-md animate-bounce">
                    ԱԿՏԻՎ
                  </span>
                )}
                <span className="text-xs font-extrabold mt-1">ԳԱՅԱՆԵ</span>
              </motion.div>

              {/* 3D Column Column */}
              <motion.div
                animate={{ height: podiumHeights.gayane * 40 }}
                transition={{ type: 'spring', stiffness: 80 }}
                className="w-20 bg-gradient-to-t from-rose-900 via-rose-700 to-rose-500 rounded-t-xl shadow-[0_10px_20px_-5px_rgba(244,63,94,0.3)] border-t border-rose-300 relative flex items-center justify-center"
              >
                <span className="font-black text-white text-lg font-mono drop-shadow-md">
                  H:{podiumHeights.gayane}
                </span>
                {/* 3D light top glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/45 rounded-t-xl" />
              </motion.div>
            </div>
          </div>

          <div className="text-center font-mono text-[10px] text-slate-400 pt-2 border-t border-slate-900">
            Ճիշտ պատասխանները բարձրացնում են ձեր 3D պոդիումը։
          </div>
        </div>
      </div>
    </div>
  );
}

function vAlpha(index: number): string {
  return ['A', 'B', 'C', 'D'][index] || '';
}
