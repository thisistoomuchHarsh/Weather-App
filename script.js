// WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const apiKey = "6c6f7ee92b4c663340cbe9efd388253c";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";

  const cityName = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityName.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityName.classList.add("cityName");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  weatherCard.appendChild(cityName);
  weatherCard.appendChild(tempDisplay);
  weatherCard.appendChild(humidityDisplay);
  weatherCard.appendChild(descDisplay);
  weatherCard.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
      break;
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
      break;
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
      break;
    case weatherId >= 600 && weatherId < 700:
      return "🌨️";
      break;
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
      break;
    case weatherId === 800:
      return "☀️";
      break;
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
      break;

    default:
      return "❓";
      break;
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";
  weatherCard.append(errorDisplay);
}
