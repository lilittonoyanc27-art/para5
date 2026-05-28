/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Trophy, Sparkles, HelpCircle, GraduationCap } from 'lucide-react';
import Textbook from './Textbook';
import GameArena from './GameArena';
import { sounds } from './SoundEffects';

type ActiveViewType = 'textbook' | 'arena';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveViewType>('textbook');

  const switchView = (view: ActiveViewType) => {
    sounds.playPop();
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7] text-slate-800 antialiased font-sans select-none pb-12" id="app-root-wrapper">
      {/* Dynamic Design Header with Vibrant Amber Theme */}
      <header className="bg-amber-400 border-b-4 border-amber-500 shadow-md sticky top-0 z-50 transition-all duration-300" id="header-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-md border-2 border-amber-500 transform rotate-[-3deg] hover:rotate-[3deg] transition-transform duration-200">
              🇪🇸
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-amber-955 uppercase italic leading-none flex items-center gap-2">
                Aprender Español
              </h1>
              <span className="text-xs font-bold text-amber-900 tracking-wider">
                ԳՈՌԻ ԵՎ ԳԱՅԱՆԵԻ ԱՆՑՅԱԼ ԺԱՄԱՆԱԿՆԵՐԻ 6 ՄՐՑՈՒԹԱՅԻՆ ԽԱՂԵՐՈՎ
              </span>
            </div>
          </div>

          <div className="flex gap-2 bg-amber-500/20 p-1.5 rounded-full border-2 border-amber-500/30" id="tabs-navigation">
            <button
              onClick={() => switchView('textbook')}
              className={`tense-tab flex items-center gap-2 px-5 py-2 rounded-full font-sans font-black text-sm transition-all duration-200 hover:scale-102 ${
                activeView === 'textbook'
                  ? 'bg-white text-amber-600 shadow-sm border-2 border-amber-200'
                  : 'text-amber-900 hover:text-amber-950 font-bold'
              }`}
            >
              📖 ԴԱՍԱԳԻՐՔ
            </button>
            <button
              onClick={() => switchView('arena')}
              className={`tense-tab flex items-center gap-2 px-5 py-2 rounded-full font-sans font-black text-sm transition-all duration-200 hover:scale-102 ${
                activeView === 'arena'
                  ? 'bg-white text-amber-600 shadow-sm border-2 border-amber-200'
                  : 'text-amber-900 hover:text-amber-950 font-bold'
              }`}
            >
              🏆 3D ԽԱՂԵՐ
            </button>
          </div>
        </div>
      </header>

      {/* Main interactive responsive body container spacer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {activeView === 'textbook' ? (
              <Textbook />
            ) : (
              <GameArena />
            )}
          </motion.div>
        </AnimatePresence>
      </main>


      {/* Footer Branding with zero developer meta-clutter */}
      <footer className="border-t border-slate-200 bg-white py-10" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 font-sans text-sm font-semibold select-none">
            🎨 Aprende Español: Gor & Gayane Course • 2026
          </div>
          <div className="text-gray-400 font-mono text-[10px] uppercase font-bold tracking-widest leading-none select-none">
            🇪🇸 Pretérito Perfecto • Indefinido • Imperfecto • Pluscuamperfecto 🇦🇲
          </div>
        </div>
      </footer>
    </div>
  );
}
