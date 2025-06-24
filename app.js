import {
  elements,
  showLoading,
  hideLoading,
  showError,
  showMessage,
  hideError,
  displayWeatherData,
  refreshWeather,
  saveUserPreferences,
  loadUserPreferences,
} from "./modules/ui-controller.js";

import { CONFIG } from "./modules/config.js";
import {
  getCurrentWeatherWithFallback,
  getWeatherByCoord,
} from "./modules/weather-service.js";
import { getCoords } from "./modules/location-service.js";

// —————————————————————————————————————
// 1) On load: apply saved prefs
// —————————————————————————————————————
const prefs = loadUserPreferences();
elements.tempToggle.checked = prefs.isF;
elements.langSelect.value = prefs.lang;
CONFIG.DEFAULT_UNITS = prefs.isF ? "imperial" : "metric";
CONFIG.DEFAULT_LANG = prefs.lang;

// —————————————————————————————————————
// 2) Core action: search by city
// —————————————————————————————————————
async function handleSearch() {
  const city = elements.cityInput.value.trim();
  if (city.length < 2) return showError("Introduceți un nume valid");

  // persist & apply prefs before calling
  saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
  CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
  CONFIG.DEFAULT_LANG = elements.langSelect.value;

  hideError();
  showLoading();
  try {
    // use fallback wrapper so we always get data
    const data = await getCurrentWeatherWithFallback(city);
    if (data.isFallback) {
      showMessage("Using fallback data (API failed)", "warning");
    }
    displayWeatherData(data);
  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
}

// —————————————————————————————————————
// 3) Core action: search by location
// —————————————————————————————————————
async function handleLocationSearch() {
  hideError();
  showLoading();
  try {
    const coords = await getCoords();
    if (coords.source === "ip") {
      showMessage("Locație aproximativă (IP)", "warning");
    }
    const data = await getWeatherByCoord(coords.latitude, coords.longitude);
    displayWeatherData(data);
  } catch (err) {
    showError("Locația nu a putut fi determinată: " + err.message);
  } finally {
    hideLoading();
  }
}

// —————————————————————————————————————
// 4) Event hookups
// —————————————————————————————————————
function setupEventListeners() {
  // Form submit (Enter or "Caută")
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch();
  });

  // Location button
  elements.locationBtn.addEventListener("click", handleLocationSearch);

  // Unit toggle → save + re-run same flow
  elements.tempToggle.addEventListener("change", () => {
<<<<<<< Updated upstream
    // Re-render with the correct unit
    refreshWeather();

    // // Update the label text: checked → Celsius, unchecked → Fahrenheit
    // document.getElementById("unit-label").textContent = elements.tempToggle
    //   .checked
    //   ? "°C"
    //   : "°F";
  });
};
=======
    saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
    CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
>>>>>>> Stashed changes

    const city = elements.cityInput.value.trim();
    if (city) handleSearch();
    else handleLocationSearch();
  });

  // Language select → save + re-run
  elements.langSelect.addEventListener("change", () => {
    saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
    CONFIG.DEFAULT_LANG = elements.langSelect.value;

    const city = elements.cityInput.value.trim();
    if (city) handleSearch();
    else handleLocationSearch();
  });
}

// —————————————————————————————————————
// 5) Kickoff
// —————————————————————————————————————
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  // Optionally: pre-load weather for a default city:
  // elements.cityInput.value = "Bucharest";
  // handleSearch();
});

<<<<<<< Updated upstream
// =======================================================================
=======
// ===========================================================
>>>>>>> Stashed changes
// import {
//   elements,
//   showLoading,
//   hideLoading,
//   showError,
//   hideError,
//   displayWeatherData,
<<<<<<< Updated upstream
// } from "./modules/ui-controller.js";
=======
//   refreshWeather,
//   saveUserPreferences,
//   loadUserPreferences,
// } from "./modules/ui-controller.js";
// import { CONFIG } from "./modules/config.js";
>>>>>>> Stashed changes
// import {
//   getCurrentWeather,
//   getWeatherByCoord,
// } from "./modules/weather-service.js";
<<<<<<< Updated upstream

// const isValidCity = (city) =>
//   city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);

