import { CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from "./config.js";

const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(CONFIG.API_BASE_URL + endpoint);
  // Mandatory query parameters
  url.searchParams.set("appid", CONFIG.API_KEY);
  url.searchParams.set("units", CONFIG.DEFAULT_UNITS);
  url.searchParams.set("lang", CONFIG.DEFAULT_LANG);
  // Dynamic parameters
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
};

async function makeRequest(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
      if (res.status === 401) throw new Error("Invalid API key");
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    throw err;
  }
}

export async function getCurrentWeather(city) {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
  return await makeRequest(url);
}

export async function getWeatherByCoord(lat, lon) {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
  return await makeRequest(url);
}

// ==============================================================
// import { CONFIG, API_ENDPOINTS } from "./config.js";

// async function makeRequest(url) {
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       if (res.status === 404) throw new Error("City not found");
//       if (res.status === 401) throw new Error("Invalid API key");
//       throw new Error("Weather service error");
//     }
//     return await res.json();
//   } catch (err) {
//     if (err instanceof TypeError) throw new Error("Network error");
//     throw err;
//   }
// }

// // getting data by city name
// export async function getCurrentWeather(city) {
//   const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
//   return await makeRequest(url);
// }

// // getting data by geographic coordinates
// export async function getWeatherByCoord(lat, lon) {
//   const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
//   return await makeRequest(url);
// }

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
