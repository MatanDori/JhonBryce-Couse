// Store DOM elements here for easy access later
const DOM = {
    searchInput: null
}

// Initialization function – runs once at page load
function init() {
    // Get input element and store it in DOM object
    DOM.searchInput = document.getElementById("searchText")

    // Add event listener to "Search" button
    document.getElementById("searchButton").addEventListener("click", searchProduct)

    // Add event listener to "Search Only Iphones" button
    document.getElementById("searchOnlyIphones").addEventListener("click", searchOnlyIphones)
}

// Triggered when "Search Only Iphones" is clicked
function searchOnlyIphones() {
    callApi("iphone") // Hardcoded search query
}

// Triggered when "Search" is clicked
function searchProduct() {
    // Get input value and convert to lowercase
    const inputText = DOM.searchInput?.value?.toLowerCase()
    callApi(inputText)
}

// Send request to search API based on input text
function callApi(inputText) {
    fetch(`https://dummyjson.com/products/search?q=${inputText}`)
        .then(success)
        .catch(failed)

    // Handle successful response
    function success(data) {
        data.json().then((s) => {
            draw(s.products)
        })
    }

    // Handle failure
    function failed(error) {
        console.log(error)
        alert("Something went wrong!")
    }
}

// Display products inside the #content div
function draw(products) {
    const titles = products.map(p => {
        return `<h2>${p.title}</h2>` // Display each product title as an <h2>
    })

    document.querySelector("#content").innerHTML = titles.join("")
}

// Start the app
init()

// Function to get all products
const productsUrl = "https://dummyjson.com/products"
function callGetProducts() {
    showLoader(true)
    fetch(productsUrl).then((result) => { // result = HTTP response object
        result.json().then(data => {
            const products = data.products
            showLoader(false)
            draw(products)
        })
    }).catch(res => console.log(res))
}
function showLoader(show) {
    if (show) {
        document.querySelector("#content").innerHTML = "<h1>Loading...</h1>"
    } else {
        document.querySelector("#content").innerHTML = ""
    }
}