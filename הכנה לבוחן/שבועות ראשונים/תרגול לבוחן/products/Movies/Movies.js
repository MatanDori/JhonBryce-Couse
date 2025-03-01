/*
1. use the following json data in the folder
2. draw the cards with the following info: 
"Title",
"Year",
"Rated",
"Released",
"Runtime",
"Genre",
"Director",
"Writer",
"image" - image
"imdbRating" - icon stars
"imdbVotes" - number
"imdbID" - id
 "Type" - string

3. add statistics pie chart with the types and number of movies\series for example {movies: 5, series: 2}
4. each movie has few images, support paging between the movies, button next/prev to switch between movies.
5. support adding movie to favorite, delete from favorite
*/

console.log(moviesData); // בדיקת שפיות קליטה

let selectedItems = []; // מערך לבחירת סרטים וסדרות אהובים

function init() {
    document.querySelector("#addSelectedItems").addEventListener("click", function () {
        selectedItems.forEach(function (imdbID) {
            addToFavorites(imdbID);
        });
        selectedItems = []; // ריקון מערך הבחירה לאחר הוספת האלמנטים
        init();
    });
}

function getObjectById(id, arr) {
    if (!Array.isArray(arr)) return; // validate that array is array
    for (let index = 0; index < arr.length; index++) {
        const current = arr[index];
        if (current.imdbID === id) {
            return current;
        }
    }
    return null;
}

function addToFavorites(id) {
    const favoriteItem = getObjectById(id, moviesData);
    if (favoriteItem) {
        const favoritesString = localStorage.getItem("favoritesItems");
        let favoritesArray = [];

        if (favoritesString) {
            try {
                favoritesArray = JSON.parse(favoritesString);
            } catch (error) {
                console.log(error);
            }
        }

        let found = false;
        for (let i = 0; i < favoritesArray.length; i++) {
            if (favoritesArray[i].imdbID === id) {
                found = true;
                break;
            }
        }

        if (!found) {
            favoritesArray.push(favoriteItem);
            localStorage.setItem("favoritesItems", JSON.stringify(favoritesArray));
            alertSuccess();
        } else {
            alertError();
        }
    }
}

function alertSuccess() {
    Swal.fire({
        title: "Added successfully!",
        icon: "success"
    });
}

function alertError(message = "Already added") {
    Swal.fire({
        title: message,
        icon: "error"
    });
}

function selectItem(id) {
    let exists = false;
    for (let i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i] === id) {
            exists = true;
            break;
        }
    }
    if (!exists) {
        selectedItems.push(id);
    }
    init();
    console.log(selectedItems);
}

// בונה את כרטיס הסרט
function getCardTemplate(data, action, isSelected = false) {
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Images, imdbRating, imdbVotes, imdbID, Type } = data;

    let button = `<h3> <button class="btn btn-primary" onClick="addToFavorites('${imdbID}')"> Add </button> </h3>`;
    if (action === 'remove') {
        button = `<h3> <button class="btn btn-danger" onClick="removeFromFavorites('${imdbID}')"> Remove </button> </h3>`;
    }

    const selectedClass = isSelected ? "selectedClass" : "";
    const buttonSelect = `<h3> <button class="btn btn-warning" onClick="selectItem('${imdbID}')"> Select </button> </h3>`;

    return `<div id="${imdbID}" class="card card-width ${selectedClass}">
                <img src="${Images[0]}" class="card-img-top" style="width: 100%; height: 250px;">
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

function loadCards(array, targetContent, action = "add", selectedItems = []) {
    if (!Array.isArray(array)) return; // validate that array is array
    const content = document.getElementById(targetContent);
    if (!content) return;
    content.innerHTML = "";

    for (let index = 0; index < array.length; index++) {
        const currentObject = array[index];
        let isSelected = false;

        for (let i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i] === currentObject.imdbID) {
                isSelected = true;
                break;
            }
        }

        let cardHtml = getCardTemplate(currentObject, action, isSelected);
        content.innerHTML += cardHtml;
    }
}

function getObjectIndexById(id, arr) {
    if (!Array.isArray(arr)) return; // validate that array is array
    for (let index = 0; index < arr.length; index++) {
        const current = arr[index];
        if (current.imdbID === id) {
            return index;
        }
    }
    return -1;
}

function loadTotalItems(total, targetContent) {
    const result = document.querySelector(`#${targetContent}`);
    result.innerText = total;
}

init();
