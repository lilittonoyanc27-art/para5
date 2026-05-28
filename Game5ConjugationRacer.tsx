/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Compass, Flag, HelpCircle, Activity } from 'lucide-react';
import { sounds } from './SoundEffects';

interface Game5Props {
  onScoreAdd: (player: 'gor' | 'gayane', points: number) => void;
  activePlayer: 'gor' | 'gayane';
  onTurnToggle: () => void;
}

interface RaceQuestion {
  sentence: string;
  missing: string;
  options: string[];
  correct: string;
  translation: string;
  tenseSpanish: string;
  tenseArmenian: string;
}

const RACER_QUESTIONS: RaceQuestion[] = [
  {
    sentence: 'Ayer ____ (yo, ver) muchas chaquetas en la tienda.',
    missing: 'vimos/vi/visto/veía',
    options: ['fui', 'vi', 'he visto', 'veía'],
    correct: 'vi',
    translation: 'Երեկ ես տեսա շատ բաճկոններ խանութում։',
    tenseSpanish: 'Pretérito Indefinido',
    tenseArmenian: 'Անցյալ միակատար / կատարյալ'
  },
  {
    sentence: 'Hoy Ana ____ (haber, comprar) un abrigo caro.',
    missing: 'compró/ha comprado',
    options: ['compró', 'compraba', 'ha comprado', 'había comprado'],
    correct: 'ha comprado',
    translation: 'Այսօր Անան գնել է թանկարժեք վերարկու։',
    tenseSpanish: 'Pretérito Perfecto',
    tenseArmenian: 'Անցյալ կատարյալ / սակավակատար'
  },
  {
    sentence: 'Antes de salir, la lluvia ya ____ (haber, empezar).',
    missing: 'había empezado',
    options: ['empezó', 'ha empezado', 'había empezado', 'empezaba'],
    correct: 'había empezado',
    translation: 'Դուրս գալուց առաջ անձրևն արդեն սկսվել էր։',
    tenseSpanish: 'Pretérito Pluscuamperfecto',
    tenseArmenian: 'Անցյալ վաղակատար / Գերակատար'
  },
  {
    sentence: 'Cuando mi madre ____ (ser) joven, cosía ropa.',
    missing: 'era',
    options: ['fue', 'era', 'he sido', 'había sido'],
    correct: 'era',
    translation: 'Երբ մայրս երիտասարդ էր, նա հագուստ էր կարում։',
    tenseSpanish: 'Pretérito Imperfecto',
    tenseArmenian: 'Անցյալ անկատար'
  },
  {
    sentence: 'Nosotros ____ (tomar) un café ayer por la tarde.',
    missing: 'tomamos',
    options: ['tomamos', 'hemos tomado', 'tomábamos', 'habíamos tomado'],
    correct: 'tomamos',
    translation: 'Երեկ կեսօրից հետո մենք սուրճ խմեցինք։',
    tenseSpanish: 'Pretérito Indefinido',
    tenseArmenian: 'Անցյալ միակատար / կատարյալ'
  }
];

