function init() {
    loadCards(getFavorites(), "jokesContentFavorites", "remove");
    updateFavoritesCount();
    updateCategoryStats();
}

init();
//Returns the array of favorite jokes which will be called in the homework function
function getFavorites() {
    let favoritesJokes = localStorage.getItem("favoritesJokes");
    if (favoritesJokes) {
        return JSON.parse(favoritesJokes);
    }
    return [];
}

function updateFavoritesCount() {
    document.getElementById("favoritesCount").innerText = getFavorites().length;
}

function updateCategoryStats() {
    const favoritesJokes = getFavorites();
    const categoryCount = {};//Object for each category

    for (let joke of favoritesJokes) {
        if (categoryCount[joke.type]) {
            categoryCount[joke.type]++;
        } else {
            categoryCount[joke.type] = 1;
        }
    }

    let statsText = "";//clear any before stats
    for (let category in categoryCount) {
        if (statsText !== "") {
            statsText += " | ";//A "barrier" between each category which is shown
        }
        statsText += category + ": " + categoryCount[category];
    }

    document.getElementById("categoryStats").innerText = statsText;//display
}
