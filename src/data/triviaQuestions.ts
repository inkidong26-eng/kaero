import { TriviaQuestion } from '../types/weather';

export const METEOROLOGY_TRIVIA: TriviaQuestion[] = [
  {
    id: 'triv_01',
    category: '기상과학',
    title: '태풍(열대저기압)의 중심부 검증',
    scenario: '강력한 태풍이 상륙 중일 때, 태풍의 중심인 "태풍의 눈(Eye of Typhoon)"에 들어서면 날씨는 어떻게 변할까요?',
    options: [
      '바람이 가장 거세지고 폭우가 집중된다',
      '바람이 잦아들고 하늘이 맑아지거나 구름이 옅어진다',
      '기압이 급격히 치솟아 1050hPa 이상이 된다',
      '기온이 영하권으로 급격히 빙결된다'
    ],
    correctIndex: 1,
    explanation: '태풍의 눈에서는 강한 회전력에 의한 원심력과 하강 기류로 인해 바람이 갑자기 잦아들고 구름이 흩어져 맑은 하늘이 보이기도 합니다. 하지만 눈을 지나면 바로 반대 방향의 거센 폭풍우(눈벽)가 들이닥치므로 방심하면 안 됩니다.',
    sourceNote: 'WMO 기상학 개론 - 열대저기압 구조'
  },
  {
    id: 'triv_02',
    category: '극값과기록',
    title: '지구상 공식 최고 기온 기록',
    scenario: '세계기상기구(WMO)가 공인한 역대 지구상 공식 최고 기온은 어디서 몇 도를 기록했을까요?',
    options: [
      '사하라 사막 엘아지지아 58.0°C',
      '미국 캘리포니아 데스밸리(Death Valley) 56.7°C',
      '쿠웨이트 미트리바 54.0°C',
      '호주 아웃백 울루루 51.5°C'
    ],
    correctIndex: 1,
    explanation: '1913년 7월 10일 미국 캘리포니아주 데스밸리 퍼니스 크릭(Furnace Creek)에서 기록된 56.7°C(134°F)가 WMO 공인 지구상 최고 기온입니다. (리비아 58°C 기록은 관측 오류로 공식 무효화됨)',
    sourceNote: 'WMO World Weather & Climate Extremes Archive'
  },
  {
    id: 'triv_03',
    category: '구름과바람',
    title: '소나기와 우박을 만드는 구름',
    scenario: '수직으로 거대하게 솟아오르며 모루(anvil) 모양의 꼭대기를 형성하고, 벼락·돌풍·우박을 쏟아내는 구름의 명칭은?',
    options: [
      '권운 (Cirrus / 새털구름)',
      '고적운 (Altocumulus / 양떼구름)',
      '적란운 (Cumulonimbus / 쌘비구름)',
      '층운 (Stratus / 안개구름)'
    ],
    correctIndex: 2,
    explanation: '적란운(Cumulonimbus)은 강한 상승기류에 의해 대류권 상층계면까지 수직으로 수 킬로미터 이상 치솟으며, 번개와 소나기, 돌풍, 우박을 동반하는 대표적인 악기상 구름입니다.',
    sourceNote: '국제 구름도감 (International Cloud Atlas)'
  },
  {
    id: 'triv_04',
    category: '기후상식',
    title: '남극 vs 북극 기온 비교',
    scenario: '남극(남극점)과 북극(북극점) 중 평균 기온이 더 낮고 혹독하게 추운 곳은 어디일까요?',
    options: [
      '북극 (북극해 얼음판의 냉각 효과 때문에)',
      '남극 (거대한 고원 대륙이자 해발고도가 높아 훨씬 춥다)',
      '두 곳 모두 완전히 동일한 연평균 -30°C이다',
      '계절에 따라 여름엔 남극이, 겨울엔 북극이 더 춥다'
    ],
    correctIndex: 1,
    explanation: '남극은 바다가 아닌 거대한 육지 대륙이며, 평균 해발고도가 약 2,500m에 달해 북극보다 훨씬 춥습니다. 남극의 보스토크 기지는 -89.2°C라는 지구상 최저기온 기록을 보유하고 있습니다.',
    sourceNote: '극지연구소(KOPRI) 기후 비교 보고서'
  },
  {
    id: 'triv_05',
    category: '일기예보원리',
    title: '강수확률 60%의 진짜 의미',
    scenario: '일기예보에서 "내일 서울의 강수확률은 60%입니다"라고 발표했을 때, 기상학적 올바른 해석은?',
    options: [
      '내일 서울 전체 면적의 60% 지역에만 비가 온다',
      '내일 하루 24시간 중 60% 시간(약 14시간) 동안 비가 온다',
      '비슷한 기상 조건이 100번 발생했을 때 약 60번 비(0.1mm 이상)가 내렸다',
      '내일 비가 오거나 안 올 확률을 반반(50%)보다 조금 높게 추측한 것이다'
    ],
    correctIndex: 2,
    explanation: '강수확률(Probability of Precipitation)은 과거와 현재의 유사한 대기 조건 100회 중 0.1mm 이상의 강수가 발생했던 통계적 빈도를 의미합니다. 면적이나 지속 시간을 뜻하는 것이 아닙니다.',
    sourceNote: '대한민국 기상청(KMA) 예보 해설서'
  },
  {
    id: 'triv_06',
    category: '구름과바람',
    title: '영동 지방을 말리는 바람, 푄(Foehn) 현상',
    scenario: '봄철 태백산맥을 넘어 동해안(강릉, 속초 등)으로 불어 내리면서 고온 건조해져 대형 산불 위험을 높이는 국지풍은?',
    options: [
      '높새바람 (푄 현상에 의한 동풍계열)',
      '양간지풍 (양양과 간성 사이의 강풍)',
      '마파람 (따뜻한 남풍)',
      '하늬바람 (시원한 서풍)'
    ],
    correctIndex: 1,
    explanation: '봄철 양양과 간성, 강릉 일대에 부는 국지적 돌풍을 "양간지풍(襄杆之風)"이라 부르며, 남고북저 기압배치에서 태백산맥을 넘으며 고온 건조하고 순간 풍속 20~30m/s 이상으로 가속되어 대형 산불의 원인이 됩니다. (영서 지방으로 부는 동풍은 높새바람)',
    sourceNote: '기상청 국지기상 연구'
  },
  {
    id: 'triv_07',
    category: '기상과학',
    title: '무지개가 생기는 원리와 태양의 위치',
    scenario: '비가 그친 뒤 하늘에 예쁜 무지개를 보려면 관측자는 태양을 어느 방향에 두고 서 있어야 할까요?',
    options: [
      '태양을 정면으로 마주보고 서 있어야 한다',
      '태양을 등 뒤에 두고 물방울이 있는 하늘을 바라봐야 한다',
      '태양이 머리 바로 꼭대기(남중)에 있어야만 보인다',
      '태양의 위치와 무지개 관측 방향은 상관없다'
    ],
    correctIndex: 1,
    explanation: '무지개는 등 뒤에서 비추는 햇빛이 전방의 공기 중 물방울 속으로 들어가 굴절-반사-굴절을 거치며 빛 스펙트럼으로 분산되어 눈으로 들어오기 때문에 항상 태양을 등지고 서야 관측할 수 있습니다.',
    sourceNote: '대기광학(Atmospheric Optics)'
  },
  {
    id: 'triv_08',
    category: '기후상식',
    title: '사막에도 눈이 내릴까?',
    scenario: '세계에서 가장 넓고 뜨거운 사막인 북아프리카 사하라 사막에도 눈(Snow)이 내린 적이 있을까요?',
    options: [
      '절대 없다 (사막은 연중 기온이 높아 눈이 형성 불가능)',
      '실제로 여러 차례 눈이 내려 붉은 모래언덕이 하얗게 덮인 적이 있다',
      '인공 눈 실험으로만 단 한 번 뿌려본 적 있다',
      '우박만 내렸을 뿐 눈 결정은 한 번도 내린 적 없다'
    ],
    correctIndex: 1,
    explanation: '사하라 사막에도 겨울철 고위도 찬 공기가 남하하고 고지대(알제리 아인세프라 등)의 기온이 영하로 떨어지면서 1979년, 2016년, 2018년, 2021년 등 붉은 사막 모래언덕에 40cm 이상의 눈이 쌓이는 장관이 실제 관측되었습니다.',
    sourceNote: 'NASA Earth Observatory 관측 기록'
  },
  {
    id: 'triv_09',
    category: '기상과학',
    title: '천둥과 번개의 시간차 거리 계산',
    scenario: '번쩍하는 번개를 본 뒤 3초 뒤에 천둥소리가 들렸다면, 번개가 친 위치는 나와 대략 몇 km 떨어져 있을까요?',
    options: [
      '약 100m',
      '약 1km (소리의 속도 약 340m/s)',
      '약 3km',
      '약 10km'
    ],
    correctIndex: 1,
    explanation: '빛은 30만 km/s로 사실상 즉시 눈에 들어오지만, 소리는 대기 중에서 초당 약 340m를 이동합니다. 따라서 3초 × 340m = 약 1,020m, 즉 약 1km 거리에서 번개가 친 것입니다.',
    sourceNote: '기상 기초 물리 - 음파 전파'
  },
  {
    id: 'triv_10',
    category: '극값과기록',
    title: '역대 지구상 최저 기온 기록',
    scenario: '지구상에서 사람이 설치한 기상관측소에서 공식 측정된 역대 최저 기온은 몇 도일까요?',
    options: [
      '시베리아 오이먀콘 -71.2°C',
      '그린란드 정상 -69.6°C',
      '남극 보스토크(Vostok) 기지 -89.2°C',
      '알래스카 데날리 -73.5°C'
    ],
    correctIndex: 2,
    explanation: '1983년 7월 21일 남극 대륙 내륙에 위치한 러시아 보스토크 기지에서 공식 관측된 영하 89.2°C(-128.6°F)가 WMO 공인 지구상 최저 기온 기록입니다.',
    sourceNote: 'WMO 극값 보관소'
  },
  {
    id: 'triv_11',
    category: '일기예보원리',
    title: '기압과 날씨의 상관관계',
    scenario: '일기도에서 "저기압(Low Pressure)" 중심 부근의 날씨는 왜 대체로 흐리거나 비가 올까요?',
    options: [
      '공기가 중심부로 모여들며 상승 기류를 만들어 구름을 형성하기 때문',
      '공기가 흩어지며 하강 기류가 구름을 흩뜨리기 때문',
      '저기압은 기온이 항상 0도 이하로 얼어붙기 때문',
      '바람이 완전히 멈춰서 수증기가 증발하지 못하기 때문'
    ],
    correctIndex: 0,
    explanation: '저기압 중심에서는 주변의 공기가 시계 반대 방향(북반구 기준)으로 불어 모여들며 위로 솟구치는 상승기류를 만듭니다. 상승한 공기는 단열 팽창으로 냉각되어 수증기가 응결하고 짙은 구름과 비를 만듭니다.',
    sourceNote: '종관기상학 개론'
  },
  {
    id: 'triv_12',
    category: '기후상식',
    title: '엘니뇨(El Niño)와 라니냐(La Niña)',
    scenario: '동태평양 적도 부근(페루 연안)의 해수면 온도가 평년보다 비정상적으로 높아지는 기후 현상은?',
    options: [
      '엘니뇨 (El Niño / 스페인어로 아기 예수·소년)',
      '라니냐 (La Niña / 소녀)',
      '몬순 (Monsoon / 계절풍)',
      '다이폴 모드 (Dipole Mode)'
    ],
    correctIndex: 0,
    explanation: '엘니뇨(El Niño)는 무역풍이 약화되면서 동태평양 적도 해역의 수온이 평년보다 0.5°C 이상 높은 상태가 수개월 이상 지속되는 현상으로, 전 세계 이상 기상과 홍수·가뭄을 유발합니다.',
    sourceNote: 'NOAA Climate Prediction Center'
  },
  {
    id: 'triv_13',
    category: '기상과학',
    title: '하늘이 파란색으로 보이는 과학적 이유',
    scenario: '낮 동안 맑은 하늘이 푸른 바다처럼 파랗게 보이는 원리는 무엇일까요?',
    options: [
      '지구의 바다가 파란색이라 하늘에 그대로 반사되기 때문',
      '대기 중 산소와 질소 분자가 짧은 파장의 파란빛을 더 강하게 산란시키기 때문 (레일리 산란)',
      '오존층이 붉은색 빛만 전부 흡수해버리기 때문',
      '우주 공간의 기본 색상이 짙은 남색이기 때문'
    ],
    correctIndex: 1,
    explanation: '태양빛이 지구 대기를 통과할 때 산소와 질소 분자에 부딪혀 빛이 사방으로 흩어지는 레일리 산란(Rayleigh Scattering)이 일어납니다. 파장이 짧은 파란색/보라색 계열 빛이 붉은색보다 훨씬 강하게 산란되어 우리 눈에 하늘이 파랗게 보입니다.',
    sourceNote: '대기물리학'
  },
  {
    id: 'triv_14',
    category: '극값과기록',
    title: '세계에서 비가 가장 많이 내리는 곳',
    scenario: '연평균 강수량이 무려 11,871mm(서울의 약 9배!)에 달해 "지구상에서 가장 축축한 마을"로 기네스북에 오른 곳은?',
    options: [
      '인도 메갈라야주 모신람(Mawsynram)',
      '미국 하와이 카우아이섬 와이알레알레산',
      '브라질 아마존 마나우스',
      '영국 스코틀랜드 하이랜드'
    ],
    correctIndex: 0,
    explanation: '인도 북동부 메갈라야주 모신람(Mawsynram)과 이웃 체라푼지는 인도양 벵골만에서 불어오는 습한 계절풍이 카시 구릉지대 산맥에 부딪히며 엄청난 지형성 강우를 쏟아내 연평균 11,800mm가 넘는 강수량을 기록합니다.',
    sourceNote: 'Guinness World Records - Highest annual rainfall'
  },
  {
    id: 'triv_15',
    category: '일기예보원리',
    title: '체감온도(Wind Chill) 공식의 핵심 요소',
    scenario: '겨울철 실제 기온보다 몸이 훨씬 더 춥게 느껴지는 "체감온도"를 계산할 때 기온과 함께 가장 결정적인 영향을 미치는 기상 요소는?',
    options: [
      '풍속 (바람의 세기)',
      '지표면 기압',
      '자외선 지수',
      '이슬점 온도'
    ],
    correctIndex: 0,
    explanation: '겨울철 체감온도는 신체가 외부로 열을 빼앗기는 속도를 기준으로 산출되며, 바람(풍속)이 강할수록 체표면을 감싸고 있는 얇은 온기 보호막이 빠르게 날아가 실제 온도보다 훨씬 극심한 추위를 느끼게 됩니다.',
    sourceNote: '기상청 체감온도 산출 지침'
  }
];

