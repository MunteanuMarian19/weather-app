# 🌤️ Weather App – Modern JavaScript Weather Application

> O aplicație meteo completă construită cu Vanilla JavaScript, integrând API‑uri reale, geolocație și bune practici moderne.  

[🔗 Demo Live](https://munteanumarian19.github.io/weather-app/) | [📂 Cod Sursă](https://github.com/MunteanuMarian19/weather-app)

---

## 🎯 Despre Proiect

Weather App este un proiect portofoliu care îți arată vremea curentă pentru orice oraș introdus sau pentru locația ta, cu:

- Comutare între Celsius (°C) și Fahrenheit (°F)  
- Suport pentru 5 limbi (ro, en, fr, es, de)  
- Istoric de căutări persistente  
- Fallback la date mock dacă API‑ul nu răspunde  
- Logging avansat cu export JSON în DEV mode 

---

## ✨ Funcționalități

### Funcționalități de bază

- 🔍 **Căutare după oraș**  
- 📍 **Geolocație** (GPS + fallback IP)  
- 🌡️ **Toggle unități** (°C / °F)  
- 🌐 **Selector limbă** (ro, en, fr, es, de)  
- ⚠️ **Gestionare erori** și fallback la date mock  

### Funcționalități avansate

- 💾 **Istoric căutări** cu maximum 10 intrări, mutare la top pentru duplicate  
- 📊 **Serviciu de logging** (debug, info, warn, error) – export JSON  
- 🔄 **Reîncărcare instantă** din istoric sau după schimbarea limbii/unității  

---

## 🛠️ Tehnologii Utilizate

- **Vanilla JavaScript (ES6 Modules)**  
- **Fetch API** pentru cereri HTTP  
- **HTML5 & CSS3** (Flexbox, responsive design)  
- **LocalStorage** pentru preferințe și istoric  
- **OpenWeatherMap API** + **IPAPI.co** pentru fallback  

---

## 🚀 Demo & Capturi de Ecran

![Desktop view](./screenshots/desktop.png)  
![Mobile view](./screenshots/mobile.png)  

---

## 📦 Instalare și Rulare

### Cerințe

- Browser modern (Chrome, Firefox, Safari, Edge)  
- Cheie API gratuită de la [OpenWeatherMap](https://openweathermap.org/)

### Setup local

```bash
# 1. Clone repository
git clone [https://github.com/USERNAME/weather-app.git](https://github.com/MunteanuMarian19/weather-app)
cd weather-app

# 2. Instalează un server static (ex. Live Server în VS Code)

# 3. Configurează-ți API Key
#    - Editează `modules/config.js` și înlocuiește `YOUR_API_KEY_HERE`

# 4. Rulează local și deschide http://localhost:5500 (sau portul serverului tău)
