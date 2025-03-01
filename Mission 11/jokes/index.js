// THIS ROW IS NOT RELATED TO THE DESTRUCTURING const joke11111 = { "type": "general", "setup": "What do birds give out on Halloween?", "punchline": "Tweets.", "id": 187 }
try {
    a
} catch (error) {
    console.log("we had an error!!!")
}

function init() {
    loadCards(jokes, "jokesContent")
    document.getElementById("totalJokes").innerText = jokes.length;//show num of jokes
    updateCategoryStats();
}

function addToFavorites(id) {
    const jokeToFavorite = getJokeObjById(id, jokes)
    if (jokeToFavorite) {
        const favoritesJokesString = localStorage.getItem("favoritesJokes")  // fetch from LS (get)
        if (favoritesJokesString) {
            const favoritesJokesArray = JSON.parse(favoritesJokesString) // JSON.parse 
            const found = getJokeObjById(jokeToFavorite.id, favoritesJokesArray)
            if (!found) {
                favoritesJokesArray.push(jokeToFavorite) // push into array
                const favoritesJokesArrayString = JSON.stringify(favoritesJokesArray)// JSON.stringify
                localStorage.setItem("favoritesJokes", favoritesJokesArrayString)// insert into LS (set)
                alertSuccess()
            } else {
                alertError()
            }
        } else {
            localStorage.setItem("favoritesJokes", JSON.stringify([jokeToFavorite]))
        }
    }
}

function alertSuccess() {
    Swal.fire({
        title: "Added successfully!",
        icon: "success"
    });
}
function alertError() {
    Swal.fire({
        title: "Already added!",
        icon: "error"
    });
}

function updateCategoryStats() {
    const categoryCount = {};

    for (let joke of jokes) {
        if (categoryCount[joke.type]) {
            categoryCount[joke.type]++;
        } else {
            categoryCount[joke.type] = 1;
        }
    }

    let statsText = "";
    for (let category in categoryCount) {
        if (statsText !== "") {
            statsText += " | ";
        }
        statsText += category + ": " + categoryCount[category];
    }

    document.getElementById("categoryStats").innerText = statsText;
}

init();
