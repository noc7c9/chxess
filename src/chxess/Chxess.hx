package chxess;

import haxe.ds.HashMap;
using haxe.EnumTools.EnumValueTools;


/***
 * Coord
 */

enum Rank {
    R1; R2; R3; R4; R5; R6; R7; R8;
}

enum File {
    A; B; C; D; E; F; G; H;
}

class Coord {
    public var rank(default, null):Rank;
    public var file(default, null):File;

    public static function fromString(coord) {
        var file = switch (coord.charAt(0).toUpperCase()) {
            case 'A': File.A;
            case 'B': File.B;
            case 'C': File.C;
            case 'D': File.D;
            case 'E': File.E;
            case 'F': File.F;
            case 'G': File.G;
            case 'H': File.H;
            case _: throw 'Error: Invalid coord file: ' + coord.charAt(0);
        };
        var rank = switch (coord.charAt(1).toUpperCase()) {
            case '1': Rank.R1;
            case '2': Rank.R2;
            case '3': Rank.R3;
            case '4': Rank.R4;
            case '5': Rank.R5;
            case '6': Rank.R6;
            case '7': Rank.R7;
            case '8': Rank.R8;
            case _: throw 'Error: Invalid coord rank: ' + coord.charAt(1);
        };
        return new Coord(rank, file);
    }

    public function new(rank, file) {
        this.rank = rank;
        this.file = file;
    }

    public function hashCode() {
        return rank.getIndex() + 8 * file.getIndex();
    }

    public function toString() {
        var fileString = file.getName().toLowerCase();
        var rankString = rank.getName().charAt(1);
        return fileString + rankString;
    }

}


/***
 * Piece
 */

enum PieceColor {
    White; Black;
}

enum PieceType {
    Pawn; Knight; Bishop; Rook; Queen; King;
}

class Piece {
    public var color(default, null):PieceColor;
    public var type(default, null):PieceType;

    public static function fromString(piece) {
        var color = switch (piece.charAt(0).toUpperCase()) {
            case 'W': PieceColor.White;
            case 'B': PieceColor.Black;
            case _: throw 'Error: Invalid piece color: ' + piece.charAt(0);
        };
        var type = switch (piece.charAt(1).toUpperCase()) {
            case '': PieceType.Pawn;
            case 'N': PieceType.Knight;
            case 'B': PieceType.Bishop;
            case 'R': PieceType.Rook;
            case 'Q': PieceType.Queen;
            case 'K': PieceType.King;
            case _: throw 'Error: Invalid piece type: ' + piece.charAt(1);
        };
        return new Piece(color, type);
    }

    public function new(color, type) {
        this.color = color;
        this.type = type;
    }

    public function toString() {
        var colorString = switch (color) {
            case White: 'w';
            case Black: 'b';
        }
        return colorString + getPieceString();
    }

    public function getPieceString() {
        return switch (type) {
            case Pawn: '';
            case Knight: 'N';
            case Bishop: 'B';
            case Rook: 'R';
            case Queen: 'Q';
            case King: 'K';
        }
    }

}


/***
 * Main class
 */

@:expose("Chxess")
class Chxess {

    var board:HashMap<Coord, Piece>;

    public function new() {
        board = new HashMap();

        // setup board

        var backrowSetup = [
            A => Rook,
            B => Knight,
            C => Bishop,
            D => Queen,
            E => King,
            F => Bishop,
            G => Knight,
            H => Rook
        ];

        for (file in File.createAll()) {
            // back rows
            var piece = backrowSetup[file];
            board.set(new Coord(Rank.R1, file),
                new Piece(PieceColor.White, piece));
            board.set(new Coord(Rank.R8, file),
                new Piece(PieceColor.Black, piece));

            // pawns
            board.set(new Coord(Rank.R2, file),
                new Piece(PieceColor.White, PieceType.Pawn));
            board.set(new Coord(Rank.R7, file),
                new Piece(PieceColor.Black, PieceType.Pawn));
        }
    }

    public function getBoard():Array<Array<String>> {
        var ranks = new Array<Array<String>>();
        for (r in Rank.createAll()) {
            var file = new Array<String>();
            for (f in File.createAll()) {
                var piece = board.get(new Coord(r, f));
                file.push(piece != null ? piece.toString() : '');
            }
            ranks.push(file);
        }
        ranks.reverse();
        return ranks;
    }

    public function setBoard(newBoard:Array<Array<String>>) {
        for (r in 0...8) {
            var rank = Rank.createByIndex(7 - r);
            for (f in 0...8) {
                var file = File.createByIndex(f);

                var coord = new Coord(rank, file);
                var pieceString = newBoard[r][f];
                if (pieceString == '') {
                    board.remove(coord);
                } else {
                    var piece = Piece.fromString(pieceString);
                    board.set(coord, piece);
                }
            }
        }
    }

