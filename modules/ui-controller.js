export const elements = {
  cityInput: document.querySelector("#city-input"),
  searchBtn: document.querySelector("#search-btn"),
  locationBtn: document.querySelector("#location-btn"),
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

export const showLoading = () => elements.loading.classList.remove("hidden");
export const hideLoading = () => elements.loading.classList.add("hidden");
export const showError = (msg) => {
  elements.error.textContent = msg;
  elements.error.classList.remove("hidden");
};
export const hideError = () => {
  elements.error.classList.add("hidden");
};

export const displayWeatherData = (data) => {
  hideError();
  elements.cityName.textContent = `${data.name} - ${data.sys.country}`;
  elements.description.textContent = data.weather[0].description;
  elements.temp.textContent = `Temp: ${(data.main.temp - 273.15).toFixed(1)}°C`;
  elements.feelsLike.textContent = `Feels like: ${(
    data.main.feels_like - 273.15
  ).toFixed(1)}°C`;
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
};
