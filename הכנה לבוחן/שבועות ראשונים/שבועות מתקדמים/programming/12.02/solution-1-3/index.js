function init() {
    // Set up button event listeners

    // 1. Cars for Rent
    document.getElementById("loadCarsRentButton")?.addEventListener("click", function () {
        loadTable(carsForRental);
    });

    // 2. Cars for Sale
    document.getElementById("loadCarsSaleButton")?.addEventListener("click", function () {
        loadTable(carsForSale);
    });

    // 3. All Cars
    document.getElementById("loadAllCarsButton")?.addEventListener("click", function () {
        // Merge the two arrays via concat or spread syntax
        const all = carsForRental.concat(carsForSale);
        loadTable(all);
    });
}

// Call init() once the script is loaded
init();

// Clears the table headers and body
function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = "";
    document.getElementById("table-cars-body").innerHTML = "";
}

// Renders the table for a given array of car objects
function loadTable(arrayOfCars) {
    // Validate inputs
    if (!Array.isArray(arrayOfCars)) return;
    if (arrayOfCars.length === 0) return;

    clearTable();

    // The first object determines the headers
    const firstElement = arrayOfCars[0];
    // Get the keys from the first car object and sort them
    const fields = Object.keys(firstElement).sort();
    console.log(firstElement);
    console.log(fields);

    // Build table headers
    const theadTr = document.getElementById("table-cars-headers");
    if (theadTr) {
        for (let index = 0; index < fields.length; index++) {
            const th = document.createElement("th");
            // Replace underscores with spaces for better readability
            th.innerText = fields[index].replaceAll("_", " ");
            theadTr.append(th);
        }
        // Add an extra "Actions" column for the delete button
        theadTr.append(getTD("Actions", "", "th"));
    }

    // Build the table body rows
    const tBody = document.getElementById("table-cars-body");
    if (tBody) {
        for (let index = 0; index < arrayOfCars.length; index++) {
            const currentCar = arrayOfCars[index];
            const tr = document.createElement("tr");
            // Unique ID for the row (optional usage)
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`;

            // For each field, create a table cell
            for (let j = 0; j < fields.length; j++) {
                const currentField = fields[j];
                // Use a helper getTD() to create the <td> element
                tr.append(getTD(currentCar[currentField], "-"));
            }

            // Add a delete button
            const tdButton = getTdButton();
            tr.append(tdButton);

            // Append row to table body
            tBody.append(tr);
        }
    }
}

// Helper: Creates a table cell (td/th)
function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type);
    currentTD.innerHTML = value || defaultValue;
    return currentTD;
}

// Helper: Creates a delete button inside a <td>
function getTdButton() {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger");

    // Add a Bootstrap trash icon
    const icon = `<i class="bi bi-trash3"></i>`;
    button.innerHTML = icon;

    // On click, remove the row from the table
    button.addEventListener("click", function () {
        console.log(this.parentElement.parentElement.remove());
    });

    // Wrap the button in a <td>
    const tdButton = document.createElement("td");
    tdButton.append(button);
    return tdButton;
}
