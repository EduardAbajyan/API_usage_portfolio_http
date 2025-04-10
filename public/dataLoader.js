export default function load(data, iframe) {
  $("#lat").text("Latitude:  " + data.lat + " °");
  $("#lon").text("Longitude: " + data.lon + " °");

  let offset_in_mins = parseInt(Math.abs(data.timezone_offset) / 60);
  let offset_hours = parseInt(Math.floor(offset_in_mins / 60));
  let offset_mins = offset_in_mins - offset_hours * 60;

  $("#timeZone").text(
    "TimeZone: " +
      data.timezone +
      "(" +
      (data.timezone_offset < 0 ? "-" : "") +
      offset_hours +
      (offset_mins > 0 ? ":" + offset_mins : "") +
      ")"
  );
  $("#offset").text("");

  let d = new Date(data.current.dt * 1000);
  let sr = new Date(data.current.sunrise * 1000);
  let ss = new Date(data.current.sunset * 1000);
  $("#dt").text("Date-Time:" + d.toLocaleString());
  $("#sunrise").text("Sunrise: " + sr.toLocaleTimeString());
  $("#sunset").text("Sunset: " + ss.toLocaleTimeString());

  $("#temp").text("Temperature: " + data.current.temp + " °C");
  $("#feels").text("Feels like: " + data.current.feels_like + " °C");

  $("#weather_icon").attr(
    "src",
    `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  );
  $("#description").text(data.current.weather[0].description);

  $("#pressure").text("Pressure: " + data.current.pressure + " hPa");
  $("#humidity").text("Humidity: " + data.current.humidity + " %");
  $("#dewPoint").text("Dew Point: " + data.current.dew_point + " °C");

  $("#uvi").text("UVI: " + data.current.uvi);
  $("#clouds").text("Clouds: " + data.current.clouds + " %");

  $("#visibility").text("Visibility: " + data.current.visibility + " meters");

  $("#windSpeed").text("Wind Speed: " + data.current.wind_speed + " m/s");
  $("#windDeg").text("Wind Degree: " + data.current.wind_deg + " °");
  $("#loading").hide();
  $("#weatherData").removeClass("d-none");

  $("#map").replaceWith(iframe);
}
