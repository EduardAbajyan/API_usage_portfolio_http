import load from "./dataLoader.js";

let a = new Date().getHours();
if (a < 7 || a > 20) {
  $("body").css(
    "background",
    "linear-gradient(to bottom, #0f172a, #1e293b, #334155)"
  );
  $(".container").css({
    "background-color": "rgba(15, 23, 42, 0.8)",
    "box-shadow": "0 8px 30px rgba(255, 255, 255, 0.15)",
  });
  $("p").css("color", "rgba(129, 201, 236, 0.8)");
  $("h2").css("color", "rgba(129, 201, 236, 0.8)");
  $("#map").css("opacity", "60%");
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      fetch("/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          load(res.data, res.iframeReplacement);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    function (error) {
      console.error("Error getting location:", error.message);
        $("#loading").html(
          "<p class='text-danger'>Location access denied. Showing default location.</p>"
        );
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
