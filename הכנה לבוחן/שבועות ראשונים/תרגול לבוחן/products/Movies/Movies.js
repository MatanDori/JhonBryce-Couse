console.log(moviesData); // בדיקת תקינות נתונים

let selectedItems = []; // מערך לבחירת סרטים וסדרות אהובים

function init() {
    document.querySelector("#addSelectedItems").addEventListener("click", function () {
        selectedItems.forEach(function (imdbID) {
            addToFavorites(imdbID);
        });
        selectedItems = [];
        loadCards(moviesData, "moviesList"); // טעינה מחדש של הכרטיסים
    });

    // טוען סרטים בעת טעינת הדף
    loadCards(moviesData, "moviesList");
}

// קבלת אובייקט לפי ID
function getObjectById(id, arr) {
    if (!Array.isArray(arr)) return null;
    for (let index = 0; index < arr.length; index++) {
        if (arr[index].imdbID === id) {
            return arr[index];
        }
    }
    return null;
}

// פונקציה להוספת סרטים למועדפים
function addToFavorites(id) {
    const favoriteItem = getObjectById(id, moviesData);
    if (!favoriteItem) return;

    let favoritesArray = [];
    const favoritesString = localStorage.getItem("favoritesItems");

    if (favoritesString) {
        try {
            favoritesArray = JSON.parse(favoritesString);
        } catch (error) {
            console.error("Error parsing favorites:", error);
        }
    }

    let found = favoritesArray.some(item => item.imdbID === id);

    if (!found) {
        favoritesArray.push(favoriteItem);
        localStorage.setItem("favoritesItems", JSON.stringify(favoritesArray));
        alertSuccess("Added to favorites!");
    } else {
        alertError("Already in favorites!");
    }
}

// פונקציות לתצוגת הודעות
function alertSuccess(message) {
    Swal.fire({
        title: message,
        icon: "success"
    });
}

function alertError(message = "Already added") {
    Swal.fire({
        title: message,
        icon: "error"
    });
}

