const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const pressure_status = document.getElementById('pressure_status');
const humidity_status = document.getElementById('humidity_status');
const wind_status = document.getElementById('wind_status');
const current_day = document.getElementById('current_day');
const current_date = document.getElementById('current_date');

const datahide = document.querySelector('.middle_layer');

//Function to get current day and date
const getCurrentDay = () => {
  const currentTime = new Date();

  // To  get current Day
  const weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';

  const currentDay = weekday[currentTime.getDay()];

  current_day.innerText = currentDay;

  // To  get current date
  var year = currentTime.getFullYear();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();

  current_date.innerText = `${day}/${month}/${year}`;
};

const getInfo = async (event) => {
  // to avoid submission of form
  event.preventDefault();

  //API Key
  const key = `dbc6c91ab135568e9260ca168a9b99c6`;

  // cityValue holds the name of the city entered by the user
  let cityValue = cityName.value;

  if (cityValue === '') {
    //Result shown when search button is hit before entering city name.
    city_name.innerText = `Please Enter The City Name Before Search !`;
    datahide.classList.add('.data_hide');
  } else {
    //If everything goes right result is fetched.
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${key}`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];

      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp.innerText = arrData[0].main.temp + ' °C';
      temp_status.innerText = arrData[0].weather[0].main;
      pressure_status.innerText = arrData[0].main.pressure + ' hPa';
      humidity_status.innerText = arrData[0].main.humidity + ' %';
      wind_status.innerText = arrData[0].wind.speed + ' m/sec';

      datahide.classList.remove('data_hide');

      document.getElementById('cityName').value = '';
    } catch {
      city_name.innerText = `City Not Found. Please Try Again !`;
      datahide.classList.add('.data_hide');
    }
  }
};

submitBtn.addEventListener('click', getInfo);
getCurrentDay();
