/**
 * Ob-havo ma'lumotlari, vaqt zonalari, quyosh harakati va jonli tahlillar (Aurora Weather)
 */

import * as SunCalc from 'suncalc';

export interface DayNightWeather {
  dayTempC: number;
  nightTempC: number;
  dayCondition: string;
  nightCondition: string;
  dayIcon: string;
  nightIcon: string;
  bgType: 'storm' | 'sunny' | 'cloudy' | 'rain' | 'night';
  weatherEffect: 'sunny' | 'rain' | 'storm' | 'snow' | 'wind' | 'cloudy' | 'fog' | 'mist';
  blurbDay: string;
  blurbNight: string;
  headlineDay: string;
  headlineNight: string;
  bgImageUrl?: string;
}

export interface ForecastDay extends DayNightWeather {
  dayName: string;
  shortDate: string;
  humidity?: number; // relative humidity %
  windSpeed?: number; // wind speed km/h
}

export interface CityWeather {
  id: string;
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
  timezoneLabel: string;
  tempC: number;
  nightTempC: number;
  condition: string;
  nightCondition: string;
  headline: string;
  headlineNight: string;
  icon: string;
  nightIcon: string;
  bgType: 'storm' | 'sunny' | 'cloudy' | 'rain' | 'night';
  weatherEffect: 'sunny' | 'rain' | 'storm' | 'snow' | 'wind' | 'cloudy' | 'fog' | 'mist';
  windKmh: number;
  humidityPercent: number;
  pressureHpa: number;
  gustKmh: number;
  sunriseTime: string; // e.g. "06:48"
  sunsetTime: string;  // e.g. "17:34"
  blurb: string;
  blurbNight: string;
  bgImageUrl?: string;
  isDistrict?: boolean;
  districtOf?: string;
  days: ForecastDay[];
}

export const BACKGROUND_IMAGES = {
  storm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80',
  sunny: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80',
  cloudy: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
  rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80',
  night: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&w=1920&q=80',
  snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80'
};

/**
 * O'zbekiston viloyatlari, yirik tumanlari, shaharlari va xalqaro markazlar
 */
