package chxess;

import chxess.Coord;
import chxess.Piece;

class Move {

    public var piece(default, null):Piece;
    public var start(default, null):Coord;
    public var end(default, null):Coord;
    public var capture(default, null):Null<Piece>;

    public function new(piece, start, end, ?capture) {
        this.piece = piece;
        this.start = start;
        this.end = end;
        this.capture = capture;
    }

    public function toString() {
        var pieceStr = Piece.typeToString(piece.type);
        var startStr = start.toString();
        var endStr = end.toString();

        var joinChar = this.capture != null ? 'x' : '-';

        return pieceStr + startStr + joinChar + endStr;
    }

    static public function fromString(move:String, context:Chxess) {
        var startIndex = move.length == 6 ? 1 : 0;

        var startCoord = Coord.fromString(move.substr(startIndex, 2));
        var endCoord = Coord.fromString(move.substr(startIndex+3, 2));

        var piece = new Piece(Piece.colorFromString(context.getTurn()),
            Piece.typeFromString(move.substring(0, startIndex)));

        var capturedPieceStr = context.getSquare(endCoord.toString());
        var capturedPiece = null;
        if (capturedPieceStr != '') {
            capturedPiece = Piece.fromString(capturedPieceStr);
        }

        return new Move(piece, startCoord, endCoord, capturedPiece);
    }

}
