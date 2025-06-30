// app.js
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
  showHistory,
  hideHistory,
  renderHistory,
  addHistoryEventListeners,
  updateLogDisplay,
} from "./modules/ui-controller.js";

import { CONFIG } from "./modules/config.js";
import {
  getCurrentWeatherWithFallback,
  getWeatherByCoord,
} from "./modules/weather-service.js";
import { getCoords } from "./modules/location-service.js";
import { logger } from "./modules/logger.js";
import { historyService } from "./modules/history-service.js";

// Keep track of the last city we successfully fetched
let lastCity = null;

// 1) On load: apply saved prefs
const prefs = loadUserPreferences();
elements.tempToggle.checked = prefs.isF;
elements.langSelect.value = prefs.lang;
CONFIG.DEFAULT_UNITS = prefs.isF ? "imperial" : "metric";
CONFIG.DEFAULT_LANG = prefs.lang;

// 2) Load history & logs, hook up history clicks/clear
function loadHistoryOnStart() {
  const history = historyService.getHistory();
  if (history.length) {
    renderHistory(history);
    showHistory();
  }

  addHistoryEventListeners(
    // on history‑item click
    async ({ city, lat, lon }) => {
      logger.info("History item clicked", { city, lat, lon });
      showLoading();
      hideError();
      try {
        const data = await getWeatherByCoord(lat, lon);
        lastCity = data.name;
        displayWeatherData(data);
        historyService.addLocation(data);
        renderHistory(historyService.getHistory());
      } catch (err) {
        logger.error("Failed loading from history", err);
        showError("Nu am putut obține vremea din istoric.");
      } finally {
        hideLoading();
      }
    },
    // on clear‑history click
    () => {
      if (confirm("Sigur vrei să ștergi tot istoricul de căutări?")) {
        historyService.clearHistory();
        renderHistory([]);
        hideHistory();
        logger.info("Search history cleared");
      }
    }
  );

  updateLogDisplay(logger.getLogs());
}

// 3) Core action: search by city
async function handleSearch() {
  const city = elements.cityInput.value.trim();
  logger.debug("Search requested", { city });
  if (city.length < 2) {
    logger.warn("Validation failed", { city });
    return showError("Introduceți un nume valid");
  }

  saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
  CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
  CONFIG.DEFAULT_LANG = elements.langSelect.value;

  hideError();
  showLoading();
  try {
    const data = await getCurrentWeatherWithFallback(city);
    lastCity = data.name;
    displayWeatherData(data);
    logger.info("Weather data received", {
      city: data.name,
      temp: data.main.temp,
      fallback: Boolean(data.isFallback),
    });

    // // reset form only on a *real* API response
    // if (!data.isFallback) document.querySelector("#search-form").reset();
    // Clear only the city input when a real city is found
    if (!data.isFallback) {
      elements.cityInput.value = "";
    }

    historyService.addLocation(data);
    renderHistory(historyService.getHistory());
    showHistory();
  } catch (err) {
    logger.error("Failed to fetch weather", err);
    showError(err.message);
  } finally {
    hideLoading();
    updateLogDisplay(logger.getLogs());
  }
}

// 4) Core action: search by location
async function handleLocationSearch() {
  logger.info("Location-based fetch requested");

  saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
  CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
  CONFIG.DEFAULT_LANG = elements.langSelect.value;

  hideError();
  showLoading();
  try {
    const coords = await getCoords();
    logger.debug("Coordinates obtained", coords);
    if (coords.source === "ip") {
      showMessage("Locație aproximativă (IP)", "warning");
      logger.warn("Using IP fallback for location");
    }

    // fetch weather, *then* set lastCity
    const data = await getWeatherByCoord(coords.latitude, coords.longitude);
    lastCity = data.name;

    displayWeatherData(data);
    historyService.addLocation(data);
    renderHistory(historyService.getHistory());
    showHistory();
  } catch (err) {
    logger.error("Location fetch failed", err);
    showError("Locația nu a putut fi determinată: " + err.message);
  } finally {
    hideLoading();
    updateLogDisplay(logger.getLogs());
  }
}

// 5) Wire up all buttons, toggles, selects
function setupEventListeners() {
  document.querySelector("#search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch();
  });

  elements.locationBtn.addEventListener("click", handleLocationSearch);

  // — Unit toggle only re‑renders, no re‑fetch
  elements.tempToggle.addEventListener("change", () => {
    saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
    CONFIG.DEFAULT_UNITS = elements.tempToggle.checked ? "imperial" : "metric";
    refreshWeather();
  });

  // — Language select re‑fetches the same lastCity
  elements.langSelect.addEventListener("change", async () => {
    saveUserPreferences(elements.tempToggle.checked, elements.langSelect.value);
    CONFIG.DEFAULT_LANG = elements.langSelect.value;
    if (!lastCity) return;
    showLoading();
    try {
      const data = await getCurrentWeatherWithFallback(lastCity);
      lastCity = data.name;
      displayWeatherData(data);
    } catch (err) {
      showError(err.message);
    } finally {
      hideLoading();
    }
  });

  // — Export logs
  elements.exportLogsBtn?.addEventListener("click", () => {
    const json = logger.exportLogs();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weather-app-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logger.info("Logs exported");
    updateLogDisplay(logger.getLogs());
  });
}

// 6) App initialization
async function initializeApp() {
  logger.info("Weather App starting…");
  setupEventListeners();
  loadHistoryOnStart();
  logger.info("Weather App initialized successfully");
}

document.addEventListener("DOMContentLoaded", initializeApp);
