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
// Heap sort function
async function heapSort(arr, n) {
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (hasPressedStop) {
            console.log("Heap Sort Stopped During Heapify"); // Debugging log
            return; // Exit if stopped
        }
        await heapify(arr, n, i); // Heapify the subtree
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        if (hasPressedStop) {
            console.log("Heap Sort Stopped During Extraction"); // Debugging log
            return; // Exit if stopped
        }

        // Swap root with the last element
        arr[0].style.background = 'cyan'; // Highlight root
        arr[i].style.background = 'green'; // Highlight sorted element

        swap(arr[0], arr[i]); // Swap the number blocks
        await delayTime(delay);

        // Re-heapify the reduced heap
        await heapify(arr, i, 0);
    }

    // Mark the last remaining element as sorted
    arr[0].style.background = 'green';
}

// Heapify a subtree rooted with node i
async function heapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (left < n && parseInt(arr[left].textContent) > parseInt(arr[largest].textContent)) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && parseInt(arr[right].textContent) > parseInt(arr[largest].textContent)) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        arr[i].style.background = 'orange'; // Highlight current root
        arr[largest].style.background = 'orange'; // Highlight largest

        swap(arr[i], arr[largest]); // Swap root and largest
        await delayTime(delay);

        // Recursively heapify the affected subtree
        await heapify(arr, n, largest);
    }
}

// Event listener for Heap Sort button
document.getElementById('heapSort').addEventListener('click', async function() {
    hasPressedStop = false; // Reset stop flag

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    const blocks = document.querySelectorAll(".number-block");
    await heapSort(blocks, blocks.length); // Run heap sort

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    disableStopSortingBtn();
});
