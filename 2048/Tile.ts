export class Tile {
    value: number;

    constructor() {
        this.value = 0;
    }

    public print() {
        console.log(this.value);
    }

    public tryToFuse(tile: Tile) {
        if (this.canFuse(tile)) {
            this.value *= 2;
            console.log('Fused an', this.value);
            tile.destroy();
        }
    }

    public canFuse(tile: Tile): boolean {
        return this.exists() && this.value === tile.value;
    }

    public exists(): boolean {
        return this.value > 0;
    }

    public destroy() {
        this.value = 0;
    }

    public spawn(): boolean {
        if (this.exists()) {
            return false;
        }
        this.value = Math.random() < 0.9 ? 2 : 4;
        return true;
    }

    public moveTo(tile) {
        tile.value = this.value;
        this.destroy();
    }
}