function getFavorites() {
    const favoritesString = localStorage.getItem("favoritesItems");
    try {
        return favoritesString ? JSON.parse(favoritesString) : [];
    } catch (error) {
        console.error("Error parsing favorites:", error);
        return [];
    }
}

function removeFromFavorites(id) {
    let favoritesArray = getFavorites();
    favoritesArray = favoritesArray.filter(item => item.imdbID !== id);
    localStorage.setItem("favoritesItems", JSON.stringify(favoritesArray));
    alertSuccess("Removed from favorites");
    loadFavoriteMovies();
}

function alertSuccess(message) {
    Swal.fire({
        title: message,
        icon: "success"
    });
}

function getCardTemplate(data) {
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Images, imdbRating, imdbVotes, imdbID, Type } = data;

    return `<div id="${imdbID}" class="card card-width p-3 m-2">
                <img src="${Images[0]}" class="card-img-top" style="width: 100%; height: 250px; object-fit: cover;">
                <div class="card-body">
                    <h3>${Title} (${Year})</h3>
                    <p><strong>Rated:</strong> ${Rated}</p>
                    <p><strong>Released:</strong> ${Released}</p>
                    <p><strong>Runtime:</strong> ${Runtime}</p>
                    <p><strong>Genre:</strong> ${Genre}</p>
                    <p><strong>Director:</strong> ${Director}</p>
                    <p><strong>Writer:</strong> ${Writer}</p>
                    <p><strong>IMDB Rating:</strong> ⭐ ${imdbRating} (${imdbVotes} votes)</p>
                    <h3> <button class="btn btn-danger" onClick="removeFromFavorites('${imdbID}')"> Remove </button> </h3>
                </div>
            </div>`;
}

function loadFavoriteMovies() {
    const favoritesArray = getFavorites();
    const content = document.getElementById("favoritesList");
    content.innerHTML = "";

    if (favoritesArray.length === 0) {
        content.innerHTML = "<h3 class='text-center'>No favorite movies found.</h3>";
        generateFavoritesStatistics(); 
        return;
    }

    favoritesArray.forEach(movie => {
        content.innerHTML += getCardTemplate(movie);
    });

    setTimeout(generateFavoritesStatistics, 500); // Ensure chart renders after data loads
}

// 📊 Generate statistics for favorite movies/series
function generateFavoritesStatistics() {
    const favoritesArray = getFavorites();
    let movieCount = 0;
    let seriesCount = 0;

    favoritesArray.forEach(item => {
        if (item.Type === "movie") {
            movieCount++;
        } else if (item.Type === "series") {
            seriesCount++;
        }
    });

    // Ensure chart container exists
    const canvasElement = document.getElementById("favoritesChart");
    if (!canvasElement) {
        console.error("Chart canvas not found!");
        return;
    }

    const ctx = canvasElement.getContext("2d");

    // Destroy old chart before creating a new one
    if (window.favoritesChart) {
        window.favoritesChart.destroy();
    }

    // Ensure at least one data point exists
    if (movieCount === 0 && seriesCount === 0) {
        canvasElement.parentElement.innerHTML = "<h3 class='text-center'>No Data Available</h3>";
        return;
    }

    // Generate the pie chart
    window.favoritesChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Movies", "Series"],
            datasets: [{
                data: [movieCount, seriesCount],
                backgroundColor: ["#007bff", "#28a745"],
                borderColor: ["#fff", "#fff"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom"
                }
            }
        }
    });
}

// 📌 Ensure favorites load on page load
document.addEventListener("DOMContentLoaded", function () {
    loadFavoriteMovies();
});
