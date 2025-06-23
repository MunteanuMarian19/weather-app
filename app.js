import {
  elements,
  showLoading,
  hideLoading,
  showError,
  hideError,
  displayWeatherData,
  refreshWeather,
} from "./modules/ui-controller.js";
import {
  getCurrentWeather,
  getWeatherByCoord,
} from "./modules/weather-service.js";
import { getCoords } from "./modules/location-service.js";

const isValidCity = (city) =>
  city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);

const handleSearch = async () => {
  const city = elements.cityInput.value.trim();
  if (!isValidCity(city)) return showError("Please enter a valid city name");

  hideError();
  showLoading();
  try {
    const data = await getCurrentWeather(city);
    // raw API response
    console.log("Raw API data:", data);
    displayWeatherData(data);
  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
};

const handleLocation = async () => {
  hideError();
  showLoading();
  try {
    const coords = await getCoords();
    const data = await getWeatherByCoord(coords.latitude, coords.longitude);
    console.log("Raw API data (by coords):", data);
    displayWeatherData(data);
  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
};

const setupEventListeners = () => {
  elements.searchBtn.addEventListener("click", handleSearch);
  elements.cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });
  elements.locationBtn.addEventListener("click", handleLocation);

  elements.tempToggle.addEventListener("change", () => {
    // Re-render with the correct unit
    refreshWeather();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  hideLoading();
});
