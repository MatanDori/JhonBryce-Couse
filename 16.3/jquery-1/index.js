let currentPlayer = null;
const directions = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

$(function () {
    // Initial logging and setup
    console.log("Handler running...");
    console.log($("#main-header").css("color"));

    // Set the background color of the locations header to match the main header
    $("#locations-header").css("background-color", $("#main-header").css("background-color"));

    // Log multiple CSS properties of the locations header
    console.log($("#locations-header").css(["color", "margin"]));

    // Apply CSS styles to all items in the locations list
    $(".locations-items").css({ 
        color: "red", 
        backgroundColor: "green", 
        fontSize: "20px" 
    });

    // Add a new test div to the #main element
    $("#main").append($("<div></div>").text("TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST"));

    // When "Add" button is clicked, add a new item to the list
    $("#add").on("click", function () {
        $("#list-items").append(`<li class='selectMeHover'> ${$("#expenseName").val()} - ${$("#expensePrice").val()}  </li>`);
        cleanup(); // Clear input fields
    });

    // Log keyboard events in the expenseName input field
    $("#expenseName").on("keydown", function (event) {
        console.log(event);
    });

    // Initialize list item styles and add click event for toggling selection
    const jqueryListItems = $("#list-items").children();
    jqueryListItems.css({ cursor: "pointer" });
    jqueryListItems.addClass("selectMeHover");
    jqueryListItems.on("click", function (event) {
        console.log(event);
        $(this).toggleClass("selectMe");
    });

    // Listen for keydown events on the whole document
    $(document).on("keydown", function (event) {
        console.log(event?.originalEvent?.code);
        if (!currentPlayer) return;

        if (event?.type?.toLowerCase() === "keydown") {
            moveOnScreen(currentPlayer, event?.originalEvent?.code);
        }
    });

    // Function to move an element on screen based on key code
    function moveOnScreen(currentPlayer, code) {
        if (code === "ArrowRight") {
            $(currentPlayer).css("left", parseInt($(currentPlayer).css("left")) + 20);
        }
        if (code === "ArrowUp") {
            $(currentPlayer).css("top", parseInt($(currentPlayer).css("top")) - 20);
        }
        if (code === "ArrowLeft") {
            $(currentPlayer).css("left", parseInt($(currentPlayer).css("left")) - 20);
        }
        if (code === "ArrowDown") {
            $(currentPlayer).css("top", parseInt($(currentPlayer).css("top")) + 20);
        }
    }

    // Set bb image as the current player to be controlled by keyboard
    $("#bb").on("click", function (event) {
        currentPlayer = $(this);
    });

    // Make rb image move randomly in one of four directions every 300ms
    $("#rb").on("click", function (event) {
        const currentPlayerRb = $(this);
        setInterval(() => {
            moveOnScreen(currentPlayerRb, directions[Math.floor(Math.random() * 4)]);
        }, 300);
    });
});

// Clear the input fields
function cleanup() {
    $("#expenseName").val("");
    $("#expensePrice").val("");
}
