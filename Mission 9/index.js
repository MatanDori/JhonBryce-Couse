function init() {
    document.getElementById("loadCarsRentButton")?.addEventListener("click", function () {
        loadTable(carsForRental);
    });
    document.getElementById("loadCarsSaleButton")?.addEventListener("click", function () {
        loadTable(carsForSale);
    });
    document.getElementById("loadAllCarsButton")?.addEventListener("click", function () {
        const all = carsForRental.concat(carsForSale);
        loadTable(all);
    });
    
    document.getElementById("searchInput")?.addEventListener("input", function () {
        searchAndLoadTable();
    });
}

init();

function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = "";
    document.getElementById("table-cars-body").innerHTML = "";
}

function loadTable(arrayOfCars) {
    if (!Array.isArray(arrayOfCars) || arrayOfCars.length === 0) return;
    clearTable();
    
    const firstElement = arrayOfCars[0];
    const fields = Object.keys(firstElement).sort();
    
    const theadTr = document.getElementById("table-cars-headers");
    if (theadTr) {
        fields.forEach(field => {
            const th = document.createElement("th");
            th.innerText = field.replaceAll("_", " ");
            theadTr.append(th);
        });
        theadTr.append(getTD("Actions", "", "th"));
    }

    const tBody = document.getElementById("table-cars-body");
    if (tBody) {
        arrayOfCars.forEach((currentCar, index) => {
            const tr = document.createElement("tr");
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`;
            
            fields.forEach(field => {
                tr.append(getTD(currentCar[field], "-"));
            });

            tr.append(getTdButton());
            tBody.append(tr);
        });
    }
}

// Function to search by the relevant keys
function searchAndLoadTable() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();//Get the searching input 
    const allCars = carsForRental.concat(carsForSale);
    const result = [];//Array where the filterd results will be presented
    
    // If search input is empty, display all cars
    if (!searchText) {
        loadTable(allCars);
        return;
    }
    
    // Loop through all cars to find results
    for (let i = 0; i < allCars.length; i++) {
        const car = allCars[i];//Check the car in index i
        
        for (let key in car) {//Loop the specific keys to fillter with
            if (["Horsepower", "Acceleration", "Cylinders", "Weight_in_lbs"].includes(key))//Check keys
            {
                let value = car[key] ? String(car[key]).toLowerCase() : "";//Condition to make the key string, or null save the boolean integer
                if (value && value.includes(searchText)) {//If there is a match
                    result.push(car);//Add to the result array
                    break; // Stop checking once a match is found
                }
            }
        }
    }
    
    // Load the filtered results into new table
    loadTable(result);
}

function getTdButton() {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger");
    button.innerHTML = `<i class="bi bi-trash3"></i>`;
    button.onclick = function () {
        this.parentElement.parentElement.remove();
    };
    
    const tdButton = document.createElement("td");
    tdButton.append(button);
    return tdButton;
}

function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type);
    currentTD.innerHTML = value || defaultValue;
    return currentTD;
}
