class Cell {
    constructor(id, index, options, tileVariant) {
        this.id = id;
        this.index = index;
        this.options = options;
        this.tileVariant = tileVariant;
    }

    get entropy() {
        const sumWeights = this.options.reduce((acc, curr) => acc + curr.tile.weight, 0);
        const sumWlogW = this.options.reduce((acc, curr) => acc + curr.tile.weight * Math.log(curr.tile.weight), 0);

        // Shannon entropy
        return Math.log(sumWeights) - sumWlogW / sumWeights;
    }

    pickRandomOption() {
        const sumWeights = this.options.reduce((acc, curr) => acc + curr.tile.weight, 0);
        const random = Math.random() * sumWeights;

        let addedWeight = 0;
        for (let option of this.options) {
            addedWeight += option.tile.weight;

            if (addedWeight > random) {
                return option;
            }
        }

        return this.options[this.options.length - 1];
    }
}
