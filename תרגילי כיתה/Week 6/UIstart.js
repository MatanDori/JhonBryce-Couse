let tableContent = `  <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
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
let more3Rows = `
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
                    `
function deleteTable() {
    const table = document.getElementById("table-data")
    if (table) {
        table.innerHTML = "no avialble table"
    }
}

function loadTable() {
    const table = document.getElementById("table-data")
    if (table) {
        table.innerHTML = tableContent
    }
}
function addTable() {
    const table = document.getElementById("table-data");
    if (table) {
        const tbody = table.getElementsByTagName("tbody")[0]; 
        if (tbody) {
            tbody.innerHTML += more3Rows; // מוסיף את השורות החדשות בלי למחוק את הישנות
        }
    }
}

