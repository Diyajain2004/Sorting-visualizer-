async function insertion() {
    const ele = document.querySelectorAll(".number-block");
    
    // Initially, the first element is sorted and marked green.
    ele[0].style.background = 'green'; 

    // Loop through each element starting from the second one.
    for (let i = 1; i < ele.length; i++) {
        if (hasPressedStop) return; // Exit if the stop action has been pressed
        
        let key = parseInt(ele[i].textContent); // Get the value of the current element as an integer
        let j = i - 1; // Index of the last sorted element
        ele[i].style.background = 'blue'; // Highlight the current element being inserted

        // Wait for a moment to visualize the selection
        await delayTime(delay);

        // Shift elements that are greater than the key to the right
        while (j >= 0 && parseInt(ele[j].textContent) > key) {
            if (hasPressedStop) return; // Exit if the stop action has been pressed
            
            // Move the number block
            ele[j + 1].textContent = ele[j].textContent; // Shift the larger element to the right
            ele[j].style.background = 'blue'; // Highlight the moving element
            await delayTime(delay); // Wait for the delay
            j--; // Move to the next sorted element
        }

        // Insert the key element at the correct position
        ele[j + 1].textContent = key; 
        ele[j + 1].style.background = 'green'; // Mark this position as sorted

        // Reset the background colors of all previously sorted elements
        for (let k = 0; k < i; k++) {
            if (k !== j + 1) { // Skip the newly sorted element
                ele[k].style.background = '#e43f5a'; // Original color for sorted elements
            }
        }
    }

    // After the entire array is sorted, change all elements' background to green
    for (let i = 0; i < ele.length; i++) {
        ele[i].style.background = 'green'; // Final output color is green
    }
}

// Event listener for Insertion Sort button
document.getElementById('insertionSort').addEventListener('click', async function () {
    hasPressedStop = false; // Reset stop flag
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    await insertion(); // Run the insertion sort

    if (!hasPressedStop) {
        enableSortingBtn();
        enableSizeSlider();
    } else {
        disableSpeedSlider();
    }

    enableNewArrayBtn();
    disableStopSortingBtn();
});
