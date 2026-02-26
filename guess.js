/*
Hot & Cold Game
Author: Brayden Hermanson
Summary: This program is a number guessing game, a number between 1 and 100 is chosen, and the user must guess
the number using input provided by the program for every guess.
Completion Date: 2/26/2026
GitHub: https://github.com/brherm05/Hot-Cold-Game
 */
"use strict";

// global variables 
let randomNum = 0;
let tries = 0;

// helper function
const getRandomInt = (max = 100) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = (Math.floor(num)) + 1;// round up to nearest integer
    console.log(num);
    return num;
};

const updateBestScore = () => {
    const best = parseInt(document.querySelector("#best_score").textContent);
    if (tries < best || isNaN(best)) {
        document.querySelector("#best_score").textContent = tries;
    }
}

// event handler functions
const guessClick = () => {
    document.getElementById("number").focus();
    const guess = parseInt(document.querySelector("#number").value);

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
    let color = 'black';
    let distance = Math.abs(randomNum - guess);
    switch (true) {
        case (distance === 0):
            const lastWord = (tries === 1) ? "try" : "tries";
            message = `Fire! You guessed it in ${tries} ${lastWord}!`;
            color = "green";
            updateBestScore();
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

    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);

    document.querySelector("#number").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            guessClick();
        }
    });
});