// Task 1: Input two integers and display all numbers between them (inclusive) in ascending order
function displayNumbersBetween() {
    let num1 = parseInt(prompt("Enter the first integer:"));
    let num2 = parseInt(prompt("Enter the second integer:"));

    if (isNaN(num1) || isNaN(num2)) {
        alert("Invalid input. Please enter valid integers.");
        return;
    }

    // Ensure the numbers are in ascending order
    let start = Math.min(num1, num2);
    let end = Math.max(num1, num2);

    let result = "";
    let i = start;

    while (i <= end) {
        result += i + " ";
        i++;
    }
    //showing the list of the numbers
    alert(`Numbers between ${num1} and ${num2} in ascending order:\n${result}`);
}

// Task 2: Input a natural number n and display all  numbers from 0 to n
function displayEvenNumbers() {
    let n = parseInt(prompt("Enter a natural number n:"));

    if (isNaN(n) || n < 0) {
        alert("Invalid input. Please enter a non-negative integer.");
        return;
    }

    let result = "";
    let i = 0;

    while (i <= n) {
        result += i + " ";
        i += 1;  
    }

    alert(`Numbers from 0 to ${n}:\n${result}`);
}

// Run the functions
displayNumbersBetween();
displayEvenNumbers();


//Ex 6
function Avg() {
    let numbers = []; //יצירת מערך
    while (true) {
        let input = prompt("Enter a number (0 to stop):");
        let num = parseFloat(input);//הפיכת המשתנה למשתנה של מספר
        
        if (isNaN(num)) {//בדיקת שפיות
            alert("Invalid input. Please enter a number.");
            continue;
        }
        
        if (num === 0) {//בהתאם לשאלה
            break;
        }
        
        numbers.push(num);
    }
    
    if (numbers.length > 0) {
        let sum = numbers.reduce((acc, val) => acc + val, 0);//מחשב סכום מספרים
        let average = sum / numbers.length;//מחשב ממוצע
        console.log(`Average: ${average.toFixed(2)}`);
    } else {
        console.log("No valid numbers were entered.");
    }
}

// Run the function
Avg();

//Ex7
function Minest(){
    let min;
    let numbers = []; //יצירת מערך
    while (true) {
        let input = prompt("Enter a number (0 or negative to stop):");
        let num = parseFloat(input);//הפיכת המשתנה למשתנה של מספר
        
        if (isNaN(num)) {//בדיקת שפיות
            alert("Invalid input. Please enter a number.");
            continue;
        }
        
        if (num === 0) {//בהתאם לשאלה
            break;
        }
        if(num < 0){
            break
        }
        
        numbers.push(num);
    }
    min = numbers[0];
    for(let i = 0; i<numbers.length; i++){
        if(min < numbers[i]){
            min = numbers[i]
        }
    }
    console.log("the minimum is: " + min);
}


