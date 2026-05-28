/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw, Layers } from 'lucide-react';
import { ALL_VERBS_FLAT } from './data';
import { sounds } from './SoundEffects';

interface Game4Props {
  onScoreAdd: (player: 'gor' | 'gayane', points: number) => void;
  activePlayer: 'gor' | 'gayane';
  onTurnToggle: () => void;
}

interface MemoryCard {
  id: string; // unique card id
  content: string; // verb spanish or armenian translation
  pairId: string; // maps back to original verb
  type: 'spanish' | 'armenian';
}

export default function Game4MemoryCards({ onScoreAdd, activePlayer, onTurnToggle }: Game4Props) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    sounds.playPop();
    // Choose 4 random cards from the flat verb list
    const shuffledSource = [...ALL_VERBS_FLAT].sort(() => Math.random() - 0.5);
    const selectedSubset = shuffledSource.slice(0, 4);

    const generatedCards: MemoryCard[] = [];
    selectedSubset.forEach((verb) => {
      generatedCards.push({
        id: `es-${verb.spanish}`,
        content: verb.spanish,
        pairId: verb.spanish,
        type: 'spanish'
      });
      generatedCards.push({
        id: `arm-${verb.spanish}`,
        content: verb.armenian,
        pairId: verb.spanish,
        type: 'armenian'
      });
    });

    setCards(generatedCards.sort(() => Math.random() - 0.5));
    setSelectedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx: number) => {
    if (selectedIndices.length >= 2) return;
    if (selectedIndices.includes(idx)) return;
    if (matchedPairs.includes(cards[idx].pairId)) return;

    sounds.playPop();
    const nextSelected = [...selectedIndices, idx];
    setSelectedIndices(nextSelected);

    if (nextSelected.length === 2) {
      setMoves(prev => prev + 1);
      const first = cards[nextSelected[0]];
      const second = cards[nextSelected[1]];

      if (first.pairId === second.pairId && first.type !== second.type) {
        // Match found!
        setTimeout(() => {
          sounds.playCorrect();
          setMatchedPairs(prev => [...prev, first.pairId]);
          setSelectedIndices([]);
          onScoreAdd(activePlayer, 40); // 40 points per match
        }, 500);
      } else {
        // Wrong match
        setTimeout(() => {
          sounds.playWrong();
          setSelectedIndices([]);
          onTurnToggle(); // Alternate turn when wrong
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden" id="game4-container">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-bold bg-purple-500/10 px-2.5 py-1 rounded-md">
            ԽԱՂ 4 • 3D ՀԻՇՈՂՈՒԹՅԱՆ ԶՈՒՅԳԵՐ
          </span>
          <h3 className="text-xl font-black font-sans mt-2 tracking-tight">
            Միացրու բայը նրա հայերեն թարգմանության հետ
          </h3>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 font-sans">
            Փորձեր՝ {moves}
          </div>
          <button
            onClick={initGame}
            className="text-xs bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Խառնել
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-6 max-w-lg leading-relaxed relative z-10">
        💡 Կատարի՛ր զույգերի ընտրություն։ Եթե սխալվես, հերթը կանցնի մյուս մասնակցին։ Յուրաքանչյուր զույգը բերում է <span className="text-purple-400 font-bold">40 միավոր</span>:
      </p>

      {/* Grid of 3D Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 relative z-10 [perspective:1000px]" id="memory-cards-grid">
        {cards.map((card, idx) => {
          const isFlipped = selectedIndices.includes(idx) || matchedPairs.includes(card.pairId);
          const isMatched = matchedPairs.includes(card.pairId);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className="relative aspect-square w-full cursor-pointer group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`absolute inset-0 w-full h-full rounded-2xl border-2 transition-all duration-500 ease-out flex items-center justify-center p-3 text-center ${
                  isFlipped
                    ? isMatched
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                      : 'border-purple-500 bg-purple-600 text-white'
                    : 'border-slate-800 bg-slate-850 hover:border-slate-700 hover:bg-slate-800 text-slate-400'
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)'
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-sans font-bold text-sm tracking-tight leading-snug">
                    {card.content}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                    {card.type === 'spanish' ? '🇪🇸 ESP' : '🇦🇲 ARM'}
                  </span>
                </div>
              </div>

              {/* Card Backing */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl border-2 border-slate-705 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 flex items-center justify-center p-3 text-center shadow-lg group-hover:border-indigo-500/70"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shadow-inner group-hover:scale-110 transform transition-transform">
                    <Layers className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="text-[10px] font-mono font-black tracking-widest text-indigo-500 mt-2">
                    ?
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {matchedPairs.length === 4 && (
        <div className="mt-6 p-4 bg-emerald-600/15 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-between relative z-10 animate-pulse">
          <div>
            <h4 className="font-extrabold text-emerald-300 text-sm">🏆 ԲՈԼՈՐԸ ՀԱՄԸՆԿԱՆ!</h4>
            <p className="text-xs text-slate-450 mt-1">Հիանալի էր։ Բոլոր 4 բայերը հաջողությամբ զուգակցվեցին։</p>
          </div>
          <button
            onClick={initGame}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
          >
            Նոր խաղ
          </button>
        </div>
      )}
    </div>
  );
}
