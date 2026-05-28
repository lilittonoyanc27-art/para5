/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Eye, EyeOff, HelpCircle, ArrowRight } from 'lucide-react';
import { TEXTBOOK_DATA } from './data';
import { SentenceItem, TenseType } from './types';
import { sounds } from './SoundEffects';

export default function Textbook() {
  const [selectedTense, setSelectedTense] = useState<TenseType>('perfecto');
  const [revealedSentences, setRevealedSentences] = useState<Record<string, boolean>>({});

  const activeSection = TEXTBOOK_DATA.find((s) => s.tense === selectedTense)!;

  const toggleSentence = (id: string) => {
    sounds.playPop();
    setRevealedSentences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const revealAllCurrent = () => {
    sounds.playPop();
    const nextReveals = { ...revealedSentences };
    activeSection.sentences.forEach((s) => {
      nextReveals[s.id] = true;
    });
    setRevealedSentences(nextReveals);
  };

  const hideAllCurrent = () => {
    sounds.playPop();
    const nextReveals = { ...revealedSentences };
    activeSection.sentences.forEach((s) => {
      nextReveals[s.id] = false;
    });
    setRevealedSentences(nextReveals);
  };

  // Helper colors for tenses to give a premium unique feel
  const themeColors: Record<TenseType, { primary: string; hover: string; lightbg: string; badge: string; text: string; bg: string }> = {
    perfecto: {
      primary: 'bg-emerald-500',
      hover: 'hover:bg-emerald-400',
      lightbg: 'bg-emerald-50 border-emerald-400',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-400',
      text: 'text-emerald-700',
      bg: 'from-emerald-100 to-teal-50',
    },
    indefinido: {
      primary: 'bg-orange-500',
      hover: 'hover:bg-orange-400',
      lightbg: 'bg-orange-50 border-orange-400',
      badge: 'bg-orange-100 text-orange-900 border-orange-400',
      text: 'text-orange-700',
      bg: 'from-orange-100 to-amber-50',
    },
    imperfecto: {
      primary: 'bg-sky-500',
      hover: 'hover:bg-sky-400',
      lightbg: 'bg-sky-50 border-sky-400',
      badge: 'bg-sky-100 text-sky-900 border-sky-450',
      text: 'text-sky-700',
      bg: 'from-sky-100 to-indigo-50',
    },
    pluscuamperfecto: {
      primary: 'bg-purple-500',
      hover: 'hover:bg-purple-400',
      lightbg: 'bg-purple-50 border-purple-400',
      badge: 'bg-purple-100 text-purple-900 border-purple-400',
      text: 'text-purple-700',
      bg: 'from-purple-100 to-rose-50',
    },
  };

  return (
    <div className="space-y-8" id="textbook-main-container">
      {/* Tense Level Selection with Neo-Brutalist 3D Depth */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="tense-selector-grid">
        {TEXTBOOK_DATA.map((sect) => {
          const isActive = selectedTense === sect.tense;
          const tColor = themeColors[sect.tense];
          return (
            <button
              key={sect.tense}
              id={`tab-btn-${sect.tense}`}
              onClick={() => {
                sounds.playPop();
                setSelectedTense(sect.tense);
              }}
              className={`relative overflow-hidden p-4 rounded-2xl text-left border-4 border-slate-900 transition-all duration-200 transform cursor-pointer ${
                isActive
                  ? `${tColor.primary} text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-y-1`
                  : 'bg-white text-slate-700 hover:bg-amber-50 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px]'
              }`}
            >
              <div className="font-sans font-black text-xs tracking-wider uppercase opacity-85">
                {sect.tense === 'pluscuamperfecto' ? 'Pluscuamperfecto' : sect.tense.toUpperCase()}
              </div>
              <div className="font-sans font-black text-lg md:text-xl mt-1 tracking-tight text-slate-900">
                {sect.titleEsp.split(' ')[1] || sect.titleEsp}
              </div>
              <div className="text-xs mt-2 font-bold opacity-90 leading-snug line-clamp-1">
                {sect.titleArm}
              </div>
              {isActive && (
                <div className="absolute right-3 top-3 w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="content-container">
        {/* Main Sentences Section */}
        <div className="lg:col-span-2 space-y-6" id="sentences-main-card">
          <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b-4 border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-1 text-xs font-black uppercase rounded-lg border-2 border-slate-900 tracking-wider ${themeColors[selectedTense].badge}`}>
                    {activeSection.topicArm}
                  </span>
                  <span className="text-slate-500 font-mono text-xs">/</span>
                  <span className="text-slate-650 font-sans font-bold text-xs uppercase tracking-wide">
                    {activeSection.topicEsp}
                  </span>
                </div>
                <h3 className="font-sans font-black text-2xl text-slate-900 tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-slate-800" />
                  {activeSection.titleEsp}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={revealAllCurrent}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl text-slate-900 bg-amber-300 border-2 border-slate-900 hover:bg-amber-400 transition-colors shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Բոլորը
                </button>
                <button
                  onClick={hideAllCurrent}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl text-slate-900 bg-slate-100 border-2 border-slate-900 hover:bg-slate-200 transition-colors shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  Թաքցնել
                </button>
              </div>
            </div>

            {/* Read & Click Interactive Content */}
            <p className="text-slate-700 text-xs mb-4 font-sans font-bold flex items-center gap-1.5">
              <span>💡</span> Կտտացրու ցանկացած իսպաներեն նախադասության վրա՝ նրա հայերեն թարգմանությունը տեսնելու համար։
            </p>

            <div className="space-y-4" id="sentence-items-list">
              {activeSection.sentences.map((sentence, idx) => {
                const isRevealed = !!revealedSentences[sentence.id];
                const activeTheme = themeColors[selectedTense];
                return (
                  <div
                    key={sentence.id}
                    className="group"
                    id={`sentence-card-${sentence.id}`}
                  >
                    <div
                      onClick={() => toggleSentence(sentence.id)}
                      className={`cursor-pointer overflow-hidden p-5 rounded-2xl border-2 border-slate-905 transition-all duration-200 ${
                        isRevealed
                          ? 'bg-amber-50/50 border-amber-500 shadow-[3px_3px_0px_0px_rgba(245,158,11,1)]'
                          : 'bg-white border-slate-900 hover:border-amber-500 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(245,158,11,1)]'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="font-mono text-sm text-slate-400 font-extrabold select-none pt-0.5">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1 space-y-3">
                          {/* Spanish Text */}
                          <div className="text-slate-900 font-sans text-lg font-black leading-relaxed tracking-tight group-hover:text-amber-805 transition-colors">
                            {sentence.spanish.split(' ').map((word, wIdx) => {
                              // Let's highlight specific important verbs
                              const cleanedWord = word.replace(/[.,]/g, '').toLowerCase();
                              const isVerb = sentence.verbsInvolved.some(v => 
                                v.toLowerCase().includes(cleanedWord) || cleanedWord.includes(v.toLowerCase())
                              );
                              
                              return (
                                <span
                                  key={wIdx}
                                  className={isVerb ? `${activeTheme.text} font-black underline decoration-3 underline-offset-4 bg-yellow-200/90 px-1 rounded border border-yellow-300` : ''}
                                >
                                  {word}{' '}
                                </span>
                              );
                            })}
                          </div>

                          {/* Armenian Translation with Smooth Slide Animate */}
                          <AnimatePresence initial={false}>
                            {isRevealed && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className={`mt-2 p-3.5 rounded-xl border-2 border-slate-900 ${activeTheme.lightbg} text-slate-900 font-sans text-base leading-relaxed tracking-wide font-black relative`}>
                                  <div className="absolute top-1 left-2 text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold">
                                    Հայերեն թարգմանություն
                                  </div>
                                  <div className="pt-3">
                                    {sentence.armenian}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="pt-1 text-slate-500 group-hover:text-slate-900 transition-colors">
                          {isRevealed ? (
                            <EyeOff className="w-5 h-5 opacity-90" />
                          ) : (
                            <Eye className="w-5 h-5 opacity-80 group-hover:scale-110 transform transition-transform" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Verb Conjugations Sidebar */}
        <div className="space-y-6" id="textbook-sidebar-card">
          {/* Key verbs list card */}
          <div className="bg-white rounded-3xl p-6 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h4 className="font-sans font-black text-lg text-slate-900 mb-4 tracking-tight flex items-center gap-2">
              <span className="p-1.5 bg-yellow-400 text-slate-950 rounded-lg border border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                💫
              </span>
              Բանալի բայեր (Verbos)
            </h4>
            <div className="space-y-2.5" id="key-verbs-list">
              {activeSection.verbs.map((verb, vIdx) => (
                <div
                  key={vIdx}
                  className="p-3.5 bg-slate-50 hover:bg-amber-100/50 border-2 border-slate-900 rounded-xl transition-all flex items-center justify-between"
                >
                  <span className={`font-mono font-bold text-sm tracking-tight ${themeColors[selectedTense].text}`}>
                    {verb.spanish}
                  </span>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-sans text-xs font-black text-slate-900 bg-white border-2 border-slate-900 px-2.5 py-1 rounded-lg">
                      {verb.armenian}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Summary Reference Card */}
          <div className={`p-6 rounded-3xl border-4 border-slate-900 relative overflow-hidden bg-gradient-to-br ${themeColors[selectedTense].bg} shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]`}>
            {/* Soft decorative visual overlay */}
            <div className="absolute right-0 bottom-0 text-9xl transform translate-x-1/4 translate-y-1/4 select-none opacity-5 leading-none font-black font-sans">
              ?
            </div>

            <h4 className="font-sans font-black text-lg text-slate-900 mb-2 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-slate-800" />
              Շատ կարճ հիշելու համար
            </h4>
            <p className="text-slate-900 font-sans text-sm font-black leading-relaxed">
              {activeSection.summary}
            </p>

            {/* Quick Cheat Memo Box */}
            <div className="mt-4 p-3 bg-white/95 rounded-xl border-2 border-slate-900">
              <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest mb-1.5">
                Կիրառման Օրինակ
              </div>
              <div className="font-mono text-xs text-slate-900 font-black">
                {selectedTense === 'perfecto' && 'Hoy -> he comprado (գնել եմ)'}
                {selectedTense === 'indefinido' && 'Ayer -> compré (գնեցի)'}
                {selectedTense === 'imperfecto' && 'Antes -> compraba (գնում էի)'}
                {selectedTense === 'pluscuamperfecto' && 'Ya -> había comprado (գնել էի)'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
