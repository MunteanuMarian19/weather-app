import {
  elements,
  showLoading,
  hideLoading,
  showError,
  showMessage,
  hideError,
  displayWeatherData,
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
    saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
    CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";

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
