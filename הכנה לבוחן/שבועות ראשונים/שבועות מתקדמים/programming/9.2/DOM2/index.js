// Clears existing table headers
function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = ""
}

// Loads the cars data and inserts headers + rows
function loadTable() {
    clearTable()

    // We assume carsForRental is imported from data.js
    const firstElement = carsForRental[0]
    const fields = Object.keys(firstElement)
    console.log(firstElement)
    console.log(fields)

    // Build the table header
    const theadTr = document.getElementById("table-cars-headers")
    if (theadTr) {
        // Create a <th> for each field in the first object's keys
        for (let index = 0; index < fields.length; index++) {
            const th = document.createElement("th")
            // Replace underscores with spaces for readability
            th.innerText = fields[index].replaceAll("_", " ")
            theadTr.append(th)
        }
        // Add an "Actions" column for buttons
        theadTr.append(getTD("Actions", "", "th"))
    }

    // Build the table body rows
    const tBody = document.getElementById("table-cars-body")
    if (tBody) {
        for (let index = 0; index < carsForRental.length; index++) {
            const currentCar = carsForRental[index]
            const tr = document.createElement("tr")
            // Use car name + index as row ID for reference
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`

            // Create a <td> for each field's value
            for (let i = 0; i < fields.length; i++) {
                const currentField = fields[i]
                tr.append(getTD(currentCar[currentField], "-"))
            }

            // Add a delete button in the last column
            const tdButton = getTdButton()
            tr.append(tdButton)

            // Append the row to the table body
            tBody.append(tr)
        }
    }
}

// Helper function to create a "trash" button using Bootstrap icons
function getTdButton() {
    const button = document.createElement("button")
    button.classList.add("btn", "btn-danger")

    // Insert the trash icon from Bootstrap Icons
    const icon = `<i class="bi bi-trash3"></i>`
    button.innerHTML = icon

    // On click, remove the entire row
    button.onclick = function () {
        this.parentElement.parentElement.remove()
    }

    // Wrap the button in a table cell (td)
    const tdButton = document.createElement("td")
    tdButton.append(button)
    return tdButton
}

// Helper function to create a table cell (td or th)
function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type)
    // If value is null/undefined, use defaultValue
    currentTD.innerHTML = value || defaultValue
    return currentTD
}
