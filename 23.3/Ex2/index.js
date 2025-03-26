// products to skip until the shown of the first wanted product
let currentSkip = 0

//products to load per page
const limit = 3

// DOM references for getting elemnts
const DOM = {
    content: document.getElementById("content"),
    nextButton: document.getElementById("next"),
    previousButton: document.getElementById("prev")
  }

function init() {
    fetchProducts(currentSkip)
  
    DOM.nextButton.addEventListener("click", () => {
      currentSkip += limit 
      fetchProducts(currentSkip)
    })
  
    DOM.previousButton.addEventListener("click", () => {
      if (currentSkip === 0) return
  
      currentSkip -= limit 
      fetchProducts(currentSkip)
    })
  }

function fetchProducts(skip) {
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`).then(success).catch(failed)
  
      function success(response) {
      response.json().then(data => {
        renderProducts(data.products)
      })
    }
  
      function failed(error) {
      console.error("Error fetching products:", error)
      alert("Something went wrong!")
    }
  }

  // Render product titles inside the #content element
function renderProducts(products) {
    const html = products.map(p => `<h2>${p.title}</h2>`).join("")
    DOM.content.innerHTML = html
  }

  init()