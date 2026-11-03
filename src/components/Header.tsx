import React from 'react';
import { GameMode } from '../types/weather';
import { Volume2, VolumeX, CloudRain, Sun, Moon } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface HeaderProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isRainAmbience: boolean;
  onToggleRainAmbience: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  score: number;
  streak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  isMuted,
  onToggleMute,
  isRainAmbience,
  onToggleRainAmbience,
  theme,
  onToggleTheme,
  score,
  streak,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/75 border-b border-slate-200 dark:border-slate-800/80 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            soundFX.playClick();
            onSelectMode('REALTIME_FACT');
          }}
          className="text-left font-bold tracking-tight text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl font-extrabold tracking-tight">날씨 검증 게임</span>
          <span className="hidden sm:inline-block text-xs font-mono text-sky-600 dark:text-sky-400/80 font-normal">
            Weather Detective
          </span>
        </button>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => {
              soundFX.playClick();
              onSelectMode('REALTIME_FACT');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentMode === 'REALTIME_FACT'
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            실시간 팩트체크
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onSelectMode('HIGHER_LOWER');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentMode === 'HIGHER_LOWER'
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            기온 비교 대결
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onSelectMode('METEOROLOGY_TRIVIA');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentMode === 'METEOROLOGY_TRIVIA'
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            기상 추리 퀴즈
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              onSelectMode('WORLD_EXPLORER');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentMode === 'WORLD_EXPLORER'
                ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            세계 날씨 탐색
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster (Score, Theme, Sound controls) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Streak & Score Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-amber-600 dark:text-amber-400 font-bold tabular-nums">
              {streak > 1 ? `🔥 ${streak}연승` : '연승 0'}
            </span>
            <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span>
            <span className="text-sky-600 dark:text-sky-300 font-semibold tabular-nums">
              {score}점
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            aria-label={theme === 'dark' ? '라이트 모드 켜기' : '다크 모드 켜기'}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? '음소거 해제' : '음소거'}
            aria-label={isMuted ? '음향 켜기' : '음향 끄기'}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400 dark:text-slate-500" /> : <Volume2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />}
          </button>

          {/* Ambient Rain Sound Generator */}
          <button
            onClick={onToggleRainAmbience}
            title={isRainAmbience ? '빗소리 ASMR 끄기' : '빗소리 ASMR 켜기'}
            aria-label="빗소리 배경음 토글"
            className={`p-2 rounded-lg border transition-colors shrink-0 cursor-pointer ${
              isRainAmbience
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-700 dark:text-sky-300'
                : 'bg-slate-100 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-slate-800/80 gap-2 bg-slate-50/95 dark:bg-slate-950/90 scrollbar-none">
        <button
          onClick={() => {
            soundFX.playClick();
            onSelectMode('REALTIME_FACT');
          }}
          className={`whitespace-nowrap px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
            currentMode === 'REALTIME_FACT'
              ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          실시간 팩트체크
        </button>
        <button
          onClick={() => {
            soundFX.playClick();
            onSelectMode('HIGHER_LOWER');
          }}
          className={`whitespace-nowrap px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
            currentMode === 'HIGHER_LOWER'
              ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          기온 대결
        </button>
        <button
          onClick={() => {
            soundFX.playClick();
            onSelectMode('METEOROLOGY_TRIVIA');
          }}
          className={`whitespace-nowrap px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
            currentMode === 'METEOROLOGY_TRIVIA'
              ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          기상 추리 퀴즈
        </button>
        <button
          onClick={() => {
            soundFX.playClick();
            onSelectMode('WORLD_EXPLORER');
          }}
          className={`whitespace-nowrap px-3 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
            currentMode === 'WORLD_EXPLORER'
              ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          세계 날씨 탐색
        </button>
      </div>
    </header>
  );
};
