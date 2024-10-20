// Function to swap two number blocks
function swap(el1, el2) {
    let tempHeight = el1.style.height; // Store the height of the first element
    let tempText = el1.textContent; // Store the text of the first element

    // Swap the heights
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;

    // Swap the text (if displaying numbers inside blocks)
    el1.textContent = el2.textContent;
    el2.textContent = tempText;
}
async function bubbleSort() {
    const blocks = document.querySelectorAll(".number-block");
    const n = blocks.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (hasPressedStop) { // If stop is pressed, exit the function
                console.log("Sorting stopped"); // Debugging log
                return;
            }
            blocks[j].style.background = 'cyan';
            blocks[j + 1].style.background = 'cyan';

            // Compare heights of two adjacent blocks
            if (parseInt(blocks[j].textContent) > parseInt(blocks[j + 1].textContent)) {
                await delayTime(delay); // Wait before swapping
                swap(blocks[j], blocks[j + 1]); // Swap the blocks
            }

            // Revert color back after comparison
            blocks[j].style.background = '#e43f5a'; 
            blocks[j + 1].style.background = '#e43f5a'; 
        }

        // Mark the last element of the current pass as sorted
        blocks[n - 1 - i].style.background = 'green'; 
    }

    // Mark the first element as sorted after the last pass
    blocks[0].style.background = 'green';
}

// Event listener for the Stop Sorting button
const stopSortingBtn = document.querySelector(".stop-btn");
stopSortingBtn.addEventListener('click', function () {
    hasPressedStop = true; // Set the flag to stop sorting
    disableStopSortingBtn();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

// Event listeners for sorting buttons
document.getElementById('bubbleSort').addEventListener('click', async function() {
    hasPressedStop = false; // Reset stop flag
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await bubbleSort(); // Run bubble sort
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    disableStopSortingBtn();
});