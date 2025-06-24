import { CONFIG } from "./config.js";

export const elements = {
  cityInput: document.querySelector("#city-input"),
  searchBtn: document.querySelector("#search-btn"),
  locationBtn: document.querySelector("#location-btn"),
  langSelect: document.querySelector("#lang-select"),
  tempToggle: document.querySelector("#unit-toggle"),
  loading: document.querySelector("#loading"),
  error: document.querySelector("#error"),
  displaySection: document.querySelector("#weather-display"),
  cityName: document.querySelector("#city-name"),
  description: document.querySelector("#description"),
  temp: document.querySelector("#temp"),
  feelsLike: document.querySelector("#feels-like"),
  humidity: document.querySelector("#humidity"),
  pressure: document.querySelector("#pressure"),
  wind: document.querySelector("#wind-speed"),
  visibility: document.querySelector("#visibility"),
  sunrise: document.querySelector("#sunrise"),
  sunset: document.querySelector("#sunset"),
  icon: document.querySelector("#icon"),
};

export const showLoading = () =>
  elements.loading.classList.remove("hidden");
export const hideLoading = () =>
  elements.loading.classList.add("hidden");

export const showError = (msg) => {
  elements.error.textContent = msg;
  elements.error.classList.remove("hidden");
  elements.displaySection.classList.add("hidden");
};
export const hideError = () =>
  elements.error.classList.add("hidden");

export const showMessage = (msg, type = "info") => {
  elements.error.textContent = msg;
  elements.error.classList.remove("hidden");
  elements.error.classList.toggle("warning", type === "warning");
};

// Save/load preferences: isFahrenheit + language
export const saveUserPreferences = (isF, lang) => {
  localStorage.setItem("weather_unit_is_f", isF);
  localStorage.setItem("weather_lang", lang);
};

export const loadUserPreferences = () => ({
  isF: localStorage.getItem("weather_unit_is_f") === "true",
  lang: localStorage.getItem("weather_lang") || CONFIG.DEFAULT_LANG,
});

let lastData = null;

export const displayWeatherData = (data) => {
  hideError();
  lastData = data;
  renderWeather(data, elements.tempToggle.checked);
};

export function refreshWeather() {
  if (lastData) renderWeather(lastData, elements.tempToggle.checked);
}

function renderWeather(data, isFahrenheit) {
  const c = data.main.temp;
  const toC = (celsius) => celsius.toFixed(1);
  const toF = (celsius) => ((celsius * 9) / 5 + 32).toFixed(1);

  const displayedTemp = isFahrenheit ? toF(c) : toC(c);
  const displayedFeels = isFahrenheit
    ? toF(data.main.feels_like)
    : toC(data.main.feels_like);
  const unitLabel = isFahrenheit ? "°F" : "°C";

  elements.cityName.textContent = `${data.name} – ${data.sys.country}`;
  elements.description.textContent = data.weather[0].description;
  elements.temp.textContent = `Temp: ${displayedTemp}${unitLabel}`;
  elements.feelsLike.textContent = `Feels like: ${displayedFeels}${unitLabel}`;
  elements.humidity.textContent = `Humidity: ${data.main.humidity}%`;
  elements.pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
  elements.wind.textContent = `Wind: ${(data.wind.speed * 3.6).toFixed(
    1
  )} km/h`;
  elements.visibility.textContent = `Visibility: ${data.visibility} m`;
  elements.sunrise.textContent = `Sunrise: ${new Date(
    data.sys.sunrise * 1000
  ).toLocaleTimeString()}`;
  elements.sunset.textContent = `Sunset: ${new Date(
    data.sys.sunset * 1000
  ).toLocaleTimeString()}`;
  elements.icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Update the toggle label
  document.getElementById("unit-label").textContent = unitLabel;
  elements.displaySection.classList.remove("hidden");
}
