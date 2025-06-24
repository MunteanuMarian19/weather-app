# Weather App 🌦️

A simple web application that shows the current weather for any city you enter or for your current location, with support for:

- **Search by city name**  
- **Use your current location** (GPS with IP fallback)  
- **Language selection** for descriptions (ro, en, fr, es, de)  
- **Unit toggle** between Celsius (°C) and Fahrenheit (°F)  
- **Graceful error handling** and **fallback mock data** when the API fails  
- **Preference persistence** (units & language stored in `localStorage`)  

---

## 🚀 Features

- 🔍 **City Search**  
- 📍 **Geolocation** with automatic IP-based fallback  
- 🌐 **Language Selector** for weather descriptions  
- 🌡️ **Unit Toggle** (°C / °F)  
- 🔄 **Graceful Degradation**: falls back to mock data if API or network fails  
- 💾 **User Preferences** remembered between visits  

---

## 🛠️ Tech Stack

- **Vanilla JavaScript** (ES6 Modules)  
- **Fetch API** for HTTP requests  
- **HTML5 & CSS3**  
- **LocalStorage** for saving user preferences  

---

## 📦 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/USERNAME/weather-app.git
Install a simple HTTP server (e.g., Live Server in VS Code)

Open index.html using your HTTP server

Enter a city name or click “Use my location”

Switch units or language—your choice will persist on reload

🗺️ Roadmap
[x] Part 1: Project foundations & GitHub setup

[x] Part 2: Mock data and modular JS architecture

[x] Part 3: Real API integration with error handling & fallback

[x] Part 4: Geolocation service with GPS/IP fallback

[x] Part 5: Unit & language controls + preference persistence

[ ] Part 6: (Next) Advanced animations & accessibility improvements

[ ] Part 7: (Future) Forecast view & caching

👨‍💻 Author
Marian Munteanu
Practical homework project for the “Advanced JavaScript” course (Generation Tech / Digital Nation, June–July 2025)
Passionate about technology and JavaScript.
