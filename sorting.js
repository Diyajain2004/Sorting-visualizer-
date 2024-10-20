// Function to swap two number blocks 
function swap(el1, el2) {
    let temp = el1.textContent;
    el1.textContent = el2.textContent;
    el2.textContent = temp;
}

// Disable all sorting buttons
function disableSortingBtn() {
    document.querySelectorAll('.sort-btn').forEach(btn => btn.disabled = true);
}

// Enable all sorting buttons
function enableSortingBtn() {
    document.querySelectorAll('.sort-btn').forEach(btn => btn.disabled = false);
}

// Disable size slider
function disableSizeSlider() {
    document.querySelector("#size_input").disabled = true;
}

// Enable size slider
function enableSizeSlider() {
    document.querySelector("#size_input").disabled = false;
}

// Disable speed slider
function disableSpeedSlider() {
    document.querySelector("#speed_input").disabled = true;
}

// Enable speed slider
function enableSpeedSlider() {
    document.querySelector("#speed_input").disabled = false;
}

// Disable new array button
function disableNewArrayBtn() {
    document.querySelector(".new-btn").disabled = true;
}

// Enable new array button
function enableNewArrayBtn() {
    document.querySelector(".new-btn").disabled = false;
}

// Enable stop sorting button
function enableStopSortingBtn() {
    document.querySelector(".stop-btn").disabled = false;
}

// Disable stop sorting button
function disableStopSortingBtn() {
    document.querySelector(".stop-btn").disabled = true;
}

// Used to create a delay for animation
function delayTime(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    });
}

// Variables
let arraySize = document.querySelector('#size_input').value;
let numberArray = [];
let delay = 260; // Default delay for animations
let hasPressedStop = false; // Global flag to handle stop action

// Select speed slider from DOM
let delayElement = document.querySelector('#speed_input');

// Event listener to update delay time based on slider
delayElement.addEventListener('input', function() {
    delay = 320 - parseInt(delayElement.value);
});

// Create new number blocks when size input is adjusted
document.querySelector('#size_input').addEventListener('input', function() {
    arraySize = parseInt(this.value);
    createNewArray(arraySize);
});

// Function to create new array with number blocks
function createNewArray(noOfBlocks = 60) {
    deleteChild(); // Remove old blocks

    numberArray = [];
    for (let i = 0; i < noOfBlocks; i++) {
        numberArray.push(Math.floor(Math.random() * 251));
    }

    const container = document.querySelector("#sorting");

    for (let i = 0; i < noOfBlocks; i++) {
        const block = document.createElement("div");
        block.textContent = numberArray[i]; // Set the number as text content
        block.classList.add('number-block');
        block.classList.add('flex-item');
        container.appendChild(block);
    }
}

// Helper function to delete old blocks
function deleteChild() {
    const container = document.querySelector("#sorting");
    container.innerHTML = ''; // Clear the previous blocks
}

// Event listener for creating a new array on button click
document.querySelector('.new-btn').addEventListener('click', function() {
    enableSortingBtn();
    enableSizeSlider();
    enableSpeedSlider();
    createNewArray(arraySize);
});

// Event listener for stopping sorting
document.querySelector('.stop-btn').addEventListener('click', function() {
    hasPressedStop = true; // Set the flag to stop sorting
    disableStopSortingBtn();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

// Initial creation of blocks on page load
createNewArray(arraySize);








