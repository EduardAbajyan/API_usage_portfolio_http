# 🌍 Weather & Timezone App

Portfolio part. This is the app that takes the location from the user and shows the weather in that location using OpenWeather API and the map using Google Maps Embed API . Self certified.
A full-stack Node.js application that displays current weather conditions and timezone information based on the user's geolocation. The app also embeds a Google Maps view of the detected location.

## 🚀 Features

- Detects user’s current location using the browser’s geolocation API
- Fetches real-time weather data using OpenWeather OneCall 3.0 API
- Retrieves embedded Google Maps view using Google Maps Embed API
- Responsive UI with day/night themes
- Displays temperature, weather conditions, pressure, humidity, UV index, wind details, and more
- Secure HTTPS server using HTTP/2 (via `spdy`)

## 📸 Preview

![App Screenshot](https://via.placeholder.com/900x400?text=Preview+Coming+Soon)

## 🛠️ Tech Stack

- **Frontend**: HTML, Bootstrap, jQuery
- **Backend**: Node.js, Express, Axios
- **Templating**: EJS
- **APIs**: OpenWeather API, Google Maps Embed API
- **Security**: HTTPS (via `spdy` with `key.pem` and `cert.pem`)

## 📂 Project Structure

```
project/
├── public/
│   ├── styles/
│   │   └── main.css
│   ├── getLocation.js
│   └── dataLoader.js
├── views/
│   └── index.ejs
├── .env
├── index.js
├── key.pem
├── cert.pem
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18 or above recommended)
- HTTPS certificates (`key.pem` and `cert.pem`)
- API keys from:
  - [OpenWeather](https://openweathermap.org/api/one-call-3)
  - [Google Maps Embed API](https://developers.google.com/maps/documentation/embed)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-timezone-app.git
cd weather-timezone-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
touch .env
```

Add your API keys inside `.env`:

```
API_KEY_GOOGLE=your_google_maps_api_key
API_KEY_WEATHER=your_openweather_api_key
```

### 4. Add HTTPS certificates

Place your `key.pem` and `cert.pem` files in the project root directory.

### 5. Start the server

```bash
node index.js
```

Visit the app at: [https://localhost](https://localhost)

> ⚠️ Make sure to accept the self-signed certificate warning in your browser if using self-generated certs.

## 📋 TODOs

- [ ] Add unit tests
- [ ] Add support for multiple languages
- [ ] Add support for daily/hourly weather forecasts
- [ ] Improve error handling and fallback logic

## 🧾 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

- [OpenWeather](https://openweathermap.org)
- [Google Maps](https://maps.google.com)
- [Bootstrap](https://getbootstrap.com)
