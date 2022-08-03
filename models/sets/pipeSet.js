class PipeSet extends Set {
    constructor() {
        super();

        this.pipeTTile = new Tile("PipeT", [TileSymmetry.Rotation], 1, TileDisplayTypes.Image, "./assets/pipeT.png");
    
        this.RULES = [
            new NeighborRule(this.pipeTTile, Orientation.Up, this.pipeTTile, Orientation.Up),
            new NeighborRule(this.pipeTTile, Orientation.Up, this.pipeTTile, Orientation.Left),
            new NeighborRule(this.pipeTTile, Orientation.Up, this.pipeTTile, Orientation.Right),
            new NeighborRule(this.pipeTTile, Orientation.Left, this.pipeTTile, Orientation.Left),
            new NeighborRule(this.pipeTTile, Orientation.Left, this.pipeTTile, Orientation.Right),
            new NeighborRule(this.pipeTTile, Orientation.Right, this.pipeTTile, Orientation.Right),
            new NeighborRule(this.pipeTTile, Orientation.Down, this.pipeTTile, Orientation.Down),
        ];
    }

    rules() {
        return this.RULES;
    }

    tiles() {
        return [this.pipeTTile];
    }
}