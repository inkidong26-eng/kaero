import { CityInfo, LiveWeatherData, FactCheckQuestion } from '../types/weather';

export const GLOBAL_CITIES: CityInfo[] = [
  // 대한민국
  { id: 'seoul', name: 'Seoul', nameKo: '서울', country: 'South Korea', countryKo: '대한민국', continent: '아시아', lat: 37.5665, lng: 126.9780, timezone: 'Asia/Seoul' },
  { id: 'busan', name: 'Busan', nameKo: '부산', country: 'South Korea', countryKo: '대한민국', continent: '아시아', lat: 35.1796, lng: 129.0756, timezone: 'Asia/Seoul' },
  { id: 'jeju', name: 'Jeju', nameKo: '제주', country: 'South Korea', countryKo: '대한민국', continent: '아시아', lat: 33.4996, lng: 126.5312, timezone: 'Asia/Seoul' },
  { id: 'gangneung', name: 'Gangneung', nameKo: '강릉', country: 'South Korea', countryKo: '대한민국', continent: '아시아', lat: 37.7519, lng: 128.8761, timezone: 'Asia/Seoul' },
  { id: 'daejeon', name: 'Daejeon', nameKo: '대전', country: 'South Korea', countryKo: '대한민국', continent: '아시아', lat: 36.3504, lng: 127.3845, timezone: 'Asia/Seoul' },

  // 아시아
  { id: 'tokyo', name: 'Tokyo', nameKo: '도쿄', country: 'Japan', countryKo: '일본', continent: '아시아', lat: 35.6762, lng: 139.6503, timezone: 'Asia/Tokyo' },
  { id: 'singapore', name: 'Singapore', nameKo: '싱가포르', country: 'Singapore', countryKo: '싱가포르', continent: '아시아', lat: 1.3521, lng: 103.8198, timezone: 'Asia/Singapore' },
  { id: 'beijing', name: 'Beijing', nameKo: '베이징', country: 'China', countryKo: '중국', continent: '아시아', lat: 39.9042, lng: 116.4074, timezone: 'Asia/Shanghai' },
  { id: 'bangkok', name: 'Bangkok', nameKo: '방콕', country: 'Thailand', countryKo: '태국', continent: '아시아', lat: 13.7563, lng: 100.5018, timezone: 'Asia/Bangkok' },
  { id: 'ulaanbaatar', name: 'Ulaanbaatar', nameKo: '울란바토르', country: 'Mongolia', countryKo: '몽골', continent: '아시아', lat: 47.8864, lng: 106.9057, timezone: 'Asia/Ulaanbaatar' },
  { id: 'dubai', name: 'Dubai', nameKo: '두바이', country: 'UAE', countryKo: '아랍에미리트', continent: '아시아', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },

  // 유럽
  { id: 'london', name: 'London', nameKo: '런던', country: 'United Kingdom', countryKo: '영국', continent: '유럽', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { id: 'paris', name: 'Paris', nameKo: '파리', country: 'France', countryKo: '프랑스', continent: '유럽', lat: 48.8566, lng: 2.3522, timezone: 'Europe/Paris' },
  { id: 'reykjavik', name: 'Reykjavik', nameKo: '레이캬비크', country: 'Iceland', countryKo: '아이슬란드', continent: '유럽', lat: 64.1466, lng: -21.9426, timezone: 'Atlantic/Reykjavik' },
  { id: 'rome', name: 'Rome', nameKo: '로마', country: 'Italy', countryKo: '이탈리아', continent: '유럽', lat: 41.9028, lng: 12.4964, timezone: 'Europe/Rome' },
  { id: 'berlin', name: 'Berlin', nameKo: '베를린', country: 'Germany', countryKo: '독일', continent: '유럽', lat: 52.5200, lng: 13.4050, timezone: 'Europe/Berlin' },
  { id: 'tromso', name: 'Tromso', nameKo: '트롬쇠(오로라)', country: 'Norway', countryKo: '노르웨이', continent: '유럽', lat: 69.6492, lng: 18.9553, timezone: 'Europe/Oslo' },

  // 북미 & 남미
  { id: 'newyork', name: 'New York', nameKo: '뉴욕', country: 'USA', countryKo: '미국', continent: '북미', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
  { id: 'losangeles', name: 'Los Angeles', nameKo: '로스앤젤레스', country: 'USA', countryKo: '미국', continent: '북미', lat: 34.0522, lng: -118.2437, timezone: 'America/Los_Angeles' },
  { id: 'anchorage', name: 'Anchorage', nameKo: '앵커리지(알래스카)', country: 'USA', countryKo: '미국', continent: '북미', lat: 61.2181, lng: -149.9003, timezone: 'America/Anchorage' },
  { id: 'buenosaires', name: 'Buenos Aires', nameKo: '부에노스아이레스', country: 'Argentina', countryKo: '아르헨티나', continent: '남미', lat: -34.6037, lng: -58.3816, timezone: 'America/Argentina/Buenos_Aires' },
  { id: 'saopaulo', name: 'Sao Paulo', nameKo: '상파울루', country: 'Brazil', countryKo: '브라질', continent: '남미', lat: -23.5505, lng: -46.6333, timezone: 'America/Sao_Paulo' },

  // 오세아니아 & 아프리카
  { id: 'sydney', name: 'Sydney', nameKo: '시드니', country: 'Australia', countryKo: '호주', continent: '오세아니아', lat: -33.8688, lng: 151.2093, timezone: 'Australia/Sydney' },
  { id: 'cairo', name: 'Cairo', nameKo: '카이로', country: 'Egypt', countryKo: '이집트', continent: '아프리카', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo' },
  { id: 'capetown', name: 'Cape Town', nameKo: '케이프타운', country: 'South Africa', countryKo: '남아프리카공화국', continent: '아프리카', lat: -33.9249, lng: 18.4241, timezone: 'Africa/Johannesburg' },
  { id: 'nairobi', name: 'Nairobi', nameKo: '나이로비', country: 'Kenya', countryKo: '케냐', continent: '아프리카', lat: -1.2921, lng: 36.8219, timezone: 'Africa/Nairobi' },
];

export function decodeWeatherCode(code: number): { description: string; condition: LiveWeatherData['weatherCondition'] } {
  if (code === 0) return { description: '맑음 (쾌청한 하늘)', condition: 'clear' };
  if (code === 1) return { description: '대체로 맑음', condition: 'clear' };
  if (code === 2) return { description: '구름 조금', condition: 'cloudy' };
  if (code === 3) return { description: '흐림 (구름 많음)', condition: 'cloudy' };
  if (code === 45 || code === 48) return { description: '안개 / 박무', condition: 'fog' };
  if (code >= 51 && code <= 57) return { description: '이슬비', condition: 'rain' };
  if (code >= 61 && code <= 67) return { description: '비 / 강우', condition: 'rain' };
  if (code >= 71 && code <= 77) return { description: '눈 / 강설', condition: 'snow' };
  if (code >= 80 && code <= 82) return { description: '소나기', condition: 'rain' };
  if (code >= 85 && code <= 86) return { description: '소낙눈', condition: 'snow' };
  if (code >= 95 && code <= 99) return { description: '뇌우 (천둥번개)', condition: 'thunder' };
  return { description: '구름 약간', condition: 'cloudy' };
}

// In-memory weather cache: key -> { data, timestamp }
const weatherCache = new Map<string, { data: LiveWeatherData; expiresAt: number }>();
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

export async function fetchLiveWeather(city: CityInfo): Promise<LiveWeatherData> {
  const cacheKey = `${city.lat.toFixed(2)},${city.lng.toFixed(2)}`;
  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&timezone=auto`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) {
      throw new Error(`Weather fetch failed: ${res.statusText}`);
    }
    const json = await res.json();
    const current = json.current;
    const { description, condition } = decodeWeatherCode(current.weather_code);

    const weatherData: LiveWeatherData = {
      temperature: Math.round(current.temperature_2m * 10) / 10,
      apparentTemperature: Math.round(current.apparent_temperature * 10) / 10,
      relativeHumidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
      windDirection: current.wind_direction_10m,
      weatherCode: current.weather_code,
      weatherDescription: description,
      weatherCondition: condition,
      precipitation: current.precipitation ?? 0,
      surfacePressure: Math.round(current.surface_pressure ?? 1013),
      isDay: current.is_day === 1,
      time: current.time,
    };

    weatherCache.set(cacheKey, { data: weatherData, expiresAt: Date.now() + CACHE_TTL_MS });
    return weatherData;
  } catch {
    // Intelligent fallback based on latitude and month
    const fallbackTemp = estimateFallbackTemp(city.lat);
    const fallbackData: LiveWeatherData = {
      temperature: fallbackTemp,
      apparentTemperature: fallbackTemp - 1.2,
      relativeHumidity: 58,
      windSpeed: 11.4,
      windDirection: 210,
      weatherCode: 2,
      weatherDescription: '구름 조금 (오프라인 모드)',
      weatherCondition: 'cloudy',
      precipitation: 0,
      surfacePressure: 1015,
      isDay: true,
      time: new Date().toISOString(),
    };
    return fallbackData;
  }
}

function estimateFallbackTemp(lat: number): number {
  const absLat = Math.abs(lat);
  if (absLat < 15) return 29.5; // Tropical
  if (absLat < 35) return 21.0; // Subtropical
  if (absLat < 50) return 13.5; // Temperate
  if (absLat < 65) return 4.0;  // Subarctic
  return -8.0;                  // Arctic
}

/**
 * Generate a dynamic Fact or Fiction question based on real-time data
 */
export async function generateFactCheckQuestion(usedCityIds: string[] = []): Promise<FactCheckQuestion> {
  const availableCities = GLOBAL_CITIES.filter(c => !usedCityIds.includes(c.id));
  const city = availableCities.length > 0 
    ? availableCities[Math.floor(Math.random() * availableCities.length)]
    : GLOBAL_CITIES[Math.floor(Math.random() * GLOBAL_CITIES.length)];

  const weather = await fetchLiveWeather(city);
  
  // Decide question archetype:
  // 1. Temperature threshold claim (e.g. "기온이 15°C 이상이다")
  // 2. Precipitation / Rain claim (e.g. "지금 비나 눈이 오고 있다")
  // 3. Humidity claim (e.g. "습도가 60%를 초과한다")
  // 4. Wind speed claim (e.g. "풍속이 12km/h 이상으로 바람이 분다")
  const archetypeRandom = Math.random();

  if (archetypeRandom < 0.45) {
    // Temperature threshold claim
    const actualTemp = weather.temperature;
    // Create offset: 50% chance fact, 50% chance fiction
    const makeTrue = Math.random() > 0.5;
    let threshold: number;
    let claimText: string;

    if (makeTrue) {
      if (Math.random() > 0.5) {
        threshold = Math.floor(actualTemp - (Math.random() * 4 + 1.5));
        claimText = `지금 이 시각 ${city.nameKo}(${city.countryKo})의 기온은 ${threshold}°C 보다 높다?`;
      } else {
        threshold = Math.ceil(actualTemp + (Math.random() * 4 + 1.5));
        claimText = `지금 이 시각 ${city.nameKo}(${city.countryKo})의 기온은 ${threshold}°C 보다 낮다?`;
      }
    } else {
      if (Math.random() > 0.5) {
        threshold = Math.ceil(actualTemp + (Math.random() * 4 + 2));
        claimText = `지금 이 시각 ${city.nameKo}(${city.countryKo})의 기온은 ${threshold}°C 보다 높다?`;
      } else {
        threshold = Math.floor(actualTemp - (Math.random() * 4 + 2));
        claimText = `지금 이 시각 ${city.nameKo}(${city.countryKo})의 기온은 ${threshold}°C 보다 낮다?`;
      }
    }

    const expectedAnswer = claimText.includes('높다') ? actualTemp > threshold : actualTemp < threshold;

    return {
      id: `fact_${city.id}_${Date.now()}`,
      city,
      claim: claimText,
      targetMetric: 'temperature',
      thresholdValue: threshold,
      unit: '°C',
      expectedAnswer,
      liveData: weather,
      explanation: `${city.nameKo}의 실시간 관측 기온은 ${actualTemp}°C(체감 ${weather.apparentTemperature}°C)입니다. 날씨는 '${weather.weatherDescription}' 상태입니다.`,
      difficulty: Math.abs(actualTemp - threshold) < 3 ? 'hard' : 'easy',
    };
  } else if (archetypeRandom < 0.70) {
    // Precipitation claim
    const isRainingOrSnowing = weather.precipitation > 0 || weather.weatherCondition === 'rain' || weather.weatherCondition === 'snow' || weather.weatherCondition === 'thunder';
    const makeClaimPositive = Math.random() > 0.5;
    
    let claimText: string;
    let expectedAnswer: boolean;

    if (makeClaimPositive) {
      claimText = `지금 이 순간 ${city.nameKo}(${city.countryKo})에는 비나 눈(강수)이 내리고 있다?`;
      expectedAnswer = isRainingOrSnowing;
    } else {
      claimText = `지금 이 순간 ${city.nameKo}(${city.countryKo})의 하늘은 비나 눈이 내리지 않는 상태이다?`;
      expectedAnswer = !isRainingOrSnowing;
    }

    return {
      id: `fact_${city.id}_${Date.now()}`,
      city,
      claim: claimText,
      targetMetric: 'precipitation',
      expectedAnswer,
      liveData: weather,
      explanation: `${city.nameKo}의 실시간 기상 상태는 '${weather.weatherDescription}', 시간당 강수량은 ${weather.precipitation}mm 입니다.`,
      difficulty: 'medium',
    };
  } else if (archetypeRandom < 0.85) {
    // Humidity claim
    const actualHumidity = weather.relativeHumidity;
    const makeTrue = Math.random() > 0.5;
    const threshold = makeTrue 
      ? (actualHumidity > 50 ? actualHumidity - 15 : actualHumidity + 15)
      : (actualHumidity > 50 ? actualHumidity + 15 : actualHumidity - 15);
    
    const isGreaterCheck = Math.random() > 0.5;
    const claimText = isGreaterCheck
      ? `현재 ${city.nameKo}(${city.countryKo})의 상대습도는 ${threshold}%보다 높다?`
      : `현재 ${city.nameKo}(${city.countryKo})의 상대습도는 ${threshold}%보다 낮다?`;

    const expectedAnswer = isGreaterCheck ? actualHumidity > threshold : actualHumidity < threshold;

    return {
      id: `fact_${city.id}_${Date.now()}`,
      city,
      claim: claimText,
      targetMetric: 'humidity',
      thresholdValue: threshold,
      unit: '%',
      expectedAnswer,
      liveData: weather,
      explanation: `${city.nameKo}의 현재 실시간 습도는 ${actualHumidity}%입니다.`,
      difficulty: 'medium',
    };
  } else {
    // Wind claim
    const actualWind = weather.windSpeed;
    const isBreezy = actualWind >= 12;
    const claimText = `현재 ${city.nameKo}(${city.countryKo})에는 시속 12km/h 이상의 뚜렷한 바람이 불고 있다?`;
    const expectedAnswer = isBreezy;

    return {
      id: `fact_${city.id}_${Date.now()}`,
      city,
      claim: claimText,
      targetMetric: 'wind',
      thresholdValue: 12,
      unit: 'km/h',
      expectedAnswer,
      liveData: weather,
      explanation: `${city.nameKo}의 현재 풍속은 시속 ${actualWind}km/h (풍향 ${weather.windDirection}°) 입니다.`,
      difficulty: 'medium',
    };
  }
}

/**
 * Higher or Lower round generator
 */
export async function generateHigherLowerRound(excludeCityIds: string[] = []): Promise<{
  baseCity: CityInfo;
  baseWeather: LiveWeatherData;
  targetCity: CityInfo;
  targetWeather: LiveWeatherData;
}> {
  const pool = GLOBAL_CITIES.filter(c => !excludeCityIds.includes(c.id));
  const poolFinal = pool.length >= 2 ? pool : GLOBAL_CITIES;

  // Pick two distinct cities
  const idx1 = Math.floor(Math.random() * poolFinal.length);
  let idx2 = Math.floor(Math.random() * poolFinal.length);
  while (idx2 === idx1) {
    idx2 = Math.floor(Math.random() * poolFinal.length);
  }

  const baseCity = poolFinal[idx1];
  const targetCity = poolFinal[idx2];

  const [baseWeather, targetWeather] = await Promise.all([
    fetchLiveWeather(baseCity),
    fetchLiveWeather(targetCity),
  ]);

  return {
    baseCity,
    baseWeather,
    targetCity,
    targetWeather,
  };
}

/**
 * Geocoding search helper for custom city lookup in explorer mode
 */
export async function searchCustomCity(query: string): Promise<CityInfo | null> {
  const trimmed = query.trim().toLowerCase();
  // Check local registry first
  const match = GLOBAL_CITIES.find(
    c => c.nameKo.includes(trimmed) || c.name.toLowerCase().includes(trimmed) || c.countryKo.includes(trimmed)
  );
  if (match) return match;

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=ko&format=json`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    if (json.results && json.results.length > 0) {
      const r = json.results[0];
      return {
        id: `custom_${r.id}`,
        name: r.name,
        nameKo: r.name,
        country: r.country ?? 'Unknown',
        countryKo: r.country ?? '기타',
        continent: '글로벌',
        lat: r.latitude,
        lng: r.longitude,
        timezone: r.timezone || 'auto',
      };
    }
  } catch {
    // Network error
  }
  return null;
}
