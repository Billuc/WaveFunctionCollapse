class Cell {
    constructor(id, index, options, tileVariant) {
        this.id = id;
        this.index = index;
        this.options = options;
        this.tileVariant = tileVariant;
    }

    get entropy() {
        return this.options.length;
    }
}
