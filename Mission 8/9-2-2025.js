// Function to clear the table 
function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = "";
    document.getElementById("table-cars-body").innerHTML = "";
}

// Function to load the table with a list of cars
function loadTable(carList) {
    clearTable();
    
    if (carList.length === 0) return;
    
    // Get the column headers from the first car object
    const fields = Object.keys(carList[0]);
    const theadTr = document.getElementById("table-cars-headers");
    
    // Fill table headers
    if (theadTr) {
        fields.forEach(field => {
            const th = document.createElement("th");
            th.innerText = field.replaceAll("_", " ");
            theadTr.append(th);
        });
        theadTr.append(getTD("Actions", "", "th"));
    }
    
    const tBody = document.getElementById("table-cars-body");
    
    // Fill table body with car data
    if (tBody) {
        carList.forEach((car, index) => {
            const tr = document.createElement("tr");
            tr.id = `${car.Name.replaceAll(" ", "-")}-${index}`;
            
            fields.forEach(field => {
                tr.append(getTD(car[field], "-"));
            });
            
            const tdButton = getTdButton();
            tr.append(tdButton);
            tBody.append(tr);
        });
    }
}

// Function to create a delete button for each row
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

// Function to create a table cell 
function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type);
    currentTD.innerHTML = value || defaultValue;
    return currentTD;
}
