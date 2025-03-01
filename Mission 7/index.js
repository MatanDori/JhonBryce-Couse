//1
function getCarsByOriginAndMPG(origin, mpg, carsArray) {
    let filteredCars = [];

    for (let i = 0; i < carsArray.length; i++) {
        let car = carsArray[i];

        if (car.Origin === origin && car.Miles_per_Gallon !== null && car.Miles_per_Gallon >= mpg) {
            filteredCars.push(car);
        }
    }

    return filteredCars;
}
//2
function getAverageHorsepower(carsArray) {
    let totalHP = 0;
    let count = 0;

    for (let i = 0; i < carsArray.length; i++) {
        let car = carsArray[i];

        if (car.Horsepower !== null) {
            totalHP += car.Horsepower;
            count++;
        }
    }

    if (count === 0) {
        return 0;
    }

    let averageHP = totalHP / count;
    return averageHP;
}
//3
function getCarByProperty(value, property, carsArray) {
    let validProperties = ["Miles_per_Gallon", "Cylinders", "Displacement", "Horsepower", "Weight_in_lbs", "Acceleration"];
    
    if (!validProperties.includes(property)) {
        alert("מאפיין לא חוקי. יש לבחור מתוך: " + validProperties.join(", "));
        return [];
    }

    let filteredCars = [];

    for (let i = 0; i < carsArray.length; i++) {
        let car = carsArray[i];

        if (car[property] !== null && car[property] <= value) {
            filteredCars.push(car);
        }
    }

    return filteredCars;
}

// פונקציה להצגת תפריט לבחירת פעולה
function showMenu() {
    let choice = prompt(
        "בחר פעולה:\n" +
        "1 - חיפוש רכבים לפי מקור וצריכת דלק\n" +
        "2 - חישוב ממוצע כוח סוס\n" +
        "3 - חיפוש רכבים לפי מאפיין\n" +
        "4 - יציאה"
    );

  
    if (choice === "1") {
        let origin = prompt("הזן את מקור הרכב (USA, Europe, Japan):");
        let mpg = parseFloat(prompt("הזן את צריכת הדלק המינימלית (MPG):"));
        
        if (!isNaN(mpg)) {
            let results = getCarsByOriginAndMPG(origin, mpg, carsForSale.concat(carsForRental));
            console.log("תוצאות חיפוש הרכבים לפי מקור ו-MPG:");
            console.log(results);
        } else {
            alert("נא להזין מספר תקין.");
        }

        showMenu(); // חזרה לתפריט

    } else if (choice === "2") {
        let avgHP = getAverageHorsepower(carsForSale.concat(carsForRental));
        alert("ממוצע כוח סוס של כל הרכבים הוא: " + avgHP);
        console.log("ממוצע כוח סוס:", avgHP);

        showMenu(); // חזרה לתפריט

    } else if (choice === "3") {
        let property = prompt(
            "בחר מאפיין לחיפוש:\n" +
            "Miles_per_Gallon, Cylinders, Displacement, Horsepower, Weight_in_lbs, Acceleration"
        );
        let value = parseFloat(prompt("הזן ערך מספרי מקסימלי:"));

        if (!isNaN(value)) {
            let results = getCarByProperty(value, property, carsForSale.concat(carsForRental));
            console.log("תוצאות חיפוש הרכבים לפי מאפיין:", results);
        } else {
            alert("נא להזין מספר תקין.");
        }

        showMenu(); // חזרה לתפריט

    } else if (choice === "4") {
        alert("יציאה מהמערכת.");
        return;
    } else {
        alert("נא לבחור מספר תקין.");
        showMenu(); // חזרה לתפריט
    }
}

// הפעלת התפריט בעת טעינת הדף
showMenu();
