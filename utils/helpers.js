function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function elementUp(index, width, height) {
    if (index < width) throw new Error("Element is already on the first row");
    return index - width;
}

function elementDown(index, width, height) {
    if (index >= width * (height - 1)) throw new Error("Element is already on the last row");
    return index + width;
}

function elementLeft(index, width, height) {
    if (index % width == 0) throw new Error("Element is already on the first column");
    return index - 1;
}

function elementRight(index, width, height) {
    if (index % width == width - 1) throw new Error("Element is already on the last column");
    return index + 1;
}