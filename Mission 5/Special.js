function MostExpensiveProduct() {
    let mostExpensiveProduct = " ";//דגל למוצר היקר ביותר
    let highestPrice = 0;//המחיר הגבוה ביותר
    let count = 0;//מספר המוצר
    const totalProducts = 5;
    
    while (count < totalProducts) {//קליטת המוצרים
        let productName = prompt(`Enter the name of product ${count + 1}:`);
        let productPrice = parseFloat(prompt(`Enter the price of ${productName}:`));//קליטת המחיר
        
        if (isNaN(productPrice) || productPrice < 0) {//אם הוכנס מספר לא תקין
            alert("Invalid price. Please enter a valid number.");
            continue;
        }
        
        if (productPrice > highestPrice) {
            highestPrice = productPrice;
            mostExpensiveProduct = productName;
        }
        
        count++;//מעבר למוצר הבא
    }
    
    console.log(`The most expensive product is: ${mostExpensiveProduct} with a price of $${highestPrice}`);
}

MostExpensiveProduct();
