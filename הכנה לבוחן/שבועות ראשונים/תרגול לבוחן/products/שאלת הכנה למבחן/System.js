function init() {
    // Set up button event listeners
    document.getElementById("saveVatButton")?.addEventListener("click", function () {
        saveVat();
    });
    document.getElementById("addMoneyButton")?.addEventListener("click", function () {
        addMoney();
    });
    document.getElementById("loadCarsRentButton")?.addEventListener("click", function () {
        loadTable();
    });
    document.getElementById("deleteData")?.addEventListener("click", function () {
        clearTable();
    });
}

// const income = {
//     VAT: saveVat(),//מעמ
//     amountOfMoney: document.getElementById("earnedMoney"),//כסף המתקבל, לפני בדיקת מעמ וניקוי מס
//     incomeSource: document.getElementById("incomeSource"),//מקור הכנסה
//     createdAt: new Date().toString(),//תאריך היצירה, יכנס בהמשך לטבלה
//     taxDeduction : document.getElementById("taxDeduction"),
//     isVATIncluded: document.getElementById("boxVAT").checked  
// }

// function sumWCheckVAT() {
//     const vatRate = saveVat(); // Get the VAT rate 
//     let amount = parseFloat(income.amountOfMoney);//save income money as a number
//     let isVAT = income.isVATIncluded; // Check if VAT is included//
//     if (isNaN(amount) || amount <= 0) {
//         alert("Enter a valid income amount!");
//         return;
//     }
//     let amountWithoutVAT, amountWithVAT;
//     if (isVAT) {//אם יש מעמ
//         amountWithoutVAT = amount / (1 + vatRate);//סכום ללא מעמ
//         amountWithVAT = amount;//סכום עם מעמ
//     } else {
//         amountWithoutVAT = amount;
//         amountWithVAT = amount * (1 + vatRate);//עדכון הסכום עם מעמ
//     }
//     return {
//         amountWithoutVAT: amountWithoutVAT.toFixed(2),
//         amountWithVAT: amountWithVAT.toFixed(2),   
//     };
// }
//
function createIncomeObject() {
    const vatRate = saveVat(); // Get VAT rate
    const amount = parseFloat(document.getElementById("earnedMoney").value); //Get amount of money
    const incomeSource = document.getElementById("incomeSource").value;//Get income source
    const taxDeduction = parseFloat(document.getElementById("taxDeduction").value) || 0;//get tax deduction//
    const isVATIncluded = document.getElementById("boxVAT").checked;//get tax deduction//
    //validations
    if (isNaN(amount) || amount <0) {
        alert("Please enter a valid income amount!");
        return null; 
    }
    if (incomeSource === "") {
        alert("Please enter a valid income source!");
        return null; 
    }
    if (isNaN(taxDeduction) || taxDeduction <0) {
        alert("Please enter a valid tax deduction!");
        return null; 
    }

    let amountWithoutVAT, amountWithVAT;

    if (isVATIncluded) {
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
        netIncomeAfterTax: (amountWithoutVAT - taxDeduction).toFixed(2), // final income
        incomeSource: incomeSource,
        taxDeduction: taxDeduction.toFixed(2),
        createdAt: new Date().toLocaleDateString(), // Store formatted date
        isVATIncluded: isVATIncluded//flag for Vat
    };

    return income;
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

function clearTable() {
    document.getElementById("incomeTable").innerHTML = "";
}


function addMoney(){
    
}
function loadTable(){
    // Validate inputs
    
    clearTable();
}