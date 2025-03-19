// Get references to DOM elements
const body       = document.querySelector("body");
const hourHand   = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");
const modeSwitch = document.querySelector(".mode-switch");

var date;
var secToDeg;
var minToDeg;
var hrToDeg;

if (localStorage.getItem("mode") === "Dark Mode") {
    body.classList.add("dark");
    modeSwitch.textContent = "Light Mode";
}

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    const isDarkMode = body.classList.contains("dark");
    
    modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
    
    console.log(date.getHours() + " " + date.getMinutes() + " " + date.getSeconds());
});

const updateTime = () => {

    date = new Date();
    secToDeg = (date.getSeconds() / 60) * 360;
    minToDeg = (date.getMinutes() / 60) * 360;
    hrToDeg = (date.getHours() / 12) * 360;

    secondHand.style.transform = `rotate(${secToDeg}deg)`;
    minuteHand.style.transform = `rotate(${minToDeg}deg)`;
    hourHand.style.transform = `rotate(${hrToDeg}deg)`;

    document.getElementById("hours").innerHTML   = date.getHours();
    document.getElementById("minutes").innerHTML = date.getMinutes();
    document.getElementById("seconds").innerHTML = date.getSeconds(); 

};

setInterval(updateTime, 1000);

updateTime();