/**
 * This rule works by saying "this side of this tile can be connected to this side of this other tile"
 * Example: the Right side of tile 1 can be connected to the Down side of tile 2
 * Example 2: Any (All) side of tile 1 can be connected to any (All) side of tile 3 
 */
 class NeighborRule extends Rule {
    constructor(tile1, sideTile1, tile2, sideTile2) {
        super();

        this.tile1 = tile1;
        this.tile2 = tile2;
        this.sideTile1 = sideTile1;
        this.sideTile2 = sideTile2;
    }

    generateAuthorized(tileVariant) {
        const authorized = [];
        const subRules = this.splitAllOrientations();

        for (let subRule of subRules) {
            if (tileVariant.tile === subRule.tile1) {
                authorized.push(this.createAuthorization(subRule.sideTile1, subRule.sideTile2, tileVariant));
            }
            if (tileVariant.tile === subRule.tile2) {
                authorized.push(this.createAuthorization(subRule.sideTile2, subRule.sideTile1, tileVariant));
            }
        }

        return authorized.filter(a => a !== null);
    }

    splitAllOrientations() {
        if (this.sideTile1 === Orientation.None || this.sideTile2 === Orientation.None) return [];
        if (this.sideTile1 !== Orientation.All && this.sideTile2 !== Orientation.All) return [this];

        let subRules;

        if (this.sideTile1 === Orientation.All) {
            // We can invert the order of the tiles & sides as the rule is symmetric
            // This is useful so that we don't have to handle sideTile2 now
            subRules = [
                new NeighborRule(this.tile2, this.sideTile2, this.tile1, Orientation.Up),
                new NeighborRule(this.tile2, this.sideTile2, this.tile1, Orientation.Right),
                new NeighborRule(this.tile2, this.sideTile2, this.tile1, Orientation.Down),
                new NeighborRule(this.tile2, this.sideTile2, this.tile1, Orientation.Left)
            ];
        }
        else {
            subRules = [
                new NeighborRule(this.tile2, this.sideTile2, this.tile1, this.sideTile1)
            ];
        }

        // This next call to generateSubRules will handle sideTile2
        return subRules.flatMap(r => r.splitAllOrientations());
    }

    isConcerned(tile) {
        return tile === this.tile1 || tile === this.tile2;
    }

    createAuthorization(side1, side2, tileVariant) {
        let orientation = side1;
        let tileVariantOrientation = (6 + side1 - side2) % 4;

        for (let i = 0; i < tileVariant.orientation; i++) {
            orientation = rotateOrientation(orientation);
            tileVariantOrientation = rotateOrientation(tileVariantOrientation);
        }

        if (this.tile2.variants.findIndex(v => v.orientation == tileVariantOrientation) == -1) 
            return null;

        let authorizedTileVariant = new TileVariant(this.tile2, null, tileVariantOrientation);
        return new Authorization(orientation, authorizedTileVariant);
    }
}