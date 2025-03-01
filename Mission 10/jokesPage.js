// Constants for the page
const showJokesButton = document.getElementById("showJokesButton");
const jokesContainer = document.getElementById("jokesContainer");
// Get the structure from the HTML file
const jokeTemplate = document.getElementById("jokeTemplate").innerHTML;


function saveToFavorites(joke) {
    //Get the jokes from the local storage
    let favorites = localStorage.getItem("favoriteJokes");

    if (favorites === null) {
        favorites = []; // create empty arry for filling favorites
    } else {
        favorites = JSON.parse(favorites);
    }

    // Check if the joke is already in favorites, by matching id
    let jokeSaved = false;
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === joke.id) {
            jokeSaved = true;
            break;
        }
    }

    // Add if it's not already in favorites
    if (jokeSaved == false) {
        favorites.push(joke);
        localStorage.setItem("favoriteJokes", JSON.stringify(favorites));
    }
}

function displayJokes() {
    jokesContainer.innerHTML = ""; 

    jokesArray.forEach(joke => {
        const jokeCard = document.createElement("div");
        jokeCard.innerHTML = jokeTemplate;
        // Fill joke 
        jokeCard.querySelector(".setup").textContent = joke.setup;
        jokeCard.querySelector(".punchline").textContent = joke.punchline;
        // Add delete button
        const deleteButton = jokeCard.querySelector(".delete-joke");
        deleteButton.addEventListener("click", () => jokeCard.remove());
        // Add save to favorites button
        const saveButton = jokeCard.querySelector(".save-favorite");
        saveButton.addEventListener("click", () => saveToFavorites(joke));
        // Add to the jokes page
        jokesContainer.append(jokeCard);
    });
}

showJokesButton.addEventListener("click", displayJokes);
