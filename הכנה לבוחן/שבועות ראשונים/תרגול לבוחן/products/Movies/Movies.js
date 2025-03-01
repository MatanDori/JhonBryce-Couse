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

console.log(moviesData);//בדיקת שפיות קליטה

let selectedItems = []//מערך לבחירת סרטים וסדרות אהובים
function init() {
    //גישה לאלמנט מסיום בתוך המערך בעזרת קוורי סלקטור
    document.querySelector("#addSelectedItems").addEventListener("click", function () {
        selectedItems.forEach(function (imdbID) {
            addToFavorites(imdbID)
        })
        selectedItems = []//ריקון מערך הבחירה, לאחר הוספת האלמנטים בו לעמוד הסרטים והסדרות האהובים
        init();
    })
}
function getObjectById(id, arr) {
    // validations 
    if (!Array.isArray(arr)) return; // validate that array is array
    for (let index = 0; index < arr.length; index++) {
        const current = arr[index];
        if (current.id === id) {
            return current;
        }
    }
}

function addToFavorites(id) {
    const favoriteItem = getObjectById(id, moviesData)
    if (favoriteItem) {
        const favoritesString = localStorage.getItem("favoritesItems")  // fetch from LS (get)
        if (favoritesString) {
            let favoritesArray = []
            try {
                favoritesArray = JSON.parse(favoritesString)
            } catch (error) {
                console.log(error)
            }
            const found = getJokeObjById(favoriteItem.imdbID, favoritesArray)
            if (!found) {
                favoritesJokesArray.push(favoriteItem) // push into array
                const favoritesArrayString = JSON.stringify(favoritesArray)// JSON.stringify
                localStorage.setItem("favoritesItems", favoritesArrayString)// insert into LS (set)
                alertSuccess()
            } else {
                alertError()
            }
        } else {
            localStorage.setItem("favoritesItems", JSON.stringify([favoriteItem]))
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
    if (selectedItems.indexOf(Number(id)) === -1) {
        selectedItems.push(id)
    }
    init()
    console.log(selectedItems)
}

init()



//בונה את כרטיס הסרט
function getCardTemplate(data, action , isSelected = false) {
    const {Title,Year,Rated,Released,Runtime,Genre,Director,Writer,image,imdbRating,imdbVotes,imdbID,type} = data
    let button = `<h3> <button class="btn btn-primary" onClick="addToFavorites(${imdbID})"> Add </button> </h3>`
    if (action === 'remove') {
        button = `<h3> <button class="btn btn-danger" onClick="removeFromFavorites(${imdbID})"> Remove </button> </h3>`
    }
    const selectedClass = isSelected ? "selectedClass" : ""
    const buttonSelect = `<h3> <button class="btn btn-warning" onClick="selectItem(${imdbID})"> Select </button> </h3>`
    return `<div id="${imdbID}" class="card card-width ${selectedClass}" >
                <h3>${imdbID}</h3>
                <h2><span class="badge badge-light" style="background:blue">${type}</span></h2>
                <h2>${Title}</h2>
                <h2>${Year}</h2>
                <h2>${Rated}</h2>
                <h2>${Released}</h2>
                <h2>${Runtime}</h2>
                <h2>${Genre}</h2>
                <h2>${Director}</h2>
                <h2>${Writer}</h2>
                <h2>${image}</h2>
                <h2>${imdbRating}</h2>
                <h2>${imdbVotes}</h2>
                ${button}
                ${buttonSelect}
                </div>`
}
function loadCards(array, targetContent, action = "add", selectedItems = []) {
    if (!Array.isArray(array)) return; // validate that arrayOfCars is array
    const content = document.getElementById(targetContent) // Tomer remind me!
    if (!content) return;
    content.innerHTML = ""
    for (let index = 0; index < array.length; index++) {
        const currentObject = array[index]
        let cardHtml = null
        if(selectedItems.indexOf(currentObject.id) === -1){
            cardHtml =  getCardTemplate(currentObject, action, false)
        }else{
            cardHtml =  getCardTemplate(currentObject, action, true)
            // cardHtml
        }
        
        content.innerHTML += cardHtml
    }
}

function getObjectIndexById(id, arr) {
    // missing validations 
    if (!Array.isArray(arr)) return; // validate that arrayOfCars is array
    for (let index = 0; index < arr.length; index++) {
        const current = arr[index];
        if (current.id === id) {
            return index;
        }
    }

}

function loadTotalItems(total, targetContent)   {
   const result =  document.querySelector(`#${targetContent}`)
   result.innerText = total
}



