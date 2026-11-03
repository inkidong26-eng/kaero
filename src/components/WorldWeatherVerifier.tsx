import React, { useState, useEffect } from 'react';
import { CityInfo, LiveWeatherData } from '../types/weather';
import { GLOBAL_CITIES, fetchLiveWeather, searchCustomCity } from '../services/weatherService';
import { soundFX } from '../utils/soundEffects';
import { 
  Search, 
  Thermometer, 
  Droplets, 
  Wind, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Props {
  onScoreUpdate: (points: number, isCorrect: boolean, summary: {
    questionTitle: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }) => void;
  onAtmosphereChange?: (condition: LiveWeatherData['weatherCondition'], isDay: boolean) => void;
}

export const WorldWeatherVerifier: React.FC<Props> = ({ onScoreUpdate, onAtmosphereChange }) => {
  const [selectedCity, setSelectedCity] = useState<CityInfo>(GLOBAL_CITIES[0]); // Seoul default
  const [weatherData, setWeatherData] = useState<LiveWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Intuition mini-game states
  const [guessedTemp, setGuessedTemp] = useState<number>(15);
  const [isTested, setIsTested] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ diff: number; points: number } | null>(null);

  const loadCityWeather = async (city: CityInfo) => {
    setIsLoading(true);
    setIsTested(false);
    setTestResult(null);
    setSearchError(null);

    try {
      const data = await fetchLiveWeather(city);
      setWeatherData(data);
      setSelectedCity(city);
      setGuessedTemp(Math.round(data.temperature));

      if (onAtmosphereChange) {
        onAtmosphereChange(data.weatherCondition, data.isDay);
      }
    } catch {
      setSearchError('날씨 데이터를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCityWeather(GLOBAL_CITIES[0]);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    soundFX.playClick();
    setIsSearching(true);
    setSearchError(null);

    try {
      const found = await searchCustomCity(searchQuery);
      if (found) {
        await loadCityWeather(found);
        setSearchQuery('');
      } else {
        setSearchError(`'${searchQuery}'에 해당하는 도시를 찾을 수 없습니다. 영문 또는 다른 도시명으로 검색해보세요.`);
      }
    } catch {
      setSearchError('도시 검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleVerifyIntuition = () => {
    if (!weatherData || isTested) return;

    setIsTested(true);
    const diff = Math.abs(Math.round((guessedTemp - weatherData.temperature) * 10) / 10);
    
    // Scoring: exact or within 1.5°C = 150pts, within 3.5°C = 80pts, within 6°C = 40pts
    let points = 0;
    let isSuccess = false;
    if (diff <= 1.5) {
      points = 150;
      isSuccess = true;
      soundFX.playSuccess();
    } else if (diff <= 3.5) {
      points = 80;
      isSuccess = true;
      soundFX.playSuccess();
    } else {
      points = 20;
      isSuccess = false;
      soundFX.playError();
    }

    setTestResult({ diff, points });

    onScoreUpdate(points, isSuccess, {
      questionTitle: `${selectedCity.nameKo} 기온 직관 추리`,
      userAnswer: `예측 ${guessedTemp}°C`,
      correctAnswer: `실측 ${weatherData.temperature}°C`,
      isCorrect: isSuccess,
      explanation: `${selectedCity.nameKo}의 실시간 기온은 ${weatherData.temperature}°C로, 오차는 ${diff}°C입니다.`,
    });
  };

  const getWeatherIcon = (condition: LiveWeatherData['weatherCondition'], isDay: boolean) => {
    switch (condition) {
      case 'clear':
        return isDay ? <Sun className="w-10 h-10 text-amber-400" /> : <Sun className="w-10 h-10 text-indigo-300" />;
      case 'rain':
        return <CloudRain className="w-10 h-10 text-sky-400" />;
      case 'snow':
        return <CloudSnow className="w-10 h-10 text-cyan-200" />;
      case 'thunder':
        return <CloudLightning className="w-10 h-10 text-yellow-400" />;
      case 'cloudy':
      case 'fog':
      default:
        return <Cloud className="w-10 h-10 text-slate-300" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Search Bar & Quick City Chips */}
      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="도시명을 검색하세요 (예: 런던, Reykjavik, 뉴욕, 파리, 제주, 시드니...)"
            className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 backdrop-blur-md transition-all shadow-xs"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSearching ? '검색 중...' : '실시간 검증'}
          </button>
        </form>

        {searchError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 text-xs text-rose-800 dark:text-rose-300">
            {searchError}
          </div>
        )}

        {/* Quick select buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 font-mono">추천 관측소:</span>
          {GLOBAL_CITIES.slice(0, 8).map(city => (
            <button
              key={city.id}
              onClick={() => {
                soundFX.playClick();
                loadCityWeather(city);
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                selectedCity.id === city.id
                  ? 'bg-sky-500 text-slate-950 font-bold border-sky-400'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {city.nameKo}
            </button>
          ))}
        </div>
      </div>

      {/* Main Verification Card */}
      {isLoading || !weatherData ? (
        <div className="flex items-center justify-center min-h-[360px] text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          실시간 위성 데이터 불러오는 중...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weather Station Live Report */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl dark:shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {selectedCity.nameKo}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    ({selectedCity.countryKo})
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {weatherData.isDay ? '☀️ 주간' : '🌙 야간'}
                </span>
              </div>

              {/* Large Current Weather Hero */}
              <div className="flex flex-wrap items-center justify-between gap-6 my-8">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl sm:text-7xl font-black font-mono text-slate-900 dark:text-white tracking-tighter tabular-nums">
                      {weatherData.temperature}°C
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                      체감 {weatherData.apparentTemperature}°C
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-sky-600 dark:text-sky-300 mt-2">
                    {weatherData.weatherDescription}
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-2xs">
                  {getWeatherIcon(weatherData.weatherCondition, weatherData.isDay)}
                </div>
              </div>
            </div>

            {/* Weather Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" /> 습도
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  {weatherData.relativeHumidity}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
                  <Wind className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 풍속
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  {weatherData.windSpeed} km/h
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
                  <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> 기압
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  {weatherData.surfacePressure} hPa
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> 강수량
                </span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  {weatherData.precipitation} mm
                </span>
              </div>
            </div>
          </div>

          {/* Instant Intuition Quiz Panel */}
          <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl flex flex-col justify-between shadow-xl dark:shadow-2xl">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  내 날씨 직관 테스트
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                슬라이더로 {selectedCity.nameKo}의 실시간 기온을 예상해 맞혀보세요! ±2°C 이내면 고득점 보너스를 받습니다.
              </p>

              <div className="my-6">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
                  <span>예상 기온 설정</span>
                  <span className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 tabular-nums">
                    {guessedTemp}°C
                  </span>
                </div>
                <input
                  type="range"
                  min={-20}
                  max={45}
                  value={guessedTemp}
                  disabled={isTested}
                  onChange={e => setGuessedTemp(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                  <span>-20°C (혹한)</span>
                  <span>0°C</span>
                  <span>20°C</span>
                  <span>45°C (혹서)</span>
                </div>
              </div>
            </div>

            {/* Test Action / Result */}
            <div>
              {!isTested ? (
                <button
                  onClick={handleVerifyIntuition}
                  className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  기온 직관 검증하기
                </button>
              ) : (
                testResult && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        testResult.diff <= 2.5
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-200'
                          : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>오차: {testResult.diff}°C</span>
                        <span className="font-mono tabular-nums text-sky-600 dark:text-sky-400">
                          +{testResult.points}점
                        </span>
                      </div>
                      <span className="text-[11px] block mt-1 text-slate-500 dark:text-slate-400">
                        실제 기온은 {weatherData.temperature}°C였습니다.
                      </span>
                    </div>

                    <button
                      onClick={() => setIsTested(false)}
                      className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      다른 기온으로 다시 도전
                    </button>
                  </div>
                )
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
