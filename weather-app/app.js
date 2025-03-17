const apiKey = "c8fbcb3348a6bb150b912197549a956c";

async function checkWeather() {
    const city = document.getElementById("lokacija").value;
    const iconElement = document.querySelector(".weather");
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiURL);
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

    // Construct the icon URL
    var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

    // Create a new image element
    var img = document.createElement('img');
    img.src = iconURL; // Set the source of the image

    // Optionally, clear the existing icon and append the new image
    iconElement.innerHTML = '';  // Clear the current content inside the weather div
    iconElement.appendChild(img); // Add the new image element
}
