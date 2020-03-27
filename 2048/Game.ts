import {Board} from "./Board";
import {Direction} from "./Direction";

const readlineSync = require('readline-sync');

export class Game {
    board: Board;

    constructor() {
        this.board = new Board();
        this.play();
    }

    public play() {
        while (true) {
            this.board.print();
            const input = readlineSync.question('Your move! (w, a, s, d): ', () => {});
            switch (input) {
                case 'w': this.board.move(Direction.UP); break;
                case 'a': this.board.move(Direction.LEFT); break;
                case 's': this.board.move(Direction.DOWN); break;
                case 'd': this.board.move(Direction.RIGHT); break;
                default: break;
            }
        }

    }
}