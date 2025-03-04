class Board {
    constructor() {
        this.grid = this.createBoard();
    }

    createBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(null);
            }
            board.push(row);
        }
        return board;
    }

    placePiece(piece, x, y) {
        this.grid[x][y] = piece;
        piece.position = { x: x, y: y };
    }

    movePiece(piece, newX, newY) {
        if (piece.isMoveOk(newX, newY)) {//אם המהלך תקין
            this.grid[piece.position.x][piece.position.y] = null; // מחיקת הכלי מהמיקום הישן
            this.grid[newX][newY] = piece; // העברת הכלי למיקום החדש
            piece.position = { x: newX, y: newY };//עדכון המקום
            alert(`${piece.name} moved to (${newX}, ${newY})`);
        } else {
            alert("Invalid move!");
        }
    }

    displayBoard() {
        for (let i = 0; i < 8; i++) {
            let row = "";//ראשית ניצור שורה ריקה
            for (let j = 0; j < 8; j++) {
                let piece = this.grid[i][j]; // בחירת המשבצת לכלי 
                
                if (piece) { //אם יש כלי
                    row += piece.name[0] + "  "; //הצגת הכלים, לפי אות ראשונה בשם
                } else { 
                    row += ".  "; 
                }
            }
            console.log(row);
        }
        console.log("\n");
    }
    


}

//(Player)
class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color; // "White" או "Black"
    }
}
//כלים המופיעים על לוח השחמט
class Pawn {
    constructor(color) {
        this.name = "Pawn";
        this.color = color;
        this.position = null;
    }

    isMoveOk(newX, newY) {
        let { x, y } = this.position;
        return (newX === x - 1 && newY === y); // צעד אחד קדימה
    }
}

class Rook {
    constructor(color) {
        this.name = "Rook";
        this.color = color;
        this.position = null;
    }

    isMoveOk(newX, newY) {
        let { x, y } = this.position;
        return newX === x || newY === y; // נע רק אופקית או אנכית
    }
}

class Knight {
    constructor(color) {
        this.name = "Knight";
        this.color = color;
        this.position = null;
     
    }

    isMoveOk(newX, newY) {
        let { x, y } = this.position;
        return (Math.abs(newX - x) === 2 && Math.abs(newY - y) === 1) ||
               (Math.abs(newX - x) === 1 && Math.abs(newY - y) === 2); // L movement
    }
}

class Bishop {
    constructor(color) {
        this.name = "Bishop";
        this.color = color;
        this.position = null;
    }

    isMoveOk(newX, newY) {
        let { x, y } = this.position;
        return Math.abs(newX - x) === Math.abs(newY - y); // תנועה אלכסונית באופן כזה כך שההפרשים חייבים להיות זהים 
        }
        //דרך נוספת, ניתן בעזרת פיתגורס ונוסחת מרחק של גיאומטריה אנליטית
}

class Queen {
    constructor(color) {
        this.name = "Queen";
        this.color = color;
        this.position = null;
    }

    isMoveOk(newX, newY) {
        let { x, y } = this.position;
        return newX === x || newY === y || Math.abs(newX - x) === Math.abs(newY - y); //תזוזה לכל הכיוונים
    }
}

class King {
    constructor(color) {
        this.name = "King";
        this.color = color;
        this.position = null;
    }

    isMoveOk(newX, newY) {
        let { x, y } = this.position;
        return Math.abs(newX - x) <= 1 && Math.abs(newY - y) <= 1; // צעד אחד לכל כיוון
    }
}

const board = new Board();
const player1 = new Player("Matan", "White");
const player2 = new Player("Noa", "Black");
const whitePawn = new Pawn("White");
const blackKing = new King("Black");
const whiteQueen = new Queen("White");
const blackBishop = new Bishop("Black");

board.displayBoard();
