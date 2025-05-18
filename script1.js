const apiKey="ea10f9a2729c546aafd1b8bf231b996e";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";      const apiForecast="https://api.openweathermap.org/data/2.5/forecast?appid=ea10f9a2729c546aafd1b8bf231b996e&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".icon")

searchBtn.addEventListener("click", () => {
    
    
    if (searchBox.value.trim() !== '') {
        checkWeather(searchBox.value.trim());
    }
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === 'Enter' && searchBox.value.trim() !== '') {
        checkWeather(searchBox.value.trim());
    }
});

function checkWeather(city){
    const resp = getFetchData('weather',city);

     if(resp.status == 404)
        {
          document.querySelector(".info").style.display="none";
            document.querySelector(".error").style.display="block";
            document.querySelector(".searchMsg").style.display="none";
        }else{
           const weatherCard = document.querySelector(".info");
           weatherCard .classList.remove("show");

        
       
        

       

      // Remove class first to restart animation (optional)
      
    setTimeout(() => {
        weatherCard .classList.add("show");
    }, 500);

        document.querySelector(".info").style.display="flex";
        document.querySelector(".searchMsg").style.display="none";
        document.querySelector(".city").innerHTML=resp.name;
        document.querySelector(".temp").innerHTML=Math.round(resp.main.temp)+"°C";
        document.querySelector(".h5val").innerHTML=resp.main.humidity+"%";
        document.querySelector(".h5val-wind").innerHTML=resp.wind.speed+"Km/hr";
        document.querySelector(".weather-condition").innerHTML=resp.weather[0].main;
        document.querySelector(".date").innerHTML= getDate();


         if(resp.weather[0].main == "Clouds"){
          weatherIcon.src = "assets/weather/clouds.svg" ;
        } else if(resp.weather[0].main == "Clear"){
          weatherIcon.src = "assets/weather/clear.svg"; 
        }else if(resp.weather[0].main == "Clouds"){
          weatherIcon.src = "assets/weather/clouds.svg"; 
        }else if(resp.weather[0].main == "Drizzle"){
          weatherIcon.src = "assets/weather/drizzle.svg"; 
        }else if(resp.weather[0].main == "Rain"){
          weatherIcon.src = "assets/weather/rain.svg"; 
        }else if(resp.weather[0].main == "Snow"){
          weatherIcon.src = "assets/weather/snow.svg"; 
        }
        else if(resp.weather[0].main == "Thunderstorm"){
          weatherIcon.src = "assets/weather/thunderstorm.svg"; 
        }
        
        }
        }


async function getFetchData(end,city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/${end}?units=metric&q=${city}&appid=${apiKey}`;     
    
    const response = await fetch(apiUrl);

    return response.json();

    

}