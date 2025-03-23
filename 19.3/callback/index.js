// Define a function called 'main' that accepts a parameter 'f'
function main(f) {
    // Check if the parameter is a function
    if (typeof f === 'function') {
        // If it is, call the function
        f()
    }
}

// Define a function called 'doSomething'
function doSomething() {
    // Print to the console
    console.log("Say Hi")

    // Define an inner function (not yet executed)
    function doSomethingForShahar() {
        console.log("Toranot shmira")
    }

    // Return the inner function without executing it
    return doSomethingForShahar
}

// Call 'doSomething' immediately, which returns a function,
// and pass the returned function to 'main'
main(doSomething())
