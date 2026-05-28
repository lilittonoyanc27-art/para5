/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Unlock, Lock, Compass, HelpCircle, Sparkles } from 'lucide-react';
import { INDICATOR_MATCHES } from './data';
import { TenseType } from './types';
import { sounds } from './SoundEffects';

interface Game6Props {
  onScoreAdd: (player: 'gor' | 'gayane', points: number) => void;
  activePlayer: 'gor' | 'gayane';
  onTurnToggle: () => void;
}

export default function Game6ChronoGrid({ onScoreAdd, activePlayer, onTurnToggle }: Game6Props) {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [solvedKeys, setSolvedKeys] = useState<number[]>([]);
  const [selectedTense, setSelectedTense] = useState<TenseType | null>(null);
  const [failures, setFailures] = useState(0);

  const handleTileClick = (idx: number) => {
    if (solvedKeys.includes(idx)) return;
    sounds.playPop();
    setSelectedMatch(idx);
    setSelectedTense(null);
  };

  const handleTenseKey = (tense: TenseType) => {
    if (selectedMatch === null) return;
    const activeItem = INDICATOR_MATCHES[selectedMatch];

    if (activeItem.tense === tense) {
      sounds.playCorrect();
      setSolvedKeys(prev => [...prev, selectedMatch]);
      onScoreAdd(activePlayer, 150);
      setSelectedMatch(null);
      setSelectedTense(null);
    } else {
      sounds.playWrong();
      setFailures(prev => prev + 1);
      // Fail penalty or turn toggle
      onTurnToggle();
      setSelectedMatch(null);
      setSelectedTense(null);
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setSolvedKeys([]);
    setSelectedMatch(null);
    setSelectedTense(null);
    setFailures(0);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden" id="game6-container">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#10b981] font-bold bg-[#10b981]/10 px-2.5 py-1 rounded-md">
            ԽԱՂ 6 • 3D ԺԱՄԱՆԱԿԻ ԲԱՆԱԼԻՆԵՐ
          </span>
          <h3 className="text-xl font-black font-sans mt-2 tracking-tight">
            Անցյալ Ժամանակների Ցուցիչ Բառեր
          </h3>
        </div>
        <button
          onClick={handleRestart}
          className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-350 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
        >
          Սկսել նորից
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-6 max-w-xl">
        💡 Յուրաքանչյուր ցուցիչ բառ (indicator word) թաքցնում է իր համապատասխան ժամանակի 3D դուռը։ Ընտրի՛ր ցուցիչը և միացրու ճիշտ անցյալ ժամանակի հետ՝ դուռը բացելու համար։
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Grid: Chrono locks */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          {INDICATOR_MATCHES.map((item, idx) => {
            const isSolved = solvedKeys.includes(idx);
            const isSelected = selectedMatch === idx;

            return (
              <div
                key={idx}
                onClick={() => handleTileClick(idx)}
                className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer h-32 flex flex-col justify-between ${
                  isSolved
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                    : isSelected
                      ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/10'
                      : 'border-slate-800 bg-slate-850 hover:border-slate-700 hover:bg-slate-800/70 text-slate-350'
                }`}
                id={`chrono-tile-${idx}`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-sans font-bold text-sm tracking-tight leading-snug">
                    {item.indicator}
                  </span>
                  {isSolved ? (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono opacity-80 select-none">
                    {item.meaning}
                  </div>
                  {isSolved && (
                    <div className="text-[10px] font-mono text-emerald-400 select-all underline">
                      {item.example}
                    </div>
                  )}
                </div>

                {/* Left indicators glow */}
                <div className="absolute bottom-2 right-2 text-xs font-mono font-bold text-slate-500 uppercase select-none">
                  {isSolved ? 'UNLOCKED' : `KEY 0${idx + 1}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Controls: Key Match selectors */}
        <div className="lg:col-span-5 h-[272px] bg-slate-950/80 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between relative overflow-hidden">
          {selectedMatch === null ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <Key className="w-10 h-10 text-slate-600 mb-3 animate-pulse" />
              <p className="text-sm font-semibold text-slate-350 font-sans">
                Ընտրի՛ր ցուցիչ բանալին ձախ կողմից՝ ապակոդավորումը սկսելու համար։
              </p>
              <div className="text-[10px] font-mono text-slate-500 mt-2">
                Ակտիվ խաղացող՝ {activePlayer === 'gor' ? 'ԳՈՌ 🧑‍💻' : 'ԳԱՅԱՆԵ 👩‍💻'}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-[9px] font-mono font-semibold text-indigo-400 uppercase tracking-widest px-1.5 py-0.5 bg-indigo-500/10 rounded">
                  Ակտիվ Բանալի {selectedMatch + 1}
                </span>
                <h4 className="font-mono text-base font-black text-white mt-1">
                  «{INDICATOR_MATCHES[selectedMatch].indicator}»
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  Ո՞ր անցյալ ժամանակաձևի հետ է օգտագործվում այս ցուցիչը։
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['perfecto', 'indefinido', 'imperfecto', 'pluscuamperfecto'] as TenseType[]).map((tenseType) => (
                  <button
                    key={tenseType}
                    onClick={() => handleTenseKey(tenseType)}
                    className="p-2.5 bg-slate-850 hover:bg-slate-800 border-2 border-slate-800 rounded-xl text-left text-xs font-bold font-mono text-slate-200 tracking-tight transition-all uppercase cursor-pointer text-center"
                  >
                    {tenseType === 'pluscuamperfecto' ? 'Pluscuam' : tenseType}
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-wider">
                Սխալվելու դեպքում հերթը կանցնի մյուս մասնակցին
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Succeeded unlocked time vault */}
      {solvedKeys.length === 4 && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30">
          <Sparkles className="w-14 h-14 text-emerald-400 animate-pulse mb-3" />
          <h4 className="text-xl font-black font-sans text-white tracking-tight">
            🎉 ԺԱՄԱՆԱԿԻ ՊԱՀԵՍՏԸ ԲԱՑՎԵՑ
          </h4>
          <p className="text-xs text-slate-350 mt-1 max-w-xs">
            Օգտագործելով բոլոր ցուցիչները՝ դուք հաջողությամբ բացեցիք ժամանակային դարպասները։ +200 ԲՈՆՈՒՍԱՅԻՆ ՄԻԱՎՈՐ։
          </p>
          <button
            onClick={() => {
              onScoreAdd(activePlayer, 200);
              sounds.playVictory();
              handleRestart();
            }}
            className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Վերցնել Միավորները
          </button>
        </div>
      )}
    </div>
  );
}
