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

    public function new(color, type) {
        this.color = color;
        this.type = type;
    }

    public function toString() {
        var colorString = Piece.colorToString(color);
        var typeString = Piece.typeToString(type);
        return colorString + typeString;
    }

    public static function fromString(str) {
        var color = Piece.colorFromString(str.charAt(0));
        var type = Piece.typeFromString(str.charAt(1));
        return new Piece(color, type);
    }

    public static function colorToString(color:Color) {
        return switch (color) {
            case White: 'w';
            case Black: 'b';
        }
    }

    public static function colorFromString(str):Color {
        return switch (str.toUpperCase()) {
            case 'W': White;
            case 'B': Black;
            case _: throw 'Error: Invalid color string: ' + str;
        };
    }

    public static function typeToString(type:Type) {
        return switch (type) {
            case Pawn: '';
            case Knight: 'N';
            case Bishop: 'B';
            case Rook: 'R';
            case Queen: 'Q';
            case King: 'K';
        }
    }

    public static function typeFromString(str):Type {
        return switch (str.toUpperCase()) {
            case '':  Pawn;
            case 'N': Knight;
            case 'B': Bishop;
            case 'R': Rook;
            case 'Q': Queen;
            case 'K': King;
            case _: throw 'Error: Invalid type string: ' + str;
        };
    }

}