export const CITIES_DATABASE: CityWeather[] = [
  // --- TOSHKENT SHAHRI VA VILOYATI ---
  {
    id: "toshkent",
    city: "Toshkent",
    region: "Toshkent shahri (Poytaxt)",
    country: "O'zbekiston",
    lat: 41.2995,
    lng: 69.2401,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5 (Toshkent vaqti)",
    tempC: 22,
    nightTempC: 11,
    condition: "Quyoshli va musaffo osmon",
    nightCondition: "Oydin va salqin kecha",
    headline: "Quyoshli va musaffo\nosmon",
    headlineNight: "Yulduzli va sokin\ntun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 14,
    humidityPercent: 38,
    pressureHpa: 1014,
    gustKmh: 19,
    sunriseTime: "06:48",
    sunsetTime: "17:34",
    blurb: "Poytaxtda ajoyib quyoshli va sokin ob-havo hukm surmoqda. Kunduzgi harorat +22°C gacha ko'tariladi, sharqiy mayin shabada esib turibdi. Yog'ingarchilik kutilmaydi.",
    blurbNight: "Tunda musaffo oydin osmon, havo harorati +11°C gacha salqinlashadi. Shahar bo'ylab sokin va toza havo oqimi kuzatiladi.",
    bgImageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "chimyon",
    city: "Chimyon (Chotqol tog'lari)",
    region: "Bo'stonliq tumani, Toshkent vil.",
    country: "O'zbekiston",
    lat: 41.5167,
    lng: 70.0167,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5 (Tog'li hudud)",
    tempC: 3,
    nightTempC: -4,
    condition: "Tog'da mayin qor uchqunlari",
    nightCondition: "Muzdek yulduzli tog' kechasi",
    headline: "Tog' cho'qqilarida\nqor yog'ishi",
    headlineNight: "Yulduzli qorli\ntog' kechasi",
    icon: "i-cloud",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "snow",
    windKmh: 18,
    humidityPercent: 78,
    pressureHpa: 980,
    gustKmh: 28,
    sunriseTime: "06:46",
    sunsetTime: "17:30",
    blurb: "Katta Chotqol tizmasida mayin qor uchqunlari yog'moqda. Tog' yonbag'irlari oppoq qor bilan qoplanmoqda, harorat +3°C.",
    blurbNight: "Tog'da tunda harorat -4°C gacha soviydi, musaffo yulduzli sovuq tun.",
    bgImageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Toshkent viloyati",
    days: []
  },
  {
    id: "chorvoq",
    city: "Chorvoq",
    region: "Bo'stonliq tumani, Toshkent vil.",
    country: "O'zbekiston",
    lat: 41.6214,
    lng: 70.0381,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5 (Suv ombori hududi)",
    tempC: 16,
    nightTempC: 7,
    condition: "Tog' ko'li shabadasi",
    nightCondition: "Sokin suv sathi va salqin tun",
    headline: "Moviy ko'l bo'yida\ntog' shabadasi",
    headlineNight: "Yulduzlar aksi\nChorvoq suvlarida",
    icon: "i-wind",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "wind",
    windKmh: 24,
    humidityPercent: 54,
    pressureHpa: 994,
    gustKmh: 32,
    sunriseTime: "06:47",
    sunsetTime: "17:31",
    blurb: "Chorvoq suv ombori sohilida tog'dan esayotgan toza shabada haroratni mo'tadil +16°C darajada ushlab turibdi.",
    blurbNight: "Kechasi tog' havosi soviydi, harorat +7°C gacha tushadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Toshkent viloyati",
    days: []
  },
  {
    id: "chirchiq",
    city: "Chirchiq",
    region: "Toshkent viloyati",
    country: "O'zbekiston",
    lat: 41.4689,
    lng: 69.5822,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 10,
    condition: "Quyoshli va mayin shabada",
    nightCondition: "Ochiq yulduzli tun",
    headline: "Chirchiq daryosi bo'yida\nmusaffo quyosh",
    headlineNight: "Sokin daryo bo'yida\nsalqin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 15,
    humidityPercent: 42,
    pressureHpa: 1012,
    gustKmh: 20,
    sunriseTime: "06:47",
    sunsetTime: "17:33",
    blurb: "Chirchiq shahrida ochiq va iliq havo. Daryo vodiysidan mayin shabada esib turibdi.",
    blurbNight: "Tunda tiniq osmon, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Toshkent viloyati",
    days: []
  },
  {
    id: "olmaliq",
    city: "Olmaliq",
    region: "Toshkent viloyati",
    country: "O'zbekiston",
    lat: 40.8444,
    lng: 69.5986,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 11,
    condition: "Ochiq va iliq",
    nightCondition: "Salqin sokin oqshom",
    headline: "Ohangaron vodiysi\niliq quyoshda",
    headlineNight: "Sanoat shahri uzra\nsokin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 13,
    humidityPercent: 40,
    pressureHpa: 1014,
    gustKmh: 18,
    sunriseTime: "06:47",
    sunsetTime: "17:33",
    blurb: "Olmaliqda havo toza va quyoshli, harorat +22°C.",
    blurbNight: "Kechasi harorat +11°C, sokin shabada.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Toshkent viloyati",
    days: []
  },
  {
    id: "angren",
    city: "Angren",
    region: "Toshkent viloyati",
    country: "O'zbekiston",
    lat: 41.0167,
    lng: 70.1436,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 19,
    nightTempC: 8,
    condition: "Tog' oldi salqin havosi",
    nightCondition: "Tog'li hudud salqin tuni",
    headline: "Qurama tog'lari etagida\nsalqin havo",
    headlineNight: "Yulduzli osmon\ntog' salqini",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "cloudy",
    windKmh: 16,
    humidityPercent: 49,
    pressureHpa: 1008,
    gustKmh: 22,
    sunriseTime: "06:45",
    sunsetTime: "17:31",
    blurb: "Angren tog' yonbag'rida joylashgani bois havo salqin va toza, harorat +19°C.",
    blurbNight: "Tunda harorat +8°C gacha salqinlashadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Toshkent viloyati",
    days: []
  },
  {
    id: "bekobod",
    city: "Bekobod",
    region: "Toshkent viloyati",
    country: "O'zbekiston",
    lat: 40.2192,
    lng: 69.2644,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 23,
    nightTempC: 12,
    condition: "Sirdaryo bo'yida kuchli shamol",
    nightCondition: "Iliq daryo shabadasi",
    headline: "Xovos darvozasi\nesayotgan shamol",
    headlineNight: "Daryo uzra\nsokin tun",
    icon: "i-wind",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "wind",
    windKmh: 29,
    humidityPercent: 36,
    pressureHpa: 1015,
    gustKmh: 42,
    sunriseTime: "06:48",
    sunsetTime: "17:35",
    blurb: "Bekobodda mashhur 'Xovos shamoli' esmoqda, tezligi 29 km/soat. Havo musaffo.",
    blurbNight: "Tunda daryo bo'yi salqinlashadi, harorat +12°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Toshkent viloyati",
    days: []
  },
  {
    id: "yangiyol",
    city: "Yangiyo'l",
    region: "Toshkent viloyati",
    country: "O'zbekiston",
    lat: 41.1167,
    lng: 69.0500,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 11,
    condition: "Quyoshli va mo'tadil",
    nightCondition: "Sokin ochiq tun",
    headline: "Bog'lar shahri\nquyosh nurlarida",
    headlineNight: "Sokin shahar\nsalqin kecha",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 12,
    humidityPercent: 41,
    pressureHpa: 1014,
    gustKmh: 17,
    sunriseTime: "06:48",
    sunsetTime: "17:34",
    blurb: "Yangiyo'l tumanida iliq kuz quyoshi charaqlamoqda.",
    blurbNight: "Kechasi ochiq yulduzli tun, harorat +11°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Toshkent viloyati",
    days: []
  },

  // --- SAMARQAND VILOYATI ---
  {
    id: "samarqand",
    city: "Samarqand",
    region: "Samarqand viloyati",
    country: "O'zbekiston",
    lat: 39.6542,
    lng: 66.9597,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 9,
    condition: "Quyoshli va musaffo",
    nightCondition: "Tiniq yulduzli tun",
    headline: "Qadimiy shahar\nquyosh nurlarida",
    headlineNight: "Registon uzra\nmoviy tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 12,
    humidityPercent: 42,
    pressureHpa: 1016,
    gustKmh: 16,
    sunriseTime: "06:52",
    sunsetTime: "17:38",
    blurb: "Samarqandda havo ochiq va iliq. Registon va qadimiy obidalar ustida musaffo osmon. Sayyohlar uchun qulay kun.",
    blurbNight: "Tunda havo toza va salqin, harorat +9°C gacha pasayadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "kattaqorgon",
    city: "Kattaqo'rg'on",
    region: "Samarqand viloyati",
    country: "O'zbekiston",
    lat: 39.8978,
    lng: 66.2575,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 10,
    condition: "Ochiq va iliq havo",
    nightCondition: "Suv ombori salqin shabadasi",
    headline: "Zarafshon vodiysi\niliq quyoshda",
    headlineNight: "Sokin shahar\nsalqin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 15,
    humidityPercent: 39,
    pressureHpa: 1015,
    gustKmh: 20,
    sunriseTime: "06:54",
    sunsetTime: "17:40",
    blurb: "Kattaqo'rg'on suv ombori yaqinida havo qulay va quyoshli, harorat +22°C.",
    blurbNight: "Tunda suv sathi bo'ylab salqin shabada esadi, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Samarqand viloyati",
    days: []
  },
  {
    id: "urgut",
    city: "Urgut",
    region: "Samarqand viloyati",
    country: "O'zbekiston",
    lat: 39.4000,
    lng: 67.2400,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5 (Tog'li tuman)",
    tempC: 18,
    nightTempC: 6,
    condition: "Chinorlar soyasida tog' havosi",
    nightCondition: "Muzdek tog' shabadasi",
    headline: "Zarafshon tizmasi etagi\nsalqin va musaffo",
    headlineNight: "Ming yillik chinorlar uzra\nyulduzli tun",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "cloudy",
    windKmh: 14,
    humidityPercent: 50,
    pressureHpa: 998,
    gustKmh: 19,
    sunriseTime: "06:51",
    sunsetTime: "17:37",
    blurb: "Urgut tog'larida toza va shifobaxsh havo, harorat +18°C.",
    blurbNight: "Tog'dan kelayotgan salqin shabada haroratni +6°C gacha tushiradi.",
    bgImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Samarqand viloyati",
    days: []
  },

  // --- BUXORO VILOYATI ---
  {
    id: "buxoro",
    city: "Buxoro",
    region: "Buxoro viloyati",
    country: "O'zbekiston",
    lat: 39.7747,
    lng: 64.4286,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 23,
    nightTempC: 10,
    condition: "Ochiq va iliq",
    nightCondition: "Cho'l shabadasida salqin tun",
    headline: "Oltin gumbazlar\niliq quyoshda",
    headlineNight: "Yulduzlar yog'dusi\nqadim shahar",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 16,
    humidityPercent: 32,
    pressureHpa: 1015,
    gustKmh: 22,
    sunriseTime: "06:58",
    sunsetTime: "17:44",
    blurb: "Buxoroda havo quruq, iliq va musaffo. Kunduzgi harorat +23°C. Tarixiy minoralar uzra mutlaqo bulutsiz osmon.",
    blurbNight: "Tunda cho'l shabadasi esadi, havo +10°C gacha salqinlashadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "gijduvon",
    city: "G'ijduvon",
    region: "Buxoro viloyati",
    country: "O'zbekiston",
    lat: 40.1000,
    lng: 64.6667,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 9,
    condition: "Quyoshli va musaffo",
    nightCondition: "Sokin va salqin kecha",
    headline: "Kulollar yurti\nquyosh nurlarida",
    headlineNight: "Sokin tuman\nyulduzli osmon",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 14,
    humidityPercent: 34,
    pressureHpa: 1016,
    gustKmh: 19,
    sunriseTime: "06:57",
    sunsetTime: "17:43",
    blurb: "G'ijduvonda musaffo quyoshli kun, kulolchilik ustalari va sayyohlar uchun ajoyib ob-havo.",
    blurbNight: "Kechasi qulay va sokin tun, harorat +9°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Buxoro viloyati",
    days: []
  },
  {
    id: "kogon",
    city: "Kogon",
    region: "Buxoro viloyati",
    country: "O'zbekiston",
    lat: 39.7228,
    lng: 64.5517,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 23,
    nightTempC: 10,
    condition: "Iliq va ochiq osmon",
    nightCondition: "Yulduzli qadimiy tun",
    headline: "Amir saroyi uzra\noltin quyosh",
    headlineNight: "Sokin vokzal shahri\nsalqin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 15,
    humidityPercent: 33,
    pressureHpa: 1015,
    gustKmh: 20,
    sunriseTime: "06:58",
    sunsetTime: "17:44",
    blurb: "Kogon shahrida iliq va tiniq kuzgi havo.",
    blurbNight: "Tunda cho'l havosi soviydi, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Buxoro viloyati",
    days: []
  },

  // --- FARG'ONA VILOYATI ---
  {
    id: "fargona",
    city: "Farg'ona",
    region: "Farg'ona viloyati",
    country: "O'zbekiston",
    lat: 40.3842,
    lng: 71.7844,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 10,
    condition: "Mayin vodiy shabadasi",
    nightCondition: "Sokin va musaffo tun",
    headline: "Vodiy gavhari\nmayin quyoshda",
    headlineNight: "Chinorlar shahri\nsokin kechasi",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 11,
    humidityPercent: 46,
    pressureHpa: 1017,
    gustKmh: 16,
    sunriseTime: "06:40",
    sunsetTime: "17:26",
    blurb: "Farg'ona shahrida yam-yashil xiyobonlar va mayin quyosh nurlari. Harorat +21°C.",
    blurbNight: "Tunda shahar bo'ylab sokin va toza havo, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "margilon",
    city: "Marg'ilon",
    region: "Farg'ona viloyati",
    country: "O'zbekiston",
    lat: 40.4722,
    lng: 71.7222,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 9,
    condition: "Quyoshli va musaffo",
    nightCondition: "Ipak shahri salqin tuni",
    headline: "Atlas va adras vatani\noltin quyoshda",
    headlineNight: "Yulduzli vodiy\nsokin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 10,
    humidityPercent: 44,
    pressureHpa: 1017,
    gustKmh: 15,
    sunriseTime: "06:40",
    sunsetTime: "17:26",
    blurb: "Marg'ilon shahrida yorqin quyosh va ipak to'quvchilar uchun qulay ob-havo.",
    blurbNight: "Tunda musaffo osmon, harorat +9°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Farg'ona viloyati",
    days: []
  },
  {
    id: "qoqon",
    city: "Qo'qon",
    region: "Farg'ona viloyati",
    country: "O'zbekiston",
    lat: 40.5333,
    lng: 70.9333,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 10,
    condition: "Ochiq va iliq shabada",
    nightCondition: "Xudoyorxon o'rdasi uzra tun",
    headline: "Adiblar shahri\niliq quyoshda",
    headlineNight: "Xon saroyi uzra\nmoviy tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 13,
    humidityPercent: 43,
    pressureHpa: 1016,
    gustKmh: 18,
    sunriseTime: "06:43",
    sunsetTime: "17:29",
    blurb: "Qo'qon shahrida ajoyib iliq ob-havo hukmron. Tarixiy O'rda maydonida musaffo osmon.",
    blurbNight: "Tunda havo salqinlashadi, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Farg'ona viloyati",
    days: []
  },
  {
    id: "rishton",
    city: "Rishton",
    region: "Farg'ona viloyati",
    country: "O'zbekiston",
    lat: 40.3567,
    lng: 71.2828,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 9,
    condition: "Quyoshli va musaffo",
    nightCondition: "Sokin salqin tun",
    headline: "Moviy sopol yurti\niliq quyoshda",
    headlineNight: "Kulolchilik shahri\nsokin kecha",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 11,
    humidityPercent: 45,
    pressureHpa: 1017,
    gustKmh: 16,
    sunriseTime: "06:42",
    sunsetTime: "17:28",
    blurb: "Rishtonda musaffo quyoshli kun, kulolchilik sexlari va sayyohlar uchun ideal ob-havo.",
    blurbNight: "Tunda qulay harorat +9°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Farg'ona viloyati",
    days: []
  },

  // --- ANDIJON VILOYATI ---
  {
    id: "andijon",
    city: "Andijon",
    region: "Andijon viloyati",
    country: "O'zbekiston",
    lat: 40.7821,
    lng: 72.3442,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 20,
    nightTempC: 9,
    condition: "Vodiydagi mayin havo",
    nightCondition: "Sokin tumanli kecha",
    headline: "Vodiy uzra\nmayin quyosh",
    headlineNight: "Sokin vodiy\nsalqin tunda",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 10,
    humidityPercent: 48,
    pressureHpa: 1018,
    gustKmh: 14,
    sunriseTime: "06:38",
    sunsetTime: "17:24",
    blurb: "Farg'ona vodiysining sharqiy qismida mo'tadil iliq ob-havo. Tog'lar orasidan mayin shabada esib turibdi.",
    blurbNight: "Kechasi pasttekisliklarda yengil tuman tushishi mumkin, harorat +9°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "asaka",
    city: "Asaka",
    region: "Andijon viloyati",
    country: "O'zbekiston",
    lat: 40.6417,
    lng: 72.2389,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 10,
    condition: "Quyoshli va mo'tadil",
    nightCondition: "Sokin vodiy kechasi",
    headline: "Avtomobilchilar shahri\niliq quyoshda",
    headlineNight: "Sokin Andijon vodiysi\nsalqin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 12,
    humidityPercent: 47,
    pressureHpa: 1017,
    gustKmh: 17,
    sunriseTime: "06:38",
    sunsetTime: "17:24",
    blurb: "Asaka shahrida havo ochiq va iliq, harorat +21°C.",
    blurbNight: "Tunda musaffo osmon, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Andijon viloyati",
    days: []
  },
  {
    id: "shahrixon",
    city: "Shahrixon",
    region: "Andijon viloyati",
    country: "O'zbekiston",
    lat: 40.7111,
    lng: 72.0556,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 9,
    condition: "Quyoshli va musaffo",
    nightCondition: "Yulduzli vodiy kechasi",
    headline: "Hunarmandlar shahri\nmusaffo osmonda",
    headlineNight: "Sokin vodiy\nsalqin kecha",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 10,
    humidityPercent: 46,
    pressureHpa: 1017,
    gustKmh: 15,
    sunriseTime: "06:39",
    sunsetTime: "17:25",
    blurb: "Shahrixonda quyoshli va sokin ob-havo hukmron.",
    blurbNight: "Tunda musaffo havo, harorat +9°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Andijon viloyati",
    days: []
  },
  {
    id: "xonobod",
    city: "Xonobod",
    region: "Andijon viloyati",
    country: "O'zbekiston",
    lat: 40.8039,
    lng: 72.9733,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5 (Tog'li iqlim)",
    tempC: 17,
    nightTempC: 6,
    condition: "Salqin tog' va suv ombori havosi",
    nightCondition: "Muzdek tog' shabadasi",
    headline: "O'zbekiston Shveytsariyasi\ntog' shabadasi",
    headlineNight: "Qoradaryo uzra\nyulduzli tun",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "cloudy",
    windKmh: 16,
    humidityPercent: 58,
    pressureHpa: 996,
    gustKmh: 22,
    sunriseTime: "06:36",
    sunsetTime: "17:22",
    blurb: "Xonobod tog'li iqlimi va suv ombori shabadasi bilan tanilgan, havo juda toza va salqin, harorat +17°C.",
    blurbNight: "Tog'dan kelayotgan salqinlik tunda haroratni +6°C gacha tushiradi.",
    bgImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Andijon viloyati",
    days: []
  },

  // --- NAMANGAN VILOYATI ---
  {
    id: "namangan",
    city: "Namangan",
    region: "Namangan viloyati",
    country: "O'zbekiston",
    lat: 40.9983,
    lng: 71.6726,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 10,
    condition: "Gullar shahri mayin quyoshi",
    nightCondition: "Sokin salqin tun",
    headline: "Gullar shahri uzra\noltin quyosh",
    headlineNight: "Afsonalar vodiysi\nsokin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 12,
    humidityPercent: 44,
    pressureHpa: 1016,
    gustKmh: 17,
    sunriseTime: "06:40",
    sunsetTime: "17:26",
    blurb: "Namanganda toza va musaffo havo, shahar bo'ylab mayin shabada esib turibdi.",
    blurbNight: "Tunda harorat +10°C gacha tushadi, musaffo yulduzli tun.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "chust",
    city: "Chust",
    region: "Namangan viloyati",
    country: "O'zbekiston",
    lat: 41.0089,
    lng: 71.2294,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 20,
    nightTempC: 8,
    condition: "Tog' oldi toza havosi",
    nightCondition: "Salqin tog' kechasi",
    headline: "Do'ppido'zlar shahri\nmusaffo havoda",
    headlineNight: "Chust bog'lari uzra\nsalqin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 14,
    humidityPercent: 46,
    pressureHpa: 1012,
    gustKmh: 19,
    sunriseTime: "06:42",
    sunsetTime: "17:28",
    blurb: "Chustda qulay va toza havo, harorat +20°C.",
    blurbNight: "Tunda tog' shabadasi esadi, harorat +8°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Namangan viloyati",
    days: []
  },
  {
    id: "kosonsoy",
    city: "Kosonsoy",
    region: "Namangan viloyati",
    country: "O'zbekiston",
    lat: 41.2561,
    lng: 71.5508,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 18,
    nightTempC: 7,
    condition: "Salqin tog' darasi shabadasi",
    nightCondition: "Tog' daryosi bo'yida salqin tun",
    headline: "Kosonsoy daryosi\ntog' salqini",
    headlineNight: "Yulduzli qadim qala\nsalqin kecha",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "cloudy",
    windKmh: 15,
    humidityPercent: 52,
    pressureHpa: 1004,
    gustKmh: 20,
    sunriseTime: "06:41",
    sunsetTime: "17:27",
    blurb: "Kosonsoy darasida tog' shabadasi esib, toza va xushhavo ob-havo yaratmoqda.",
    blurbNight: "Kechasi harorat +7°C gacha salqinlashadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Namangan viloyati",
    days: []
  },

  // --- QASHQADARYO VILOYATI ---
  {
    id: "qarshi",
    city: "Qarshi",
    region: "Qashqadaryo viloyati",
    country: "O'zbekiston",
    lat: 38.8606,
    lng: 65.7891,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 24,
    nightTempC: 11,
    condition: "Iliq quyoshli va musaffo",
    nightCondition: "Nasaf osmonida sokin tun",
    headline: "Nasaf dashti\niliq quyoshda",
    headlineNight: "Qashqadaryo ko'prigi uzra\nsokin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 17,
    humidityPercent: 31,
    pressureHpa: 1014,
    gustKmh: 24,
    sunriseTime: "06:54",
    sunsetTime: "17:42",
    blurb: "Qarshida ochiq va iliq havo. Kunduzi harorat +24°C gacha ko'tariladi.",
    blurbNight: "Kechasi cho'l havosi soviydi, harorat +11°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "shahrisabz",
    city: "Shahrisabz",
    region: "Qashqadaryo viloyati",
    country: "O'zbekiston",
    lat: 39.0500,
    lng: 66.8333,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 9,
    condition: "Oqsaroy uzra musaffo havo",
    nightCondition: "Tog' etagida salqin tun",
    headline: "Sohibqiron yurti\nmusaffo quyoshda",
    headlineNight: "Oqsaroy uzra\nyulduzli tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 13,
    humidityPercent: 38,
    pressureHpa: 1012,
    gustKmh: 18,
    sunriseTime: "06:52",
    sunsetTime: "17:39",
    blurb: "Shahrisabzda Sohibqiron bog'lari va Oqsaroy maydonida ajoyib musaffo kuzgi oftob.",
    blurbNight: "Tog'dan kelayotgan mayin shabada tunda haroratni +9°C darajagacha salqinlatadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Qashqadaryo viloyati",
    days: []
  },
  {
    id: "kitob",
    city: "Kitob",
    region: "Qashqadaryo viloyati",
    country: "O'zbekiston",
    lat: 39.1333,
    lng: 66.8833,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5 (Rasadxona hududi)",
    tempC: 20,
    nightTempC: 8,
    condition: "Tiniq astronomik osmon",
    nightCondition: "Kitob kenglik stansiyasi yulduzli tuni",
    headline: "Kitob rasadxonasi\ntiniq osmonda",
    headlineNight: "Yulduzlar ko'zgusi\nmusaffo tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 12,
    humidityPercent: 36,
    pressureHpa: 1009,
    gustKmh: 16,
    sunriseTime: "06:52",
    sunsetTime: "17:39",
    blurb: "Kitob balandlik stansiyasida atmosfera nihoyatda tiniq, yulduzlarni kuzatish uchun ajoyib ob-havo.",
    blurbNight: "Tunda musaffo va toza osmon, harorat +8°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Qashqadaryo viloyati",
    days: []
  },

  // --- SURXONDARYO VILOYATI ---
  {
    id: "termiz",
    city: "Termiz",
    region: "Surxondaryo viloyati",
    country: "O'zbekiston",
    lat: 37.2242,
    lng: 67.2783,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 26,
    nightTempC: 13,
    condition: "Issiq va quyoshli",
    nightCondition: "Iliq janubiy tun",
    headline: "Janubiy quyosh\nva issiq harorat",
    headlineNight: "Amudaryo bo'yida\nsokin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 11,
    humidityPercent: 28,
    pressureHpa: 1012,
    gustKmh: 15,
    sunriseTime: "06:46",
    sunsetTime: "17:36",
    blurb: "O'zbekistonning janubida yozgi iliqlik saqlanmoqda. Harorat +26°C.",
    blurbNight: "Kechasi harorat +13°C, iliq janubiy shabada.",
    bgImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "denov",
    city: "Denov",
    region: "Surxondaryo viloyati",
    country: "O'zbekiston",
    lat: 38.2667,
    lng: 67.9000,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 24,
    nightTempC: 11,
    condition: "Quyoshli va musaffo",
    nightCondition: "Sokin janubiy tun",
    headline: "Hisor etaklarida\niliq quyosh",
    headlineNight: "Yulduzli vodiy\nsalqin kecha",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 12,
    humidityPercent: 32,
    pressureHpa: 1013,
    gustKmh: 17,
    sunriseTime: "06:48",
    sunsetTime: "17:37",
    blurb: "Denov shahrida qulay va iliq ob-havo hukm surmoqda, harorat +24°C.",
    blurbNight: "Tunda musaffo osmon, harorat +11°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Surxondaryo viloyati",
    days: []
  },
  {
    id: "boysun",
    city: "Boysun",
    region: "Surxondaryo viloyati",
    country: "O'zbekiston",
    lat: 38.2000,
    lng: 67.2000,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5 (Tog'li etno-hudud)",
    tempC: 19,
    nightTempC: 7,
    condition: "Tog' daralari salqin havosi",
    nightCondition: "Muzdek tog' shabadasi",
    headline: "Boysuntog' uzra\nmusaffo quyosh",
    headlineNight: "Qadimiy qishloqlar uzra\nyulduzli tun",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "cloudy",
    windKmh: 15,
    humidityPercent: 42,
    pressureHpa: 994,
    gustKmh: 22,
    sunriseTime: "06:49",
    sunsetTime: "17:38",
    blurb: "Boysun qoyalari va daralarida shifobaxsh toza tog' havosi.",
    blurbNight: "Tog' tunda tez soviydi, harorat +7°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Surxondaryo viloyati",
    days: []
  },

  // --- JIZZAX VILOYATI ---
  {
    id: "jizzax",
    city: "Jizzax",
    region: "Jizzax viloyati",
    country: "O'zbekiston",
    lat: 40.1158,
    lng: 67.8422,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 10,
    condition: "Temir darvoza mayin shabadasi",
    nightCondition: "Salqin va sokin tun",
    headline: "Temir darvoza uzra\niliq quyosh",
    headlineNight: "Sokin shahar\nsalqin kecha",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 16,
    humidityPercent: 39,
    pressureHpa: 1015,
    gustKmh: 22,
    sunriseTime: "06:50",
    sunsetTime: "17:36",
    blurb: "Jizzax shahrida Temir darvoza darasidan esayotgan yoqimli shabada havoni tozalab turibdi.",
    blurbNight: "Tunda musaffo osmon, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "zomin",
    city: "Zomin",
    region: "Jizzax viloyati",
    country: "O'zbekiston",
    lat: 39.9606,
    lng: 68.3958,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5 (Milliy bog')",
    tempC: 14,
    nightTempC: 4,
    condition: "Archa o'rmonlari musaffo havosi",
    nightCondition: "Muzdek tog' osmoni",
    headline: "Zomin milliy bog'i\ntog' archazori",
    headlineNight: "Yulduzlar daryosi\nZomin tog'larida",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "cloudy",
    windKmh: 14,
    humidityPercent: 58,
    pressureHpa: 988,
    gustKmh: 20,
    sunriseTime: "06:49",
    sunsetTime: "17:35",
    blurb: "Zomin tog'larida ignabargli archalar nafasi va musaffo tog' havosi. Sanatoriy va dam oluvchilar uchun xushhavo.",
    blurbNight: "Tog'da kechasi sovuq tushadi, harorat +4°C gacha soviydi.",
    bgImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Jizzax viloyati",
    days: []
  },

  // --- SIRDARYO VILOYATI ---
  {
    id: "guliston",
    city: "Guliston",
    region: "Sirdaryo viloyati",
    country: "O'zbekiston",
    lat: 40.4897,
    lng: 68.7842,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 11,
    condition: "Mirzacho'l musaffo quyoshi",
    nightCondition: "Sokin va salqin dasht tuni",
    headline: "Sirdaryo bo'yida\niliq quyosh",
    headlineNight: "Mirzacho'l uzra\nyulduzli tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 15,
    humidityPercent: 42,
    pressureHpa: 1015,
    gustKmh: 21,
    sunriseTime: "06:49",
    sunsetTime: "17:35",
    blurb: "Gulistonda ochiq va iliq havo, mayin shabada esib turibdi. Harorat +22°C.",
    blurbNight: "Tunda musaffo ochiq osmon, harorat +11°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "yangiyer",
    city: "Yangiyer",
    region: "Sirdaryo viloyati",
    country: "O'zbekiston",
    lat: 40.2667,
    lng: 68.8167,
    timezone: "Asia/Tashkent",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 10,
    condition: "Quyoshli va musaffo",
    nightCondition: "Sokin salqin tun",
    headline: "Shirin kanallar bo'yida\niliq quyosh",
    headlineNight: "Sokin dasht shahri\nsalqin kecha",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 14,
    humidityPercent: 40,
    pressureHpa: 1015,
    gustKmh: 19,
    sunriseTime: "06:49",
    sunsetTime: "17:35",
    blurb: "Yangiyerda qulay va iliq kuzgi havo.",
    blurbNight: "Tunda musaffo tun, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Sirdaryo viloyati",
    days: []
  },

  // --- XORAZM VILOYATI ---
  {
    id: "urganch",
    city: "Urganch",
    region: "Xorazm viloyati",
    country: "O'zbekiston",
    lat: 41.5500,
    lng: 60.6333,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 20,
    nightTempC: 8,
    condition: "Amudaryo bo'yida musaffo osmon",
    nightCondition: "Salqin daryo kechasi",
    headline: "Xorazm vohasi\niliq quyoshda",
    headlineNight: "Shovot kanali uzra\nsokin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 18,
    humidityPercent: 38,
    pressureHpa: 1018,
    gustKmh: 25,
    sunriseTime: "07:14",
    sunsetTime: "18:00",
    blurb: "Urganchda havo toza va quyoshli. Amudaryo va Shovot kanali sohillarida mayin shabada esib turibdi.",
    blurbNight: "Kechasi vohada havo soviydi, harorat +8°C gacha tushadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1609873963595-53ebdfaa4631?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "xiva",
    city: "Xiva (Ichan Qal'a)",
    region: "Xorazm viloyati",
    country: "O'zbekiston",
    lat: 41.3783,
    lng: 60.3639,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 21,
    nightTempC: 8,
    condition: "Kalta Minor uzra musaffo quyosh",
    nightCondition: "Ochiq osmonda ertaknamo tun",
    headline: "Ochiq osmon ostidagi muzey\noltin quyoshda",
    headlineNight: "Ichan Qal'a uzra\nsokin moviy tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 15,
    humidityPercent: 36,
    pressureHpa: 1018,
    gustKmh: 21,
    sunriseTime: "07:15",
    sunsetTime: "18:01",
    blurb: "Xivada Ichan Qal'a minorasi va qadimiy loy devorlar uzra mutlaqo bulutsiz quyosh charaqlamoqda.",
    blurbNight: "Tunda qadimiy qal'a chiroqlari ostida sokin va toza havo, harorat +8°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1609873963595-53ebdfaa4631?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Xorazm viloyati",
    days: []
  },

  // --- NAVOIY VILOYATI ---
  {
    id: "navoiy",
    city: "Navoiy",
    region: "Navoiy viloyati",
    country: "O'zbekiston",
    lat: 40.0844,
    lng: 65.3792,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 22,
    nightTempC: 10,
    condition: "Quyoshli va mo'tadil",
    nightCondition: "Zarafshon vodiysi salqin tuni",
    headline: "Zarafshon daryosi bo'yida\niliq quyosh",
    headlineNight: "Sanoat shahri uzra\nsokin tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 16,
    humidityPercent: 34,
    pressureHpa: 1016,
    gustKmh: 22,
    sunriseTime: "06:55",
    sunsetTime: "17:41",
    blurb: "Navoiy shahrida musaffo osmon va iliq havo, harorat +22°C.",
    blurbNight: "Tunda havo salqinlashadi, harorat +10°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "zarafshon",
    city: "Zarafshon",
    region: "Navoiy viloyati",
    country: "O'zbekiston",
    lat: 41.5722,
    lng: 64.1958,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5 (Qizilqum)",
    tempC: 20,
    nightTempC: 7,
    condition: "Qizilqum dasht shabadasi",
    nightCondition: "Cho'l salqin tuni",
    headline: "Qizilqum gavhari\nmusaffo quyoshda",
    headlineNight: "Oltin konlar uzra\nyulduzli tun",
    icon: "i-wind",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "wind",
    windKmh: 28,
    humidityPercent: 29,
    pressureHpa: 1017,
    gustKmh: 38,
    sunriseTime: "07:01",
    sunsetTime: "17:47",
    blurb: "Zarafshon shahrida Qizilqum cho'lidan esayotgan kuchli shabada, havo quruq va toza.",
    blurbNight: "Tunda cho'l havosi tez soviydi, harorat +7°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Navoiy viloyati",
    days: []
  },
  {
    id: "uchquduq",
    city: "Uchquduq",
    region: "Navoiy viloyati",
    country: "O'zbekiston",
    lat: 42.1558,
    lng: 63.5558,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5 (Cho'l iqlimi)",
    tempC: 19,
    nightTempC: 6,
    condition: "Qizilqum kuchli dasht shamoli",
    nightCondition: "Salqin yulduzli cho'l tuni",
    headline: "Uchquduq uch qudug'i\ncho'l shabadasi",
    headlineNight: "Yulduzlar ko'rpasi\nQizilqum tuni",
    icon: "i-wind",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "wind",
    windKmh: 31,
    humidityPercent: 27,
    pressureHpa: 1018,
    gustKmh: 44,
    sunriseTime: "07:04",
    sunsetTime: "17:50",
    blurb: "Uchquduqda esayotgan cho'l shamoli tezligi 31 km/soat, havo musaffo.",
    blurbNight: "Tunda cho'l havosi soviydi, harorat +6°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Navoiy viloyati",
    days: []
  },

  // --- QORAQALPOG'ISTON RESPUBLIKASI ---
  {
    id: "nukus",
    city: "Nukus",
    region: "Qoraqalpog'iston Respublikasi",
    country: "O'zbekiston",
    lat: 42.4602,
    lng: 59.6180,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5 (Orolbo'yi)",
    tempC: 19,
    nightTempC: 6,
    condition: "Kuchli dasht shamoli",
    nightCondition: "Salqin shabada va ochiq osmon",
    headline: "Orolbo'yi dashtida\nkuchli shamol",
    headlineNight: "Yulduzli cho'l\nsalqin shabada",
    icon: "i-wind",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "wind",
    windKmh: 36,
    humidityPercent: 32,
    pressureHpa: 1019,
    gustKmh: 48,
    sunriseTime: "07:18",
    sunsetTime: "18:04",
    blurb: "Nukusda kuchli shimoli-g'arbiy shamol esmoqda (36 km/soat, shiddat 48 km/soat). Havo musaffo va toza.",
    blurbNight: "Tunda cho'l havosi soviydi, harorat +6°C gacha tushadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "moynoq",
    city: "Mo'ynoq",
    region: "Qoraqalpog'iston Respublikasi",
    country: "O'zbekiston",
    lat: 43.7667,
    lng: 59.0333,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5 (Orol bo'yi)",
    tempC: 16,
    nightTempC: 3,
    condition: "Kemalar qabristoni kuchli shamoli",
    nightCondition: "Muzdek yulduzli Orol tuni",
    headline: "Orol fojiasi guvohi\nkuchli shamol",
    headlineNight: "Orol dengizi tubida\nyulduzli tun",
    icon: "i-wind",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "wind",
    windKmh: 38,
    humidityPercent: 35,
    pressureHpa: 1021,
    gustKmh: 52,
    sunriseTime: "07:22",
    sunsetTime: "18:06",
    blurb: "Mo'ynoqda kemalar qabristoni uzra kuchli dasht shamoli esmoqda. Harorat +16°C.",
    blurbNight: "Tunda cho'l havosi soviydi, harorat +3°C gacha tushadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Qoraqalpog'iston Respublikasi",
    days: []
  },
  {
    id: "xojayli",
    city: "Xo'jayli",
    region: "Qoraqalpog'iston Respublikasi",
    country: "O'zbekiston",
    lat: 42.4000,
    lng: 59.4500,
    timezone: "Asia/Samarkand",
    timezoneLabel: "UTC+5",
    tempC: 19,
    nightTempC: 6,
    condition: "Ochiq va dasht shabadasi",
    nightCondition: "Mizdaxqon uzra salqin tun",
    headline: "Mizdaxqon qadimiy qal'asi\nmusaffo havoda",
    headlineNight: "Sokin qadim qal'a\nsalqin kecha",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 22,
    humidityPercent: 33,
    pressureHpa: 1019,
    gustKmh: 30,
    sunriseTime: "07:18",
    sunsetTime: "18:04",
    blurb: "Xo'jaylida havo musaffo va toza, harorat +19°C.",
    blurbNight: "Kechasi cho'l shabadasi esadi, harorat +6°C.",
    bgImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
    isDistrict: true,
    districtOf: "Qoraqalpog'iston Respublikasi",
    days: []
  },

  // --- XALQARO SHAHARLAR ---
  {
    id: "central-jakarta",
    city: "Markaziy Jakarta",
    region: "Jakarta",
    country: "Indoneziya",
    lat: -6.2088,
    lng: 106.8456,
    timezone: "Asia/Jakarta",
    timezoneLabel: "UTC+7",
    tempC: 28,
    nightTempC: 24,
    condition: "Bo'ron va kuchli chaqmoq",
    nightCondition: "Momaqaldiroqli tun",
    headline: "Momaqaldiroq\nkuchli jala yomg'ir",
    headlineNight: "Momaqaldiroqli\ntun",
    icon: "i-hail",
    nightIcon: "i-hail",
    bgType: "storm",
    weatherEffect: "storm",
    windKmh: 32,
    humidityPercent: 88,
    pressureHpa: 1006,
    gustKmh: 46,
    sunriseTime: "05:40",
    sunsetTime: "17:52",
    blurb: "Tropik kuchli momaqaldiroq, qora bulutlar va chaqmoqlar bilan shiddatli yomg'ir yog'moqda.",
    blurbNight: "Tunda ham bo'ronli momaqaldiroq va yomg'ir davom etadi.",
    bgImageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "london",
    city: "London",
    region: "Angliya",
    country: "Buyuk Britaniya",
    lat: 51.5074,
    lng: -0.1278,
    timezone: "Europe/London",
    timezoneLabel: "UTC+0 / GMT",
    tempC: 12,
    nightTempC: 7,
    condition: "Mayin yomg'ir va tuman",
    nightCondition: "Temza uzra tumanli tun",
    headline: "Mayin yomg'ir\nkuzgi tuman",
    headlineNight: "Temza bo'yida\nsokin nam tun",
    icon: "i-hail",
    nightIcon: "i-cloud",
    bgType: "rain",
    weatherEffect: "rain",
    windKmh: 22,
    humidityPercent: 85,
    pressureHpa: 1012,
    gustKmh: 30,
    sunriseTime: "07:44",
    sunsetTime: "17:48",
    blurb: "London ko'chalarida an'anaviy shabnamli kuzgi yomg'ir yog'moqda.",
    blurbNight: "Kechasi nam va salqin ob-havo hukmron.",
    bgImageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "tokio",
    city: "Tokio",
    region: "Kanto",
    country: "Yaponiya",
    lat: 35.6762,
    lng: 139.6503,
    timezone: "Asia/Tokyo",
    timezoneLabel: "UTC+9 (JST)",
    tempC: 18,
    nightTempC: 12,
    condition: "Yengil bulutli, mayin shabada",
    nightCondition: "Tokio uzra tiniq osmon",
    headline: "Yengil bulutlar\nmayin shabada",
    headlineNight: "Tokio chiroqlari\ntiniq osmon",
    icon: "i-cloud2",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "cloudy",
    windKmh: 14,
    humidityPercent: 58,
    pressureHpa: 1017,
    gustKmh: 18,
    sunriseTime: "05:56",
    sunsetTime: "16:54",
    blurb: "Tokioda qulay kuzgi havo, bulutlar oralab quyosh ko'rinadi.",
    blurbNight: "Tunda shahar uzra musaffo havo.",
    bgImageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "dubay",
    city: "Dubay",
    region: "BAA",
    country: "Birlashgan Arab Amirliklari",
    lat: 25.2048,
    lng: 55.2708,
    timezone: "Asia/Dubai",
    timezoneLabel: "UTC+4 (GST)",
    tempC: 32,
    nightTempC: 24,
    condition: "Qaynoq quyoshli",
    nightCondition: "Iliq Fors ko'rfazi kechasi",
    headline: "Oltin osmono'parlar\nissiq quyoshda",
    headlineNight: "Fors ko'rfazi uzra\niliq tun",
    icon: "i-sun",
    nightIcon: "i-moon",
    bgType: "sunny",
    weatherEffect: "sunny",
    windKmh: 18,
    humidityPercent: 55,
    pressureHpa: 1010,
    gustKmh: 24,
    sunriseTime: "06:24",
    sunsetTime: "17:42",
    blurb: "Dubayda yorqin va issiq quyosh. Harorat +32°C.",
    blurbNight: "Tunda harorat +24°C, iliq shahar havosi.",
    bgImageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80",
    days: []
  },
  {
    id: "nyu-york",
    city: "Nyu-York",
    region: "AQSh",
    country: "Amerika Qo'shma Shtatlari",
    lat: 40.7128,
    lng: -74.0060,
    timezone: "America/New_York",
    timezoneLabel: "UTC-4 (EDT)",
    tempC: 17,
    nightTempC: 10,
    condition: "Atlantika shabadasi va bulutlar",
    nightCondition: "Manxetten uzra oydin tun",
    headline: "Okean shabadasi\nva ko'k osmon",
    headlineNight: "Yulduzli Manxetten\nsalqin tun",
    icon: "i-cloud",
    nightIcon: "i-moon",
    bgType: "cloudy",
    weatherEffect: "wind",
    windKmh: 26,
    humidityPercent: 50,
    pressureHpa: 1016,
    gustKmh: 34,
    sunriseTime: "07:16",
    sunsetTime: "18:02",
    blurb: "Manxettenda Atlantika okeanidan esayotgan sezilarli shabada.",
    blurbNight: "Tunda salqin va ochiq osmon.",
    bgImageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=80",
    days: []
  }
];

export const CITIES_DATA = CITIES_DATABASE;

/**
 * Vaqt mintaqasi bo'yicha mahalliy vaqt va bosqichni hisoblash
 */
export interface LocalTimeInfo {
  hours: number;
  minutes: number;
  seconds: number;
  decimalHour: number;
  timeString: string;
  dateString: string;
  isNight: boolean;
  phase: 'dawn' | 'day' | 'sunset' | 'dusk' | 'night';
  phaseName: string;
}

export function parseTimeToDecimal(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  return (parts[0] || 0) + (parts[1] || 0) / 60;
}

export function getLocalTimeForTimezone(
  timezone: string,
  baseDate: Date = new Date(),
  sunriseStr = "06:48",
  sunsetStr = "17:34"
): LocalTimeInfo {
  let hours = baseDate.getUTCHours();
  let minutes = baseDate.getUTCMinutes();
  let seconds = baseDate.getUTCSeconds();
  const padMonth = UZ_MONTH_NAMES[baseDate.getMonth()] || 'okt';
  let dateString = `${baseDate.getDate()}-${padMonth}`;

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    const parts = formatter.formatToParts(baseDate);
    for (const p of parts) {
      if (p.type === 'hour') hours = parseInt(p.value, 10);
      if (p.type === 'minute') minutes = parseInt(p.value, 10);
      if (p.type === 'second') seconds = parseInt(p.value, 10);
    }

    const dateFormatter = new Intl.DateTimeFormat('uz-UZ', {
      timeZone: timezone,
      day: 'numeric',
      month: 'short'
    });
    dateString = dateFormatter.format(baseDate);
  } catch {
    // Fallback if timezone not supported in test env
  }

  // Handle 24-hour wrap
  if (hours >= 24) hours = 0;

  const decimalHour = hours + minutes / 60 + seconds / 3600;
  const sunriseDecimal = parseTimeToDecimal(sunriseStr);
  const sunsetDecimal = parseTimeToDecimal(sunsetStr);

  let phase: 'dawn' | 'day' | 'sunset' | 'dusk' | 'night' = 'day';
  let phaseName = 'Kunduz';
  let isNight = false;

  // Dawn: 45 min before sunrise to 45 min after sunrise
  if (decimalHour >= sunriseDecimal - 0.75 && decimalHour < sunriseDecimal + 0.75) {
    phase = 'dawn';
    phaseName = 'Quyosh chiqishi';
    isNight = false;
  } else if (decimalHour >= sunriseDecimal + 0.75 && decimalHour < sunsetDecimal - 0.75) {
    phase = 'day';
    phaseName = 'Kunduz';
    isNight = false;
  } else if (decimalHour >= sunsetDecimal - 0.75 && decimalHour < sunsetDecimal + 0.5) {
    phase = 'sunset';
    phaseName = 'Quyosh botishi';
    isNight = false;
  } else if (decimalHour >= sunsetDecimal + 0.5 && decimalHour < sunsetDecimal + 1.5) {
    phase = 'dusk';
    phaseName = "G'ira-shira oqshom";
    isNight = false;
  } else {
    phase = 'night';
    phaseName = 'Tun';
    isNight = true;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return {
    hours,
    minutes,
    seconds,
    decimalHour,
    timeString,
    dateString,
    isNight,
    phase,
    phaseName
  };
}

/**
 * Osmon gumbazida quyosh yoki oy koordinatasini hisoblash
 */
export function getCelestialCoordinates(
  decimalHour: number,
  sunriseStr = "06:48",
  sunsetStr = "17:34"
): { xRatio: number; yRatio: number; isSun: boolean; altitude: number; phaseProgress: number } {
  const sunrise = parseTimeToDecimal(sunriseStr);
  const sunset = parseTimeToDecimal(sunsetStr);

  const isDay = decimalHour >= sunrise && decimalHour <= sunset;

  if (isDay) {
    // Sun trajectory across the sky from left (0.14) to right (0.86)
    const progress = Math.max(0, Math.min(1, (decimalHour - sunrise) / Math.max(0.1, sunset - sunrise)));
    const xRatio = 0.14 + progress * 0.72;
    // Arch: highest at progress 0.5 (y ~ 0.18), lowest near sunrise/sunset (y ~ 0.44)
    // ALWAYS in visible sky (0.18 to 0.44), never hidden behind cards or horizon
    const yRatio = 0.44 - Math.sin(progress * Math.PI) * 0.26;
    const altitude = Math.round(Math.sin(progress * Math.PI) * 65);

    return { xRatio, yRatio, isSun: true, altitude, phaseProgress: progress };
  } else {
    // Moon trajectory during night
    let nightProgress = 0;
    const nightDuration = Math.max(1, 24 - (sunset - sunrise));
    if (decimalHour > sunset) {
      nightProgress = (decimalHour - sunset) / nightDuration;
    } else {
      nightProgress = (24 - sunset + decimalHour) / nightDuration;
    }
    const clampedProgress = Math.max(0, Math.min(1, nightProgress));
    // Moon arc: starts left (0.16) at sunset, peaks high (0.20) at midnight, sets right (0.84) at dawn
    const xRatio = 0.16 + clampedProgress * 0.68;
    const yRatio = 0.42 - Math.sin(clampedProgress * Math.PI) * 0.22;
    const altitude = Math.round(Math.sin(clampedProgress * Math.PI) * 55);

    return { xRatio, yRatio, isSun: false, altitude, phaseProgress: clampedProgress };
  }
}

/**
 * 1:1 Haqiqiy Astronomik hisob-kitoblar (SunCalc kutubxonasi orqali)
 */
export interface AstronomicalData {
  lat: number;
  lng: number;
  date: Date;
  solarAltitude: number; // degrees strictly clamped (-90 to +90)
  solarAzimuth: number; // degrees (0 to 360)
  solarAltitudeRad: number; // raw radians (-PI/2 to +PI/2)
  isDay: boolean; // solarAltitude > 0
  moonAltitude: number; // degrees strictly clamped (-90 to +90)
  moonAzimuth: number; // degrees (0 to 360)
  moonAltitudeRad: number; // raw radians (-PI/2 to +PI/2)
  moonFraction: number; // 0.0 to 1.0 (illumination fraction)
  moonPhase: number; // 0.0 to 1.0 (phase cycle)
  moonPhaseName: string; // O'zbekcha fazalar
  moonIlluminationPercent: number; // 0 to 100%
  sunriseTimeStr: string; // HH:mm
  sunsetTimeStr: string; // HH:mm
  solarNoonTimeStr: string; // HH:mm
  dawnTimeStr: string; // HH:mm
  duskTimeStr: string; // HH:mm
  activeBody: 'sun' | 'moon';
  activeAltitude: number;
  activeAzimuth: number;
  arcProgress: number; // 0.0 (180° East) to 1.0 (0° West)
  arcXRatio: number; // 0.0 to 1.0
  arcYRatio: number; // 0.0 to 1.0
  statusText: string;
}

export function formatTimeInTimezone(d: Date | null | undefined, timezone: string): string {
  if (!d || isNaN(d.getTime())) return "--:--";
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return formatter.format(d);
  } catch {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}

export function getMoonPhaseName(phaseVal: number): string {
  const p = ((phaseVal % 1) + 1) % 1;
  if (p < 0.03 || p >= 0.97) return "Yangi oy (Tug'ilish)";
  if (p < 0.22) return "O'suvchi hilol (Yosh oy)";
  if (p < 0.28) return "Birinchi chorak (Yarim oy)";
  if (p < 0.47) return "O'suvchi qavariq oy";
  if (p < 0.53) return "To'lin oy (Badr)";
  if (p < 0.72) return "Kamayuvchi qavariq oy";
  if (p < 0.78) return "Oxirgi chorak (Yarim oy)";
  return "Kamayuvchi hilol (Eski oy)";
}

export function calculateAstronomicalOrbit(
  date: Date,
  lat: number,
  lng: number,
  timezone: string
): AstronomicalData {
  const sunPos = SunCalc.getPosition(date, lat, lng);
  const sunTimes = SunCalc.getTimes(date, lat, lng);
  const moonPos = SunCalc.getMoonPosition(date, lat, lng);
  const moonIllum = SunCalc.getMoonIllumination(date);

  const radToDeg = 180 / Math.PI;
  const clampDeg = (deg: number) => {
    const clamped = Math.max(-90, Math.min(90, deg));
    return Math.round(clamped * 10) / 10;
  };

  const rawSunAlt = typeof sunPos.altitude === 'number' && !isNaN(sunPos.altitude) ? sunPos.altitude : 0;
  // Standard SunCalc returns radians in [-PI/2, +PI/2]. If somehow already degrees (|alt| > PI), keep as is.
  const sunDeg = Math.abs(rawSunAlt) <= Math.PI ? rawSunAlt * radToDeg : rawSunAlt;
  const solarAltitude = clampDeg(sunDeg);

  const rawSunAz = typeof sunPos.azimuth === 'number' && !isNaN(sunPos.azimuth) ? sunPos.azimuth : 0;
  let sunAzDeg = Math.abs(rawSunAz) <= Math.PI * 2 ? ((rawSunAz * radToDeg) + 180) % 360 : rawSunAz % 360;
  if (sunAzDeg < 0) sunAzDeg += 360;
  const solarAzimuth = Math.round(sunAzDeg * 10) / 10;

  const rawMoonAlt = typeof moonPos.altitude === 'number' && !isNaN(moonPos.altitude) ? moonPos.altitude : 0;
  const moonDeg = Math.abs(rawMoonAlt) <= Math.PI ? rawMoonAlt * radToDeg : rawMoonAlt;
  const moonAltitude = clampDeg(moonDeg);

  const rawMoonAz = typeof moonPos.azimuth === 'number' && !isNaN(moonPos.azimuth) ? moonPos.azimuth : 0;
  let moonAzDeg = Math.abs(rawMoonAz) <= Math.PI * 2 ? ((rawMoonAz * radToDeg) + 180) % 360 : rawMoonAz % 360;
  if (moonAzDeg < 0) moonAzDeg += 360;
  const moonAzimuth = Math.round(moonAzDeg * 10) / 10;

  let isDay = false;
  if (sunTimes.dawn && sunTimes.dusk && !isNaN(sunTimes.dawn.getTime()) && !isNaN(sunTimes.dusk.getTime())) {
    const dawnMs = sunTimes.dawn.getTime();
    const duskMs = sunTimes.dusk.getTime();
    const curMs = date.getTime();
    isDay = curMs >= dawnMs && curMs <= duskMs;
  } else {
    isDay = solarAltitude >= -6.0;
  }

  const activeBody: 'sun' | 'moon' = isDay ? 'sun' : 'moon';
  const activeAltitude = isDay ? solarAltitude : moonAltitude;
  const activeAzimuth = isDay ? solarAzimuth : moonAzimuth;

  const sunriseTimeStr = formatTimeInTimezone(sunTimes.sunrise, timezone);
  const sunsetTimeStr = formatTimeInTimezone(sunTimes.sunset, timezone);
  const solarNoonTimeStr = formatTimeInTimezone(sunTimes.solarNoon, timezone);
  const dawnTimeStr = formatTimeInTimezone(sunTimes.dawn, timezone);
  const duskTimeStr = formatTimeInTimezone(sunTimes.dusk, timezone);

  let arcProgress = 0.5;
  if (sunTimes.dawn && sunTimes.dusk && !isNaN(sunTimes.dawn.getTime()) && !isNaN(sunTimes.dusk.getTime())) {
    const dawnMs = sunTimes.dawn.getTime();
    const duskMs = sunTimes.dusk.getTime();
    const curMs = date.getTime();

    if (isDay) {
      const dayDuration = Math.max(1, duskMs - dawnMs);
      arcProgress = Math.max(0, Math.min(1, (curMs - dawnMs) / dayDuration));
    } else {
      const nightDuration = 24 * 3600 * 1000 - Math.max(1, duskMs - dawnMs);
      let nightElapsed = 0;
      if (curMs >= duskMs) {
        nightElapsed = curMs - duskMs;
      } else {
        nightElapsed = curMs + (24 * 3600 * 1000 - duskMs);
      }
      arcProgress = Math.max(0, Math.min(1, nightElapsed / Math.max(1, nightDuration)));
    }
  } else {
    const rawProgress = (180 - (activeAzimuth % 180)) / 180;
    arcProgress = Math.max(0, Math.min(1, rawProgress));
  }

  const angle = Math.PI * (1 - arcProgress);
  const arcXRatio = (140 - 120 * Math.cos(angle)) / 280;
  const arcYRatio = (98 - 72 * Math.sin(angle)) / 120;

  const moonPhaseName = getMoonPhaseName(moonIllum.phase);
  const moonIlluminationPercent = Math.round(moonIllum.fraction * 100);

  let statusText = "";
  if (isDay) {
    statusText = `Quyosh ufqdan ${solarAltitude > 0 ? '+' : ''}${solarAltitude}° balandlikda (Azimut: ${solarAzimuth}°)`;
  } else {
    statusText = `Oy yoritilishi ${moonIlluminationPercent}% • ${moonPhaseName} (Balandlik: ${moonAltitude > 0 ? '+' : ''}${moonAltitude}°)`;
  }

  return {
    lat,
    lng,
    date,
    solarAltitude,
    solarAzimuth,
    solarAltitudeRad: rawSunAlt,
    isDay,
    moonAltitude,
    moonAzimuth,
    moonAltitudeRad: rawMoonAlt,
    moonFraction: moonIllum.fraction,
    moonPhase: moonIllum.phase,
    moonPhaseName,
    moonIlluminationPercent,
    sunriseTimeStr,
    sunsetTimeStr,
    solarNoonTimeStr,
    dawnTimeStr,
    duskTimeStr,
    activeBody,
    activeAltitude,
    activeAzimuth,
    arcProgress,
    arcXRatio,
    arcYRatio,
    statusText
  };
}

export function computeMoonSvgPaths(phaseVal: number, radius = 16): {
  litPath: string;
  shadowPath: string;
  isWaxing: boolean;
  phaseName: string;
} {
  const p = ((phaseVal % 1) + 1) % 1;
  const r = radius;
  const phaseName = getMoonPhaseName(p);
  const isWaxing = p < 0.5;

  if (p < 0.02 || p > 0.98) {
    return {
      litPath: "",
      shadowPath: `M 0,-${r} A ${r} ${r} 0 1 0 0,${r} A ${r} ${r} 0 1 0 0,-${r} Z`,
      isWaxing,
      phaseName
    };
  }

  if (Math.abs(p - 0.5) < 0.02) {
    return {
      litPath: `M 0,-${r} A ${r} ${r} 0 1 0 0,${r} A ${r} ${r} 0 1 0 0,-${r} Z`,
      shadowPath: "",
      isWaxing: false,
      phaseName
    };
  }

  const k = -Math.cos(2 * Math.PI * p);
  const terminatorRx = Math.max(0.1, Math.abs(k) * r);
  const sweepTerminator = (p < 0.25 || (p >= 0.5 && p < 0.75)) ? 0 : 1;

  if (isWaxing) {
    const litPath = `M 0,-${r} A ${r} ${r} 0 0 1 0,${r} A ${terminatorRx} ${r} 0 0 ${sweepTerminator} 0,-${r} Z`;
    const shadowPath = `M 0,-${r} A ${r} ${r} 0 0 0 0,${r} A ${terminatorRx} ${r} 0 0 ${sweepTerminator === 1 ? 0 : 1} 0,-${r} Z`;
    return { litPath, shadowPath, isWaxing, phaseName };
  } else {
    const litPath = `M 0,-${r} A ${r} ${r} 0 0 0 0,${r} A ${terminatorRx} ${r} 0 0 ${sweepTerminator} 0,-${r} Z`;
    const shadowPath = `M 0,-${r} A ${r} ${r} 0 0 1 0,${r} A ${terminatorRx} ${r} 0 0 ${sweepTerminator === 1 ? 0 : 1} 0,-${r} Z`;
    return { litPath, shadowPath, isWaxing, phaseName };
  }
}

/**
 * Open-Meteo Haqiqiy Jonli Ob-havo API integratsiyasi
 */
export interface LiveApiWeatherResponse {
  currentTemp: number;
  apparentTemp: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  weatherCode: number;
  weatherEffect: 'sunny' | 'rain' | 'storm' | 'snow' | 'wind' | 'cloudy';
  conditionName: string;
  dailyMax: number[];
  dailyMin: number[];
  dailyCodes: number[];
  dailyTimes?: string[];
  dailySunrise?: string[];
  dailySunset?: string[];
  dailyHumidity?: number[];
  dailyWindSpeed?: number[];
  isOnline: boolean;
  lastUpdated: string;
}

export function parseWmoWeatherCode(code: number): {
  dayCond: string;
  nightCond: string;
  dayIcon: string;
  nightIcon: string;
  bgType: 'storm' | 'sunny' | 'cloudy' | 'rain' | 'night';
  effect: 'sunny' | 'rain' | 'storm' | 'snow' | 'wind' | 'cloudy';
} {
  if (code >= 95) {
    return {
      dayCond: "Momaqaldiroqli bo'ron va jala",
      nightCond: "Momaqaldiroqli tun",
      dayIcon: "i-hail",
      nightIcon: "i-hail",
      bgType: "storm",
      effect: "storm"
    };
  } else if (code >= 71 && code <= 86) {
    return {
      dayCond: "Mayin qor yog'ishi",
      nightCond: "Qorli sovuq tun",
      dayIcon: "i-cloud",
      nightIcon: "i-moon",
      bgType: "cloudy",
      effect: "snow"
    };
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      dayCond: "Yomg'irli ob-havo",
      nightCond: "Kuzgi mayin yomg'ir",
      dayIcon: "i-hail",
      nightIcon: "i-cloud",
      bgType: "rain",
      effect: "rain"
    };
  } else if (code === 1 || code === 2 || code === 3 || code === 45 || code === 48) {
    return {
      dayCond: "Bulutli va mayin shabada",
      nightCond: "Parda bulutli tun",
      dayIcon: "i-cloud2",
      nightIcon: "i-cloud",
      bgType: "cloudy",
      effect: "cloudy"
    };
  } else {
    return {
      dayCond: "Quyoshli va musaffo",
      nightCond: "Oydin va musaffo tun",
      dayIcon: "i-sun",
      nightIcon: "i-moon",
      bgType: "sunny",
      effect: "sunny"
    };
  }
}

export const UZ_DAY_NAMES = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
export const UZ_MONTH_NAMES = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];

export async function fetchLiveMeteoWeather(lat: number, lng: number): Promise<LiveApiWeatherResponse | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,relative_humidity_2m_mean,wind_speed_10m_max&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const current = data.current;
    const daily = data.daily;
    if (!current) return null;

    const code = current.weather_code ?? 0;
    const parsed = parseWmoWeatherCode(code);
    let effect = parsed.effect;
    let conditionName = parsed.dayCond;

    if (current.wind_speed_10m > 28 && effect !== 'storm') {
      effect = 'wind';
      conditionName = "Kuchli shamol esishi";
    }

    const dailyMax = (daily?.temperature_2m_max || []).map((t: number) => Math.round(t));
    const dailyMin = (daily?.temperature_2m_min || []).map((t: number) => Math.round(t));
    const dailyCodes = daily?.weather_code || [];
    const dailyHumidity = (daily?.relative_humidity_2m_mean || []).map((h: number) => Math.round(h));
    const dailyWindSpeed = (daily?.wind_speed_10m_max || []).map((w: number) => Math.round(w));
    const dailyTimes = daily?.time || [];
    const dailySunrise = daily?.sunrise || [];
    const dailySunset = daily?.sunset || [];

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const lastUpdated = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    return {
      currentTemp: Math.round(current.temperature_2m),
      apparentTemp: Math.round(current.apparent_temperature ?? current.temperature_2m),
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      pressure: Math.round(current.surface_pressure ?? 1013),
      weatherCode: code,
      weatherEffect: effect,
      conditionName,
      dailyMax,
      dailyMin,
      dailyCodes,
      dailyTimes,
      dailySunrise,
      dailySunset,
      dailyHumidity,
      dailyWindSpeed,
      isOnline: true,
      lastUpdated
    };
  } catch {
    return null;
  }
}

/**
 * 7 kunlik dinamik prognoz ma'lumotlarini hisoblash (Bugundan boshlab)
 */
export function generateDynamicForecastDays(rawCity: CityWeather, refDate = new Date()): ForecastDay[] {
  const conditionPresets = [
    { dayIcon: 'i-sun', nightIcon: 'i-moon', dayCond: "Quyoshli va musaffo", nightCond: "Ochiq tun", bgType: 'sunny' as const, effect: 'sunny' as const, bgImg: rawCity.bgImageUrl || BACKGROUND_IMAGES.sunny },
    { dayIcon: 'i-sun', nightIcon: 'i-moon', dayCond: "Ochiq havo", nightCond: "Salqin tun", bgType: 'sunny' as const, effect: 'sunny' as const, bgImg: BACKGROUND_IMAGES.sunny },
    { dayIcon: 'i-cloud2', nightIcon: 'i-cloud', dayCond: "Yengil bulutli", nightCond: "Bulutli tun", bgType: 'cloudy' as const, effect: 'cloudy' as const, bgImg: BACKGROUND_IMAGES.cloudy },
    { dayIcon: 'i-hail', nightIcon: 'i-hail', dayCond: "Bo'ron va jala", nightCond: "Momaqaldiroq", bgType: 'storm' as const, effect: 'storm' as const, bgImg: BACKGROUND_IMAGES.storm },
    { dayIcon: 'i-hail', nightIcon: 'i-cloud', dayCond: "Yomg'irli", nightCond: "Nam tuman", bgType: 'rain' as const, effect: 'rain' as const, bgImg: BACKGROUND_IMAGES.rain },
    { dayIcon: 'i-cloud2', nightIcon: 'i-moon', dayCond: "O'zgaruvchan bulutli", nightCond: "Salqin tun", bgType: 'cloudy' as const, effect: 'cloudy' as const, bgImg: BACKGROUND_IMAGES.cloudy },
    { dayIcon: 'i-sun', nightIcon: 'i-moon', dayCond: "Quyoshli va iliq", nightCond: "Yulduzli tun", bgType: 'sunny' as const, effect: 'sunny' as const, bgImg: rawCity.bgImageUrl || BACKGROUND_IMAGES.sunny },
  ];

  const days: ForecastDay[] = [];
  for (let i = 0; i < 7; i++) {
    const curDate = new Date(refDate);
    curDate.setDate(refDate.getDate() + i);
    const dayOfWeek = curDate.getDay();
    const dayName = i === 0 ? "Bugun" : UZ_DAY_NAMES[dayOfWeek];
    const shortDate = `${curDate.getDate()}-${UZ_MONTH_NAMES[curDate.getMonth()]}`;

    const offset = i === 0 ? 0 : i === 3 ? -5 : i === 4 ? -3 : (i % 2 === 0 ? 1 : -1);
    const dayTemp = rawCity.tempC + offset;
    const nightTemp = rawCity.nightTempC + Math.round(offset / 2);
    const preset = conditionPresets[i % conditionPresets.length];

    days.push({
      dayName,
      shortDate,
      dayTempC: dayTemp,
      nightTempC: nightTemp,
      dayCondition: preset.dayCond,
      nightCondition: preset.nightCond,
      dayIcon: preset.dayIcon,
      nightIcon: preset.nightIcon,
      bgType: preset.bgType,
      weatherEffect: preset.effect,
      bgImageUrl: preset.bgImg,
      headlineDay: `${preset.dayCond}\n${rawCity.city}`,
      headlineNight: `Sokin tun\n${rawCity.city}`,
      blurbDay: `${rawCity.city} shahrida ${UZ_DAY_NAMES[dayOfWeek]} kuni kunduzgi harorat ${dayTemp > 0 ? '+' : ''}${dayTemp}°C, ${preset.dayCond.toLowerCase()}.`,
      blurbNight: `Tungi harorat ${nightTemp > 0 ? '+' : ''}${nightTemp}°C, ${preset.nightCond.toLowerCase()}.`,
      humidity: Math.max(20, Math.min(95, (rawCity.humidityPercent || 45) + (i % 2 === 0 ? 4 : -3) + (preset.effect === 'rain' ? 32 : preset.effect === 'storm' ? 38 : 0))),
      windSpeed: Math.max(5, Math.min(50, (rawCity.windKmh || 14) + (i % 3 === 0 ? 3 : -2) + (preset.effect === 'storm' ? 18 : 0)))
    });
  }
  return days;
}

/**
 * 7 kunlik to'liq prognoz ma'lumotlarini to'ldirish
 */
export function getFullCityData(rawCity: CityWeather): CityWeather {
  if (rawCity.days && rawCity.days.length === 7) {
    const enrichedDays = rawCity.days.map((day, i) => ({
      ...day,
      humidity: typeof day.humidity === 'number' ? day.humidity : Math.max(20, Math.min(95, (rawCity.humidityPercent || 45) + (i % 2 === 0 ? 4 : -3))),
      windSpeed: typeof day.windSpeed === 'number' ? day.windSpeed : Math.max(5, Math.min(50, (rawCity.windKmh || 14) + (i % 3 === 0 ? 3 : -2)))
    }));
    return { ...rawCity, days: enrichedDays };
  }

  const days = generateDynamicForecastDays(rawCity);
  return { ...rawCity, days };
}

/**
 * Autocomplete va qidiruv: Faqat mavjud shahar va tumanlarni qidiradi
 */
export function searchLocations(query: string, limit = 8): CityWeather[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const prefixMatches: CityWeather[] = [];
  const containMatches: CityWeather[] = [];

  for (const c of CITIES_DATABASE) {
    const cityName = c.city.toLowerCase();
    const regionName = c.region.toLowerCase();
    const countryName = c.country.toLowerCase();
    const districtName = (c.districtOf || '').toLowerCase();

    if (cityName.startsWith(clean)) {
      prefixMatches.push(c);
    } else if (
      cityName.includes(clean) ||
      regionName.includes(clean) ||
      districtName.includes(clean) ||
      countryName.includes(clean)
    ) {
      containMatches.push(c);
    }
  }

  return [...prefixMatches, ...containMatches].slice(0, limit);
}

/**
 * Qidiruv tarixi
 */
const HISTORY_KEY = 'aurora_weather_search_history_v2';

export function getSearchHistory(): string[] {
  try {
    if (typeof localStorage === 'undefined') return ["Samarqand", "Buxoro", "Chimyon", "Qo'qon", "Marg'ilon"];
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return ["Samarqand", "Buxoro", "Chimyon", "Qo'qon", "Marg'ilon"];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ["Samarqand", "Buxoro", "Chimyon", "Qo'qon", "Marg'ilon"];
  } catch {
    return ["Samarqand", "Buxoro", "Chimyon", "Qo'qon", "Marg'ilon"];
  }
}

export function saveSearchHistory(cityName: string): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const current = getSearchHistory().filter(c => c.toLowerCase() !== cityName.toLowerCase());
    current.unshift(cityName);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(current.slice(0, 10)));
  } catch {
    // ignore
  }
}

/**
 * Haroratni C / F ga aylantirish
 */
export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

export function formatTemp(celsius: number, isFahrenheit: boolean): string {
  if (isFahrenheit) {
    const f = celsiusToFahrenheit(celsius);
    return `${f > 0 ? '+' : ''}${f}°`;
  }
  return `${celsius > 0 ? '+' : ''}${celsius}°`;
}

export function computeUnitScale(viewportWidth: number, viewportHeight: number): number {
  return Math.min(viewportWidth / 1357, viewportHeight / 871);
}

export function tempToChartY(tempC: number): number {
  return Math.round(150 - (tempC / 30) * 105);
}

/**
 * SVG Wave chart generator
 */
export function buildWavePathForTemps(temps: number[], width = 835, height = 230): { strokePath: string; fillPath: string } {
  if (!temps || temps.length < 2) {
    const strokePath = `M0,115 L${width},115`;
    return { strokePath, fillPath: `${strokePath} L${width},${height} L0,${height} Z` };
  }

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const span = Math.max(6, maxTemp - minTemp);

  const getY = (t: number) => {
    const ratio = (t - minTemp) / span;
    return Math.round(150 - ratio * 105);
  };

  const points = temps.map((t, i) => {
    const x = Math.round((i / (temps.length - 1)) * width);
    const y = getY(t);
    return { x, y };
  });

  let strokePath = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const dx = p1.x - p0.x;
    const cpX1 = Math.round(p0.x + dx * 0.45);
    const cpY1 = p0.y;
    const cpX2 = Math.round(p1.x - dx * 0.45);
    const cpY2 = p1.y;
    strokePath += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p1.x},${p1.y}`;
  }

  const fillPath = `${strokePath} L${width},${height} L0,${height} Z`;
  return { strokePath, fillPath };
}
