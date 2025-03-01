const showJokesButton = document.getElementById("showJokesButton");
const jokesContainer = document.getElementById("jokesContainer");
const jokeTemplate = document.getElementById("jokeTemplate").innerHTML;

function getSavedJokes() {
    //Get the jokes from the local storage
    let favorites = localStorage.getItem("favoriteJokes");

    if (favorites === null) {
        return [];
    }

    // Convert the stored JSON string back into an array
    return JSON.parse(favorites);
}

function displayFavoriteJokes() {
    jokesContainer.innerHTML = ""; 
    let favoriteJokes = getSavedJokes(); 
    //Same build like in All jokes page
    favoriteJokes.forEach(joke => {
        const jokeCard = document.createElement("div");
        jokeCard.innerHTML = jokeTemplate;
        jokeCard.querySelector(".setup").textContent = joke.setup;
        jokeCard.querySelector(".punchline").textContent = joke.punchline;
        const deleteButton = jokeCard.querySelector(".delete-joke");
        deleteButton.addEventListener("click", () => jokeCard.remove());
        jokesContainer.append(jokeCard);
    });
}
showJokesButton.addEventListener("click", displayFavoriteJokes);
