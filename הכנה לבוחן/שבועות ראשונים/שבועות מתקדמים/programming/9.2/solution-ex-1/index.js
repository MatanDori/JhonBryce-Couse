function init() {
    // Calculate and log the average horsepower of carsForRental
    const result = getAverageHp(carsForRental)
    console.log(result)

    // Log arrays filtered by different properties and values
    console.log(getCarsByProperty(carsForRental, "Acceleration", 8))
    console.log(getCarsByProperty(carsForRental, "Weight_in_lbs", 3500))
    console.log(getCarsByProperty(carsForRental, "Displacement", 8))
    console.log(getCarsByProperty(carsForRental, "", 15))
}

// Calculates the average horsepower of an array of cars
function getAverageHp(cars) {
    if (!Array.isArray(cars)) return;
    let sum = 0;
    let averageCounter = 0;

    for (let index = 0; index < cars.length; index++) {
        const currentCar = cars[index];
        // Only add to sum if Horsepower is a valid number
        if (typeof currentCar.Horsepower === "number" && currentCar.Horsepower !== 0) {
            sum = sum + currentCar.Horsepower
            averageCounter++
        }
    }
    // Return average up to 2 decimal places
    return (sum / averageCounter).toFixed(2)
}

// Filters cars by a specified property (field) and value
function getCarsByProperty(cars, field, value) {
    if (!Array.isArray(cars)) return;
    if (!field) return;

    const filteredCars = [];
    for (let index = 0; index < cars.length; index++) {
        const currentCar = cars[index];
        // If the car's field is <= the given value, push to results
        if (currentCar[field] <= value) {
            filteredCars.push(currentCar)
        }
    }
    return filteredCars
}

// Run init when the script loads
init()
