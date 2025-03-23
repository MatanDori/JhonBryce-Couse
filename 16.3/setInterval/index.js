// Start value for countdown
let num = 10

// Create an interval that runs every 1 second
const id = setInterval(() => {
    // Update the text of the #clock element with current number
    $("#clock").text(num--)

    // If number is less than 3, change the text color to red
    if (num < 3) {
        $("#clock").css("color", "red")
    }

}, 1 * 1000) // 1000 milliseconds = 1 second

// Log the interval ID (can be useful for debugging or clearing)
console.log(id)

// After 10 seconds, stop the interval
setTimeout(() => {
    clearInterval(id)
}, 10 * 1000)
