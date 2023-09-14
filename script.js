const container = document.querySelector(".container");
const search = document.querySelector(".search");
const weatherBox = document.querySelector(".container-header");
const weatherInfo = document.querySelector(".weather-info");
const error = document.querySelector(".error");

search.addEventListener("click", () => {
  const APIKey = "1e668c06fcfe675245cf60329a6d97c9";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        error.classList.remove("not-found");
        error.classList.add("fade-in");
        return;
      }
      error.classList.add("not-found");
      error.classList.remove("fade-in");

      const image = document.querySelector(".weather-img img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-info .humidity");
      const wind = document.querySelector(".weather-info .wind");

      switch (json.weather[0].main) {
        case "Clear":
            image.src = "./assets/clear.jpg";
            break
        case "Clouds":
            image.src = "./assets/clouds.jpg";
            break
        case "Rain":
            image.src = "./assets/rain.jpg";
            break
        case "Snow":
            image.src = "./assets/snow.jpg";
            break
        case "Haze":
            image.src = "./assets/haze.jpg";
            break
        default:
            image.src = ''
            break
      }
      temperature.innerHTML = `${parseInt(json.main.temperature)}<span>°C</span>`
      description.innerHTML = `${json.weather[0].description}`
      humidity.innerHTML = `${json.main.humidity}%`
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

      weatherBox.classList.remove('not-found')
      weatherBox.classList.add('fade-in')
      weatherInfo.classList.remove('not-found')
      weatherInfo.classList.add('fade-in')
      image.classList.remove('not-found')
      image.classList.add('fade-in')
    });
});
