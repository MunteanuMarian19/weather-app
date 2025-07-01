# Weather App 🌦️

A simple web application that shows the current weather for any city you enter or for your current location, with support for:

- 🔍 Search by city name
- 📍 Use your current location (GPS with IP fallback)
- 🌐 Language selection (ro, en, fr, es, de)
- 🌡️ Unit toggle between Celsius (°C) and Fahrenheit (°F)
- 🔄 Graceful fallback to mock data when the API fails
- 💾 Preference persistence (units & language in localStorage)

---

## 🆕 New Features (Part 3)

### 📍 Location History

- **Recent searches**: Quick access to previously searched locations
- **Smart duplicates**: Moves existing locations to the top
- **Persistent storage**: History survives browser restarts
- **Configurable limit**: Max 10 items stored
- **One-click access**: Load weather by clicking a history item

### 📝 Logging Service

- **Multiple levels**: Debug, Info, Warning, Error
- **Structured format**: Includes timestamp, level, message, and data
- **Memory management**: Configurable max log entries
- **Developer tools**: Export logs for debugging

---

## 🛠️ Technical Implementation

### Modular Architecture

- `modules/logger.js` – Centralized logging system
- `modules/history-service.js` – Location history management
- `modules/config.js` – Extended configuration options
- `modules/ui-controller.js` – Enhanced UI controller with history rendering

### Data Persistence

- `localStorage` used for:
  - Weather unit preference
  - Language preference
  - Search history
- Error handling for storage limits
- JSON serialization used for storing complex data

---

## 🎯 Usage

### Location History

1. Search for any city
2. Look under the **Recent Searches** section
3. Click any location to reload weather
4. Use “Clear History” to wipe history

### Developer Logs

- Open **Dev Tools → Console** to see logs
- Events use different log levels (debug, info, etc.)
- Use the **Export Logs** button to download logs

---

## 🚀 Features

- 🔍 City Search  
- 📍 Geolocation with fallback  
- 🌐 Language selection  
- 🌡️ Unit toggle (°C / °F)  
- 🔄 Graceful fallback  
- 💾 Preference persistence  

---

## 🛠️ Tech Stack

- Vanilla JavaScript (ES6 Modules)
- Fetch API for HTTP requests
- HTML5 & CSS3
- LocalStorage for saving preferences

---

## 📦 Installation

```bash
git clone https://github.com/MunteanuMarian19/weather-app.git
