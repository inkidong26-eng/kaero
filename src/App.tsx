import React, { useState, useEffect } from 'react';
import { GameMode, GameScoreState, LiveWeatherData } from './types/weather';
import { Header } from './components/Header';
import { WeatherAtmosphere } from './components/WeatherAtmosphere';
import { LiveFactCheckGame } from './components/LiveFactCheckGame';
import { HigherLowerGame } from './components/HigherLowerGame';
import { MeteorologyTriviaGame } from './components/MeteorologyTriviaGame';
import { WorldWeatherVerifier } from './components/WorldWeatherVerifier';
import { RoundSummaryModal } from './components/RoundSummaryModal';
import { soundFX } from './utils/soundEffects';
import { Trophy, HelpCircle, Sparkles, Compass } from 'lucide-react';

const INITIAL_SCORE_STATE: GameScoreState = {
  score: 0,
  streak: 0,
  maxStreak: 0,
  correctCount: 0,
  totalAnswered: 0,
  history: [],
};

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('REALTIME_FACT');
  const [scoreState, setScoreState] = useState<GameScoreState>(() => {
    try {
      const saved = localStorage.getItem('weather_game_score');
      return saved ? JSON.parse(saved) : INITIAL_SCORE_STATE;
    } catch {
      return INITIAL_SCORE_STATE;
    }
  });

  const [atmosphereCondition, setAtmosphereCondition] = useState<LiveWeatherData['weatherCondition']>('cloudy');
  const [isDay, setIsDay] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(soundFX.getMuted());
  const [isRainAmbience, setIsRainAmbience] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  // Sync scoreState with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('weather_game_score', JSON.stringify(scoreState));
    } catch {
      // Ignore
    }
  }, [scoreState]);

  const handleScoreUpdate = (
    points: number,
    isCorrect: boolean,
    summary: {
      questionTitle: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      explanation: string;
    }
  ) => {
    setScoreState(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        score: prev.score + points,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        totalAnswered: prev.totalAnswered + 1,
        history: [summary, ...prev.history].slice(0, 30),
      };
    });
  };

  const handleResetScore = () => {
    setScoreState(INITIAL_SCORE_STATE);
    setShowSummaryModal(false);
  };

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleRainAmbience = () => {
    const active = soundFX.toggleRainAmbience();
    setIsRainAmbience(active);
  };

  const handleAtmosphereChange = (condition: LiveWeatherData['weatherCondition'], dayState: boolean) => {
    setAtmosphereCondition(condition);
    setIsDay(dayState);
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Dynamic Weather Sky & Particle Atmosphere */}
      <WeatherAtmosphere condition={atmosphereCondition} isDay={isDay} />

      {/* Header Contract */}
      <Header
        currentMode={currentMode}
        onSelectMode={mode => setCurrentMode(mode)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isRainAmbience={isRainAmbience}
        onToggleRainAmbience={handleToggleRainAmbience}
        score={scoreState.score}
        streak={scoreState.streak}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-between">
        
        {/* Mode Description & Scoreboard floating strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <div className="text-xs sm:text-sm text-slate-300">
              {currentMode === 'REALTIME_FACT' && (
                <span>실시간 전 세계 기상관측소 실측 데이터를 기반으로 팩트를 검증합니다.</span>
              )}
              {currentMode === 'HIGHER_LOWER' && (
                <span>기준 도시 대비 대상 도시의 실시간 기온이 더 높을지 낮을지 맞히는 연승 챌린지입니다.</span>
              )}
              {currentMode === 'METEOROLOGY_TRIVIA' && (
                <span>구름, 바람, 태풍, 기압, 지구 극값 기록 등 정통 기상 과학 상식을 추리합니다.</span>
              )}
              {currentMode === 'WORLD_EXPLORER' && (
                <span>원하는 전 세계 도시를 검색하고 실시간 기상 레이더와 직관 퀴즈를 즐겨보세요.</span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              setShowSummaryModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-300 border border-slate-700 transition-colors ml-auto"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>내 계급 & 기록 리포트 ({scoreState.totalAnswered}회 검증)</span>
          </button>
        </div>

        {/* Active Mode View */}
        <div className="flex-1 flex flex-col justify-center">
          {currentMode === 'REALTIME_FACT' && (
            <LiveFactCheckGame
              onScoreUpdate={handleScoreUpdate}
              streak={scoreState.streak}
              onAtmosphereChange={handleAtmosphereChange}
            />
          )}

          {currentMode === 'HIGHER_LOWER' && (
            <HigherLowerGame
              onScoreUpdate={handleScoreUpdate}
              streak={scoreState.streak}
              onAtmosphereChange={handleAtmosphereChange}
            />
          )}

          {currentMode === 'METEOROLOGY_TRIVIA' && (
            <MeteorologyTriviaGame
              onScoreUpdate={handleScoreUpdate}
              streak={scoreState.streak}
            />
          )}

          {currentMode === 'WORLD_EXPLORER' && (
            <WorldWeatherVerifier
              onScoreUpdate={handleScoreUpdate}
              onAtmosphereChange={handleAtmosphereChange}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-slate-800/80 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>실시간 기상 데이터: Open-Meteo & WMO Meteorological Network</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>총 {scoreState.totalAnswered}회 검증 완료</span>
            <span aria-hidden="true">·</span>
            <span>정답 {scoreState.correctCount}회</span>
          </div>
        </footer>

      </main>

      {/* Round Summary & Rank Modal */}
      {showSummaryModal && (
        <RoundSummaryModal
          scoreState={scoreState}
          onReset={handleResetScore}
          onClose={() => setShowSummaryModal(false)}
        />
      )}
    </div>
  );
}
