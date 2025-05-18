const apiKey="ea10f9a2729c546aafd1b8bf231b996e";
      const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
      const apiForecast="https://api.openweathermap.org/data/2.5/forecast?appid=ea10f9a2729c546aafd1b8bf231b996e&units=metric&q=";
      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".icon")
      const forecastCont = document.querySelector(".forecast")
      
      
      searchBtn.addEventListener("click",()=>{

        if(searchBox.value.trim != ''){
        
        checkWeather(searchBox.value);
        } 
      })
      searchBox.addEventListener("keydown",(event)=>{
        if(event.key == 'Enter' && searchBox.value.trim != ''){
          
          checkWeather(searchBox.value);  
        }
      })
      function getDate(){
        const currentDate = new Date();
        console.log(currentDate)
        options = {
          weekday: "short",
          day: '2-digit',
          month: 'short'
        }
        return currentDate.toLocaleDateString('en-GB',options)
      }
     
      async function checkWeather(city) {
        const resp =await fetch(apiUrl+city+`&appid=${apiKey}`);
         
         if(resp.status == 404)
        {
          document.querySelector(".info").style.display="none";
            document.querySelector(".error").style.display="block";
            document.querySelector(".searchMsg").style.display="none";
        }
        else{
           const weatherCard = document.querySelector(".info");
           weatherCard .classList.remove("show");
            document.querySelector(".error").style.display="none";

        var data = await resp.json();
        console.log(data);
         update(city);

       

      // Remove class first to restart animation (optional)
      
setTimeout(() => {
    weatherCard .classList.add("show");
}, 500);

        document.querySelector(".info").style.display="flex";
        document.querySelector(".searchMsg").style.display="none";
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector(".h5val").innerHTML=data.main.humidity+"%";
        document.querySelector(".h5val-wind").innerHTML=data.wind.speed+"Km/hr";
        document.querySelector(".weather-condition").innerHTML=data.weather[0].main;
        document.querySelector(".date").innerHTML= getDate();

        
         weatherIcon.src = `assets/weather/${getWeatherIcon(data.weather[0].id)}`; 
         
        
        }
        }
    
        
        async function update(city) {
          const response = await fetch(apiForecast+city);
          const forecast =await response.json();
          
          const time = '12:00:00'
          const todayDate =new Date().toISOString().split('T')[0];
         console.log(todayDate);
          forecastCont.innerHTML = '';
      forecast.list.forEach(forecastWeather => {
        
    if (
        forecastWeather.dt_txt &&
        forecastWeather.dt_txt.includes(time) &&
        !forecastWeather.dt_txt.includes(todayDate)
      ) {
        console.log(forecastWeather.dt_txt)
        updateForecast(forecastWeather);
        }   
      } );
         
          
        }
        function updateForecast(weatherData){
          const{
            dt_txt: date,
            weather: [{id}],
            main: { temp }
          } =weatherData
          
         
           const dateTaken = new Date(date);
           const dateOption={
            day: '2-digit',
            month: 'short'
           }
           const dateResult = dateTaken.toLocaleDateString('en-US',dateOption);
          
          const forecastItem =`
           <div class="forecast-item">
            <h5 class="forecast-data">${dateResult}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-img">
            <h5 class="forecast-temp">${Math.round(temp)}°C</h5>
          </div>
          `  
          forecastCont.insertAdjacentHTML('beforeend',forecastItem)
         }
 function getWeatherIcon(id){
  if(id<=232) return 'thunderstorm.svg';
  if(id<=321) return 'drizzle.svg';
  if(id<=531) return 'rain.svg';
  if(id<=622) return 'snow.svg';
  if(id<=781) return 'atmosphere.svg';
  if(id<=800) return 'clear.svg';

  else return 'clouds.svg';
  

 }
