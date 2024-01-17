/* KEY */
const API_KEY = "80ebbe55c86e4ee3a4d122647231411";

/* CODE */

const INPUT = document.getElementById("input");
const SEARCH = document.getElementById("search");

const IMAGE = document.querySelector("img")
const TEMPERATURE = document.getElementById("temperature");
const LOCATION = document.getElementById("location");

const PRECIPITATIONS = document.getElementById("precipitations");
const WIND_SPEED = document.getElementById("wind-speed");

const CONDITIONS = {
    "sunny": [1000],
    "cloudy-sunny": [1003],
    "very-cloudy": [1006, 1009],
    "fog": [1030, 1135, 1147],
    "rainy": [1063, 1168, 1171, 1186, 1189, 1192, 1195, 1201, 1243, 1246, 1003, 1003, 1003],
    "rainy-sunny": [1150, 1153, 1180, 1183, 1198, 1240, 1003, 1003, 1003, 1003, 1003],
    "snowy": [1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264], 
    "storm": [1087, 1273, 1276, 1279, 1282]
}

INPUT.addEventListener("click", () => {
    if(INPUT.classList.contains("error")){
        INPUT.placeholder = "Search";
        INPUT.classList.remove("error");
    }
})

SEARCH.addEventListener("click", () => fetchWeather(INPUT.value));
document.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        fetchWeather(INPUT.value)
    }
})

async function fetchWeather(input){
    try{

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}&aqi=no`);
    
    if(!response.ok){
        INPUT.value = "";
        INPUT.placeholder = "Couldn't find the specified location";
        INPUT.classList.add("error")
    }

    const data = await response.json();

    IMAGE.src = `${getImage(data.current.condition.code)}.png`;
    TEMPERATURE.textContent = data.current.temp_c;
    LOCATION.textContent = `${data.location.name}, ${data.location.country}`;

    PRECIPITATIONS.textContent = `${Math.floor(data.current.precip_in * 10000) / 100} %`;
    WIND_SPEED.textContent = `${data.current.wind_kph} km/h`;

    }
    catch(error){
        console.error(error);
    }
}

function getImage(code){
    for(var key in CONDITIONS){
        if(CONDITIONS[key].includes(code)){
            return key;
        }
    }
}

fetchWeather("Rabat")
