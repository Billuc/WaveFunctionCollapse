let GridWidth, GridHeight, CanvasWidth, CanvasHeight, TileWidth, TileHeight;
let canvasElement, canvasContext;

const tileImageDict = {};

function setupDisplay(gridWidth, gridHeight) {
    GridWidth = gridWidth;
    GridHeight = gridHeight;
    CanvasWidth = 400;
    CanvasHeight = 400;
    TileWidth = Math.floor(CanvasWidth / GridWidth);
    TileHeight = Math.floor(CanvasHeight / GridHeight);

    canvasElement = document.createElement("canvas");
    canvasElement.width = CanvasWidth;
    canvasElement.height = CanvasHeight;
    canvasElement.id = "grid";

    document.body.appendChild(canvasElement);
    canvasContext = canvasElement.getContext("2d");
}

async function getTileImage(tileName, displayValue) {
    if (tileName in tileImageDict) return tileImageDict[tileName];

    var img = new Image();
    await new Promise(res => img.onload = res, img.src = displayValue);
    tileImageDict[tileName] = img;
    return img;
}

function drawWithRotation(image, x, y, rotation) {
    // let rotatedX, rotatedY;

    // switch (rotation) {
    //     case 1: 
    //         rotatedX = y;
    //         rotatedY = GridWidth - x - 1;
    //         break;
    //     case 2:
    //         rotatedX = GridWidth - x - 1;
    //         rotatedY = GridHeight - y - 1;
    //         break;
    //     case 3:
    //         rotatedX = GridHeight - y - 1;
    //         rotatedY = x;
    //         break;
    //     default:
    //         rotatedX = x;
    //         rotatedY = y;
    // }

    canvasContext.save();
    // canvasContext.translate(CanvasWidth / 2 - 1, CanvasHeight / 2 - 1);
    // canvasContext.rotate(rotation * Math.PI / 2);
    // canvasContext.translate(-CanvasWidth / 2 + 1, -CanvasHeight / 2 + 1);


    // canvasContext.drawImage(
    //     image,
    //     rotatedX * TileWidth,
    //     rotatedY * TileHeight,
    //     TileWidth,
    //     TileHeight
    // );

    canvasContext.setTransform(1, 0, 0, 1, (x + 0.5) * TileWidth, (y + 0.5) * TileHeight);
    canvasContext.rotate(rotation * Math.PI / 2);
    canvasContext.drawImage(
        image, 
        -TileWidth/2,
        -TileHeight/2,
        TileWidth,
        TileHeight
    );

    canvasContext.restore();
}

function displayTile(tileVariant, x, y) {
    var tile = tileVariant.tile;

    if (tile.displayType == TileDisplayTypes.Value) {
        canvasContext.fillStyle = "black";
        canvasContext.fillText(
            tile.displayValue,
            x * TileWidth,
            y * TileHeight
        );
    }
    else if (tile.displayType == TileDisplayTypes.Image) {
        getTileImage(tile.name, tile.displayValue)
            .then(img => drawWithRotation(img, x, y, tileVariant.orientation));
    }
}

function displayEntropy(entropy, x, y) {
    canvasContext.fillStyle = "black";
    canvasContext.fillText(
        entropy,
        Math.floor(x * CanvasWidth / GridWidth + 10),
        Math.floor(y * CanvasHeight / GridHeight + 10)
    );
}

function displayCell(cell, x, y) {
    // displayEntropy(Math.round(10 * cell.entropy) / 10, x, y);
    
    if (!cell.tileVariant) return;
    displayTile(cell.tileVariant, x, y);
}

function display(grid) {
    canvasContext.clearRect(0, 0, CanvasWidth, CanvasHeight);

    for (let i = 0; i < GridWidth; i++) {
        for (let j = 0; j < GridHeight; j++) {
            let index = i + GridWidth * j;
            displayCell(grid[index], i, j)
        }
    }
}