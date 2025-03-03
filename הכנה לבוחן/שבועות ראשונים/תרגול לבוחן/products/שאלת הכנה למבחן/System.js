function init() {
    // Set up button event listeners
    document.getElementById("saveVatButton")?.addEventListener("click", function () {
        saveVat();
    });
    document.getElementById("saveTaxDeductionButton")?.addEventListener("click", function () {
        saveTaxDeduction();
    });
    document.getElementById("addMoneyButton")?.addEventListener("click", function () {
        addMoney();
    });
    document.getElementById("loadTable")?.addEventListener("click", function () {
        loadIncomeTable();
    });
    document.getElementById("deleteData")?.addEventListener("click", function () {
        clearTable();
    });
}

function saveVat(){
    const vatInput = document.getElementById("precentVAT").value;
    const vatValue = parseFloat(vatInput);
    //validations
    if (isNaN(vatValue) || vatValue < 0) {
        alert("Enter a valid VAT percentage!");
        return;
    }
    localStorage.setItem("Vat value", vatValue); // Save VAT to localStorage
    return (vatValue / 100);   
}

function saveTaxDeduction(){
    const deductionInput = document.getElementById("taxDeduction").value;
    const deductionValue = parseFloat(deductionInput);
    //validations
    if (isNaN(deductionValue) || deductionValue < 0) {
        alert("Enter a valid VAT percentage!");
        return;
    }
    localStorage.setItem("deduction value", deductionValue); 
    return (deductionValue / 100);   
}

function createIncomeObject() {
    const vatRate = saveVat(); // Get VAT rate
    const amount = parseFloat(document.getElementById("earnedMoney").value); //Get amount of money//
    const incomeSource = document.getElementById("incomeSource").value;//Get income source
    const taxDeduction = parseFloat(document.getElementById("taxDeduction").value);//get tax deduction//
    const isVATIncluded = document.getElementById("boxVAT").checked;//get tax deduction//
    //validations
    if (isNaN(amount) || amount < 0) {
        alert("Please enter a valid income amount!");
        return; 
    }
    if (incomeSource === "") {
        alert("Please enter a valid income source!");
        return; 
    }
    if (isNaN(taxDeduction) || taxDeduction < 0) {
        alert("Please enter a valid tax deduction!");
        return; 
    }
    //יצירת משתני סכומים מתאימים
    let amountWithoutVAT, amountWithVAT;

    if (isVATIncluded) {//אם יש מעמ
        amountWithoutVAT = amount / (1 + vatRate);
        amountWithVAT = amount;
    } else {
        amountWithoutVAT = amount;
        amountWithVAT = amount * (1 + vatRate);
    }

    // Create income object
    const income = {
        VAT: vatRate * 100 + "%", 
        amountWithoutVAT: amountWithoutVAT.toFixed(2), //  income without VAT
        amountWithVAT: amountWithVAT.toFixed(2), // income with VAT
        netIncomeAfterTax: (amountWithoutVAT - amountWithoutVAT*saveTaxDeduction()).toFixed(2), // final income
        incomeSource: incomeSource,
        taxDeduction: taxDeduction.toFixed(2),
        createdAt: new Date().toLocaleDateString(), //date
        isVATIncluded: isVATIncluded//flag for Vat
    };

    return income;
}

function clearTable() {
    document.getElementById("incomeTable").innerHTML = "";
   }

function addMoney(){
    const income = createIncomeObject();//יצירת עצם
    if (!income) return; // Valitations
    let incomeList = JSON.parse(localStorage.getItem("incomeData")) || [];//שליפת נתונים קיימים, אם קיימים//
    incomeList.push(income);//הוספת נתונים
    let incomeListString = JSON.stringify(incomeList);
    localStorage.setItem("incomeData", incomeListString);//עדכון 
    // טוען מחדש את הטבלה עם הנתונים החדשים
    loadIncomeTable();
}
  
function loadIncomeTable(){
    let incomeList = JSON.parse(localStorage.getItem("incomeData")) || [];//שליפת נתונים קיימים, אם קיימים
    let tableBody = document.getElementById("incomeTable");
    clearTable();
    incomeList.forEach(income => {
    //fill the table
    let tableRow = `<tr>
    <td>${income.createdAt}</td>
    <td>${income.amountWithoutVAT} $</td>
    <td>${income.amountWithVAT} $</td>
    <td>${income.incomeSource}</td>
    <td>${income.netIncomeAfterTax} $</td>
    <td>${income.netIncomeAfterTax} $</td>
    </tr>`;
    tableBody.innerHTML += tableRow;//add row 
    });
}
//delete one row from the table

//add search bar 

//create to select some rows

//hiiiiii