// const handleSearch = async () => {
//   const city = elements.cityInput.value.trim();
//   if (!isValidCity(city)) return showError("Introduceti un nume de oras valid");
=======
// import { getCoords } from "./modules/location-service.js";

// // 1) Load saved prefs
// const prefs = loadUserPreferences();
// elements.tempToggle.checked = prefs.isF;
// elements.langSelect.value = prefs.lang;
// CONFIG.DEFAULT_UNITS = prefs.isF ? "imperial" : "metric";
// CONFIG.DEFAULT_LANG = prefs.lang;

// // 2) Helpers
// const isValidCity = (city) => city.length >= 2 && /^[\p{L}\s-]+$/u.test(city);

// async function handleSearch() {
//   const city = elements.cityInput.value.trim();
//   if (!isValidCity(city)) return showError("Introduceți un nume valid");

//   // Save + apply prefs
//   saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
//   CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
//   CONFIG.DEFAULT_LANG = elements.langSelect.value;

>>>>>>> Stashed changes
//   hideError();
//   showLoading();
//   try {
//     const data = await getCurrentWeather(city);
<<<<<<< Updated upstream
//     displayWeatherData(data);
//   } catch (error) {
//     showError(error.message);
//   } finally {
//     hideLoading();
//   }
// };

// const setupEventListeners = () => {
//   elements.searchBtn.addEventListener("click", handleSearch);
//   elements.cityInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") handleSearch();
//   });
//   elements.locationBtn.addEventListener("click", async () => {
//     if (!navigator.geolocation)
//       return showError("Geolocation nu este suportata");
//     hideError();
//     showLoading();
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         try {
//           const { latitude, longitude } = pos.coords;
//           const data = await getWeatherByCoord(latitude, longitude);
//           displayWeatherData(data);
//         } catch (error) {
//           showError(error.message);
//         } finally {
//           hideLoading();
//         }
//       },
//       () => {
//         hideLoading();
//         showError("Cannot retrieve location");
//       }
//     );
//   });
// };

// import { getCoords } from "./modules/location-service.js";

// // Replace your location click handler with:
// elements.locationBtn.addEventListener("click", async () => {
//   hideError();
//   showLoading();
//   try {
//     const coords = await getCoords();
//     const data = await getWeatherByCoord(coords.latitude, coords.longitude);
=======
//     console.log("Raw API data:", data);
>>>>>>> Stashed changes
//     displayWeatherData(data);
//   } catch (err) {
//     showError(err.message);
//   } finally {
//     hideLoading();
//   }
<<<<<<< Updated upstream
// });

// document.addEventListener("DOMContentLoaded", () => {
//   setupEventListeners();
//   hideLoading();
=======
// }

// async function handleLocation() {
//   // Save + apply prefs
//   saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
//   CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
//   CONFIG.DEFAULT_LANG = elements.langSelect.value;

//   hideError();
//   showLoading();
//   try {
//     const { latitude, longitude } = await getCoords();
//     const data = await getWeatherByCoord(latitude, longitude);
//     console.log("Raw API data (coords):", data);
//     displayWeatherData(data);
//   } catch (err) {
//     showError(err.message);
//   } finally {
//     hideLoading();
//   }
// }

// function setupEventListeners() {
//   // form submit → search
//   document.getElementById("search-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     handleSearch();
//   });

//   // location button
//   elements.locationBtn.addEventListener("click", handleLocation);

//   // toggle units → re-fetch
//   elements.tempToggle.addEventListener("change", () => {
//     saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
//     CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
//     // re-run last action
//     const city = elements.cityInput.value.trim();
//     city ? handleSearch() : handleLocation();
//   });

//   // change language → re-fetch
//   elements.langSelect.addEventListener("change", () => {
//     saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
//     CONFIG.DEFAULT_LANG = elements.langSelect.value;
//     const city = elements.cityInput.value.trim();
//     city ? handleSearch() : handleLocation();
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   setupEventListeners();
//   // Optionally trigger an initial fetch for a default city:
//   // elements.cityInput.value = "Bucharest";
//   // handleSearch();
>>>>>>> Stashed changes
// });