    public function clearBoard() {
        for (key in board.keys()) {
            board.remove(key);
        }
    }

    public function getSquare(coord) {
        var coord = Coord.fromString(coord);
        var piece = board.get(coord);
        return piece != null ? piece.toString() : '';
    }

    public function setSquare(coord, piece) {
        var coord = Coord.fromString(coord);
        if (piece == '') {
            board.remove(coord);
        } else {
            var piece = Piece.fromString(piece);
            board.set(coord, piece);
        }
    }

    public function getMoves(coord) {
        var coord = Coord.fromString(coord);
        var piece = board.get(coord);

        if (piece == null) {
            return [];
        } else {
            var moveCoords;
            switch (piece.type) {
                case Rook:
                    moveCoords = getRookMoveCoords(coord);
                case Bishop:
                    moveCoords = getBishopMoveCoords(coord);
                case Queen:
                    moveCoords = getQueenMoveCoords(coord);
                case Knight:
                    moveCoords = getKnightMoveCoords(coord);
                case King:
                    moveCoords = getKingMoveCoords(coord);
                case Pawn:
                    moveCoords = getPawnMoveCoords(coord, piece.color);
                default:
                    moveCoords = [];
            }
            return moveCoordsToStrings(moveCoords, piece.getPieceString());
        }
    }

    function moveCoordsToStrings(
            moveCoords:Array<Coord>, piecePrefix:String):Array<String> {
        return moveCoords.map(function (moveCoord) {
            return piecePrefix + moveCoord.toString();
        });
    }

    function getQueenMoveCoords(coord:Coord):Array<Coord> {
        return getRiderMoveCoords(coord, [
            [1, 1], [1, -1], [-1, 1], [-1, -1],
            [1, 0], [-1, 0], [0, 1], [0, -1],
        ]);
    }

    function getBishopMoveCoords(coord:Coord):Array<Coord> {
        return getRiderMoveCoords(coord, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }

    function getRookMoveCoords(coord:Coord):Array<Coord> {
        return getRiderMoveCoords(coord, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
    }

    function getKnightMoveCoords(coord:Coord):Array<Coord> {
        return getLeaperMoveCoords(coord, [
            [-1, -2], [-1, 2], [-2, -1], [-2, 1],
            [1, -2], [1, 2], [2, -1], [2, 1],
        ]);
    }

    function getKingMoveCoords(coord:Coord):Array<Coord> {
        return getLeaperMoveCoords(coord, [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1],
        ]);
    }

    function getPawnMoveCoords(startCoord:Coord, color):Array<Coord> {
        var moves = [];
        var rankDir = switch (color) {
            case White: 1;
            case Black: -1;
        };
        var homeRow = switch (color) {
            case White: Rank.R2;
            case Black: Rank.R7;
        };

        // single pawn push
        var coord = getOffsetCoord(startCoord, rankDir, 0);
        if (coord != null) {
            moves.push(coord);
        }

        // double pawn push
        if (startCoord.rank == homeRow) {
            var coord = getOffsetCoord(startCoord, rankDir * 2, 0);
            if (coord != null) {
                moves.push(coord);
            }
        }

        return moves;
    }

    function getRiderMoveCoords(startCoord:Coord,
            dirs:Array<Array<Int>>):Array<Coord> {
        var moves = [];
        for (dir in dirs) {
            for (coord in getAllCoordsInDir(startCoord, dir[0], dir[1])) {
                moves.push(coord);
            }
        }
        return moves;
    }

    function getLeaperMoveCoords(startCoord:Coord,
            offsets:Array<Array<Int>>):Array<Coord> {
        var moves = [];
        for (offset in offsets) {
            var coord = getOffsetCoord(startCoord, offset[0], offset[1]);
            if (coord != null) {
                moves.push(coord);
            }
        }
        return moves;
    }

    function getAllCoordsInDir(coord:Coord, rankDir:Int, fileDir:Int):Array<Coord> {
        var moves = [];
        while (coord != null) {
            coord = getOffsetCoord(coord, rankDir, fileDir);
            if (coord != null) {
                moves.push(coord);
            }
        }
        return moves;
    }

    function getOffsetCoord(startCoord:Coord, rankOffset:Int, fileOffset:Int):Coord {
        var rankIndex = startCoord.rank.getIndex();
        var fileIndex = startCoord.file.getIndex();

        rankIndex += rankOffset;
        fileIndex += fileOffset;

        // make sure the new coord is within bounds
        if (rankIndex < 0 || rankIndex > 7 || fileIndex < 0 || fileIndex > 7) {
            return null;
        }

        var newRank = Rank.createByIndex(rankIndex);
        var newFile = File.createByIndex(fileIndex);
        return new Coord(newRank, newFile);
    }

}
