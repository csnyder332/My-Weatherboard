
let cityInput = document.getElementById("city"); 
let citiesList = []; 
let currentDate = document.getElementById("currentDate");
let cityForm = document.getElementById("formSearch"); 
let buttons = document.getElementById("buttons"); 
let cityEl = document.querySelector("#searchedCity"); 

// API calls
//Key: 10a0e4781eec8b320ad70c3967771d75
let getWeather = (city) => {
    let apiURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=10a0e4781eec8b320ad70c3967771d75";
    fetch(apiURL1)
      .then((response) => {
          response.json()
            .then((data) => {
                showWeather(data, city);
              });
        });
  };
  
  // GET 5-DAY FORECAST
  let getForecast = (city) => {
    let apiURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=10a0e4781eec8b320ad70c3967771d75";
    fetch(apiURL3)
      .then((response) => {
        response.json()
          .then((data) => {
            showForecast(data, city);
          });
      });
  };
  
  
  // submitQuery 
  let submitQuery = (event) => {
    event.preventDefault();
    let cityEl = cityInput.value.trim();
    let btn = document.createElement("button");
    btn.className = "searched-list btn";
    btn.innerHTML = cityEl; 
    buttons.appendChild(btn);
    listCity();
    if(!citiesList.includes(cityEl) && (cityEl != "")) {
      citiesList.push(cityEl);
    };
    localStorage.setItem("citiesList", JSON.stringify(citiesList));
    if(cityEl) {
      getWeather(cityEl);
      getForecast(cityEl);
      cityInput.value = "";
    } 
  };
  
  
  let listCity = () => {
    citiesList = JSON.parse(localStorage.getItem("citiesList"));
    if(!citiesList) {
      citiesList = [];
    };
  };
  
  // ADD BUTTONS TO SEARCH HISTORY
  let addList = () => {
    for(var i = 0; i < citiesList.length; i++) {
      let btn = document.createElement("button");
      btn.className = "searched-list btn"; 
      btn.innerHTML = citiesList[i];
      buttons.appendChild(btn); 
    };
  
    // USE PAST SEARCH BUTTON
    let listButtons = document.querySelectorAll(".searched-list");
    for(var i = 0; i < listButtons.length; i++) {
      listButtons[i].addEventListener("click", (event) => {
        getWeather(event.target.textContent);
        getForecast(event.target.textContent);
      })
    }
  };
  
  // Current Weather
  
  currentDate.textContent = moment()
    .format("(L)");
  
  // showWeather
  let showWeather = (weather, searchQuery) => {
    cityEl.textContent = searchQuery;
    iconEl = weather.weather[0];
    document.getElementById("todayTemp")
      .innerHTML = weather.main.temp;
    document.getElementById("todayHumidity")
      .innerHTML = weather.main.humidity;
    document.getElementById("todayWind")
      .innerHTML = weather.wind.speed;
  };
  
  // Forecast
  document.getElementById("day1")
    .innerHTML = moment()
    .add(1, "d")
    .format("MMMM Do");
  document.getElementById("day2")
    .innerHTML = moment()
    .add(2, "d")
    .format("MMMM Do");
  document.getElementById("day3")
    .innerHTML = moment()
    .add(3, "d")
    .format("MMMM Do");
  document.getElementById("day4")
    .innerHTML = moment()
    .add(4, "d")
    .format("MMMM Do");
  document.getElementById("day5")
    .innerHTML = moment()
    .add(5, "d")
    .format("MMMM Do");
  
  
  // getForecast (API Call) => showForecast
  
  
  let showForecast = (forecast, searchQuery) => {
    cityEl.textContent = searchQuery;
   
    document.getElementById("t1")
      .innerHTML = forecast.list[4].main.temp;
    document.getElementById("h1")
      .innerHTML = forecast.list[4].main.humidity;
      document.getElementById("w1")
      .innerHTML = forecast.list[4].wind.speed;
    iconEl1 = forecast.list[4].weather[0];
   
   
    document.getElementById("t2")
      .innerHTML = forecast.list[12].main.temp;
    document.getElementById("h2")
      .innerHTML = forecast.list[12].main.humidity;
      document.getElementById("w2")
      .innerHTML = forecast.list[12].wind.speed;
    iconEl2 = forecast.list[12].weather[0];
    
   
    document.getElementById("t3")
      .innerHTML = forecast.list[20].main.temp;
    document.getElementById("h3")
      .innerHTML = forecast.list[20].main.humidity;
      document.getElementById("w3")
      .innerHTML = forecast.list[20].wind.speed;
    iconEl3 = forecast.list[20].weather[0];
    
   
    document.getElementById("t4")
      .innerHTML = forecast.list[28].main.temp;
    document.getElementById("h4")
      .innerHTML = forecast.list[28].main.humidity;
      document.getElementById("w4")
      .innerHTML = forecast.list[28].wind.speed;
    iconEl4 = forecast.list[28].weather[0];
    
    
    document.getElementById("t5")
      .innerHTML = forecast.list[36].main.temp;
    document.getElementById("h5")
      .innerHTML = forecast.list[36].main.humidity;
      document.getElementById("w5")
      .innerHTML = forecast.list[36].wind.speed;
    iconEl5 = forecast.list[36].weather[0];
    
  };
  

  cityForm.addEventListener("submit", submitQuery);
  listCity();
  addList();
  



