const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// update the city details
const updateCity = async city => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  // return the object with shorthand
  return {
    cityDets,
    weather,
  };
};

// Add event listener to the form input
cityForm.addEventListener("submit", e => {
  // prevent default of form
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update ui with the new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});

const updateUI = data => {
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // destructured as per above
  const { cityDets, weather } = data;

  // update the deatils template
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
  `;

  // remove d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
