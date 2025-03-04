function init(){
    // Set up button event listeners
    document.getElementById("saveDataButton")?.addEventListener("click", function () {
        saveData();
    });
    document.getElementById("loadTable")?.addEventListener("click", function () {
        loadTable();
    });
    document.getElementById("clearTable")?.addEventListener("click", function () {
        clearTable();
    });
}

// Function to check if the action is Income or Expense
function getActionType() {
    return document.getElementById("boxIncome").checked ? "Income" : "Expense";
}

// Save data to localStorage
function saveData(){
    const data = createDataObject();
    if (!data) return;

    let dataArray = JSON.parse(localStorage.getItem("dataArea")) || [];
    dataArray.push(data);
    localStorage.setItem("dataArea", JSON.stringify(dataArray));

    // Refresh the table after adding new data
    loadTable();
}

// Create data object
function createDataObject() {
    const amount = parseFloat(document.getElementById("moneyAmount").value);
    const reason = document.getElementById("moneyReason").value;
    const action = getActionType();

    // Validations
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return null;
    }
    if (!reason.trim()) {
        alert("Please enter a valid reason!");
        return null;
    }

    // Create object
    return {
        createdAt: new Date().toLocaleDateString(),
        Action: action,
        Amount: amount.toFixed(2) + " $",
        Reason: reason
    };
}

// Clear the table content
function clearTable() {
    document.getElementById("actionTable").innerHTML = "";
}


// Create delete button for each row
function getDeleteButton(index) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger");
    button.innerHTML = `<i class="bi bi-trash3"></i>`;

    button.onclick = function () {
        let dataArray = JSON.parse(localStorage.getItem("dataArea")) || [];
        dataArray.splice(index, 1);
        localStorage.setItem("dataArea", JSON.stringify(dataArray));
        loadTable();
    };

    const tdButton = document.createElement("td");
    tdButton.appendChild(button);
    return tdButton;
}

// Load and display table data
function loadTable() {
    let dataArrayString = localStorage.getItem("dataArea"); 
    if (!dataArrayString) return; // If no data, exit
    
    let dataArray = JSON.parse(dataArrayString) || [];
    let tableBody = document.getElementById("actionTable");
    
    clearTable(); // Clears only the visual content, not localStorage

    dataArray.forEach((data, index) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${data.createdAt}</td>
            <td>${data.Action}</td>
            <td>${data.Amount}</td>
            <td>${data.Reason}</td>
        `;
        tableRow.appendChild(getDeleteButton(index)); 
        tableBody.appendChild(tableRow);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    init();
   // loadTable(); // Load table data when the page opens
});