export default function Game5ConjugationRacer({ onScoreAdd, activePlayer, onTurnToggle }: Game5Props) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  
  // Track positions of Gor and Gayane. Max 100 meters
  const [positions, setPositions] = useState({ gor: 15, gayane: 15 });

  const currentQ = RACER_QUESTIONS[qIdx];

  const handleRaceChoice = (option: string) => {
    if (answered) return;
    setSelectedOpt(option);
    setAnswered(true);

    const match = currentQ.correct === option;

    if (match) {
      sounds.playCorrect();
      // Speed boost for the active racer!
      setPositions(prev => ({
        ...prev,
        [activePlayer]: Math.min(prev[activePlayer] + 25, 100)
      }));
      onScoreAdd(activePlayer, 120);
    } else {
      sounds.playWrong();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setAnswered(false);
    setSelectedOpt(null);
    onTurnToggle(); // Alternate turn
    if (qIdx < RACER_QUESTIONS.length - 1) {
      setQIdx(prev => prev + 1);
    } else {
      setQIdx(0);
    }
  };

  const resetRace = () => {
    sounds.playPop();
    setPositions({ gor: 15, gayane: 15 });
    setQIdx(0);
    setAnswered(false);
    setSelectedOpt(null);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden" id="game5-container">
      {/* 3D grid visual background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(234,179,8,0.06),transparent)] pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-400 font-bold bg-yellow-500/10 px-2.5 py-1 rounded-md">
            ԽԱՂ 5 • 3D ԿՈՆՅՈՒԳԱՑԻԱՅԻ ՎԱԶՔՈՒՂԻ
          </span>
          <h3 className="text-xl font-black font-sans mt-2 tracking-tight">
            Գոռի և Գայանեի Արագության Գավաթ
          </h3>
        </div>
        <button
          onClick={resetRace}
          className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-705 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
        >
          <Activity className="w-3.5 h-3.5" />
          Նորից սկսել
        </button>
      </div>

      {/* 3D Track perspective visual board */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 relative mb-6 overflow-hidden h-40 flex flex-col justify-around">
        {/* Racetrack markers */}
        <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-slate-800/50 border-dashed border" />
        <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-slate-800/50 border-dashed border" />
        <div className="absolute top-0 bottom-0 left-[60%] w-[1px] bg-slate-800/50 border-dashed border" />
        <div className="absolute top-0 bottom-0 left-[80%] w-[1px] bg-slate-800/50 border-dashed border" />
        
        {/* Goal line flag */}
        <div className="absolute top-0 bottom-0 right-8 w-2 bg-slate-800 border-l border-white flex flex-col justify-start">
          <div className="w-4 h-4 bg-orange-600 rounded-sm -ml-1 text-[8px] flex items-center justify-center font-bold">🏁</div>
        </div>

        {/* Lane 1: Gor */}
        <div className="relative flex items-center h-12 border-b border-slate-900/50 pb-2">
          <div className="absolute left-2 text-[9px] font-mono text-blue-500 font-bold">L1: ԳՈՌ</div>
          <motion.div
            animate={{ x: `${positions.gor}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="absolute z-10"
          >
            <div className="flex items-center gap-1">
              <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(59,130,246,0.5)]">🏃🧑‍💻</span>
              <span className="text-[10px] font-mono font-bold bg-blue-500/20 px-1 rounded border border-blue-500">{positions.gor}m</span>
            </div>
          </motion.div>
        </div>

        {/* Lane 2: Gayane */}
        <div className="relative flex items-center h-12 pt-1">
          <div className="absolute left-2 text-[9px] font-mono text-rose-500 font-bold">L2: ԳԱՅԱՆԵ</div>
          <motion.div
            animate={{ x: `${positions.gayane}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="absolute z-10"
          >
            <div className="flex items-center gap-1">
              <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(244,63,94,0.5)]">🏃‍♀️👩‍💻</span>
              <span className="text-[10px] font-mono font-bold bg-rose-500/20 px-1 rounded border border-rose-500">{positions.gayane}m</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start relative z-10" id="racer-controls-grid">
        {/* Left Side: Question Details */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2 mb-3">
            <div className="text-xs text-amber-500 font-mono font-bold">
              ՀԱՐՑ {qIdx + 1} • {activePlayer === 'gor' ? '🧑‍💻 Գոռի հարցն է' : '👩‍💻 Գայանեի հարցն է'}
            </div>
            <div className="text-[11px] bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-2 py-0.5 rounded-md font-sans font-bold">
              ⏳ {currentQ.tenseSpanish} ({currentQ.tenseArmenian})
            </div>
          </div>
          <p className="text-base md:text-lg font-bold font-mono tracking-wide text-slate-100 mb-3 leading-relaxed">
            {currentQ.sentence}
          </p>
          <div className="border-t border-slate-900 pt-3 text-xs text-slate-450 italic">
            Թարգմանություն՝ {currentQ.translation}
          </div>
        </div>

        {/* Right Side: Options and next Button */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((opt, oIdx) => {
              const belongsToSelect = selectedOpt === opt;
              const belongsToCorrect = currentQ.correct === opt;

              let btnClass = 'border-slate-850 bg-slate-850 hover:bg-slate-800 text-slate-200';
              if (answered) {
                if (belongsToCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300';
                } else if (belongsToSelect) {
                  btnClass = 'border-rose-500 bg-rose-500/20 text-rose-300';
                } else {
                  btnClass = 'border-slate-850 bg-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleRaceChoice(opt)}
                  disabled={answered}
                  className={`p-3.5 rounded-xl font-mono font-black text-sm border-2 transition-all cursor-pointer ${btnClass} flex items-center justify-between`}
                >
                  <span>{opt}</span>
                  {answered && belongsToCorrect && <span className="text-[10px] font-mono font-bold bg-emerald-600/30 px-1.5 rounded">✓ +120m</span>}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-between items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-850"
              >
                <span className="text-xs text-slate-400">
                  {selectedOpt === currentQ.correct ? '🎉 Ճիշտ պատասխան, ձեր վազողը ստացավ արագացում!' : '❌ Սխալ պատասխան, արագացում չստացաք։'}
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
                >
                  Հաջորդը
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Winner Modal Backdrop Overlay */}
      {(positions.gor >= 100 || positions.gayane >= 100) && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30">
          <Trophy className="w-16 h-16 text-yellow-400 animate-bounce mb-4" />
          <h4 className="text-2xl font-black font-sans text-white tracking-tight">
            🏁 ԱՎԱՐՏԻ ԳԻԾ!
          </h4>
          <p className="text-sm font-medium text-slate-300 mt-2 max-w-sm">
            Մրցանակային հաջողություն:{' '}
            <span className="text-yellow-400 font-bold">
              {positions.gor >= 100 ? 'ԳՈՌԸ' : 'ԳԱՅԱՆԵՆ'}
            </span>{' '}
            առաջինը հասավ եզրագծին և ստացավ հատուկ բոնուսային միավորներ։
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                const winner = positions.gor >= 100 ? 'gor' : 'gayane';
                onScoreAdd(winner, 200);
                sounds.playVictory();
                resetRace();
              }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 text-xs font-black uppercase rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              🎉 Ստանալ Բոնուս +200
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
