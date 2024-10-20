// Swap the visual and actual number array values
async function swap(ele, numberArray, i, j) {
    // Swap the numbers in the array
    let temp = numberArray[i];
    numberArray[i] = numberArray[j];
    numberArray[j] = temp;

    // Swap the text content (numbers) in the blocks
    let tempText = ele[i].textContent;
    ele[i].textContent = ele[j].textContent;
    ele[j].textContent = tempText;

    // Swap the heights (visual representation)
    let tempHeight = ele[i].style.height;
    ele[i].style.height = ele[j].style.height;
    ele[j].style.height = tempHeight;
}

async function partitionLomuto(ele, numberArray, l, r) {
    let pivotValue = numberArray[r]; // Pivot element value from numberArray
    let i = l - 1; // Index of the smaller element
    ele[r].style.background = 'cyan'; // Pivot color

    for (let j = l; j < r; j++) {
        ele[j].style.background = 'yellow'; // Current element comparison color
        await delayTime(delay);

        if (numberArray[j] < pivotValue) {
            i++;
            await swap(ele, numberArray, i, j); // Swap elements if current is smaller than pivot
            ele[i].style.background = 'orange'; // Color the swapped element
            if (i !== j) ele[j].style.background = 'orange'; // Reset color if not the same element
            await delayTime(delay);
        } else {
            ele[j].style.background = 'pink'; // Element greater than pivot
        }
    }

    // Final swap with pivot element to its correct position
    i++;
    await delayTime(delay);
    await swap(ele, numberArray, i, r); // Move pivot to the right position
    ele[r].style.background = 'pink'; // Reset pivot element color
    ele[i].style.background = 'green'; // Pivot in correct position

    // Return the index of the pivot
    return i;
}

async function quickSort(ele, numberArray, l, r) {
    if (l < r) {
        let pivotIndex = await partitionLomuto(ele, numberArray, l, r); // Partition the array around the pivot

        // Recursively sort the left and right sub-arrays
        await quickSort(ele, numberArray, l, pivotIndex - 1); // Left partition
        await quickSort(ele, numberArray, pivotIndex + 1, r); // Right partition
    }

    // Mark elements as sorted
    for (let k = l; k <= r; k++) {
        if (ele[k].style.background !== 'green') {
            ele[k].style.background = 'green'; // Mark the sorted element
        }
    }
}

// Quick Sort button event listener 
document.getElementById('quickSort').addEventListener('click', async function() {
    let ele = document.querySelectorAll('.number-block');
    let l = 0;
    let r = ele.length - 1;

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Use the numberArray for the sorting logic
    await quickSort(ele, numberArray, l, r); // Execute quick sort

    if (hasPressedStop) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});
