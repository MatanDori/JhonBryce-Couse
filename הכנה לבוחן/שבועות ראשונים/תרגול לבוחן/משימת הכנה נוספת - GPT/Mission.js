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
//קליטת המידע מהטופס
function saveData(){
    const data = createDataObject();
    if(!data) return;//Validation
    let dataArrayString = localStorage.getItem("dataArea");//fetch from LS
    let dataArray = JSON.parse(dataArrayString) || [] ;//הגדרת מערך שנקלט מהאיחסון או מערך ריק, אם המערך הקיים לא נמצא
    dataArray.push(data);
    dataArrayString = JSON.stringify(dataArray);//עדכון המערך לקראת החזרה לאיחסון
    localStorage.setItem( "dataArea", dataArrayString)//החזרה
}
// פונקציה שבודקת האם הפעולה היא הוצאה או הכנסה
function Checker(){
    const isIncome = document.getElementById("boxIncome").checked;
    return isIncome ? "Income" : "Spend"; // Return the correct action as a string//
}

//יצירת אובייקט המידע
function createDataObject() {
    const amount = parseFloat(document.getElementById("moneyAmount").value);//Get Amount of money 
    const reason = document.getElementById("moneyReason").value.trim();//Get reason source
    const action = Checker();
    //validations
    if (isNaN(amount) || amount < 0) {
        alert("Please enter a valid amount!");
        return; 
    }
    if (reason === "") {
        alert("Please enter a valid reason!");
        return; 
    }
    // Create object
    const data = {
        createdAt: new Date().toLocaleDateString(),
        Action: action,
        Amount: amount,
        Reason: reason
    };
    return data;
}
//ניקוי הטבלה
function clearTable() {
    document.getElementById("actionTable").innerHTML = "";
   }
//מחיקה פרטנית שורה שורה לפי האינקדס של האובייקט
   function getDeleteButton(index) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-danger");//bootstaps classes
    button.innerHTML = `<i class="bi bi-trash3"></i>`; 
    //delete from local storage//
    button.onclick = function () {
        let dataArrayString = localStorage.getItem("dataArea");//fetch from LS
        let dataArray = JSON.parse(dataArrayString) || [];//הגדרת מערך שנקלט מהאיחסון או מערך ריק, אם המערך הקיים לא נמצא
        dataArray.splice(index, 1);//נלמד בשיעור האחרון
        localStorage.setItem("dataArea", JSON.stringify(dataArray));
        loadTable(); // רענון הטבלה
    };
    //בניית התא בו ישכון כפתור המחיקה
    const tdButton = document.createElement("td");
    tdButton.appendChild(button);
    return tdButton;
}
//טעינת הטבלה
function loadTable(){
    let dataArrayString = localStorage.getItem("dataArea");
    let dataArray = JSON.parse(dataArrayString) || [];
    let tableBody = document.getElementById("actionTable");
    clearTable();
    dataArray.forEach((data, index) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${data.createdAt}</td>
            <td>${data.action} $</td>
            <td>${data.Amount} $</td>
            <td>${data.Reason}</td>
        `;
        tableRow.appendChild(getDeleteButton(index)); // כפתור מחיקה
        tableBody.appendChild(tableRow);
    });
}







init();