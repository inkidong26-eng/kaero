import React from 'react';
import { GameScoreState } from '../types/weather';
import { getRankForScore } from '../data/triviaQuestions';
import { soundFX } from '../utils/soundEffects';
import { 
  Trophy, 
  Flame, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  XCircle, 
  Award,
  ArrowRight
} from 'lucide-react';

interface Props {
  scoreState: GameScoreState;
  onReset: () => void;
  onClose: () => void;
}

export const RoundSummaryModal: React.FC<Props> = ({ scoreState, onReset, onClose }) => {
  const rank = getRankForScore(scoreState.score);
  const accuracy = scoreState.totalAnswered > 0 
    ? Math.round((scoreState.correctCount / scoreState.totalAnswered) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Rank & Trophy Header */}
        <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-3xl mb-3 shadow-inner">
            {rank.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {rank.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            {rank.description}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 py-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">최종 점수</span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-600 dark:text-sky-400 tabular-nums">
              {scoreState.score}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">최대 연승</span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400 tabular-nums flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-amber-500 inline" />
              {scoreState.maxStreak}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">검증 정답률</span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              {accuracy}%
            </span>
          </div>
        </div>

        {/* Scrollable Verification Review History */}
        <div className="flex-1 overflow-y-auto pr-1 my-2 max-h-48 space-y-2.5 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2 font-mono">
            최근 검증 기록 ({scoreState.history.length}건)
          </span>

          {scoreState.history.length === 0 ? (
            <div className="text-center text-xs text-slate-400 dark:text-slate-500 py-4">
              아직 검증 기록이 없습니다.
            </div>
          ) : (
            scoreState.history.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-3"
              >
                <div className="mt-0.5 shrink-0">
                  {item.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {item.questionTitle}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    나의 선택: <span className={item.isCorrect ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}>{item.userAnswer}</span> · 정답: {item.correctAnswer}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 line-clamp-1">
                    {item.explanation}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              soundFX.playClick();
              onReset();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-sky-500/20 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>기록 초기화 및 다시 도전</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            계속 플레이
          </button>
        </div>

      </div>
    </div>
  );
};
