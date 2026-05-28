/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, Zap, ShieldAlert, Award, ChevronRight, User } from 'lucide-react';
import { GameScore } from './types';
import { sounds } from './SoundEffects';

// Lazy imports of sub-games
import Game1Sorting from './Game1Sorting';
import Game2QuizPodium from './Game2QuizPodium';
import Game3SentenceBlocks from './Game3SentenceBlocks';
import Game4MemoryCards from './Game4MemoryCards';
import Game5ConjugationRacer from './Game5ConjugationRacer';
import Game6ChronoGrid from './Game6ChronoGrid';

export default function GameArena() {
  const [activePlayer, setActivePlayer] = useState<'gor' | 'gayane'>('gor');
  const [scores, setScores] = useState<GameScore>(() => {
    try {
      const saved = localStorage.getItem('gor_gayane_scores');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.gor === 'number' && typeof parsed.gayane === 'number') {
          return parsed;
        }
      }
      return { gor: 0, gayane: 0 };
    } catch {
      return { gor: 0, gayane: 0 };
    }
  });

  const [activeGame, setActiveGame] = useState<number | null>(null);

  // Sync scores to local storage
  useEffect(() => {
    localStorage.setItem('gor_gayane_scores', JSON.stringify(scores));
  }, [scores]);

  const addScore = (player: 'gor' | 'gayane', points: number) => {
    setScores(prev => ({
      ...prev,
      [player]: prev[player] + points
    }));
  };

  const toggleTurn = () => {
    setActivePlayer(prev => (prev === 'gor' ? 'gayane' : 'gor'));
  };

  const clearLeaderboard = () => {
    sounds.playWrong();
    setScores({ gor: 0, gayane: 0 });
  };

  // Detailed list of games to show on selection dashboard
  const GAMES_META = [
    {
      id: 1,
      title: '3D Ժամանակների Տեսակավորում',
      desc: 'Տեսակավորիր իսպաներեն բայերի 3D քարտերը ըստ ժամանակների։',
      icon: '🎴',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
      points: '+50-100'
    },
    {
      id: 2,
      title: '3D Պոդիումային Վիկտորինա',
      desc: 'Պատասխանիր հարցերին և բարձրացրու քո 3D պոդիումի բարձրությունը։',
      icon: '📊',
      color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5',
      points: '+80'
    },
    {
      id: 3,
      title: '3D Բառ-Բլոկների Կառուցող',
      desc: 'Դասավորիր բլոկները ճիշտ քերականական հերթականությամբ։',
      icon: '🏗️',
      color: 'border-orange-500/30 text-orange-400 bg-orange-500/5',
      points: '+100'
    },
    {
      id: 4,
      title: '3D Հիշողության Զույգեր',
      desc: 'Գտիր համընկնող իսպաներեն բայերն ու հայերեն թարգմանությունները։',
      icon: '🧠',
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
      points: '+40'
    },
    {
      id: 5,
      title: '3D Կոնյուգացիայի Վազքուղի',
      desc: 'Արագ արձագանքիր և առաջինը հասիր վազքուղու եզրագծին։',
      icon: '🏎️',
      color: 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5',
      points: '+120-320'
    },
    {
      id: 6,
      title: '3D Ժամանակի Բանալիներ',
      desc: 'Գուշակիր ցուցիչ բառերի ժամանակը և բացիր գաղտնի դարպասները։',
      icon: '🔑',
      color: 'border-teal-500/30 text-teal-400 bg-teal-500/5',
      points: '+150-350'
    }
  ];

  return (
    <div className="space-y-8" id="game-arena-root">
      {/* 1. Header Leaderboard Panel (Neo-brutalist Bento grid style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="leaderboard-panel">
        {/* Gor Scoreboard */}
        <div className={`p-6 rounded-3xl border-4 border-slate-900 transition-all ${
          activePlayer === 'gor' 
            ? 'bg-[#818CF8] text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-1' 
            : 'bg-white text-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4F46E5] text-white rounded-2xl border-2 border-slate-900 flex items-center justify-center text-xl font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                🧑‍💻
              </div>
              <div>
                <h4 className="font-sans font-black text-lg text-slate-900 leading-tight">ԳՈՌ</h4>
                <p className="text-xs text-slate-800 font-bold font-sans">Խաղացող 1</p>
              </div>
            </div>
            {activePlayer === 'gor' && (
              <span className="text-[10px] font-mono font-black bg-white ring-2 ring-slate-900 text-indigo-900 px-2 py-0.5 rounded-lg tracking-widest uppercase animate-pulse">
                ԸՆԹԱՑԻԿ
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <span className="text-xs font-black text-slate-800 font-sans uppercase">Ընդհանուր հաշիվ</span>
            <span className="text-3xl font-black font-sans text-indigo-950">{scores.gor}</span>
          </div>
        </div>

        {/* Gayane Scoreboard */}
        <div className={`p-6 rounded-3xl border-4 border-slate-900 transition-all ${
          activePlayer === 'gayane' 
            ? 'bg-[#F472B6] text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-1' 
            : 'bg-white text-slate-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#DB2777] text-white rounded-2xl border-2 border-slate-900 flex items-center justify-center text-xl font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                👩‍💻
              </div>
              <div>
                <h4 className="font-sans font-black text-lg text-slate-900 leading-tight">ԳԱՅԱՆԵ</h4>
                <p className="text-xs text-slate-800 font-bold font-sans">Խաղացող 2</p>
              </div>
            </div>
            {activePlayer === 'gayane' && (
              <span className="text-[10px] font-mono font-black bg-white ring-2 ring-slate-900 text-rose-900 px-2 py-0.5 rounded-lg tracking-widest uppercase animate-pulse">
                ԸՆԹԱՑԻԿ
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between mt-4">
            <span className="text-xs font-black text-slate-800 font-sans uppercase">Ընդհանուր հաշիվ</span>
            <span className="text-3xl font-black font-sans text-rose-950">{scores.gayane}</span>
          </div>
        </div>

        {/* Global Stats Controls */}
        <div className="p-6 rounded-3xl border-4 border-slate-900 bg-amber-200 text-slate-900 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center justify-between">
            <h4 className="font-sans font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600 animate-bounce" />
              ՄՐՑԱՇԱՐ
            </h4>
            <button
              onClick={clearLeaderboard}
              className="text-[10px] font-mono font-black text-rose-700 hover:text-white hover:bg-rose-600 border-2 border-rose-600 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
            >
              Մաքրել
            </button>
          </div>

          <div className="pt-4 flex flex-col justify-end space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Առաջատար՝</span>
              <span className="font-black text-slate-900 uppercase">
                {scores.gor === scores.gayane && '🤝 Ոչ-ոքի'}
                {scores.gor > scores.gayane && '🧑‍💻 Գոռ'}
                {scores.gor < scores.gayane && '👩‍💻 Գայանե'}
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playPop();
                toggleTurn();
              }}
              className="w-full py-2 bg-white hover:bg-slate-50 text-slate-900 font-black font-sans text-xs rounded-xl border-2 border-slate-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Փոխանցել հերթը
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Game Console Visual viewport */}
      <div className="bg-white rounded-3xl border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        {activeGame === null ? (
          <div className="space-y-6">
            <div className="p-5 bg-amber-100 border-2 border-slate-900 rounded-2xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
              <h3 className="text-lg font-black text-slate-900 font-sans tracking-tight">
                🎮 ՄՐՑՈՒՅԹԻ ԱԼԻՔ • Ընտրի՛ր 6 հետաքրքիր խաղերից մեկը
              </h3>
              <p className="text-sm font-bold text-slate-700 mt-1 max-w-2xl leading-relaxed">
                Գրավի՛ր հաղթանակը՝ հերթով պատասխանելով իսպաներենի անցյալ ժամանակների քերականությանը։ Յուրաքանչյուր խաղ ունի իրեն համապատասխան գեղեցիկ 3D դիզայն:
              </p>
            </div>

            {/* Games bento listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="games-bento-grid">
              {GAMES_META.map((game, idx) => (
                <div
                  key={game.id}
                  onClick={() => {
                    sounds.playPop();
                    setActiveGame(game.id);
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-slate-900 bg-white hover:bg-amber-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none flex flex-col justify-between min-h-[190px]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 border-slate-900 bg-slate-50 shadow-inner group-hover:scale-105 transition-transform">
                      {game.icon}
                    </div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-900 border-2 border-slate-900 bg-yellow-350 px-2 block py-0.5 rounded-lg shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                      {game.points} pts
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans font-black text-gray-900 tracking-tight group-hover:text-amber-805 transition-colors text-base">
                      {game.title}
                    </h4>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed mt-1.5 line-clamp-2">
                      {game.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-black font-sans text-amber-600">
                    Խաղալ հիմա
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active game header viewport status bar */}
            <div className="flex items-center justify-between border-b-4 border-slate-100 pb-4 mb-4">
              <button
                onClick={() => {
                  sounds.playPop();
                  setActiveGame(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                ← Վերադառնալ
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-500 font-semibold uppercase">Խաղացող՝</span>
                <span className={`px-2.5 py-1 text-xs font-black rounded-lg uppercase tracking-wider border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] ${
                  activePlayer === 'gor' ? 'bg-[#818CF8] text-indigo-950' : 'bg-[#F472B6] text-rose-950'
                }`}>
                  {activePlayer === 'gor' ? '🧑‍💻 ԳՈՌ' : '👩‍💻 ԳԱՅԱՆԵ'}
                </span>
              </div>
            </div>

            {/* Active Embedded Game Viewport Renderer */}
            <div className="rounded-3xl overflow-hidden border-2 border-slate-900">
              {activeGame === 1 && (
                <Game1Sorting
                  onScoreAdd={addScore}
                  activePlayer={activePlayer}
                  onTurnToggle={toggleTurn}
                />
              )}
              {activeGame === 2 && (
                <Game2QuizPodium
                  onScoreAdd={addScore}
                  activePlayer={activePlayer}
                  onTurnToggle={toggleTurn}
                />
              )}
              {activeGame === 3 && (
                <Game3SentenceBlocks
                  onScoreAdd={addScore}
                  activePlayer={activePlayer}
                  onTurnToggle={toggleTurn}
                />
              )}
              {activeGame === 4 && (
                <Game4MemoryCards
                  onScoreAdd={addScore}
                  activePlayer={activePlayer}
                  onTurnToggle={toggleTurn}
                />
              )}
              {activeGame === 5 && (
                <Game5ConjugationRacer
                  onScoreAdd={addScore}
                  activePlayer={activePlayer}
                  onTurnToggle={toggleTurn}
                />
              )}
              {activeGame === 6 && (
                <Game6ChronoGrid
                  onScoreAdd={addScore}
                  activePlayer={activePlayer}
                  onTurnToggle={toggleTurn}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
