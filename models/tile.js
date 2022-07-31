class Tile {
    constructor(name, symmetries, weight, displayType, displayValue) {
        this.name = name;
        this.symmetries = symmetries;
        this.weight = weight;
        this.displayType = displayType;
        this.displayValue = displayValue;

        this.variants = this.generateVariants();
    }

    generateVariants() {
        const variants = [
            new TileVariant(this, null, 0)
        ];

        for (let symmetry of this.symmetries) {
            if (symmetry === TileSymmetry.Rotation) {
                variants.push(new TileVariant(this, null, 1));
                variants.push(new TileVariant(this, null, 2));
                variants.push(new TileVariant(this, null, 3));
            }
        }

        return variants;
    }
}

class TileVariant {
    constructor(tile, reflection, orientation) {
        this.tile = tile;
        this.reflection = reflection;
        this.orientation = orientation;

        this.authorized = [];
    }

    generateAuthorized(rules) {
        for (let rule of rules) {
            if (rule.isConcerned(this.tile)) {
                this.authorized = this.authorized.concat(rule.generateAuthorized(this));
            }
        }
    }

    equals(other) {
        return this.tile == other.tile &&
            this.reflection == other.reflection &&
            this.orientation == other.orientation;
    }
}

const TileSymmetry = {
    None: 'None',
    // Vertical: 'Vertical',
    // Horizontal: 'Horizontal',
    Rotation: 'Rotation',
    // All: 'All'
}

const TileDisplayTypes = {
    Image: 'Image',
    Value: 'Value'
}