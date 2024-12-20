
const apiKey="";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather_icon");


async function checkWeather(city) {
    completeUrl=apiUrl+`&appid=${apiKey}&q=${city}`;
    const response=await fetch(completeUrl);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
        throw new Error("Invalid City name");
    }
    document.querySelector(".error").style.display="none";
    var data= await response.json();
    return data;
    
} 

async function setDetails(cityName){
   
    const data= await checkWeather(cityName);
    // console.log(data);


    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".Wind").innerHTML=data.wind.speed + " Km/h ";
    
    console.log(data.weather[0].main);
    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main=="Clear"){
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="images/mist.png";
    }
    document.querySelector(".weather").style.display="block";

}

function execute(){
    setDetails(searchBox.value);
}
searchBtn.addEventListener("click",execute);
searchBox.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      execute();
    }
  });
//setDetails("noida");

