import { CONFIG, API_ENDPOINTS, MOCK_DATA } from "./config.js";

/**
 * Performs a fetch and throws friendly errors on 404/401/network issues.
 */
async function makeRequest(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error("City not found");
      if (res.status === 401) throw new Error("Invalid API key");
      throw new Error("Weather service error");
    }
    return await res.json();
  } catch (err) {
    // A TypeError usually means network failure
    if (err instanceof TypeError) {
      throw new Error("Network error. Check your connection.");
    }
    throw err;
  }
}

/**
 * Builds the full URL with API key, units, lang, plus any params.
 */
function buildApiUrl(endpoint, params = {}) {
  const url = new URL(CONFIG.API_BASE_URL + endpoint);
  url.searchParams.set("appid", CONFIG.API_KEY);
  url.searchParams.set("units", CONFIG.DEFAULT_UNITS);
  url.searchParams.set("lang", CONFIG.DEFAULT_LANG);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

/**
 * Fetches current weather by city name.
 */
export async function getCurrentWeather(city) {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
  return await makeRequest(url);
}

/**
 * Fetches current weather by geographic coords.
 */
export async function getWeatherByCoord(lat, lon) {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
  return await makeRequest(url);
}

<<<<<<< Updated upstream
// ==============================================================
// import { CONFIG, API_ENDPOINTS } from "./config.js";
=======
/**
 * Tries the real API first; on any error, falls back to mock data.
 */
export async function getCurrentWeatherWithFallback(city) {
  try {
    return await getCurrentWeather(city);
  } catch (err) {
    console.warn("Falling back to mock data:", err.message);
    // Preserve the city name in the mock response
    return { ...MOCK_DATA, name: city, isFallback: true };
  }
}

// ============================================================
// import { CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from "./config.js";

// const buildApiUrl = (endpoint, params = {}) => {
//   const url = new URL(CONFIG.API_BASE_URL + endpoint);
//   // Mandatory query parameters
//   url.searchParams.set("appid", CONFIG.API_KEY);
//   url.searchParams.set("units", CONFIG.DEFAULT_UNITS);
//   url.searchParams.set("lang", CONFIG.DEFAULT_LANG);
//   // Dynamic parameters
//   Object.entries(params).forEach(([k, v]) => {
//     if (v !== undefined && v !== "") url.searchParams.set(k, v);
//   });
//   return url.toString();
// };
>>>>>>> Stashed changes

// async function makeRequest(url) {
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
<<<<<<< Updated upstream
//       if (res.status === 404) throw new Error("City not found");
//       if (res.status === 401) throw new Error("Invalid API key");
//       throw new Error("Weather service error");
//     }
//     return await res.json();
//   } catch (err) {
//     if (err instanceof TypeError) throw new Error("Network error");
=======
//       if (res.status === 404) throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
//       if (res.status === 401) throw new Error("Invalid API key");
//       throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
//     }
//     return await res.json();
//   } catch (err) {
//     if (err instanceof TypeError) throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
>>>>>>> Stashed changes
//     throw err;
//   }
// }

<<<<<<< Updated upstream
// // getting data by city name
=======
>>>>>>> Stashed changes
// export async function getCurrentWeather(city) {
//   const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
//   return await makeRequest(url);
// }

<<<<<<< Updated upstream
// // getting data by geographic coordinates
=======
>>>>>>> Stashed changes
// export async function getWeatherByCoord(lat, lon) {
//   const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
//   return await makeRequest(url);
// }
<<<<<<< Updated upstream

// const buildApiUrl = (endpoint, params = {}) => {
//   const url = new URL(CONFIG.API_BASE_URL + endpoint);

//   // Mandatory query parameters
//   url.searchParams.set("appid", CONFIG.API_KEY);
//   url.searchParams.set("units", CONFIG.DEFAULT_UNITS);
//   url.searchParams.set("lang", CONFIG.DEFAULT_LANG);

//   // Optional dynamic parameters (like city name or coordinates)
//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== undefined && value !== "") {
//       url.searchParams.set(key, value);
//     }
//   });

//   return url.toString();
// };
=======
>>>>>>> Stashed changes
