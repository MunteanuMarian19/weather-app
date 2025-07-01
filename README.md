# Weather App 🌦️

A simple web application that shows the current weather for any city you enter or for your current location, with support for:

- 🔍 Search by city name  
- 📍 Use your current location (GPS with IP fallback)  
- 🌐 Language selection (ro, en, fr, es, de)  
- 🌡️ Unit toggle between Celsius (°C) and Fahrenheit (°F)  
- 🔄 Graceful fallback to mock data when the API fails  
- 💾 Preference persistence (units & language in localStorage)  

---

## 🆕 New Features (Part 6)

### 📍 Location History

- **Recent searches**: Quick access to previously searched locations  
- **Smart duplicates**: Moves an existing city to the top rather than duplicating  
- **Persistent storage**: History survives page reloads and browser restarts  
- **Configurable limit**: Stores up to 10 entries (configurable via `modules/config.js`)  
- **One‑click access**: Click any history item to reload its weather  

### 📝 Logging Service

- **Multiple levels**: Debug, Info, Warning, Error  
- **Structured format**: Includes timestamp, level, message, and optional data payload  
- **Memory management**: Configurable maximum log entries in memory  
- **Developer tools**: On‑page log panel with “Clear Logs” (with confirmation) and “Export Logs”  

---

## 🛠️ Technical Implementation

### Modular Architecture

- `modules/logger.js` – Centralized logging system  
- `modules/history-service.js` – Search history management  
- `modules/config.js` – App configuration (API, history limits, logging)  
- `modules/ui-controller.js` – UI updates for history and logs  

### Data Persistence

- **`localStorage`** for:
  - Search history (`weather_search_history`)
  - User preferences (`weather_unit_is_f`, `weather_lang`)
- JSON‑serialize complex objects  
- Error handling around storage quota limits  

---

## 🎯 Usage

### Location History

1. Search for a city  
2. View it in the **Recent Searches** panel  
3. Click an item to reload its weather  
4. Use **“Clear History”** to wipe your saved list  

### Developer Logs

- Toggle the log panel with **“Show Logs”** / **“Hide Logs”**  
- Use **“Clear Logs”** to erase them (with a confirmation dialog)  
- Use **“Export Logs”** to download a `.json` file of all entries  

---

## 🚀 Features

- 🔍 City Search  
- 📍 Geolocation (GPS/IP fallback)  
- 🌐 Multi‑language descriptions  
- 🌡️ Celsius/Fahrenheit toggle  
- 🔄 Mock‑data fallback  
- 💾 Preference persistence  
- 🕘 **New:** Search history & in‑page logging panel  

---

## 📦 Installation

```bash
git clone https://github.com/MunteanuMarian19/weather-app.git
cd weather-app
# checkout your feature branch
git checkout feature/history-location-logging-service
# serve with Live Server or any static HTTP server
