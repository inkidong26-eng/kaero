import React, { useState, useEffect, useCallback } from 'react';
import { FactCheckQuestion, LiveWeatherData } from '../types/weather';
import { generateFactCheckQuestion } from '../services/weatherService';
import { soundFX } from '../utils/soundEffects';
import { 
  CheckCircle2, 
  XCircle, 
  Wind, 
  Droplets, 
  Thermometer, 
  Compass, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Eye
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
  onAtmosphereChange?: (condition: LiveWeatherData['weatherCondition'], isDay: boolean) => void;
}

export const LiveFactCheckGame: React.FC<Props> = ({
  onScoreUpdate,
  streak,
  onAtmosphereChange,
}) => {
  const [currentQ, setCurrentQ] = useState<FactCheckQuestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showDossier, setShowDossier] = useState<boolean>(false);
  const [usedCityIds, setUsedCityIds] = useState<string[]>([]);
  const [showRadarHint, setShowRadarHint] = useState<boolean>(false);

  // Load next question
  const loadNextQuestion = useCallback(async () => {
    setIsLoading(true);
    setSelectedAnswer(null);
    setShowDossier(false);
    setShowRadarHint(false);

    try {
      const q = await generateFactCheckQuestion(usedCityIds);
      setCurrentQ(q);
      setUsedCityIds(prev => (prev.length > 15 ? [q.city.id] : [...prev, q.city.id]));

      if (q.liveData && onAtmosphereChange) {
        onAtmosphereChange(q.liveData.weatherCondition, q.liveData.isDay);
      }
    } catch {
      // Handled in weatherService
    } finally {
      setIsLoading(false);
    }
  }, [usedCityIds, onAtmosphereChange]);

  useEffect(() => {
    loadNextQuestion();
  }, []);

  const handleAnswer = (userChoice: boolean) => {
    if (selectedAnswer !== null || !currentQ || !currentQ.liveData) return;

    setSelectedAnswer(userChoice);
    setShowDossier(true);

    const isCorrect = userChoice === currentQ.expectedAnswer;
    const basePoints = currentQ.difficulty === 'hard' ? 150 : 100;
    const streakBonus = isCorrect ? streak * 25 : 0;
    const earnedPoints = isCorrect ? basePoints + streakBonus : 0;

    if (isCorrect) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }

    onScoreUpdate(earnedPoints, isCorrect, {
      questionTitle: `${currentQ.city.nameKo} - ${currentQ.claim}`,
      userAnswer: userChoice ? '팩트 (O)' : '거짓 (X)',
      correctAnswer: currentQ.expectedAnswer ? '팩트 (O)' : '거짓 (X)',
      isCorrect,
      explanation: currentQ.explanation,
    });
  };

  const getWeatherIcon = (condition: LiveWeatherData['weatherCondition'], isDay: boolean) => {
    switch (condition) {
      case 'clear':
        return isDay ? <Sun className="w-8 h-8 text-amber-400" /> : <Sun className="w-8 h-8 text-indigo-300" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-sky-400" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-cyan-200" />;
      case 'thunder':
        return <CloudLightning className="w-8 h-8 text-yellow-400" />;
      case 'cloudy':
      case 'fog':
      default:
        return <Cloud className="w-8 h-8 text-slate-300" />;
    }
  };

  if (isLoading || !currentQ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[480px] p-8 text-slate-400">
        <RefreshCw className="w-10 h-10 text-sky-400 animate-spin mb-4" />
        <p className="text-base font-medium text-slate-300">
          전 세계 실시간 기상 위성 및 관측소 데이터 수신 중...
        </p>
        <span className="text-xs text-slate-500 mt-1">Open-Meteo Global Weather Radar Feed</span>
      </div>
    );
  }

  const weather = currentQ.liveData;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Question Header Card */}
      <div className="relative bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl dark:shadow-2xl overflow-hidden transition-all">
        
        {/* City & Location Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {currentQ.city.nameKo}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {currentQ.city.countryKo} ({currentQ.city.continent})
            </span>
            <span className="text-slate-400 dark:text-slate-600 font-mono text-xs hidden sm:inline">
              [{currentQ.city.lat > 0 ? `${currentQ.city.lat.toFixed(1)}°N` : `${Math.abs(currentQ.city.lat).toFixed(1)}°S`}, {currentQ.city.lng > 0 ? `${currentQ.city.lng.toFixed(1)}°E` : `${Math.abs(currentQ.city.lng).toFixed(1)}°W`}]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                setShowRadarHint(prev => !prev);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                showRadarHint 
                  ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-400 dark:border-sky-500/40' 
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showRadarHint ? '힌트 닫기' : '관측 힌트'}</span>
            </button>

            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              실시간 검증 라운드
            </span>
          </div>
        </div>

        {/* Radar Hint Collapsible */}
        {showRadarHint && weather && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50/95 dark:bg-slate-950/70 border border-sky-300 dark:border-sky-500/30 text-xs text-slate-700 dark:text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in duration-200">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">현재 시각 형태</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{weather.isDay ? '☀️ 낮 시간대' : '🌙 밤 시간대'}</span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">대기압</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{weather.surfacePressure} hPa</span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">위도 기후대</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {Math.abs(currentQ.city.lat) < 23.5 ? '열대/아열대' : Math.abs(currentQ.city.lat) < 55 ? '온대 기후' : '아한대/한대'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">풍향</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{weather.windDirection}° 방향</span>
            </div>
          </div>
        )}

        {/* Claim Box */}
        <div className="my-8 text-center sm:text-left">
          <span className="text-xs font-semibold tracking-wider text-sky-600 dark:text-sky-400 uppercase block mb-2 font-mono">
            기상 관측 가설 검증
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
            "{currentQ.claim}"
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            실시간 전 세계 기상관측망(WMO / Open-Meteo)에 방금 집계된 실측 데이터와 대조해 검증합니다.
          </p>
        </div>

        {/* Choice Buttons (O or X) */}
        {!showDossier ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6">
            <button
              onClick={() => handleAnswer(true)}
              className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500/60 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-colors">
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">O</span>
              </div>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100">팩트 (그렇다)</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">주장이 사실입니다</span>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800/90 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-400 dark:hover:border-rose-500/60 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs"
            >
              <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-3 group-hover:bg-rose-500/20 transition-colors">
                <span className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">X</span>
              </div>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100">거짓 (아니다)</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">주장이 사실과 다릅니다</span>
            </button>
          </div>
        ) : (
          /* Live Verification Dossier Breakdown */
          <div className="mt-6 space-y-6 animate-in fade-in duration-300">
            {/* Result Banner */}
            <div
              className={`p-5 rounded-xl border flex items-center justify-between gap-4 ${
                selectedAnswer === currentQ.expectedAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-500/50 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {selectedAnswer === currentQ.expectedAnswer ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <div>
                  <h3 className="text-lg font-bold">
                    {selectedAnswer === currentQ.expectedAnswer ? '정답입니다! 팩트 검증 성공' : '아쉽습니다! 사실과 다릅니다'}
                  </h3>
                  <p className="text-xs opacity-90 mt-0.5">
                    정답: {currentQ.expectedAnswer ? '팩트 (O)' : '거짓 (X)'} · 나의 선택: {selectedAnswer ? '팩트 (O)' : '거짓 (X)'}
                  </p>
                </div>
              </div>

              {selectedAnswer === currentQ.expectedAnswer && (
                <div className="text-right shrink-0">
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 block">획득 점수</span>
                  <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                    +{currentQ.difficulty === 'hard' ? 150 : 100 + streak * 25}점
                  </span>
                </div>
              )}
            </div>

            {/* Meteorological Verification Report Grid */}
            {weather && (
              <div className="p-5 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>실시간 기상 관측 리포트 ({currentQ.city.nameKo})</span>
                  <span>관측 시각: {new Date(weather.time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                  {/* Current Temp */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xs">
                    <Thermometer className="w-6 h-6 text-rose-500 dark:text-rose-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">기온</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                        {weather.temperature}°C
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">체감 {weather.apparentTemperature}°C</span>
                    </div>
                  </div>

                  {/* Weather Status */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xs">
                    <div className="shrink-0">{getWeatherIcon(weather.weatherCondition, weather.isDay)}</div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">날씨 상태</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight block">
                        {weather.weatherDescription}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">강수 {weather.precipitation}mm</span>
                    </div>
                  </div>

                  {/* Humidity */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xs">
                    <Droplets className="w-6 h-6 text-sky-500 dark:text-sky-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">상대습도</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                        {weather.relativeHumidity}%
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">기압 {weather.surfacePressure}hPa</span>
                    </div>
                  </div>

                  {/* Wind */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 shadow-2xs">
                    <Wind className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 block">바람 세기</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                        {weather.windSpeed} <span className="text-xs font-normal">km/h</span>
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">풍향 {weather.windDirection}°</span>
                    </div>
                  </div>
                </div>

                {/* Explanation text */}
                <div className="mt-2 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="text-sky-600 dark:text-sky-400 font-semibold mr-2">검증 요약:</span>
                  {currentQ.explanation}
                </div>
              </div>
            )}

            {/* Next Question CTA */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  soundFX.playWhoosh();
                  loadNextQuestion();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-sky-500/20 cursor-pointer"
              >
                <span>다음 실시간 날씨 검증하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
