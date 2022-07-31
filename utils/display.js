let GridWidth, GridHeight, CanvasWidth, CanvasHeight;
let canvasElement, canvasContext;

function setupDisplay(gridWidth, gridHeight) {
    GridWidth = gridWidth;
    GridHeight = gridHeight;
    CanvasWidth = 400;
    CanvasHeight = 400;

    canvasElement = document.createElement("canvas");
    canvasElement.width = CanvasWidth;
    canvasElement.height = CanvasHeight;
    canvasElement.id = "grid";

    document.body.appendChild(canvasElement);
    canvasContext = canvasElement.getContext("2d");
}

function displayTile(tileVariant, x, y) {
    if (tileVariant.tile.displayType == TileDisplayTypes.Value) {
        canvasContext.fillStyle = "black";
        canvasContext.fillText(
            tileVariant.tile.displayValue, 
            Math.floor(x * CanvasWidth / GridWidth),
            Math.floor(y * CanvasHeight / GridHeight)
        );
    }
}

function displayCell(cell, x, y) {
    if (!cell.tileVariant) return;
    displayTile(cell.tileVariant, x, y);
}

function display(grid) {
    for (let i = 0; i < GridWidth; i++) {
        for (let j = 0; j < GridHeight; j++) {
            let index = i + GridWidth * j;
            displayCell(grid[index], i, j)
        }
    }
}