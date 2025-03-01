let productsArray = products.products; 

function init() {
    document.getElementById("loadProductsButton")?.addEventListener("click", function () {
        loadCards(productsArray);
    });

    document.getElementById("searchButton")?.addEventListener("click", function () {
        searchProducts();//הפעלת הכפתור
    });

    document.getElementById("searchInput")?.addEventListener("input", function () {
        searchProducts(); // חיפוש בזמן אמת
    });
}
init();

// פונקציה לחיפוש מוצרים
function searchProducts() {
    let input = document.getElementById("searchInput").value.trim(); // לוקח את הערך מהחיפוש
    let filteredProducts = productsArray.filter(product => product.title.includes(input));

    loadCards(filteredProducts);
}

function loadCards(arrayOfProducts) {
    const content = document.getElementById("content");
    content.innerHTML = ""; 
    
    if (arrayOfProducts.length === 0) {
        content.innerHTML = "<h3>No products found</h3>";
        return;
    }

    arrayOfProducts.forEach(product => {
        content.innerHTML += getCardTemplate(product.id, product.description, product.title, product.images[0], product.price);
    });
}

function getCardTemplate(id, description, title, image, price) {
    return `
        <div id="${id}" class="card card-width p-3">
            <h2>${title}</h2>
            <h2>ID: ${id}</h2>
            <img height="150" width="150" src="${image}" alt="">
            <p>${description}</p>
            <h3>Price: $${price}</h3>
            <button class="btn btn-danger" onClick="deleteMe(${id})">Delete</button>
        </div>
    `;
}

function deleteMe(id) {
    productsArray = productsArray.filter(product => product.id !== id);
    loadCards(productsArray);
}
