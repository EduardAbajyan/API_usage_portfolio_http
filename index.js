import spdy from "spdy";
import fs from "fs";
import express from "express";
import axios from "axios";
import { config } from "dotenv";

const app = express();
const port = 443;
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
config();

let { latitude, longitude } = { latitude: 33.44, longitude: -94.04 };
let iframe = "";
const googleAPI_KEY = process.env.API_KEY_GOOGLE;
const weatherAPI_KEY = process.env.API_KEY_WEATHER;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { lat: latitude, lon: longitude, iframe: iframe });
});

app.post("/save-location", async (req, res) => {
  console.log(req.body);
  ({ latitude, longitude } = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  let data = "";
  iframe = "";
  let iframeReplacement = "";
  try {
    await axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&units=metric&appid=${weatherAPI_KEY}`
      )
      .then(async function (result) {
        console.log("Received location:", latitude, longitude);
        data = result.data;
        console.log(data);

        const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${googleAPI_KEY}&center=${latitude},${longitude}&zoom=15`;
        await axios
          .get(mapUrl)
          .then(function (response) {
            const data = response.data;

            // Check if it's actually map content
            if (
              typeof data === "string" &&
              (data.includes("<html") ||
                data.includes("maps") ||
                data.includes("<iframe"))
            ) {
              iframeReplacement = `<iframe 
          id="map"
          width="100%"
          height="500px"
          style="border:0; border-radius: 1rem;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="${mapUrl}"> </iframe>`;
            } else {
              console.warn("Google Maps response does not look like a map.");
            }
          })
          .catch(function (error) {
            console.warn("Could not load Google Maps:", error);
          });
      });
    res.json({ data: data, iframeReplacement: iframeReplacement });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

spdy.createServer(options, app).listen(port, "0.0.0.0", () => {
  console.log("HTTPS Server running on https://localhost");
});
