const Orientation = {
    None: -1,
    Up: 0,
    Right: 1,
    Down: 2,
    Left: 3,
    All: 4
};

const rotateOrientation = (orientation) => {
    switch (orientation) {
        case Orientation.Up: return Orientation.Right;
        case Orientation.Right: return Orientation.Down;
        case Orientation.Down: return Orientation.Left;
        case Orientation.Left: return Orientation.Up;
        case Orientation.All: return Orientation.All;
        default: return Orientation.None;
    }
};