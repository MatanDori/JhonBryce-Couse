function init() {
    // Prompt the user for a horsepower value and convert it to a number
    const hp = +prompt("enter hp");

    // Call getCarsByHP function, passing the hp value and carsForRental array
    const result = getCarsByHP(hp, carsForRental);

    // Log the resulting filtered array to the console
    console.log(result);
}

// This function filters the array of cars based on horsepower
function getCarsByHP(hp, carsArray) {

    // Verify hp is a number
    if (typeof hp !== 'number') return;

    // Verify carsArray is actually an array
    if (!Array.isArray(carsArray)) return;

    // Initialize an empty array to store matching cars
    let carsResult = [];

    // Loop over the cars in carsArray
    for (let index = 0; index < carsArray.length; index++) {
        const currentCar = carsArray[index];

        // If the car has a Horsepower property and it's <= hp, add it to carsResult
        if (currentCar.Horsepower && currentCar.Horsepower <= hp) {
            carsResult.push(currentCar);
        }
    }

    // Return the filtered array
    return carsResult;
}

// Call init() to start the process when the page loads
init();
