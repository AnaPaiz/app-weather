/* Code to part resize from page */
import { img_backgrounds } from "./backgroundWather.js";

const fields = document.querySelector("#getData");
const country = document.querySelector("#country");
const city = document.querySelector("#city");
const message_error = document.querySelector(".message-error");
const container_first = document.querySelector(".container-first");
const container_details = document.querySelector(".details");
const nav_border = document.querySelector(".nav-item");

/*Parte automatico del clima */

window.addEventListener("resize", function ()  {
  if (this.window.innerWidth < 966) {
    container_first.classList.remove("w-50");
    container_details.classList.remove("w-50");
  } else {
    container_first.classList.add("w-50");
    container_details.classList.add("w-50");
  }
});

nav_border.addEventListener("click", function() {
  nav_border.classList.add("active");
})

const showErrow = (mensaje) => {
  const message = document.createElement("div");
  message.classList.add("alert", "alert-warning");
  message.innerHTML = mensaje;
  message_error.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
  return;
};

window.addEventListener("load", function () {
  this.navigator.geolocation.getCurrentPosition(getLocatitation, errorLocation);
});

const getLocatitation = (Getposition) => {
  const { latitude, longitude } = Getposition.coords;
  getFeatures(latitude, longitude);
  getSevenDays(latitude, longitude);
};

/* Para la ciudad de México */
const errorLocation = (getError) => {
  const error = getError.code;
  if (error === 1) {
    getFeatures(19.42847, -99.12766);
    getSevenDays(19.42847, -99.12766);
  }
};

const getFeatures = (lat, lon) => {
  const apiKey = "522eb3662e6c10938e86812ff3f9145c";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => putFeatures(data));
    //putFeatures(data)

  /*putDetails(dataJson) */
};

const getSevenDays = (lat, lon) => {
  fetch(
    `http://www.7timer.info/bin/civillight.php?lon=${lon}&lat=${lat}&product=astro&output=json`
  )
    .then((response) => response.json())
    .then((data) => putSevenDays(data));
};

const putFeatures = (data) => {
  const {name, main: { temp,temp_min,temp_max,feels_like,pressure,humidity,sea_level}, visibility, weather: [arr], wind: {speed}} = data;

  const area = document.createElement("div");
  area.classList.add("information-area", "rounded-3", "text-light", "fw-bold")
  area.innerHTML = `
  <h3 id="area" class="area"> ${name}</h3>
  <div class="layout-information d-flex ps-4">
    <div class="information-left w-75">
      <h2 class="temperature"> ${parseInt(temp)} °</h2>
      <div class="min-max d-flex flex-column">
        <p class="description me-3"> ${img_backgrounds[arr.icon][1]}</p>
        <p><span>Min:</span> ${parseInt(temp_min)} °<span> / </span><span>Max: </span> ${parseInt(temp_max)} °</p>
      </div>
    </div>

    <div class="information-right w-25 pt-3 text-center">
    <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
      <p id="thermal-sensation" class="thermal-sensation">
        <span>Sensación térmica: ${parseInt(feels_like)} ° </span>
      </p>
    </div>
  `;
  container_first.appendChild(area);
 backgroundsImg(arr.icon); 
  putDetails(pressure, humidity, speed, visibility);
};

const backgroundsImg = icon =>{
  console.log(icon);
  const url = "./img/img-background/"+ img_backgrounds[icon][0];
  container_first.style.backgroundImage = `url(${url})`;
};

const putDetails = (pressure, humidity, speed, visibility) => {
  const details = document.createElement("div");
  details.classList.add("d-flex", "justify-content-between", "align-items-center", "overflow-auto")
  details.innerHTML = `

<div class="details humidity p-3 text-center">
  <i class="fa-solid fa-droplet"></i>
  <h3>${humidity}%</h3>
  <p>Humedad</p>
</div>

<div class="details pressure p-3 text-center">
  <i class="fa-solid fa-arrows-up-down"></i>
  <h3>${pressure}MB</h3>
  <p>Presión</p>
</div>
<div class="details visibility p-3 text-center">
  <i class="fa-solid fa-eye"></i>
  <h3>${visibility}KM</h3>
  <p>Visibilidad</p>
</div>
<div class="details speed p-3 text-center">
  <i class="fa-solid fa-wind"></i>
  <h3>${speed} K/H</h3>
  <p>Velocidad</p>
</div>
  `;
  container_details.appendChild(details);

};

const putSevenDays = (data) => {


};

fields.addEventListener("click", (e) => {
  e.preventDefault();
  if (country.value === "Selecciona el país" || city.value === "") {
    showErrow("Todos los campos deben completarse");
  } else{

  }
});
