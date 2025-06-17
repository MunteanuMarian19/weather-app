import {
  elements,
  showLoading,
  hideLoading,
  showError,
  hideError,
  displayWeatherData,
} from "./modules/ui-controller.js";
import {
  getCurrentWeather,
  getWeatherByCoord,
} from "./modules/weather-service.js";

const isValidCity = (city) =>
  city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);

const handleSearch = async () => {
  const city = elements.cityInput.value.trim();
  if (!isValidCity(city)) return showError("Introduceti un nume de oras valid");
  hideError();
  showLoading();
  try {
    const data = await getCurrentWeather(city);
    displayWeatherData(data);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
};

const setupEventListeners = () => {
  elements.searchBtn.addEventListener("click", handleSearch);
  elements.cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });
  elements.locationBtn.addEventListener("click", async () => {
    if (!navigator.geolocation)
      return showError("Geolocation nu este suportata");
    hideError();
    showLoading();
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const data = await getWeatherByCoord(latitude, longitude);
          displayWeatherData();
        } catch (error) {
          showError(error.message);
        } finally {
          hideLoading();
        }
      },
      () => {
        hideLoading();
        showError("Cannot retrieve location");
      }
    );
  });
};

// document.addEventListener("DOMContentLoaded", () => {
//   setupEventListeners();
//   hideLoading();
//   // Initial load with default city
//   handleSearch();
// });

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  hideLoading();
  // Initial load without spinner:
  getCurrentWeather("Province of Turin")
    .then((data) => displayWeatherData(data))
    .catch((err) => showError(err.message));
});