// בונה את כרטיס הסרטים לדף הרגיל
function getCardTemplate(data, action, isSelected = false) {
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Images, imdbRating, imdbVotes, imdbID, Type } = data;

    // Generate unique carousel ID for each movie
    const carouselId = `carousel-${imdbID}`;

    // Generate carousel items dynamically
    let carouselItems = "";
    for (let i = 0; i < Images.length; i++) {
        carouselItems += `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${Images[i]}" class="d-block w-100" style="height: 250px; object-fit: cover;">
            </div>
        `;
    }

    // Create Bootstrap Carousel
    let carousel = `
        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;

    let button = `<h3> <button class="btn btn-primary" onClick="addToFavorites('${imdbID}')"> Add </button> </h3>`;
    if (action === 'remove') {
        button = `<h3> <button class="btn btn-danger" onClick="removeFromFavorites('${imdbID}')"> Remove </button> </h3>`;
    }

    const selectedClass = isSelected ? "selectedClass" : "";
    const buttonSelect = `<h3> <button class="btn btn-warning" onClick="selectItem('${imdbID}')"> Select </button> </h3>`;

    return `<div id="${imdbID}" class="card card-width ${selectedClass} p-3 m-2">
                ${carousel} <!-- Carousel for images -->
                <div class="card-body">
                    <h3>${Title} (${Year})</h3>
                    <p><strong>Rated:</strong> ${Rated}</p>
                    <p><strong>Released:</strong> ${Released}</p>
                    <p><strong>Runtime:</strong> ${Runtime}</p>
                    <p><strong>Genre:</strong> ${Genre}</p>
                    <p><strong>Director:</strong> ${Director}</p>
                    <p><strong>Writer:</strong> ${Writer}</p>
                    <p><strong>IMDB Rating:</strong> ⭐ ${imdbRating} (${imdbVotes} votes)</p>
                    ${button}
                    ${buttonSelect}
                </div>
            </div>`;
}


// פונקציה לטעינת הסרטים
function loadCards(array, targetContent, action = "add") {
    if (!Array.isArray(array)) return;
    const content = document.getElementById(targetContent);
    if (!content) return;
    content.innerHTML = "";

    array.forEach((currentObject) => {
        const cardHtml = getCardTemplate(currentObject, action, selectedItems.includes(currentObject.imdbID));
        content.innerHTML += cardHtml;
    });
}

// טעינת סרטים בעת טעינת הדף הראשי
document.addEventListener("DOMContentLoaded", () => {
    init();
});

function generateMoviesStatistics() {
    let moviesCount = 0;
    let seriesCount = 0;

    // ספירת מספר הסרטים והסדרות
    for (let i = 0; i < moviesData.length; i++) {
        if (moviesData[i].Type === "movie") {
            moviesCount++;
        } else if (moviesData[i].Type === "series") {
            seriesCount++;
        }
    }

    // קבלת האלמנט של הקאנבס
    const ctx = document.getElementById("moviesChart").getContext("2d");

    // יצירת התרשים
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Movies", "Series"], // תוויות הקטגוריות
            datasets: [{
                data: [moviesCount, seriesCount], // הנתונים
                backgroundColor: ["#3498db", "#e74c3c"], // כחול לסרטים, אדום לסדרות
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top", // מיקום האגדה
                    labels: {
                        font: {
                            size: 14 // גודל גופן באגדה
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let dataset = tooltipItem.dataset.data;
                            let index = tooltipItem.dataIndex;
                            let value = dataset[index];
                            let label = tooltipItem.label;
                            return `${label}: ${value}`; // מציג "Movies: 5" או "Series: 3"
                        }
                    }
                }
            }
        }
    });
}

// קריאה לפונקציה בעת טעינת הדף
document.addEventListener("DOMContentLoaded", generateMoviesStatistics);

/*הופעת נתונים על גבי העוגה
function generateMoviesStatistics() {
    let moviesCount = 0;
    let seriesCount = 0;

    // ספירת מספר הסרטים והסדרות
    for (let i = 0; i < moviesData.length; i++) {
        if (moviesData[i].Type === "movie") {
            moviesCount++;
        } else if (moviesData[i].Type === "series") {
            seriesCount++;
        }
    }

    // קבלת האלמנט של הקאנבס
    const ctx = document.getElementById("moviesChart").getContext("2d");

    // רישום התוסף של Chart.js
    Chart.register(ChartDataLabels);

    // יצירת התרשים
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Movies", "Series"], // תוויות הקטגוריות
            datasets: [{
                data: [moviesCount, seriesCount], // הנתונים
                backgroundColor: ["#3498db", "#e74c3c"], // כחול לסרטים, אדום לסדרות
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let dataset = tooltipItem.dataset.data;
                            let index = tooltipItem.dataIndex;
                            let value = dataset[index];
                            let label = tooltipItem.label;
                            return `${label}: ${value}`;
                        }
                    }
                },
                datalabels: {
                    color: "#fff",
                    font: {
                        size: 18,
                        weight: "bold"
                    },
                    formatter: (value, context) => {
                        return value; // מציג את המספרים על התרשים
                    }
                }
            }
        }
    });
}

// קריאה לפונקציה בעת טעינת הדף
document.addEventListener("DOMContentLoaded", generateMoviesStatistics);

*/

// 1. use the following json data in the folder-done
// 2. draw the cards with the following info: -done
// "Title",
// "Year",
// "Rated",
// "Released",
// "Runtime",
// "Genre",
// "Director",
// "Writer",
// "image" - image
// "imdbRating" - icon stars
// "imdbVotes" - number
// "imdbID" - id
//  "Type" - string

// 3. add statistics pie chart with the types and number of movies\series for example {movies: 5, series: 2}-done
// 4. each movie has few images, support paging between the movies, button next/prev to switch between movies.
// 5. support adding movie to favorite, delete from favorite-done