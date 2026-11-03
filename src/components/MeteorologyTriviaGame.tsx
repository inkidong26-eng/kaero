import React, { useState, useEffect } from 'react';
import { TriviaQuestion } from '../types/weather';
import { METEOROLOGY_TRIVIA } from '../data/triviaQuestions';
import { soundFX } from '../utils/soundEffects';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface Props {
  onScoreUpdate: (points: number, isCorrect: boolean, summary: {
    questionTitle: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }) => void;
  streak: number;
}

export const MeteorologyTriviaGame: React.FC<Props> = ({ onScoreUpdate, streak }) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<TriviaQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [used5050, setUsed5050] = useState<boolean>(false);

  useEffect(() => {
    // Shuffle trivia questions on mount
    const shuffled = [...METEOROLOGY_TRIVIA].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const currentQ = shuffledQuestions[questionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    const basePoints = 120;
    const streakBonus = isCorrect ? streak * 25 : 0;
    const earnedPoints = isCorrect ? basePoints + streakBonus : 0;

    if (isCorrect) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }

    onScoreUpdate(earnedPoints, isCorrect, {
      questionTitle: currentQ.title,
      userAnswer: currentQ.options[idx],
      correctAnswer: currentQ.options[currentQ.correctIndex],
      isCorrect,
      explanation: currentQ.explanation,
    });
  };

  const handleUse5050 = () => {
    if (used5050 || isAnswered || !currentQ) return;
    soundFX.playWhoosh();
    setUsed5050(true);

    const wrongIndices = currentQ.options
      .map((_, i) => i)
      .filter(i => i !== currentQ.correctIndex);

    // Pick 2 random wrong options to eliminate
    const shuffledWrong = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminatedOptions(shuffledWrong);
  };

  const handleNextQuestion = () => {
    soundFX.playWhoosh();
    setSelectedOption(null);
    setIsAnswered(false);
    setEliminatedOptions([]);
    setUsed5050(false);

    if (questionIndex + 1 < shuffledQuestions.length) {
      setQuestionIndex(prev => prev + 1);
    } else {
      // Loop or re-shuffle
      setShuffledQuestions([...METEOROLOGY_TRIVIA].sort(() => Math.random() - 0.5));
      setQuestionIndex(0);
    }
  };

  if (!currentQ) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400">
        문제를 불러오는 중...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden">
        
        {/* Progress & Category Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/15 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-500/30">
              {currentQ.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              문제 {questionIndex + 1} / {shuffledQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isAnswered && (
              <button
                onClick={handleUse5050}
                disabled={used5050}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  used5050
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                    : 'bg-amber-500/15 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/30 hover:bg-amber-500/25 dark:hover:bg-amber-500/20'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>50:50 찬스 (오답 2개 제거)</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Title & Scenario */}
        <div className="my-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {currentQ.title}
          </h2>
          <p className="text-base text-slate-800 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/60 p-5 rounded-xl border border-slate-200 dark:border-slate-800/80">
            {currentQ.scenario}
          </p>
        </div>

        {/* 4 Options Grid */}
        <div className="space-y-3 mt-6">
          {currentQ.options.map((option, idx) => {
            const isEliminated = eliminatedOptions.includes(idx);
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let buttonStyle = 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600';

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-500/60 text-emerald-900 dark:text-emerald-200';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-500/60 text-rose-900 dark:text-rose-200';
              } else {
                buttonStyle = 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
              }
            } else if (isEliminated) {
              buttonStyle = 'opacity-25 pointer-events-none line-through bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered || isEliminated}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer ${buttonStyle} ${
                  !isAnswered && !isEliminated ? 'hover:translate-x-1' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-xs font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0 shadow-2xs">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {option}
                  </span>
                </div>

                {isAnswered && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Dossier when answered */}
        {isAnswered && (
          <div className="mt-6 p-5 rounded-xl bg-slate-50/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-2 font-mono">
              <BookOpen className="w-4 h-4" />
              <span>기상 과학 분석 해설</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
            {currentQ.sourceNote && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                출처/근거: {currentQ.sourceNote}
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-sky-500/20 cursor-pointer"
              >
                <span>다음 기상 과학 문제</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
