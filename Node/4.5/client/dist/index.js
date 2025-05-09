"use strict";
async function getAllCustomers() {
    const result = await fetch("http://localhost:3000/customers");
    const data = await result.json();
    const resultDiv = document.getElementById("getAllCustomersResult");
    if (resultDiv) {
        resultDiv.innerText = JSON.stringify(data);
    }
}
