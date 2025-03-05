// Board class to manage the chessboard
class Board {
    constructor() {
        this.grid = this.createBoard();
    }

    createBoard() {
        return Array(8).fill(null).map(() => Array(8).fill(null));
    }

    placePiece(piece, x, y) {
        this.grid[x][y] = piece;
        piece.x = x;
        piece.y = y;
        piece.isActive = true;
    }

    movePiece(piece, newX, newY) {
        if (!piece.isActive) {
            console.log(`${piece.name} is no longer in play.`);
            return;
        }

        if (piece.isMoveOk(newX, newY)) {
            const targetPiece = this.grid[newX][newY];

            if (targetPiece && targetPiece.color !== piece.color) {
                console.log(`${piece.name} captures ${targetPiece.name}!`);
                targetPiece.isActive = false; // Mark captured piece as inactive
            }

            this.grid[piece.x][piece.y] = null;
            this.grid[newX][newY] = piece;
            piece.x = newX;
            piece.y = newY;

            console.log(`${piece.name} moved to (${newX}, ${newY})`);
        } else {
            console.log("Invalid move!");
        }
    }

    displayBoard() {
        console.log("\nChess Board:");
        this.grid.forEach(row => console.log(row.map(cell => (cell ? cell.name[0] : ".")).join(" ")));
        console.log("\n");
    }
}

// Basic ChessPiece constructor function
function ChessPiece(name, color) {
    this.name = name;
    this.color = color;
    this.x = null;
    this.y = null;
    this.isActive = true;

    this.isMoveOk = function (newX, newY) {
        return false; // Default: No valid moves
    };
}

// Specific chess pieces with movement logic
function Pawn(color) {
    ChessPiece.call(this, "Pawn", color);

    this.isMoveOk = function (newX, newY) {
        return newX === this.x - 1 && newY === this.y;
    };
}

function Rook(color) {
    ChessPiece.call(this, "Rook", color);

    this.isMoveOk = function (newX, newY) {
        return newX === this.x || newY === this.y;
    };
}

function Queen(color) {
    ChessPiece.call(this, "Queen", color);

    this.isMoveOk = function (newX, newY) {
        return newX === this.x || newY === this.y || Math.abs(newX - this.x) === Math.abs(newY - this.y);
    };
}

// Example: Using the board
const board = new Board();
const whitePawn = new Pawn("White");
const blackRook = new Rook("Black");
const whiteQueen = new Queen("White");

board.placePiece(whitePawn, 6, 0);
board.placePiece(blackRook, 0, 0);
board.placePiece(whiteQueen, 7, 3);

board.displayBoard();

board.movePiece(whitePawn, 5, 0);
board.movePiece(whiteQueen, 0, 0); // Queen captures Rook

board.displayBoard();
