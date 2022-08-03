class MapSet extends Set {
    constructor() {
        super();

        this.TILES = [
            new Tile("Water", [TileSymmetry.None], 0.45, TileDisplayTypes.Image, "./assets/water.png"),
            new Tile("Sand", [TileSymmetry.None], 0.1, TileDisplayTypes.Image, "./assets/sand.png"),
            new Tile("Forest", [TileSymmetry.None], 0.45, TileDisplayTypes.Image, "./assets/forest.png")
        ];
    
        this.RULES = [
            new NeighborRule(this.TILES[0], Orientation.All, this.TILES[0], Orientation.All),
            new NeighborRule(this.TILES[0], Orientation.All, this.TILES[1], Orientation.All),
            new NeighborRule(this.TILES[1], Orientation.All, this.TILES[2], Orientation.All),
            new NeighborRule(this.TILES[2], Orientation.All, this.TILES[2], Orientation.All)
        ];
    }

    rules() {
        return this.RULES;
    }

    tiles() {
        return this.TILES;
    }
}