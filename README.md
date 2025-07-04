# 🌤️ Weather App – Modern JavaScript Weather Application

> A fully‑featured weather app built with vanilla JavaScript, integrating real‑world APIs and modern best practices.

[🔗 Live Demo](https://your-username.github.io/weather-app) • [💻 Source Code](https://github.com/your-username/weather-app)

---

## 🎯 About This Project

Weather App lets you:
- 🔍 **Search** current weather by city name  
- 📍 **Auto‑detect** your location (GPS with IP fallback)  
- 🌐 **Switch** language for descriptions (ro, en, fr, es, de)  
- 🌡️ **Toggle** between Celsius (°C) and Fahrenheit (°F)  
- 💾 **Persist** your preferences & search history in localStorage  
- 🧯 **Gracefully** fall back to mock data if the API fails

---

## ✨ Features

### Core Features
- **City Search** with error handling  
- **Geolocation** (navigator + IP‑based fallback)  
- **Language Selector** for multi‑lingual descriptions  
- **Unit Toggle** (°C / °F)  
- **Persistent Preferences** (units & language)  

### Advanced Features
- **Search History** (last 10 searches, deduplicated, clickable)  
- **Logging Service** (debug/info/warn/error levels, exportable JSON)  
- **Responsive UI** for desktop & mobile  

---

## 🛠️ Tech Stack

- **JavaScript (ES6 Modules)** for logic & architecture  
- **HTML5** semantic markup  
- **CSS3** modern styling & responsiveness  
- **Fetch API** for HTTP requests  
- **localStorage** for persistence  

**APIs & Services**  
- [OpenWeatherMap API](https://openweathermap.org/) – real‑time weather data  
- [Geolocation API](https://developer.mozilla.org/docs/Web/API/Geolocation_API) – native location  
- [ipapi.co](https://ipapi.co/) – IP‑based fallback  

---

## 🚀 Demo & Screenshots

[![Desktop view][screenshot-desktop]][🔗 Live Demo]  
[![Mobile view][screenshot-mobile]][🔗 Live Demo]

---

## 📦 Installation & Running Locally

### Prerequisites
- Modern browser (Chrome, Firefox, Safari, Edge)  
- Free OpenWeatherMap API key  

### Setup

```bash
# 1) Clone the repo
git clone https://github.com/your-username/weather-app.git
cd weather-app

# 2) Insert your API key
#    Open modules/config.js and replace API_KEY value

# 3) Start a simple HTTP server (e.g. Live Server extension, or:)
npx http-server .

# 4) In browser, navigate to http://localhost:8080
