document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "8cd5ee188dad2ee648808f9e17b50a4d";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.getElementById("btn");
  const weatherIcon = document.querySelector(".weather-icon");

  let city = "colombo";

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    if (response.status == 404) {
      favicon.setAttribute("href", "images/favicon.png");
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      favicon.setAttribute("href", "images/clouds.png");
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/rain.png";
      favicon.setAttribute("href", "images/rain.png");
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/clear.png";
      favicon.setAttribute("href", "images/clear.png");
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      favicon.setAttribute("href", "images/drizzle.png");
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      favicon.setAttribute("href", "images/mist.png");
    }
  }

  searchBtn.addEventListener("click", searchLocation);

  function searchLocation() {
    if (searchBox.value === "") {
      checkWeather(city);
    } else {
      checkWeather(searchBox.value);
    }
  }

  checkWeather(city);
});
