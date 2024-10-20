// Function to create a delay for animation
function delayTime(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(''); }, milisec);
    });
}

// Merge function for merge sort
async function merge(ele, low, mid, high){
    console.log('In merge()');
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = new Array(n1);
    let right = new Array(n2);

    // Fill left array
    for (let i = 0; i < n1; i++) {
        if (hasPressedStop) return;
        await delayTime(delay);
        ele[low + i].style.background = 'orange'; // Highlight left array
        left[i] = parseInt(ele[low + i].style.height); // Store height as integer
    }

    // Fill right array
    for (let i = 0; i < n2; i++) {
        if (hasPressedStop) return;
        await delayTime(delay);
        ele[mid + 1 + i].style.background = 'cyan'; // Highlight right array
        right[i] = parseInt(ele[mid + 1 + i].style.height); // Store height as integer
    }

    await delayTime(delay);
    let i = 0, j = 0, k = low;

    // Merge the left and right arrays back into ele
    while (i < n1 && j < n2) {
        if (hasPressedStop) return;
        await delayTime(delay);

        // Compare heights and update the visual representation
        if (left[i] <= right[j]) {
            ele[k].style.height = `${left[i]}px`; // Set height for the current index
            console.log(`Moving from left: ${left[i]}px to position ${k}`);
            i++; // Move to the next element in the left array
        } else {
            ele[k].style.height = `${right[j]}px`; // Set height for the current index
            console.log(`Moving from right: ${right[j]}px to position ${k}`);
            j++; // Move to the next element in the right array
        }
        ele[k].style.background = 'lightgreen'; // Highlight sorted element
        k++; // Move to the next position in the original array
    }

    // Copy remaining elements from left array
    while (i < n1) {
        if (hasPressedStop) return;
        await delayTime(delay);
        ele[k].style.height = `${left[i]}px`; // Set height for the current index
        console.log(`Copying remaining from left: ${left[i]}px to position ${k}`);
        ele[k].style.background = 'lightgreen'; // Highlight sorted element
        i++;
        k++;
    }

    // Copy remaining elements from right array
    while (j < n2) {
        if (hasPressedStop) return;
        await delayTime(delay);
        ele[k].style.height = `${right[j]}px`; // Set height for the current index
        console.log(`Copying remaining from right: ${right[j]}px to position ${k}`);
        ele[k].style.background = 'lightgreen'; // Highlight sorted element
        j++;
        k++;
    }

    // Final pass to ensure all merged elements are marked as sorted
    for (let m = low; m <= high; m++) {
        ele[m].style.background = 'green'; // Final color for sorted elements
    }
}

// Merge sort function
async function mergeSort(ele, l, r) {
    if (l >= r) {
        return; // Sorting complete
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m); // Sort left half
    await mergeSort(ele, m + 1, r); // Sort right half
    await merge(ele, l, m, r); // Merge the two halves
}

// Event listener for Merge Sort button using ID
const mergeSortbtn = document.getElementById("mergeSort");
mergeSortbtn.addEventListener('click', async function() {
    let ele = document.querySelectorAll('.number-block');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await mergeSort(ele, l, r);
    if (hasPressedStop) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});
