export const elements = {
  // basic controls
  cityInput: document.querySelector("#city-input"),
  searchBtn: document.querySelector("#search-btn"),
  locationBtn: document.querySelector("#location-btn"),

  // prefs controls
  langSelect: document.querySelector("#lang-select"),
  tempToggle: document.querySelector("#unit-toggle"),

  // spinner & error
  loading: document.querySelector("#loading"),
  error: document.querySelector("#error"),

  // weather display
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

  // history UI
  historySection: document.querySelector("#history-section"),
  historyList: document.querySelector("#history-list"),
  clearHistoryBtn: document.querySelector("#clear-history-btn"),

  // dev-tools logging UI
  devTools: document.querySelector("#dev-tools"),
  logDisplay: document.querySelector("#log-display"),
  clearLogsBtn: document.querySelector("#clear-logs-btn"),
  // exportLogsBtn: document.querySelector("#export-logs-btn"),
  exportLogsBtn: document.querySelector("#export-logs-btn"),
};

// — Spinner / Error helpers —
export const showLoading = () => elements.loading.classList.remove("hidden");
export const hideLoading = () => elements.loading.classList.add("hidden");

export const showError = (msg) => {
  elements.error.textContent = msg;
  elements.error.classList.remove("hidden");
  elements.displaySection.classList.add("hidden");
};
export const hideError = () => {
  elements.error.classList.add("hidden");
};

// A generic “info” message slot (we reuse the same element but style differently)
export const showMessage = (msg, type = "info") => {
  elements.error.textContent = msg;
  elements.error.classList.remove("hidden");
  elements.error.classList.toggle("warning", type === "warning");
};

// — Preferences persistence —
export const saveUserPreferences = (isF, lang) => {
  localStorage.setItem("weather_unit_is_f", isF);
  localStorage.setItem("weather_lang", lang);
};
export const loadUserPreferences = () => ({
  isF: localStorage.getItem("weather_unit_is_f") === "true",
  lang: localStorage.getItem("weather_lang") || "en",
});

// — Weather rendering —
let _lastData = null;

export const displayWeatherData = (data) => {
  hideError();
  _lastData = data;
  _render(data, elements.tempToggle.checked);
};

export const refreshWeather = () => {
  if (_lastData) _render(_lastData, elements.tempToggle.checked);
};

function _render(data, isFahrenheit) {
  const tempVal = data.main.temp.toFixed(1);
  const feelsVal = data.main.feels_like.toFixed(1);
  const symbol = isFahrenheit ? "°F" : "°C";

  elements.cityName.textContent = `${data.name} – ${data.sys.country}`;
  elements.description.textContent = data.weather[0].description;
  elements.temp.textContent = `Temp: ${tempVal}${symbol}`;
  elements.feelsLike.textContent = `Feels like: ${feelsVal}${symbol}`;
  elements.humidity.textContent = `Humidity: ${data.main.humidity}%`;
  elements.pressure.textContent = `Pressure: ${data.main.pressure} hPa`;

  // CHANGES - EXPLANATIONS
  // changing imperial units to metric caused changes in wind speed to, km to miles and so on
  // and that's why this previous commented code had to be replaced with a new updated one
  // so changing Celsius to Fahrenheit, imperial to metric, won't affect the wind speed too,
  // so it remains in km/h

  // old code:
  // elements.wind.textContent = `Wind: ${(data.wind.speed * 3.6).toFixed(
  //   1
  // )} km/h`;

  // new code — wind: convert back to km/h correctly based on API units
  //   API returns wind.speed in m/s for metric, mph for imperial
  let windKmh;
  if (isFahrenheit) {
    // data.wind.speed is in miles/hour → *1.609 to get km/h
    windKmh = (data.wind.speed * 1.609).toFixed(1);
  } else {
    // data.wind.speed is in m/s → *3.6 to get km/h
    windKmh = (data.wind.speed * 3.6).toFixed(1);
  }
  elements.wind.textContent = `Wind: ${windKmh} km/h`;
  // old code:
  // elements.visibility.textContent = `Visibility: ${data.visibility} m`;

  // new code — visibility: always convert meters → kilometers
  const visKmRaw = data.visibility / 1000;
  // trim trailing zeros
  const visKm = visKmRaw.toFixed(3).replace(/\.?0+$/, "");
  elements.visibility.textContent = `Visibility: ${visKm} km`;

  elements.sunrise.textContent = `Sunrise: ${new Date(
    data.sys.sunrise * 1000
  ).toLocaleTimeString()}`;
  elements.sunset.textContent = `Sunset: ${new Date(
    data.sys.sunset * 1000
  ).toLocaleTimeString()}`;
  elements.icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // show the panel
  elements.displaySection.classList.remove("hidden");

  // update the little unit-label span
  document.querySelector("#unit-label").textContent = symbol;
}

// — History UI —
export const showHistory = () =>
  elements.historySection.classList.remove("hidden");
export const hideHistory = () =>
  elements.historySection.classList.add("hidden");

/**
 * Renders the array of {city, country, timestamp, coordinates}
 * into clickable `.history-item` divs.
 */
export const renderHistory = (historyItems) => {
  if (!historyItems.length) {
    elements.historyList.innerHTML = `<p class="no-history">Nu ai căutări recente</p>`;
    return;
  }
  elements.historyList.innerHTML = historyItems
    .map((item) => {
      const ago = _timeAgo(item.timestamp);
      return `
        <div class="history-item"
             data-city="${item.city}"
             data-lat="${item.coordinates.lat}"
             data-lon="${item.coordinates.lon}">
          <div class="history-location">
            <span class="city">${item.city}</span>
            <span class="country">${item.country}</span>
          </div>
          <div class="history-time">${ago}</div>
        </div>
      `;
    })
    .join("");
};

/**
 * Binds your two callbacks:
 *  onHistoryClick receives ({city, lat, lon})
 *  onClearHistory receives no args
 */
export const addHistoryEventListeners = (onHistoryClick, onClearHistory) => {
  elements.historyList.addEventListener("click", (e) => {
    const itm = e.target.closest(".history-item");
    if (!itm) return;
    onHistoryClick({
      city: itm.dataset.city,
      lat: Number(itm.dataset.lat),
      lon: Number(itm.dataset.lon),
    });
  });
  elements.clearHistoryBtn.addEventListener("click", onClearHistory);
};

// — Logs UI —
export const updateLogDisplay = (logs) => {
  if (!elements.logDisplay) return;
  elements.logDisplay.innerHTML = logs
    .map((e) => `<div>[${e.timestamp}] [${e.level}] ${e.message}</div>`)
    .join("");
};

// helper for relative time
function _timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m} minute în urmă`;
  const h = Math.floor(m / 60);
  if (h === 1) return `${h} oră în urmă`;
  if (h < 24) return `${h} ore în urmă`;
  return `${Math.floor(h / 24)} zile în urmă`;
}
