// Object to store DOM elements for easier reuse
const DOM = {
    selectCategory: null,
    loader: null
  }
  
  // Initialization function – runs once on page load
  function init() {
    // Get and store references to HTML elements
    DOM.selectCategory = document.getElementById("categoriesSelect")
    DOM.loader = document.getElementById("loader")
  
    // Add change event to the dropdown
    DOM.selectCategory.addEventListener("change", function () {
      // If the selected value is the default placeholder, do nothing
      if (this.value === "noValue") return
  
      // Fetch products for the selected category
      getProductsByCategoryApi(this.value)
    })
  
    // Initial fetch to populate categories
    getCategoriesApi()
  }
  
  // Fetch list of product categories from the API
  function getCategoriesApi() {
    fetch(`https://dummyjson.com/products/categories`)
      .then(success)
      .catch(failed)
  
    // Handle successful response
    function success(data) {
      data.json().then(result => {
        drawCategories(result)
      })
    }
  
    // Handle fetch error
    function failed(error) {
      console.log(error)
      alert("Something went wrong!")
    }
  }
  
  // Render the categories in the dropdown
  function drawCategories(data) {
    // Ensure data is an array before processing
    if (!Array.isArray(data)) return
  
    // Loop through each category and append it to the <select>
    data.forEach(currentCategory => {
      // Here, we assume each category is an object with 'slug' and 'name'
      const optionElement = `<option value='${currentCategory.slug}'> ${currentCategory.name} </option>`
  
      // Append the option to the select
      DOM.selectCategory.innerHTML += optionElement
    })
  }
  
  // Fetch products from a specific category
  function getProductsByCategoryApi(categoryId) {
    // Show loading animation while fetching
    showLoader()
  
    // Send fetch request to API
    fetch(`https://dummyjson.com/products/category/${categoryId}`)
      .then(success)
      .catch(failed)
      .finally(() => {
        // Hide loading animation regardless of success/failure
        hideLoader()
      })
  
    // Handle success
    function success(data) {
      data.json().then(result => {
        draw(result.products)
      })
    }
  
    // Handle error
    function failed(error) {
      console.log(error)
      alert("Something went wrong!")
    }
  }
  
  // Render products on the page
  function draw(products) {
    // Create an array of <h2> elements for each product title
    const titles = products.map(p => `<h2>${p.title}</h2>`)
  
    // Insert the titles into the content div
    document.querySelector("#content").innerHTML = titles.join("")
  }
  
  // Show the loader animation
  function showLoader() {
    DOM.loader.style.display = "flex"
  }
  
  // Hide the loader animation
  function hideLoader() {
    DOM.loader.style.display = "none"
  }
  
  // Start everything
  init()
  