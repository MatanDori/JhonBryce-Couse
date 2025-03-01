//Page 15

// פונקציה לקליטת מספרים מהמשתמש
function getNumberInput(message) {
    return parseFloat(prompt(message));
}

// 1. קליטת שלושה ערכים וחישוב הסכום והממוצע
let num1 = getNumberInput("הכנס מספר ראשון:");
let num2 = getNumberInput("הכנס מספר שני:");
let num3 = getNumberInput("הכנס מספר שלישי:");

let sumValues = num1 + num2 + num3;
let averageValues = sumValues / 3;

console.log(`סכום המספרים: ${sumValues}`);
console.log(`ממוצע המספרים: ${averageValues}`);

// 2. קליטת אורך ורוחב של חדר, חישוב שטח והיקף
let length = getNumberInput("הכנס את אורך החדר (מטרים):");
let width = getNumberInput("הכנס את רוחב החדר (מטרים):");

let area = length * width;
let perimeter = 2 * (length + width);

console.log(`שטח החדר: ${area} מ"ר`);
console.log(`היקף החדר: ${perimeter} מטרים`);

// 3. קליטת קוטר ועומק של סיר, חישוב נפח
let diameter = getNumberInput("הכנס את קוטר הסיר (ס\"מ):");
let depth = getNumberInput("הכנס את עומק הסיר (ס\"מ):");

let radius = diameter / 2;
let volume = Math.PI * Math.pow(radius, 2) * depth;  

console.log(`קיבולת הסיר: ${volume.toFixed(2)} סמ"ק`);

//Page 19 Ex.6 -  Function to calculate the new salary based on the given conditions
function calculateNewSalary() {
    let name = prompt("Enter the programmer's name:");
    let salary = parseFloat(prompt("Enter the current salary (ILS):"));

    if (isNaN(salary) || salary <= 0) {
        alert("Invalid salary input. Please enter a positive number.");
        return;
    }

    let newSalary;

    // Condition
    if (salary * 1.10 <= 6000) {
        newSalary = salary * 1.10;  
    } else {
        newSalary = salary * 1.05;  
    }

    // Display the result
    alert(`Programmer: ${name}\nNew Salary: ${newSalary} ILS`);
}

// Run the function
calculateNewSalary();
