// Global variable to store the interval ID so it can be cleared later
let globalIntervalId = null

// Event listener for the "Cancel" button to stop the interval
document.querySelector("#cancel").addEventListener("click", function () {
    if (globalIntervalId) clearInterval(globalIntervalId)
})

// Event listener for the "Tomer is a new Developer" button - regular function
document.querySelector("#tiand").addEventListener("click", function () {
    // 'this' refers to the button element in a regular function
    console.log(this)
})

// Event listener using an arrow function
document.querySelector("#tiand").addEventListener("mouseenter", () => {
    // 'this' here does NOT refer to the button - it's inherited from the outer scope
    console.log(this)
})

// Function that changes the background color of the page every time it runs
function setBackgroundColor() {
    const color = document.getElementsByTagName("body")[0].style.backgroundColor

    if (color === "white") {
        document.getElementsByTagName("body")[0].style.backgroundColor = "black"
    } else {
        document.getElementsByTagName("body")[0].style.backgroundColor = "white"
    }
}

// Start interval that runs the color-changing function every 2 seconds
globalIntervalId = setInterval(setBackgroundColor, 2000)


// Some example arrow functions:

const paramFn = () => 1               // returns 1
const plusOne = (a) => a + 1         // returns a + 1
const eytanEx = (message) => message + "Lets get back together" // appends text
const eytanEx2 = () => { return "Lets get married" } // returns a string


// Calling paramFn just as an example
paramFn()


// Constructor function to create Car objects
function Car(_lp, _price, _color) {
    this.lp = _lp
    this.price = _price
    this.color = _color
}

// This version using arrow function will NOT work as a constructor
// Arrow functions do not have their own 'this' and cannot be used with 'new'
// const Car = (_lp, _price, _color) => {
//     this.lp = _lp
//     this.price = _price
//     this.color = _color
// }


// Object with two methods to demonstrate 'this'
const ZoeTheOne = {
    boyFriend: "Eytan",

    // Regular function - 'this' refers to the object ZoeTheOne
    callFirstOnMorning: function () {
        console.log("calling " + this.boyFriend)
    },

    // Arrow function - 'this' does NOT refer to ZoeTheOne, likely undefined
    callEveryNight: () => {
        console.log("calling " + this.boyFriend)
    }
}
