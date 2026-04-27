/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import { 
  BookOpen, 
  Code, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  RefreshCw, 
  Search, 
  Trophy, 
  Star,
  BrainCircuit,
  Info,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FUNCTIONS, ALL_FUNCTION_NAMES, FunctionDefinition, FunctionTraceStep } from './data/functions';
import { simulateGoCode } from './services/geminiService';

type Mode = 'learn' | 'quiz' | 'playground';

interface UserExample {
  id: string;
  funcId: string;
  args: string[];
  votes: number;
}

interface UserExplanation {
  id: string;
  funcId: string;
  lineIndex: number;
  explanation: string;
  votes: number;
}

interface Progress {
  completedModes: Record<string, Set<Mode>>;
  xp: number;
  badges: string[];
  userExamples: UserExample[];
  userExplanations: UserExplanation[];
  votedIds: Set<string>;
}

export default function App() {
  const [selectedFuncId, setSelectedFuncId] = useState<string>(FUNCTIONS[0].id);
  const [mode, setMode] = useState<Mode>('learn');
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('gofunc_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          xp: parsed.xp || 0,
          badges: parsed.badges || [],
          userExamples: parsed.userExamples || [],
          userExplanations: parsed.userExplanations || [],
          votedIds: new Set(parsed.votedIds || []),
          completedModes: Object.fromEntries(
            Object.entries(parsed.completedModes || {}).map(([id, s]) => [id, new Set(s as Mode[])])
          )
        };
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    return { 
      xp: 0, 
      badges: [], 
      userExamples: [], 
      userExplanations: [], 
      votedIds: new Set(),
      completedModes: {} 
    };
  });

  useEffect(() => {
    const toSave = {
      xp: progress.xp,
      badges: progress.badges,
      userExamples: progress.userExamples,
      userExplanations: progress.userExplanations,
      votedIds: Array.from(progress.votedIds),
      completedModes: Object.fromEntries(
        Object.entries(progress.completedModes).map(([id, s]) => [id, Array.from(s as Set<Mode>)])
      )
    };
    localStorage.setItem('gofunc_progress', JSON.stringify(toSave));
    
    // Check for level badges
    const levels = [1, 2, 3, 4, 6];
    levels.forEach(lvl => {
      const levelFuncs = ALL_FUNCTION_NAMES.filter(name => FUNCTIONS.find(fn => fn.id === name)?.level === lvl);
      const allDone = levelFuncs.every(name => progress.completedModes[name]?.size === 3);
      const badgeId = `Level ${lvl} Master`;
      if (allDone && levelFuncs.length > 0 && !progress.badges.includes(badgeId)) {
        setProgress(prev => ({ ...prev, badges: [...prev.badges, badgeId], xp: prev.xp + 500 }));
      }
    });
  }, [progress.completedModes, progress.badges, progress.xp, progress.userExamples, progress.userExplanations, progress.votedIds]);

  const selectedFunc = useMemo(() => 
    FUNCTIONS.find(f => f.id === selectedFuncId) || FUNCTIONS[0], 
  [selectedFuncId]);

  const markCompleted = (funcId: string, m: Mode) => {
    setProgress(prev => {
      const currentFuncModes = prev.completedModes[funcId] || new Set();
      if (currentFuncModes.has(m)) return prev;
      
      const newModes = new Set(currentFuncModes);
      newModes.add(m);
      return {
        ...prev,
        xp: prev.xp + 100,
        completedModes: { ...prev.completedModes, [funcId]: newModes }
      };
    });
  };

  const handleVote = (id: string, delta: number) => {
    setProgress(prev => {
      if (prev.votedIds.has(id)) return prev;
      const newVoted = new Set(prev.votedIds);
      newVoted.add(id);
      
      const examples = prev.userExamples.map(ex => ex.id === id ? { ...ex, votes: ex.votes + delta } : ex);
      const explanations = prev.userExplanations.map(ex => ex.id === id ? { ...ex, votes: ex.votes + delta } : ex);
      
      return { ...prev, votedIds: newVoted, userExamples: examples, userExplanations: explanations };
    });
  };

  const saveExample = (args: string[]) => {
    const newEx: UserExample = {
      id: Math.random().toString(36).substr(2, 9),
      funcId: selectedFunc.id,
      args,
      votes: 0
    };
    setProgress(prev => ({ ...prev, userExamples: [...prev.userExamples, newEx], xp: prev.xp + 20 }));
  };

  const saveExplanation = (lineIndex: number, text: string) => {
    const newExp: UserExplanation = {
      id: Math.random().toString(36).substr(2, 9),
      funcId: selectedFunc.id,
      lineIndex,
      explanation: text,
      votes: 0
    };
    setProgress(prev => ({ ...prev, userExplanations: [...prev.userExplanations, newExp], xp: prev.xp + 30 }));
  };

  const levels = [1, 2, 3, 4, 6];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/50">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Code className="text-slate-950 w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">GoMaster By Emmanuel</h1>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <Trophy className="w-3 h-3 text-amber-500" />
                <span>{progress.xp} XP • Level {Math.floor(progress.xp / 500) + 1}</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search functions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-8">
          <div className="px-2 mb-4">
            <button 
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all text-xs font-bold uppercase tracking-widest text-slate-400"
            >
              <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" /> Leaderboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {levels.map(lvl => {
            const levelFuncs = ALL_FUNCTION_NAMES.filter(name => {
              const f = FUNCTIONS.find(fn => fn.id === name);
              const levelMatch = f ? f.level === lvl : false;
              return levelMatch && name.toLowerCase().includes(searchQuery.toLowerCase());
            });

            if (levelFuncs.length === 0) return null;

            return (
              <div key={lvl}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 ml-2 flex justify-between items-center pr-2">
                  <span>Level {lvl} • {lvl === 1 ? 'Basics' : lvl === 2 ? 'Logic' : 'Advanced'}</span>
                  {progress.badges.includes(`Level ${lvl} Master`) && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                </p>
                <div className="space-y-1">
                  {levelFuncs.map(name => {
                    const isSelected = selectedFuncId === name;
                    const modeSet = progress.completedModes[name] || new Set();
                    const isComplete = modeSet.size === 3;
                    const partiallyComplete = modeSet.size > 0;
                    
                    return (
                      <button
                        key={name}
                        onClick={() => setSelectedFuncId(name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all group ${
                          isSelected 
                            ? "bg-slate-800 text-white font-medium shadow-sm" 
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
                        }`}
                      >
                        <span className="flex items-center">
                          {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>}
                          {name}
                        </span>
                        {isComplete ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : partiallyComplete ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-500/5">{Math.round((modeSet.size / 3) * 100)}%</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800/50 bg-slate-900/80">
          <div className="mb-4">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Badges Earned</p>
             <div className="flex flex-wrap gap-2">
               {progress.badges.map(b => (
                 <div key={b} title={b} className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                   <Trophy className="w-4 h-4" />
                 </div>
               ))}
               {progress.badges.length === 0 && <span className="text-[10px] text-slate-600 italic">No badges yet...</span>}
             </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery Level</span>
              <span className="text-[10px] text-cyan-400 font-mono">{progress.xp} XP</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="bg-cyan-500 h-full transition-all duration-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" 
                style={{ width: `${(progress.xp % 500) / 5}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {showLeaderboard && (
          <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-12">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h3 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <Trophy className="text-amber-500 w-8 h-8" /> Leaderboard
                </h3>
                <button onClick={() => setShowLeaderboard(false)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
                  <RefreshCw className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-4">
                {[
                  { name: "You", xp: progress.xp, current: true, rank: 1 },
                  { name: "PixelWizard", xp: 12400, rank: 2 },
                  { name: "GoNinja", xp: 9850, rank: 3 },
                  { name: "CodeCrasher", xp: 8200, rank: 4 },
                  { name: "SliceMaster", xp: 5100, rank: 5 },
                ].sort((a,b) => b.xp - a.xp).map((u, i) => (
                  <div key={u.name} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${u.current ? 'bg-cyan-500/10 border-cyan-500/50 scale-105 shadow-lg' : 'bg-slate-800/50 border-slate-700'}`}>
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-black w-8 text-center ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-amber-800' : 'text-slate-600'}`}>{i + 1}</span>
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">{u.name[0]}</div>
                      <span className={`font-bold ${u.current ? 'text-cyan-400' : 'text-slate-200'}`}>{u.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-white">{u.xp} XP</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">Mastery Tier</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Header Tabs */}
        <header className="h-16 flex items-center justify-between px-8 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-6">
            <h2 className="text-lg font-semibold text-white tracking-tight">{selectedFunc.name}.go</h2>
            <div className="flex bg-slate-800 p-1 rounded-lg">
              <TabButton 
                active={mode === 'learn'} 
                onClick={() => setMode('learn')} 
                icon={<BookOpen className="w-3.5 h-3.5" />}
                label="Learn"
                isDone={progress.completedModes[selectedFunc.id]?.has('learn')}
              />
              <TabButton 
                active={mode === 'quiz'} 
                onClick={() => setMode('quiz')} 
                icon={<BrainCircuit className="w-3.5 h-3.5" />}
                label="Quiz"
                isDone={progress.completedModes[selectedFunc.id]?.has('quiz')}
              />
              <TabButton 
                active={mode === 'playground'} 
                onClick={() => setMode('playground')} 
                icon={<Terminal className="w-3.5 h-3.5" />}
                label="Playground"
                isDone={progress.completedModes[selectedFunc.id]?.has('playground')}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => {
                const modeName = i === 1 ? 'learn' : i === 2 ? 'quiz' : 'playground';
                const done = progress.completedModes[selectedFunc.id]?.has(modeName as Mode);
                return (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${done ? 'bg-cyan-500 text-slate-950 scale-110 shadow-lg shadow-cyan-500/20' : 'bg-slate-700 text-slate-400'}`}>
                    {i}
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedFunc.id}-${mode}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {mode === 'learn' && (
                <LearnView 
                  func={selectedFunc} 
                  userExplanations={progress.userExplanations.filter(e => e.funcId === selectedFunc.id)}
                  votedIds={progress.votedIds}
                  onComplete={() => markCompleted(selectedFunc.id, 'learn')} 
                  onVote={handleVote}
                  onSuggest={saveExplanation}
                />
              )}
              {mode === 'quiz' && <QuizView func={selectedFunc} onComplete={() => markCompleted(selectedFunc.id, 'quiz')} />}
              {mode === 'playground' && (
                <PlaygroundView 
                  func={selectedFunc} 
                  userExamples={progress.userExamples.filter(e => e.funcId === selectedFunc.id)}
                  votedIds={progress.votedIds}
                  onComplete={() => markCompleted(selectedFunc.id, 'playground')} 
                  onSaveExample={saveExample}
                  onVote={handleVote}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, isDone }: { active: boolean, onClick: () => void, icon: ReactNode, label: string, isDone?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 ${
        active 
          ? "bg-slate-700 text-white shadow-sm" 
          : "text-slate-400 hover:text-white"
      }`}
    >
      {icon}
      {label}
      {isDone && <CheckCircle2 className="w-3 h-3 text-cyan-400" />}
    </button>
  );
}

function LearnView({ 
  func, 
  userExplanations, 
  votedIds,
  onComplete, 
  onVote, 
  onSuggest 
}: { 
  func: FunctionDefinition, 
  userExplanations: UserExplanation[],
  votedIds: Set<string>,
  onComplete: () => void,
  onVote: (id: string, delta: number) => void,
  onSuggest: (idx: number, text: string) => void
}) {
  const [currentLine, setCurrentLine] = useState(-1); // Start at -1 for intro
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");

  const handleNext = () => {
    if (currentLine < func.goCode.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentLine > -1) {
      setCurrentLine(prev => prev - 1);
    }
  };

  const currentSuggestions = userExplanations.filter(e => e.lineIndex === currentLine).sort((a,b) => b.votes - a.votes);

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Code Editor Panel */}
      <div className="flex-1 bg-slate-950 p-6 font-mono text-sm leading-relaxed relative flex flex-col overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-900/30 flex flex-col items-center pt-6 text-slate-600 select-none">
          {func.goCode.map((_, i) => <span key={i}>{i+1}</span>)}
        </div>
        <div className="pl-10 space-y-0.5 overflow-y-auto custom-scrollbar pr-4">
          <div className="text-slate-500 mb-4">package main</div>
          {func.goCode.map((line, i) => (
            <div 
              key={i} 
              className={`pl-4 py-0.5 transition-colors border-l-2 ${i === currentLine ? "bg-cyan-500/10 border-cyan-400 text-white" : "border-transparent text-slate-400 opacity-50"}`}
            >
              <pre className="whitespace-pre-wrap">{line}</pre>
            </div>
          ))}
        </div>

        {/* Step Indicator */}
        <div className="absolute bottom-8 right-8">
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-full pl-4 pr-1 py-1 shadow-2xl">
            {currentLine === -1 ? (
              <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Goal: {func.name}</span>
            ) : (
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">STEP {currentLine + 1} OF {func.goCode.length}</span>
            )}
            <div className="flex gap-1">
              <button 
                onClick={handlePrev}
                disabled={currentLine === -1}
                className="bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 p-1.5 rounded-full transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95"
              >
                {currentLine < func.goCode.length - 1 ? (currentLine === -1 ? 'Start Learning →' : 'Next Line →') : 'Complete Learn'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Panel */}
      <div className="w-[420px] bg-slate-100 p-8 flex flex-col border-l border-slate-200">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-lg">💡</span>
              <h3 className="text-slate-900 font-bold uppercase tracking-tighter">The Concept</h3>
            </div>
            {currentLine >= 0 && (
              <button 
                onClick={() => setIsSuggesting(!isSuggesting)}
                className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-1 rounded font-bold uppercase tracking-widest transition-all"
              >
                {isSuggesting ? 'Cancel' : 'Suggest New'}
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cyan-500 rounded-full"></div>
              <AnimatePresence mode="wait">
                <motion.h4 
                  key={currentLine}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] mb-2"
                >
                  {currentLine === -1 ? 'Problem Goal' : `Line Analysis • Step ${currentLine + 1}`}
                </motion.h4>
              </AnimatePresence>
              <div className="text-slate-900 text-lg font-medium leading-relaxed">
                {currentLine === -1 ? (func.intro || "Let's learn how this function works!") : func.explanations[currentLine]}
              </div>
            </div>

            {currentLine >= 0 && (
              <>
                {isSuggesting && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-5 shadow-inner border-2 border-dashed border-slate-300"
                  >
                    <textarea 
                      value={suggestionText}
                      onChange={(e) => setSuggestionText(e.target.value)}
                      placeholder="Explain this to a 9-year-old..."
                      className="w-full text-sm bg-transparent outline-none resize-none min-h-[80px] text-slate-800"
                    />
                    <button 
                      onClick={() => {
                        onSuggest(currentLine, suggestionText);
                        setSuggestionText("");
                        setIsSuggesting(false);
                      }}
                      className="w-full mt-2 bg-blue-600 text-white py-2 rounded-xl text-xs font-bold uppercase tracking-widest"
                    >
                      Submit Suggestion
                    </button>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Community Hub</p>
                  {currentSuggestions.map(s => (
                    <div key={s.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                      <p className="text-slate-800 text-sm mb-3">"{s.explanation}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">By Community Member</span>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => onVote(s.id, 1)}
                            className={`transition-colors ${votedIds.has(s.id) ? 'text-cyan-500' : 'text-slate-400 hover:text-cyan-500'}`}
                          >
                             <Trophy className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-slate-600">{s.votes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {currentSuggestions.length === 0 && !isSuggesting && (
                    <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs italic">
                      No community explanations yet. Be the first to explain this line!
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="border-t border-slate-200 pt-6 mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>LESSON PROGRESS</span>
            <span>{Math.round(((currentLine + 1) / func.goCode.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-300" 
              style={{ width: `${Math.max(0, ((currentLine + 1) / func.goCode.length) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizView({ func, onComplete }: { func: FunctionDefinition, onComplete: () => void }) {
  const [blankedIndices, setBlankedIndices] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState(-1);

  useEffect(() => {
    // Generate random blanks (1-3 blanks depending on function length)
    const count = Math.min(3, Math.max(1, Math.floor(func.goCode.length / 4)));
    const indices: number[] = [];
    const pool = func.goCode.map((_, i) => i).filter(i => {
      const line = func.goCode[i].trim();
      return line.length > 5 && !line.startsWith("func") && !line.startsWith("}");
    });
    
    while(indices.length < count && pool.length > 0) {
      const random = Math.floor(Math.random() * pool.length);
      indices.push(pool.splice(random, 1)[0]);
    }
    setBlankedIndices(indices.sort((a, b) => a - b));
    setAnswers({});
    setResults({});
    setSubmitted(false);
    setActiveHintIndex(-1);
  }, [func]);

  const handleSubmit = () => {
    const newResults: Record<number, boolean> = {};
    blankedIndices.forEach(idx => {
      const isCorrect = answers[idx]?.trim() === func.goCode[idx].trim();
      newResults[idx] = isCorrect;
    });
    
    const perfect = blankedIndices.every(idx => answers[idx]?.trim() === func.goCode[idx].trim());
    
    setResults(newResults);
    setSubmitted(true);
    if (perfect) onComplete();
  };

  return (
    <div className="flex flex-col gap-8 h-full max-w-5xl mx-auto p-12 overflow-hidden">
      <div className="text-center shrink-0">
        <h3 className="text-3xl font-black mb-2 tracking-tighter text-white">Fill the Void</h3>
        <p className="text-slate-500 italic">Complete the Go logic to prove your mastery.</p>
      </div>

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 font-mono text-sm leading-relaxed shadow-2xl overflow-y-auto custom-scrollbar flex-1 relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-900/10 flex flex-col items-center pt-8 text-slate-700 pointer-events-none">
          {func.goCode.map((_, i) => <span key={i}>{i+1}</span>)}
        </div>
        <div className="pl-10">
          {func.goCode.map((line, i) => {
            const isBlank = blankedIndices.includes(i);
            if (isBlank) {
              const isCorrect = results[i] === true;
              const isWrong = results[i] === false;
              
              return (
                <div key={i} className="flex gap-4 py-1.5 items-center">
                  <div className="flex-1 flex flex-col gap-2 relative">
                    <div className="flex items-center gap-2">
                       <input
                        type="text"
                        value={answers[i] || ""}
                        onChange={(e) => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                        disabled={submitted && isCorrect}
                        className={`flex-1 bg-slate-950 border rounded px-3 py-1.5 outline-none transition-all font-mono text-sm ${
                          submitted 
                            ? (isCorrect ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" : "border-red-500 text-red-400 bg-red-500/5")
                            : "border-slate-800 focus:border-cyan-500 text-cyan-400"
                        }`}
                        placeholder="// Implement missing logic"
                      />
                      {!submitted && (
                        <button 
                          onClick={() => setActiveHintIndex(activeHintIndex === i ? -1 : i)}
                          className={`p-1.5 rounded transition-all ${activeHintIndex === i ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-500 hover:text-cyan-500'}`}
                        >
                          <BrainCircuit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {activeHintIndex === i && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-0 top-full mt-2 z-20 bg-cyan-900 border border-cyan-500/50 p-4 rounded-xl shadow-2xl text-[10px] text-cyan-100 max-w-[200px]"
                      >
                         <p className="font-bold flex items-center gap-1 mb-1"><Info className="w-3 h-3" /> Clue:</p>
                         {func.quizHints[blankedIndices.indexOf(i)] || "Think about the main logic of this function!"}
                      </motion.div>
                    )}
                    {submitted && isWrong && (
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pl-1 opacity-80">
                        <ChevronRight className="w-3 h-3" />
                        Correct: <code className="text-slate-400">{func.goCode[i].trim()}</code>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="flex gap-4 py-1.5">
                <pre className="whitespace-pre-wrap text-slate-400">{line}</pre>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4 shrink-0 pb-4">
        <button
          onClick={() => {
             setAnswers({});
             setResults({});
             setSubmitted(false);
             setActiveHintIndex(-1);
          }}
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold flex items-center gap-2 transition-all border border-slate-700"
        >
          <RefreshCw className="w-5 h-5" /> Reset
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all active:scale-95"
        >
          <Play className="w-5 h-5 fill-slate-950" /> Verify Implementation
        </button>
      </div>
    </div>
  );
}

function PlaygroundView({ 
  func, 
  userExamples, 
  votedIds,
  onComplete, 
  onSaveExample, 
  onVote 
}: { 
  func: FunctionDefinition, 
  userExamples: UserExample[],
  votedIds: Set<string>,
  onComplete: () => void,
  onSaveExample: (args: string[]) => void,
  onVote: (id: string, delta: number) => void
}) {
  const [args, setArgs] = useState<string[]>(func.defaultArgs.map(String));
  const [customCode, setCustomCode] = useState(func.goCode.join('\n'));
  const [result, setResult] = useState<{ output: string; trace: FunctionTraceStep[] } | null>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCustomCode(func.goCode.join('\n'));
    setArgs(func.defaultArgs.map(String));
    setResult(null);
  }, [func]);

  const runSimulation = async () => {
    setIsRunning(true);
    try {
      // Check if code matches original to use local simulator for speed
      const isOriginalCode = customCode.trim() === func.goCode.join('\n').trim();
      
      if (isOriginalCode) {
        const parsedArgs = args.map(a => {
          try {
            if (a.startsWith('[') && a.endsWith(']')) return JSON.parse(a);
          } catch(e) {}
          return a;
        });
        const simResult = func.simulator(parsedArgs);
        setResult(simResult as any);
      } else {
        const simResult = await simulateGoCode(customCode, args);
        setResult(simResult as any);
      }
      
      setCurrentStep(0);
      onComplete();
    } catch (err) {
      console.error("Simulation failed", err);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isAutoPlaying && result && currentStep < result.trace.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800);
    } else {
      setIsAutoPlaying(false);
    }
    return () => { if(intervalRef.current) clearTimeout(intervalRef.current as any); };
  }, [isAutoPlaying, currentStep, result]);

  const topExamples = userExamples.sort((a,b) => b.votes - a.votes).slice(0, 5);

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-slate-950/20">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Code Editor Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scratchpad Editor</span>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => setCustomCode(func.goCode.join('\n'))}
                  className="text-[9px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
                 >
                   Reset Code
                 </button>
              </div>
            </div>
            <div className="p-1 min-h-[300px] relative">
              <textarea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[300px] bg-transparent text-cyan-400 font-mono text-sm p-6 outline-none resize-none leading-relaxed"
                placeholder="// Write your Go function here..."
              />
              <div className="absolute top-0 left-0 w-12 h-full bg-slate-900/30 border-r border-slate-800 pointer-events-none flex flex-col items-center pt-6 text-[10px] font-mono text-slate-700">
                {customCode.split('\n').map((_, i) => <span key={i} className="h-[22.4px] leading-relaxed">{i + 1}</span>)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="text-sm font-black mb-4 flex items-center justify-between text-white uppercase tracking-wider">
                <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-cyan-500" /> Inputs</span>
                <button 
                  onClick={() => onSaveExample(args)}
                  className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-1 rounded hover:bg-cyan-500/20 transition-all uppercase tracking-widest font-bold"
                >
                  Save Test
                </button>
              </h3>
              <div className="space-y-4">
                {func.defaultArgs.map((_, i) => (
                  <div key={i}>
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Arg {i + 1}</label>
                    <input
                      type="text"
                      value={args[i] || ""}
                      onChange={(e) => {
                        const newArgs = [...args];
                        newArgs[i] = e.target.value;
                        setArgs(newArgs);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-cyan-400"
                      placeholder={`Value...`}
                    />
                  </div>
                ))}
                <button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 rounded-xl font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-slate-950" />
                  )}
                  {isRunning ? 'Calculating...' : 'Run Simulation'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Community Hub</p>
                <Trophy className="w-3 h-3 text-amber-500 opacity-50" />
              </div>
              <div className="space-y-2 overflow-y-auto max-h-[220px] custom-scrollbar pr-1">
                {topExamples.map(ex => (
                  <div key={ex.id} className="bg-slate-900/30 border border-slate-800 rounded-xl p-3 flex items-center justify-between group hover:bg-slate-800/50 transition-all">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex gap-1.5">
                        {ex.args.map((a, i) => (
                          <span key={i} className="text-[9px] font-mono text-slate-400 truncate max-w-[60px]">"{a}"</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <button onClick={() => setArgs([...ex.args])} className="text-[8px] font-bold text-cyan-500 underline opacity-0 group-hover:opacity-100 transition-opacity">USE</button>
                       <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                          <button 
                            onClick={() => onVote(ex.id, 1)}
                            className={`p-1 rounded transition-all ${votedIds.has(ex.id) ? 'text-cyan-500' : 'text-slate-600 hover:text-cyan-500'}`}
                          >
                            <Trophy className="w-3 h-3" />
                          </button>
                          <span className="text-[10px] font-bold text-slate-500">{ex.votes}</span>
                       </div>
                    </div>
                  </div>
                ))}
                {topExamples.length === 0 && (
                  <div className="text-center p-6 border border-dashed border-slate-800 rounded-xl text-slate-600 text-[10px] italic">
                    No community tests yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 rounded-2xl border border-emerald-500/20 p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                <h3 className="text-xs font-bold mb-4 flex items-center gap-2 text-emerald-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" />
                  Terminal Result
                </h3>
                <div className="font-mono text-xl text-emerald-500/90 whitespace-pre-wrap break-all">
                  {result.output}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-[440px] bg-slate-900 border-l border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <h3 className="font-bold flex items-center gap-2 text-slate-200">
            <RefreshCw className={`w-4 h-4 text-cyan-500 ${isAutoPlaying ? 'animate-spin' : ''}`} />
            Debugger Trace
          </h3>
          {result && (
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${
                  isAutoPlaying 
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 hover:bg-slate-700"
                }`}
              >
                {isAutoPlaying ? "PAUSE" : "AUTO"}
              </button>
              <div className="w-px bg-slate-700 mx-1"></div>
              <button 
                disabled={currentStep <= 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-2 disabled:opacity-30 hover:bg-slate-700 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button 
                disabled={currentStep >= result.trace.length - 1}
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-2 disabled:opacity-30 hover:bg-slate-700 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 p-12 text-center">
              <Terminal className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-xs font-medium uppercase tracking-widest leading-loose">Waiting for execution context...</p>
            </div>
          ) : (
            result.trace.slice(0, currentStep + 1).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-xl border transition-all ${
                  i === currentStep 
                    ? "bg-cyan-500/10 border-cyan-500/30 text-white shadow-lg" 
                    : "bg-slate-950/50 border-transparent text-slate-600 scale-[0.98] opacity-40"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] font-black text-cyan-500/80 uppercase tracking-widest">STEP {i + 1}</span>
                   <div className="flex gap-3 text-[9px] font-mono text-slate-500 uppercase">
                      {Object.entries(step.vars).map(([k, v]) => (
                        <span key={k} className="flex gap-1">
                          <span>{k}:</span>
                          <span className="text-cyan-400">{JSON.stringify(v)}</span>
                        </span>
                      ))}
                   </div>
                </div>
                <p className="text-xs leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            ))
          )}
          <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
        </div>
      </div>
    </div>
  );
}
