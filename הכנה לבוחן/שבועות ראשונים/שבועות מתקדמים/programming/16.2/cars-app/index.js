/***************************************
 * index.js
 * 
 * Handles merging arrays, searching by numeric
 * threshold, adding new cars to the array,
 * generating a dynamic table, etc.
 ***************************************/

// Constants to unify references
const DOM_IDS = {
    Horsepower: "Horsepower",
    Acceleration: "Acceleration",
    Name: "Name",
};

// Pointers to key DOM elements for easy usage
const DOM = {
    searchButton: document.getElementById("searchCars"),
    searchInput: document.getElementById("searchValue"),
    selectOptionKey: document.getElementById("keySelect"),
    newCarForm: {
        name: document.getElementById(DOM_IDS.Name),
        horsePowerInput: document.getElementById(DOM_IDS.Horsepower),
        acceleration: document.getElementById(DOM_IDS.Acceleration),
        newCarButton: document.getElementById("newCarButton")
    }
};

// Merge arrays: allCars will contain both rental & sale
const allCars = carsForRental.concat(carsForSale);

/**
 * Initializes event listeners, loads default states,
 * sets up the page on load.
 */
function init() {
    // Retrieve (if any) previously selected search values from localStorage
    loadDefaultsFromLS();

    // 1) Adding a new car
    DOM.newCarForm.newCarButton.addEventListener("click", function () {
        // Build a newCar object from form inputs
        const newCar = {
            [DOM_IDS.Horsepower]: +DOM.newCarForm.horsePowerInput.value,
            [DOM_IDS.Acceleration]: +DOM.newCarForm.acceleration.value,
            [DOM_IDS.Name]: DOM.newCarForm.name.value
        };
        // Push newCar into allCars array
        allCars.push(newCar);
        // Re-load the table so user sees the new entry
        loadTable(allCars);
    });

    // 2) Search logic: enable/disable button based on user inputs
    DOM.selectOptionKey.addEventListener("change", function () {
        validateButtonDisabled(this.value, DOM.searchInput.value, DOM.searchButton);
        localStorage.setItem("selectOptionKey", this.value);
    });
    DOM.searchInput.addEventListener("change", function () {
        validateButtonDisabled(DOM.selectOptionKey.value, this.value, DOM.searchButton);
        localStorage.setItem("inputValue", this.value);
    });

    // When user clicks "Search Cars", we filter by chosen key
    DOM.searchButton?.addEventListener("click", function () {
        const value = DOM.searchInput.value;
        const key = DOM.selectOptionKey.value;
        const result = searchCars(allCars, key, value);
        loadTable(result);
    });

    // 3) Buttons to load different sets
    document.getElementById("loadCarsRentButton")?.addEventListener("click", function () {
        loadTable(carsForRental);
    });
    document.getElementById("loadCarsSaleButton")?.addEventListener("click", function () {
        loadTable(carsForSale);
    });
    document.getElementById("loadAllCarsButton")?.addEventListener("click", function () {
        loadTable(allCars);
    });
}

/**
 * Loads any default (saved) search input or selected key from localStorage
 */
function loadDefaultsFromLS() {
    const localStorageInputValue = localStorage.getItem("inputValue");
    if (localStorageInputValue) {
        DOM.searchInput.value = localStorageInputValue;
    }
    const localStorageSelectedKey = localStorage.getItem("selectOptionKey");
    if (localStorageSelectedKey) {
        DOM.selectOptionKey.value = localStorageSelectedKey;
    }
}

/**
 * Filters cars by checking if car[key] >= value
 */
function searchCars(cars, key, value) {
    if (!key || !value) return;
    if (!Array.isArray(cars)) return;

    const valueNum = +value; // convert to a number
    let result = [];
    for (let index = 0; index < cars.length; index++) {
        const currentCar = cars[index];
        // Only keep the car if the property is >= user threshold
        if (currentCar[key] >= valueNum) {
            result.push(currentCar);
        }
    }
    return result;
}

/**
 * Enables / Disables the "Search Cars" button if either
 * we have no selected property or empty input
 */
function validateButtonDisabled(selectValue, inputValue, buttonToDisable) {
    if (selectValue === "0" || inputValue === "") {
        buttonToDisable.disabled = true;
    } else {
        buttonToDisable.disabled = false;
    }
}

// Call init on page load
init();

/**
 * Clears the table's header and body
 */
function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = "";
    document.getElementById("table-cars-body").innerHTML = "";
}

/**
 * Renders the cars in a dynamic table
 * 
 * 1) Clears old data
 * 2) Takes keys from the first object to build columns
 * 3) For each car, builds a <tr> with <td> for each field
 * 4) Adds a trash icon in the last column for row removal
 */
function loadTable(arrayOfCars) {
    if (!Array.isArray(arrayOfCars)) return;
    if (arrayOfCars.length === 0) return;
    
    clearTable();

    // We'll use the keys from the first object to create the table columns
    const firstElement = arrayOfCars[0];
    const fields = Object.keys(firstElement).sort();
    console.log(firstElement);
    console.log(fields);

    // Build the header row
    const theadTr = document.getElementById("table-cars-headers");
    if (theadTr) {
        for (let index = 0; index < fields.length; index++) {
            const th = document.createElement("th");
            // Replace underscores with spaces for nicer display
            th.innerText = fields[index].replaceAll("_", " ");
            theadTr.append(th);
        }
        // Add a final "Actions" column
        theadTr.append(getTD("Actions", "", "th"));
    }

    // Build each row in table-cars-body
    const tBody = document.getElementById("table-cars-body");
    if (tBody) {
        for (let index = 0; index < arrayOfCars.length; index++) {
            const currentCar = arrayOfCars[index];
            const tr = document.createElement("tr");
            
            // ID for the row can incorporate the car's Name + index
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`;

            // Create a <td> for each field
            for (let j = 0; j < fields.length; j++) {
                const currentField = fields[j];
                tr.append(getTD(currentCar[currentField], "-"));
            }

            // Add "delete" button cell
            const tdButton = getTdButton();
            tr.append(tdButton);

            // Append row to the table body
            tBody.append(tr);
        }
    }
}

/**
 * Creates a table cell (<td> or <th>) with the given value
 * If value is falsy, fallback to defaultValue
 */
function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type);
    currentTD.innerHTML = value || defaultValue;
    return currentTD;
}

/**
 * Creates a <td> containing a button with a trash icon
 * The button removes the row from the DOM
 * (Note: This does NOT remove the item from the array)
 */
function getTdButton() {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger");

    // Bootstrap icon for trash
    const icon = `<i class="bi bi-trash3"></i>`;
    button.innerHTML = icon;

    // On click, remove the entire <tr> from the DOM
    button.onclick = function () {
        console.log(this.parentElement.parentElement.remove());
    };

    // Wrap the button in a <td>
    const tdButton = document.createElement("td");
    tdButton.append(button);
    return tdButton;
}
