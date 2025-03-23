// Wait for the document to be fully loaded
$(function () {

    // Replace the main div content with a loading spinner
    $("#main").html('<span class="loader"></span>');

    // Define a function to alert the user after delay
    function alertUser() {
        // Clear the loading spinner
        $("#main").html("");

        // Show an alert message
        alert("Note we have sale 50% on shirts");
    }

    // Call alertUser after 5 seconds
    setTimeout(alertUser, 5 * 1000);
});
