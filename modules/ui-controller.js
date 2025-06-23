export const elements = {
  cityInput: document.querySelector("#city-input"),
  searchBtn: document.querySelector("#search-btn"),
  locationBtn: document.querySelector("#location-btn"),
  loading: document.querySelector("#loading"),
  error: document.querySelector("#error"),
  displaySection: document.querySelector("#weather-display"),
  cityName: document.querySelector("#city-name"),
  tempToggle: document.querySelector("#unit-toggle"),
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

export const showLoading = () => elements.loading.classList.remove("hidden");
export const hideLoading = () => elements.loading.classList.add("hidden");
export const showError = (msg) => {
  elements.error.textContent = msg;
  elements.error.classList.remove("hidden");
  // hide old weather on error
  elements.displaySection.classList.add("hidden");
};
export const hideError = () => elements.error.classList.add("hidden");

let lastData = null; // store last fetch for unit toggle

export const displayWeatherData = (data) => {
  hideError();
  lastData = data;
  renderWeather(data, elements.tempToggle.checked);
};

export function refreshWeather() {
  if (lastData) {
    renderWeather(lastData, elements.tempToggle.checked);
  }
}

function renderWeather(data, isFahrenheit) {
  // data.main.temp is in °C
  const c = data.main.temp;
  const toC = (celsius) => celsius.toFixed(1);
  const toF = (celsius) => ((celsius * 9) / 5 + 32).toFixed(1);

  const displayed = isFahrenheit ? toF(c) : toC(c);
  const unit = isFahrenheit ? "°F" : "°C";

  elements.cityName.textContent = `${data.name} – ${data.sys.country}`;
  elements.description.textContent = data.weather[0].description;
  elements.temp.textContent = `Temp: ${displayed}${unit}`;
  elements.feelsLike.textContent = `Feels like: ${
    isFahrenheit ? toC(data.main.feels_like) : toF(data.main.feels_like)
  }${unit}`;

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
  elements.displaySection.classList.remove("hidden");
  document.getElementById("unit-label").textContent = unit;
}
