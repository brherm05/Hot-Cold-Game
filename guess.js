"use strict";

// global variables 
let randomNum = 0;
let tries = 0;

// helper function
const getRandomInt = (max = 100) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = (Math.floor(num)) + 1;           // round up to nearest integer
    return num;
};

// event handler functions
const guessClick = () => {
    const guess = parseInt(document.querySelector("#number").value);
    const best = parseInt(document.querySelector("#best_score").textContent)

    let message = "";
    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number."
        document.querySelector("#message").textContent = message;
        return;
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 100.";
        document.querySelector("#message").textContent = message;
        return;
    }
    tries++;
    let color = '';
    let distance = Math.abs(randomNum - guess);
    switch (true) {
        case (distance === 0):
            const lastWord = (tries === 1) ? "try" : "tries";
            message = `Fire! You guessed it in ${tries} ${lastWord}!`;
            color = "green";
            break;
        case (distance <= 5):
            message = "Hot! (Within 5)";
            color = "red";
            break;
        case (distance <= 10):
            message = "Warmer (Within 10)";
            color = "orangered";
            break;
        case (distance <= 20):
            message = "Warm (within 20)";
            color = "orange";
            break;
        case (distance <= 30):
            message = "Cold (Within 30)";
            color = "lightblue";
            break;
        case (distance <= 40):
            message = "Colder (Within 40)";
            color = "blue";
            break;
        default:
            message = "Freezing (Way off)";
            color = "darkblue";
            break;
    }

    document.querySelector("#history").innerHTML += `Guess ${tries}: ${guess} - ${message}<br>` ;
    document.querySelector("#message").style.color = color;
    document.querySelector("#message").textContent = message;
};

const playAgainClick = () => {
    randomNum = getRandomInt(100);
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
};

document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game
    console.log(randomNum);


    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);
});