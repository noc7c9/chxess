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
        var endStr = end.toString();
        if (this.capture != null) {
            return '${pieceStr}x${endStr}';
        } else {
            return pieceStr + endStr;
        }
    }

}
