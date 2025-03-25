var valueOfCounter = 0;

var upButton = document.querySelector(".upButton");
var downButton = document.querySelector(".downButton");
var resetButton = document.querySelector(".reset");
var bckgrButton = document.querySelector(".bckgrButton");

upButton.addEventListener("click", () => {
    valueOfCounter++;
    document.getElementById("value").innerHTML =  valueOfCounter;   
});

downButton.addEventListener("click", () => {
    valueOfCounter--;
    document.getElementById("value").innerHTML =  valueOfCounter;   
});

resetButton.addEventListener("click", () => {
    valueOfCounter = 0;
    document.getElementById("value").innerHTML = valueOfCounter;   
    // Randomize the background color or gradient
});

bckgrButton.addEventListener("click", () => {
    document.body.style.background = getRandomBackground();
});




function getRandomBackground() {
    // Create random colors for a gradient
    const randomColor1 = getRandomColor();
    const randomColor2 = getRandomColor();
    return `linear-gradient(to bottom, ${randomColor1}, ${randomColor2})`;
}

function getRandomColor() {
    // Generate a random color in hex format
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}