// detect whether we’re on localhost (development) or published (production)
const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const CONFIG = {
  // toggle between dev and prod keys (for now both are the same)
  API_KEY: isDev
    ? "79554b545ec7afaa7fb38f12744cb15b"
    : "79554b545ec7afaa7fb38f12744cb15b",

  API_BASE_URL: "https://api.openweathermap.org/data/2.5",
  DEFAULT_UNITS: "metric",
  DEFAULT_LANG: "en",

  // How many recent searches we keep
  MAX_HISTORY_ITEMS: 10,

  // All of our localStorage-related keys, centralized
  STORAGE_KEYS: {
    SEARCH_HISTORY: "weather_search_history",
    USER_PREFERENCES: "weather_user_prefs",
  },

  // Logging configuration
  LOGGING: {
    // only enabled while developing locally
    ENABLED: isDev,
    LEVEL: "info", // Minimum level to actually record
    MAX_LOGS: 100, // How many entries we’ll keep in memory
  },
};

export const API_ENDPOINTS = {
  CURRENT_WEATHER: "/weather",
};

// // English
// export const ERROR_MESSAGES = {
//   CITY_NOT_FOUND: "City not found",
//   NETWORK_ERROR: "Network error. Check your connection.",
//   UNKNOWN_ERROR: "An error occurred fetching weather.",
// };

// Romanian
export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: "Orașul nu a fost găsit.",
  NETWORK_ERROR:
    "Nu s-a putut realiza conexiunea. Verifică-ți internetul și încearcă din nou.",
  UNKNOWN_ERROR:
    "A apărut o problemă la preluarea datelor meteo. Te rugăm să încerci din nou mai târziu.",
};

// Mock data (used only as fallback):
export const MOCK_DATA = {
  coord: { lon: 7.367, lat: 45.133 },
  weather: [
    { id: 501, main: "Rain", description: "moderate rain", icon: "10d" },
  ],
  base: "stations",
  main: {
    temp: 11.0, // in Celsius
    feels_like: 9.8,
    temp_min: 10.0,
    temp_max: 12.0,
    pressure: 1021,
    humidity: 60,
    sea_level: 1021,
    grnd_level: 910,
  },
  visibility: 10000,
  wind: { speed: 4.09, deg: 121, gust: 3.47 },
  rain: { "1h": 2.73 },
  clouds: { all: 83 },
  dt: 1726660758,
  sys: {
    type: 1,
    id: 6736,
    country: "IT",
    sunrise: 1726636384,
    sunset: 1726680975,
  },
  timezone: 7200,
  id: 3165523,
  name: "Province of Turin",
  cod: 200,
};
