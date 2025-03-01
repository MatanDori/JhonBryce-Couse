// If your data is stored at `products.products`, then use:
//   let productsArray = products.products
// For simpler usage, if you changed the structure to just `products = [...]`, then:
let productsArray = products.products; 

function init() {
  // 1) Initial load
  loadCards(productsArray);

  // 2) Load products on button click
  document.getElementById("loadProductsButton")?.addEventListener("click", function () {
    loadCards(productsArray);
  });

  // 3) Search on button click
  document.getElementById("searchProductsButton")?.addEventListener("click", function () {
    const inputTextElement = document.getElementById("searchText");
    const searchText = inputTextElement.value.trim(); 
    const result = searchProducts(productsArray, searchText);
    loadCards(result);
  });
}

init();

/**
 * Filters products by partial title match.
 */
function searchProducts(arr, searchText) {
  if (!Array.isArray(arr)) return [];
  if (!searchText) return arr;

  const lowerSearch = searchText.toLowerCase();
  return arr.filter((product) => 
    product?.title?.toLowerCase().includes(lowerSearch)
  );
}

/**
 * Renders the given array of products as bootstrap cards.
 */
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
