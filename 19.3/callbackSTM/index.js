// Define a function that will show a warning alert
function errorDisconnect() {
    alert("you are about to logout from this application");
}

// Schedule the alert to show after 10 seconds (10,000 milliseconds)
setTimeout(errorDisconnect, 10_000);

// Schedule the alert to show again after 50 seconds (50,000 milliseconds)
setTimeout(errorDisconnect, 50_000);

// Preparation comment for a future interval task:
// Write an interval function that runs every 5 seconds and receives a function.
// The function 'ChangeColor' will toggle the screen background between black and white.


