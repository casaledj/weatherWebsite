let weather = {
  "apiKey": "f8c117dda8c4d41065901010970826d6",
  fetchWeather: function(city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
    + city 
    +"&units=imperial&appid=" 
    + this.apiKey
    ).then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    // will extract name from HTML
    const { name } = data;
    // use API calls to find it, data.weather is in the JSON of the API
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // make sure the ".city" is named same as in your HTML code
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon 
    + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
    document.querySelector(".weather").classList.remove("loading");
    // THIS WILL GET YOU BACKGROUND IMAGE BASED ON CITY NAME
    // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
  },
  search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value)
  }
};

document.querySelector(".search button").addEventListener("click", function(){
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(){
  if(event.key == "Enter"){
    weather.search();
  }
})

weather.fetchWeather("Denver");