export const PLAYER_RANKS = [
  { minScore: 0, title: '기상 관측 입문생', badge: '🌱', description: '날씨의 기초 현상을 배우기 시작한 호기심 가득한 관측생' },
  { minScore: 300, title: '수습 기상 관측관', badge: '🌤️', description: '전 세계 기온과 구름 변화를 예민하게 감지하는 관측관' },
  { minScore: 700, title: '현장 기상 캐스터', badge: '🎤', description: '복잡한 날씨 데이터를 명쾌하게 분석하고 전달하는 전문가' },
  { minScore: 1300, title: '정밀 기상 분석관', badge: '🛰️', description: '위성 사진과 수치 모델을 꿰뚫어보는 날씨 탐정' },
  { minScore: 2000, title: '수석 총괄 예보관', badge: '⚡', description: '극한 기상과 돌발 폭풍도 척척 맞혀내는 기상청의 브레인' },
  { minScore: 3000, title: '날씨의 마스터 (Grandmaster)', badge: '👑', description: '지구의 대기 대순환과 기후의 모든 비밀을 통달한 전설' },
];

export function getRankForScore(score: number) {
  let matched = PLAYER_RANKS[0];
  for (const rank of PLAYER_RANKS) {
    if (score >= rank.minScore) {
      matched = rank;
    }
  }
  return matched;
}
