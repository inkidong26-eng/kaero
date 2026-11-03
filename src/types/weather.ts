export type GameMode = 'REALTIME_FACT' | 'HIGHER_LOWER' | 'METEOROLOGY_TRIVIA' | 'WORLD_EXPLORER';

export type GameStatus = 'MENU' | 'PLAYING' | 'SUMMARY';

export interface CityInfo {
  id: string;
  name: string;
  nameKo: string;
  country: string;
  countryKo: string;
  continent: string;
  lat: number;
  lng: number;
  timezone: string;
  elevationMeters?: number;
}

export interface LiveWeatherData {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  weatherDescription: string;
  weatherCondition: 'clear' | 'cloudy' | 'rain' | 'snow' | 'thunder' | 'fog';
  precipitation: number;
  surfacePressure: number;
  isDay: boolean;
  time: string;
}

export interface FactCheckQuestion {
  id: string;
  city: CityInfo;
  claim: string;
  targetMetric: 'temperature' | 'precipitation' | 'humidity' | 'wind' | 'condition';
  thresholdValue?: number;
  unit?: string;
  expectedAnswer: boolean; // true = Fact(O), false = Fiction(X)
  liveData?: LiveWeatherData;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface HigherLowerRound {
  baseCity: CityInfo;
  baseWeather: LiveWeatherData;
  targetCity: CityInfo;
  targetWeather: LiveWeatherData;
}

export interface TriviaQuestion {
  id: string;
  category: '기상과학' | '극값과기록' | '구름과바람' | '기후상식' | '일기예보원리';
  title: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceNote?: string;
}

export interface GameScoreState {
  score: number;
  streak: number;
  maxStreak: number;
  correctCount: number;
  totalAnswered: number;
  history: Array<{
    questionTitle: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }>;
}

export interface PlayerRank {
  title: string;
  badge: string;
  minScore: number;
  description: string;
}
