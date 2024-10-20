let hasPressedStop = false; // Global variable to control stopping the sort

// Function to create a delay for animations
function delayTime(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(''); }, milisec);
    });
}

// Function to swap two number blocks 
function swap(el1, el2) {
    const tempHeight = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;

    const tempText = el1.textContent;
    el1.textContent = el2.textContent;
    el2.textContent = tempText;
}

// Selection sort function
async function selectionSort() {
    const blocks = document.querySelectorAll(".number-block"); // Select number blocks
    const length = blocks.length; // Get total number of blocks

    for (let i = 0; i < length - 1; i++) {
        if (hasPressedStop) return; // Exit if the stop action has been pressed

        let min_index = i; // Assume the current index is the minimum
        blocks[min_index].style.background = 'lightgreen'; // Highlight the current minimum

        for (let j = i + 1; j < length; j++) {
            if (hasPressedStop) return; // Exit if the stop action has been pressed
            
            blocks[j].style.background = 'cyan'; // Highlight the current element being compared
            await delayTime(delay); // Delay for visualization

            // Compare heights of the blocks
            if (parseInt(blocks[j].textContent) < parseInt(blocks[min_index].textContent)) {
                // Reset the color of the previous minimum element
                if (min_index !== i) {
                    blocks[min_index].style.background = '#e43f5a'; // Reset color for previous min_index
                }
                min_index = j; // Update min_index to the new minimum
            } else {
                blocks[j].style.background = '#e43f5a'; // Reset color if not the new minimum
            }
        }

        // Swap the found minimum element with the first element
        if (min_index !== i) {
            await delayTime(delay); // Delay before swapping for visibility
            swap(blocks[min_index], blocks[i]); // Swap the blocks

            // Change color of the swapped elements
            blocks[min_index].style.background = '#e43f5a'; // Reset color of the swapped element
        }

        // Mark current element as sorted
        blocks[i].style.background = 'green'; 
    }

    // Mark the last element as sorted
    blocks[length - 1].style.background = 'green'; 
}

// Event listener for the Selection Sort button
document.getElementById("selectionSort").addEventListener('click', async function () {
    hasPressedStop = false; // Reset stop flag

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    await selectionSort(); // Run selection sort

    // After sorting completes or stops
    if (!hasPressedStop) {
        enableSortingBtn();
        enableSizeSlider();
    } else {
        disableSpeedSlider(); // Disable speed slider if sorting was stopped
    }

    enableNewArrayBtn();
    disableStopSortingBtn();
});