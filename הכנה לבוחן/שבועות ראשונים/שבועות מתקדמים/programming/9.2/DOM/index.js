// HTML content for the table's initial state
let tableContent = `  <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        <tr>
                            <th scope="row">1</th>
                            <td id="markCell">Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>`

// Additional rows to be appended
let more3Rows = `
                        <tr class="row-table-item">
                            <th scope="row">1</th>
                            <td id="markCell">Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr class="row-table-item">
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr class="row-table-item">
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>`

function init() {
    // Initialization logic can go here if needed
}

function deleteTable() {
    // Grabs the table by its ID and clears its HTML content
    const table = document.getElementById("table-data")
    if (table) {
        table.innerHTML = ""
    }
}

function loadTable() {
    // Restores the table content to the original template stored in tableContent
    const table = document.getElementById("table-data")
    if (table) {
        table.innerHTML = tableContent
    }
}

function addMoreRows() {
    // Appends additional rows to the existing tbody
    const tbody = document.getElementById("table-body")
    if (tbody) {
        // Concatenate new rows to the current innerHTML
        tbody.innerHTML = tbody.innerHTML + more3Rows
    } else {
        // If the table is empty (tbody doesn't exist), we load the table first
        loadTable()
    }
}

function changeDom() {
    // Example function that targets elements with class "row-table-item"
    // and changes their background color
    const elements = document.getElementsByClassName("row-table-item")
    elements[0].style.backgroundColor = "yellow"
}

// Calls init on page load to ensure any initial setup runs
init()
