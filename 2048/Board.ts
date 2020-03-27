import {Tile} from "./Tile";
import {Direction} from "./Direction";

export class Board {
    tiles: Tile[][];
    size: number;

    constructor(size?: number) {
        this.tiles = [];
        if (size) {
            this.size = size;
        } else {
            this.size = 4;
        }
        this.initializeBoard();
    }

    public print() {
        for (let row = 0; row < this.size; row++) {
            const rowArray = this.getRow(row);
            const joinedString = rowArray.map(tile => tile.value).join(' | ');
            console.log(`| ${joinedString} |`);
        }
    }

    public move(direction: Direction) {
        let oneDimArray: [number, number][];
        if (direction === Direction.UP || direction === Direction.DOWN) {
            oneDimArray = this.getCoordinatesByRow();
        } else {
            oneDimArray = this.getCoordinatesByColumn();
        }
        if (direction === Direction.DOWN || direction === Direction.RIGHT) {
            oneDimArray.reverse();
        }
        for (const coordinates of oneDimArray) {
            this.moveTile(coordinates[0], coordinates[1], direction);
        }
        this.spawnTile();
    }

    private moveTile(row: number, column: number, direction: Direction) {
        const tile = this.getTile(row, column);
        if (tile.exists()) {
            let goalRow, goalColumn: number;
            if (direction === Direction.UP || direction === Direction.DOWN) {
                goalColumn = column;
                goalRow = this.firstFreeRow(column, direction);
            } else {
                goalRow = row;
                goalColumn = this.firstFreeColumn(row, direction);
            }
            if (goalRow > -1 && goalColumn > -1) {
                const goalTile = this.getTile(goalRow, goalColumn);
                tile.moveTo(goalTile);
                this.checkCollision(goalRow, goalColumn, direction);
            } else {
                this.checkCollision(row, column, direction);
            }
        }
    }

    private checkCollision(row, column, direction) {
        let hitRow = row;
        let hitColumn = column;
        if (direction === Direction.UP) {
            hitRow -= 1;
        } else if (direction === Direction.DOWN) {
            hitRow += 1;
        } else if (direction === Direction.LEFT) {
            hitColumn -= 1;
        } else {
            hitColumn += 1;
        }
        if (hitColumn < 0 || hitColumn >= this.size || hitRow < 0 || hitRow >= this.size) {
            return;
        }
        console.log("Hit:", hitRow, hitColumn, " By:", row, column);
        const hitTile = this.getTile(hitRow, hitColumn);
        const baseTile = this.getTile(row, column);
        hitTile.tryToFuse(baseTile);
    }

    private initializeBoard() {
        for (let row = 0; row < this.size; row++) {
            this.tiles.push([]);
            for (let column = 0; column < this.size; column++) {
                this.tiles[row].push(new Tile());
            }
        }
        this.spawnTile();
        this.spawnTile();
    }

    private spawnTile() {
        let spawned = false;
        while (!spawned) {
            const randomTile = this.getRandomTile();
            spawned = randomTile.spawn();
        }
    }

    private getTile(row, column): Tile {
        return this.tiles[row][column];
    }

    private getRandomTile(): Tile {
        const row = Math.floor(Math.random() * Math.floor(this.size));
        const column = Math.floor(Math.random() * Math.floor(this.size));
        return this.getTile(row, column);
    }

    private firstFreeRow(column: number, direction: Direction) {
        const columnArrayValues = this.getColumn(column).map(tile => tile.value);
        if (direction == Direction.DOWN) {
            return columnArrayValues.lastIndexOf(0)
        }
        return columnArrayValues.indexOf(0);
    }

    private firstFreeColumn(row: number, direction: Direction) {
        const rowArrayValues = this.getRow(row).map(tile => tile.value);
        if (direction == Direction.RIGHT) {
            return rowArrayValues.lastIndexOf(0)
        }
        return rowArrayValues.indexOf(0);
    }

    private getCoordinatesByRow(): [number, number][] {
        const oneDimArray: [number, number][] = [];
        for (let row = 0; row < this.size; row++) {
            for (let column = 0; column < this.size; column++) {
                oneDimArray.push([row, column]);
            }
        }
        return oneDimArray;
    }

    private getCoordinatesByColumn(): [number, number][] {
        const oneDimArray: [number, number][] = [];
        for (let column = 0; column < this.size; column++) {
            for (let row = 0; row < this.size; row++) {
                oneDimArray.push([row, column]);
            }
        }
        return oneDimArray;
    }

    private getRow(row: number): Tile[] {
        const returnArray: Tile[] = [];
        for (let column = 0; column < this.size; column++) {
            returnArray.push(this.getTile(row, column));
        }
        return returnArray;
    }

    private getColumn(column: number): Tile[] {
        const returnArray: Tile[] = [];
        for (let row = 0; row < this.size; row++) {
            returnArray.push(this.getTile(row, column));
        }
        return returnArray;
    }
}