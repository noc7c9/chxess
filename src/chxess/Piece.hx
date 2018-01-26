package chxess;

enum Color {
    White; Black;
}

enum Type {
    Pawn; Knight; Bishop; Rook; Queen; King;
}

class Piece {

    public var color(default, null):Color;
    public var type(default, null):Type;

    public static function fromString(piece) {
        var color:Color = switch (piece.charAt(0).toUpperCase()) {
            case 'W': White;
            case 'B': Black;
            case _: throw 'Error: Invalid piece color: ' + piece.charAt(0);
        };
        var type:Type = switch (piece.charAt(1).toUpperCase()) {
            case '':  Pawn;
            case 'N': Knight;
            case 'B': Bishop;
            case 'R': Rook;
            case 'Q': Queen;
            case 'K': King;
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
