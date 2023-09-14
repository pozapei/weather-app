const container = document.querySelector(".container");
const search = document.querySelector(".search");
const weatherBox = document.querySelector(".weather-box");
const weatherInfo = document.querySelector(".weather-info");
const error = document.querySelector(".error");
const containerHeader = document.querySelector('.container-header')

search.addEventListener("click", () => {
  const APIKey = "1e668c06fcfe675245cf60329a6d97c9";
  const city = document.querySelector(".search-box input").value;

  const image = document.querySelector(".weather-img img");
  const temperature = document.querySelector(".weather-box .temperature ");
  const description = document.querySelector(".weather-box .description ");
  const humidity = document.querySelector(".weather-info .humidity span");
  const wind = document.querySelector(".weather-info .wind span");
  const weatherImg = document.querySelector('.weather-img')


  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        error.classList.remove("not-found");
        error.classList.add("fadeIn");
        weatherInfo.classList.add('not-found')
        containerHeader.style.height = "430px"
        error.style.fontSize = '16px'
        error.style.paddingTop = '16px'
        weatherImg.style.display = 'none'
        weatherBox.style.display = 'none'
        return;
      }
      error.classList.add("not-found");
      error.classList.remove("fadeIn");
      // applying css again (i remove cuz the app was messing everything )
      weatherBox.style.display = 'flex'
      weatherBox.style.flexDirection = 'column'
      weatherImg.style.display = 'flex'
      containerHeader.style.flexDirection = 'column'

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = "./assets/clear.jpg";
          break;

        case 'Clouds':
          image.src = './assets/clouds.jpg';
          break;

        case 'Rain':
          image.src = './assets/rain.jpg';
          break;

        case 'Snow':
          image.src = './assets/snow.jpg';
          break;

        case 'Haze':
          image.classList.remove('not-found')
          image.src = './assets/haze.jpg';
          break;

        default:
          image.classList.remove('not-found')
          image.src = ''
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
      description.innerHTML = `${json.weather[0].description}`
      humidity.innerHTML = `${json.main.humidity}%`
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`
      weatherBox.classList.remove('not-found')
      weatherInfo.classList.remove('not-found')
      image.classList.remove('not-found')
      weatherBox.classList.add('fadeIn')
      weatherInfo.classList.add('fadeIn')
      image.classList.add('fadeIn')
      containerHeader.style.height = '440px'
    });
});
