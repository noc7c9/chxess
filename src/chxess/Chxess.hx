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
        var file = File.createByName(coord.charAt(0).toUpperCase());
        var rank = Rank.createByName('R' + coord.charAt(1).toUpperCase());
        return new Coord(rank, file);
    }

    public function new(rank, file) {
        this.rank = rank;
        this.file = file;
    }

    public function hashCode() {
        return rank.getIndex() + 8 * file.getIndex();
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

    public function new(color, type) {
        this.color = color;
        this.type = type;
    }

    public function toString() {
        var colorString = switch (color) {
            case White: 'w';
            case Black: 'b';
        }
        var pieceString = switch (type) {
            case Pawn: 'P';
            case Knight: 'N';
            case Bishop: 'B';
            case Rook: 'R';
            case Queen: 'Q';
            case King: 'K';
        }
        return colorString + pieceString;
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
                if (piece != null) {
                    file.push(piece.toString());
                } else {
                    file.push('');
                }
            }
            ranks.push(file);
        }
        ranks.reverse();
        return ranks;
    }

}
