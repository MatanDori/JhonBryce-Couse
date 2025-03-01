/*
Create new application which drawing the following data set as cards: 
Note that the products array exist inside the following path `products.products`
feel free to change it, so it will be only `products` when acccessing the array
- in a card view, show the product id, title, image, description and price.
*/
function init() {
    // Set up button event listeners
    let productsArray = products.products
    loadCards(productsArray);
    // 1. Load Products
    document.getElementById("loadProductsButton")?.addEventListener("click", function () {
        loadTable(productsArray);
    });
    //2. search Button
    document.getElementById("searchProductsButton")?.addEventListener("click", function () {
        const input = document.getElementById("searchText");//קליטת הקלט מבר החיפוש
        const value = input.value.trim();//סינון
        const result = searchProducts(productsArray , value);//קריאה לפונקציית החיפוש
        loadCards(result);
    });
    
}

function searchProducts(arr , text){
    //Validation
  if (!Array.isArray(arr)) return [];
  if (!text) return arr;
  const lowerSearch = searchText.toLowerCase();
  return arr.filter(function(product) {
    // Make sure product and product.title exist before calling toLowerCase
    if (!product || !product.title) return false;
  
    // Convert the title to lowercase, and check if it includes the search text
    const lowerTitle = product.title.toLowerCase();
    return lowerTitle.includes(lowerSearch);
  });
  
}
function loadCards(arrayOfProducts) {
    const contentDiv = document.getElementById("content");
    if (!contentDiv) return;
    // Clear old contents
    contentDiv.innerHTML = "";
  
    arrayOfProducts.forEach((product) => {
      // Build card's HTML
      const cardHtml = getCardTemplate({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0] : product.thumbnail 
      });
  
      // Append the card
      contentDiv.innerHTML += cardHtml;
    });
  }
  /**
 * Returns HTML string for a single card
 */
function getCardTemplate({ id, title, description, price, image }) {
    return `
    <div id="product-${id}" class="card card-width p-2">
      <h4>${title}</h4>
      <h5>ID: ${id}</h5>
      <img height="200" width="200" src="${image}" alt="product-${id}" />
      <p>${description}</p>
      <h5>Price: $${price}</h5>
      <button class="btn btn-danger" onClick="deleteProduct(${id})">Delete</button>
    </div>
    `;
  }
  /**
 * Deletes a product from the array by ID, then re-renders
 */
function deleteProduct(id) {
    productsArray = productsArray.filter((p) => p.id !== id);
    loadCards(productsArray);
  }
  

// Call init() once the script is loaded
init();