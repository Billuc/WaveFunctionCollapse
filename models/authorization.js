class Authorization {
    constructor(orientation, tileVariant) {
        this.orientation = orientation;
        this.tileVariant = tileVariant;
    }

    equals(other) {
        return this.orientation == other.orientation &&
            this.tileVariant.equals(other.tileVariant);
    }
}