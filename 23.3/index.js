function init() {
    fetchCategories()
    document.getElementById("categorySelect").addEventListener("change", onCategorySelected)
}

// Fetch categories 
function fetchCategories() {
    fetch("https://dummyjson.com/products/categories")
        .then(res => res.json())
        .then(categories => {
            drawCategories(categories)
        })
        .catch(err => {
            console.error("Error loading categories:", err)
        })
}

// Add categories 
function drawCategories(categories) {
    const select = document.getElementById("categorySelect")
    const options = categories.map(cat => `<option value="${cat}">${cat}</option>`)
    select.innerHTML += options.join("")
}



init()
