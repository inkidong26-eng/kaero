import React, { useState, useEffect, useCallback } from 'react';
import { CityInfo, LiveWeatherData } from '../types/weather';
import { generateHigherLowerRound } from '../services/weatherService';
import { soundFX } from '../utils/soundEffects';
import { 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Flame, 
  RotateCcw,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning
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

export const HigherLowerGame: React.FC<Props> = ({
  onScoreUpdate,
  streak,
  onAtmosphereChange,
}) => {
  const [baseCity, setBaseCity] = useState<CityInfo | null>(null);
  const [baseWeather, setBaseWeather] = useState<LiveWeatherData | null>(null);
  const [targetCity, setTargetCity] = useState<CityInfo | null>(null);
  const [targetWeather, setTargetWeather] = useState<LiveWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userGuess, setUserGuess] = useState<'higher' | 'lower' | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [roundResult, setRoundResult] = useState<'correct' | 'wrong' | null>(null);
  const [usedIds, setUsedIds] = useState<string[]>([]);

  const startNewMatch = useCallback(async () => {
    setIsLoading(true);
    setIsRevealed(false);
    setUserGuess(null);
    setRoundResult(null);

    try {
      const round = await generateHigherLowerRound(usedIds);
      setBaseCity(round.baseCity);
      setBaseWeather(round.baseWeather);
      setTargetCity(round.targetCity);
      setTargetWeather(round.targetWeather);
      setUsedIds([round.baseCity.id, round.targetCity.id]);

      if (onAtmosphereChange) {
        onAtmosphereChange(round.targetWeather.weatherCondition, round.targetWeather.isDay);
      }
    } catch {
      // Handled
    } finally {
      setIsLoading(false);
    }
  }, [usedIds, onAtmosphereChange]);

  useEffect(() => {
    startNewMatch();
  }, []);

  const handleGuess = (guess: 'higher' | 'lower') => {
    if (!baseWeather || !targetWeather || !baseCity || !targetCity || isRevealed) return;

    setUserGuess(guess);
    setIsRevealed(true);

    const isHigher = targetWeather.temperature > baseWeather.temperature;
    const isEqual = targetWeather.temperature === baseWeather.temperature;
    const isCorrect = isEqual ? true : guess === 'higher' ? isHigher : !isHigher;

    setRoundResult(isCorrect ? 'correct' : 'wrong');

    const earnedPoints = isCorrect ? 100 + streak * 30 : 0;
    if (isCorrect) {
      soundFX.playSuccess();
    } else {
      soundFX.playError();
    }

    onScoreUpdate(earnedPoints, isCorrect, {
      questionTitle: `${targetCity.nameKo}의 기온은 ${baseCity.nameKo}(${baseWeather.temperature}°C)보다 더 높을까, 낮을까?`,
      userAnswer: guess === 'higher' ? '더 높다 (Higher)' : '더 낮다 (Lower)',
      correctAnswer: isHigher ? '더 높다 (Higher)' : isEqual ? '같음' : '더 낮다 (Lower)',
      isCorrect,
      explanation: `${targetCity.nameKo}의 현재 기온은 ${targetWeather.temperature}°C이며, ${baseCity.nameKo}의 ${baseWeather.temperature}°C보다 ${
        targetWeather.temperature > baseWeather.temperature ? '높습니다' : '낮습니다'
      }.`,
    });
  };

  const handleNextCity = async () => {
    if (!targetCity || !targetWeather) return;

    setIsLoading(true);
    setIsRevealed(false);
    setUserGuess(null);
    setRoundResult(null);

    // Chain: previous target becomes new base!
    const newBaseCity = targetCity;
    const newBaseWeather = targetWeather;
    setBaseCity(newBaseCity);
    setBaseWeather(newBaseWeather);

    try {
      const nextRound = await generateHigherLowerRound([...usedIds, newBaseCity.id]);
      setTargetCity(nextRound.targetCity);
      setTargetWeather(nextRound.targetWeather);
      setUsedIds(prev => [...prev.slice(-10), nextRound.targetCity.id]);

      if (onAtmosphereChange) {
        onAtmosphereChange(nextRound.targetWeather.weatherCondition, nextRound.targetWeather.isDay);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (condition: LiveWeatherData['weatherCondition'], isDay: boolean) => {
    switch (condition) {
      case 'clear':
        return isDay ? <Sun className="w-6 h-6 text-amber-400" /> : <Sun className="w-6 h-6 text-indigo-300" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-sky-400" />;
      case 'snow':
        return <CloudSnow className="w-6 h-6 text-cyan-200" />;
      case 'thunder':
        return <CloudLightning className="w-6 h-6 text-yellow-400" />;
      case 'cloudy':
      case 'fog':
      default:
        return <Cloud className="w-6 h-6 text-slate-300" />;
    }
  };

  if (isLoading && (!baseCity || !targetCity)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[480px] p-8 text-slate-400">
        <RefreshCw className="w-10 h-10 text-sky-400 animate-spin mb-4" />
        <p className="text-base font-medium text-slate-300">
          실시간 글로벌 기온 비교 매치 생성 중...
        </p>
      </div>
    );
  }

  if (!baseCity || !baseWeather || !targetCity || !targetWeather) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Title & Streak Info */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono mb-2">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>현재 연승 기록: <strong className="text-amber-400 tabular-nums">{streak}</strong></span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          실시간 기온 대결: 더 덥나? 더 춥나?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          기준 도시와 비교해 대상 도시의 현재 실시간 기온이 더 높을지(Higher), 더 낮을지(Lower) 예측하세요!
        </p>
      </div>

      {/* Duel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* City A: Base City (Known) */}
        <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
              기준 도시
            </span>
            <span className="text-xs text-slate-400">
              {baseCity.continent}
            </span>
          </div>

          <div className="my-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              {baseCity.nameKo}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {baseCity.name}, {baseCity.countryKo}
            </p>

            {/* Large Temperature Display */}
            <div className="mt-6 flex flex-col items-center">
              <span className="text-6xl sm:text-7xl font-black text-sky-400 font-mono tabular-nums tracking-tighter">
                {baseWeather.temperature}°C
              </span>
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                {getWeatherIcon(baseWeather.weatherCondition, baseWeather.isDay)}
                <span>{baseWeather.weatherDescription}</span>
                <span aria-hidden="true">·</span>
                <span>체감 {baseWeather.apparentTemperature}°C</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center text-xs text-slate-400 font-mono">
            습도 {baseWeather.relativeHumidity}% · 풍속 {baseWeather.windSpeed}km/h
          </div>
        </div>

        {/* City B: Target City (The Question) */}
        <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
              도전 대상 도시
            </span>
            <span className="text-xs text-slate-400">
              {targetCity.continent}
            </span>
          </div>

          <div className="my-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              {targetCity.nameKo}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {targetCity.name}, {targetCity.countryKo}
            </p>

            {/* Hidden / Revealed Temperature Display */}
            <div className="mt-6 min-h-[120px] flex flex-col items-center justify-center">
              {!isRevealed ? (
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 w-full max-w-xs">
                  <span className="text-4xl font-mono font-bold text-slate-500">? ? ?</span>
                  <span className="text-xs text-slate-400 mt-2">
                    {baseCity.nameKo}({baseWeather.temperature}°C)보다 기온이?
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
                  <span
                    className={`text-6xl sm:text-7xl font-black font-mono tabular-nums tracking-tighter ${
                      targetWeather.temperature > baseWeather.temperature
                        ? 'text-rose-400'
                        : 'text-cyan-400'
                    }`}
                  >
                    {targetWeather.temperature}°C
                  </span>
                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-300">
                    {getWeatherIcon(targetWeather.weatherCondition, targetWeather.isDay)}
                    <span>{targetWeather.weatherDescription}</span>
                    <span aria-hidden="true">·</span>
                    <span>체감 {targetWeather.apparentTemperature}°C</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls: Higher / Lower or Result Action */}
          {!isRevealed ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleGuess('higher')}
                className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/50 font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowUp className="w-5 h-5 text-rose-400" />
                <span>더 높다 (Higher)</span>
              </button>

              <button
                onClick={() => handleGuess('lower')}
                className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/50 font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowDown className="w-5 h-5 text-sky-400" />
                <span>더 낮다 (Lower)</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-semibold ${
                  roundResult === 'correct'
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {roundResult === 'correct' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <span>
                    {roundResult === 'correct' ? '정답입니다! 연승을 이어갑니다.' : '틀렸습니다! 연승이 리셋됩니다.'}
                  </span>
                </div>
                <span className="font-mono tabular-nums">
                  차이: {Math.abs(Math.round((targetWeather.temperature - baseWeather.temperature) * 10) / 10)}°C
                </span>
              </div>

              <div className="flex gap-3">
                {roundResult === 'correct' ? (
                  <button
                    onClick={() => {
                      soundFX.playWhoosh();
                      handleNextCity();
                    }}
                    className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/20"
                  >
                    다음 도시 도전하기 ({targetCity.nameKo}가 새로운 기준)
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundFX.playClick();
                      startNewMatch();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>새로운 매치 시작</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
