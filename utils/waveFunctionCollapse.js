const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

const sets = [new PipeSet()];

const GRID = [];



function setup() {
    let set = random(sets);

    const variants = set.tiles().flatMap(t => t.variants);
    for (let i = 0; i < variants.length; i++) {
        variants[i].generateAuthorized(set.rules());
    }
    
    for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
        GRID[i] = new Cell(i, i, variants, null);
    }
}

function checkCompleted() {
    return GRID.every(c => c.tileVariant !== null);
}

function backTrack() {
    throw new Error("TODO : backtracking !");
}

function reduceOptions(index, tileVariant) {
    // UP
    try {
        const indexUp = elementUp(index, GRID_WIDTH, GRID_HEIGHT);
        const authorizedVariantsUp = tileVariant.authorized.filter(a => a.orientation == Orientation.Up);
        GRID[indexUp].options = GRID[indexUp].options.filter(o => authorizedVariantsUp.some(a => o.equals(a.tileVariant)));
    } catch {}

    // RIGHT
    try {
        const indexRight = elementRight(index, GRID_WIDTH, GRID_HEIGHT);
        const authorizedVariantsRight = tileVariant.authorized.filter(a => a.orientation == Orientation.Right);
        GRID[indexRight].options = GRID[indexRight].options.filter(o => authorizedVariantsRight.some(a => o.equals(a.tileVariant)));
    } catch {}

    // DOWN
    try {
        const indexDown = elementDown(index, GRID_WIDTH, GRID_HEIGHT);
        const authorizedVariantsDown = tileVariant.authorized.filter(a => a.orientation == Orientation.Down);
        GRID[indexDown].options = GRID[indexDown].options.filter(o => authorizedVariantsDown.some(a => o.equals(a.tileVariant)));
    } catch {}

    // LEFT
    try {
        const indexLeft = elementLeft(index, GRID_WIDTH, GRID_HEIGHT);
        const authorizedVariantsLeft = tileVariant.authorized.filter(a => a.orientation == Orientation.Left);
        GRID[indexLeft].options = GRID[indexLeft].options.filter(o => authorizedVariantsLeft.some(a => o.equals(a.tileVariant)));
    } catch {}
}

function runIteration() {
    if (checkCompleted()) return;

    // Selecting only collapsable cells
    let collapsableCells = GRID.filter(c => c.tileVariant === null);
    collapsableCells.sort((c1, c2) => c1.entropy - c2.entropy);
    const stopIndex = collapsableCells.findIndex(c => c.entropy > collapsableCells[0].entropy);
    if (stopIndex > 0) collapsableCells.splice(stopIndex);

    // Picking cell
    const cellToCollapse = random(collapsableCells);
    if (cellToCollapse.options.length == 0) backTrack();

    // Collapsing & modify options accordingly
    cellToCollapse.tileVariant = cellToCollapse.pickRandomOption();
    reduceOptions(cellToCollapse.index, cellToCollapse.tileVariant);

    display(GRID);
}

async function runComplete() {
    setup();
    display(GRID);

    while (!checkCompleted()) {
        runIteration();
        await delay(50);
    }
}


setup();
setupDisplay(GRID_WIDTH, GRID_HEIGHT);
display(GRID);

document.getElementById("run-iteration-btn").addEventListener("click", runIteration);
document.getElementById("run-complete-btn").addEventListener("click", runComplete);