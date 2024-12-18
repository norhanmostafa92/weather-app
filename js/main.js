let dataContainer = [];

async function allData(callData) {
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=ce3696dc377b40498a1125419241612&q=${callData}&days=3`;
  const weatherData = await fetch(apiUrl);
  const allWeatherData = await weatherData.json();
  dataContainer = allWeatherData;
  currentWeather(dataContainer.location, dataContainer.current);
  anotherDays(dataContainer.forecast.forecastday);
}

allData("Alexandria");

document.getElementById("search-bar").addEventListener("keyup", function (e) {
  allData(e.target.value);
});

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function currentWeather(loca, curr) {
  const date = new Date(curr.last_updated);
  let today = `
    <div class="col-lg ps-0 pe-0 ms-3 me-3 mb-4 gy-5">
      <div class="head-content d-flex justify-content-between bg-secondary-subtle ps-3 pe-3 pt-3 pb-3 rounded-5">
        <small class="text-black"><i class="fa-solid fa-calendar-days me-2 fs-6"></i>${days[date.getDay()]}</small>
        <small class="text-black">${date.getDate()} ${months[date.getMonth()]}</small>
      </div>
      <div class="row text-center bg-dark m-0 rounded-5 p-2 mt-2 h-100">
        <span class="col-12 mt-1 text-white d-flex justify-content-center"><i class="fa-solid fa-location-dot me-2 fs-6 align-middle"></i>${loca.name}</span>
        <span class="col-12 display-1 fw-bolder lh-base text-white"><i class="fa-solid fa-thermometer-half me-2"></i>${curr.temp_c}</span>
        <img src="${curr.condition.icon}" class="col-12 w-auto fw-bolder m-auto text-center img-fluid" alt="${curr.condition.text}" style="display: block; margin-left: auto; margin-right: auto; width: 2.5rem;">
        <span class="col-12 text-white fw-normal">${curr.condition.text}</span>
        <div class="footer-content text-white col-12 d-flex justify-content-center">
          <span><i class="fa-solid fa-umbrella me-2 fs-6"></i>20%</span>
          <span><i class="fa-solid fa-wind ms-3 me-2 fs-6"></i>18km/h</span>
          <span><i class="fa-solid fa-angles-right ms-3 me-2 fs-6"></i>East</span>
        </div>
      </div>
    </div>`;
  document.getElementById("weatherDisp").innerHTML = `<h3 class="text-center text-white fw-bolder mt-5 mb-2">3 Days Forecast</h3>` + today;
}

function anotherDays(daysData) {
  let otherDays = "";
  for (let i = 1; i < daysData.length; i++) {
    const date = new Date(daysData[i].date);
    otherDays += `
      <div class="col-lg ps-0 pe-0 ms-3 me-3 mb-4 gy-5">
        <div class="head-content d-flex justify-content-between ps-3 pe-3 pt-3 pb-3 rounded-5" style="background-color: #d1e405;">
          <small class="text-black"><i class="fa-solid fa-calendar-days me-2 fs-6"></i>${days[date.getDay()]}</small>
          <small class="text-black">${date.getDate()} ${months[date.getMonth()]}</small>
        </div>
        <div class="row text-center m-0 rounded-5 p-2 mt-2 h-100" style="background-color:rgb(114, 114, 114);">
          <img src="${daysData[i].day.condition.icon}" class="col-12 w-auto fw-bolder m-auto text-center img-fluid" alt="${daysData[i].day.condition.text}" style="display: block; margin-left: auto; margin-right: auto; width: 2.5rem;">
          <span class="col-12 fs-4 fw-bolder lh-base text-white">${daysData[i].day.maxtemp_c} <sup>o</sup>C</span>
          <span class="col-12 fs-6 fw-light lh-base text-white">${daysData[i].day.mintemp_c} <sup>o</sup>C</span>
          <span class="col-12 fs-6  fw-normal text-white">${daysData[i].day.condition.text}</span>
        </div>
      </div>
    `;
  }
  document.getElementById("weatherDisp").insertAdjacentHTML("beforeend", otherDays);
}

