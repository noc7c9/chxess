package chxess;

import haxe.ds.HashMap;
using haxe.EnumTools.EnumValueTools;

import chxess.Coord;
import chxess.Piece;


// Basically just a rank/file pair
abstract Vec(Array<Int>) {

    inline public function new(arr) {
        this = [arr[0], arr[1]];
    }

    public var rank(get, never):Int;
    inline function get_rank() {
        return this[0];
    }

    public var file(get, never):Int;
    inline function get_file() {
        return this[1];
    }

    @:from
    static inline public function fromArrayInt(arr:Array<Int>) {
        return new Vec(arr);
    }

}


/***
 * Main class
 */

@:expose("Chxess")
class Chxess {

    var board:HashMap<Coord, Piece>;
    var turn:Color = White;

    public function new(?initialLayout) {
        board = new HashMap();

        // setup board

        var backrowSetup:Map<File, Type> = [
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
            board.set(new Coord(R1, file),
                new Piece(White, piece));
            board.set(new Coord(R8, file),
                new Piece(Black, piece));

            // pawns
            board.set(new Coord(R2, file),
                new Piece(White, Pawn));
            board.set(new Coord(R7, file),
                new Piece(Black, Pawn));
        }

        if (initialLayout != null) {
            setBoard(initialLayout);
        }
    }

    public function getTurn() {
        if (turn == White) {
            return 'w';
        } else {
            return 'b';
        }
    }

    public function setTurn(newTurn) {
        switch (newTurn) {
            case 'w':
                turn = White;
            case 'b':
                turn = Black;
            default:
                throw 'Error: Invalid turn value: ' + newTurn;
        }
    }

    public function toggleTurn() {
        turn = switch (turn) {
            case White: Black;
            case Black: White;
        }
    }

    public function getBoard() {
        var ranks = [];
        for (r in Rank.createAll()) {
            var file = [];
            for (f in File.createAll()) {
                var piece = board.get(new Coord(r, f));
                file.push(piece != null ? piece.toString() : '');
            }
            ranks.push(file);
        }
        ranks.reverse();
        return ranks;
    }

    public function setBoard(newBoard) {
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

    public function getMoves(?coord) {
        if (coord != null) {
            return getMovesSingle(Coord.fromString(coord));
        } else {
            return getMovesAll();
        }
    }

    function getMovesAll() {
        var moves = [];
        for (coord in board.keys()) {
            var piece = board.get(coord);
            if (piece.color == turn) {
                var sMoves = getMovesSingle(coord);

                var coordStr = coord.toString();
                var pieceStr = piece.toString();
                var numMoves = sMoves.length;
                var movesStr = sMoves
                    .map(function (v) {
                        return v.toString();
                    })
                    .join(', ');

                moves = moves.concat(sMoves);
            }
        }
        return moves;
    }

    function getMovesSingle(coord:Coord) {
        var piece = board.get(coord);

        if (piece == null) {
            return [];
        } else {
            var moves;

            // only calculate moves if the piece of the current turn color
            if (turn != piece.color) {
                return [];
            }

            switch (piece.type) {
                case Rook:
                    moves = getRookMoves(coord);
                case Bishop:
                    moves = getBishopMoves(coord);
                case Queen:
                    moves = getQueenMoves(coord);
                case Knight:
                    moves = getKnightMoves(coord);
                case King:
                    moves = getKingMoves(coord);
                case Pawn:
                    moves = getPawnMoves(coord, piece.color);
                default:
                    moves = [];
            }
            return moves.map(function (move) {
                return move.toString();
            });
        }
    }

    inline function getQueenMoves(coord) {
        return getAllMovesInDirs(coord, [
            [1, 1], [1, -1], [-1, 1], [-1, -1],
            [1, 0], [-1, 0], [0, 1], [0, -1],
        ]);
    }

    inline function getBishopMoves(coord) {
        return getAllMovesInDirs(coord, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }

    inline function getRookMoves(coord) {
        return getAllMovesInDirs(coord, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
    }

    inline function getKnightMoves(coord) {
        return getAllMovesInDirs(coord, [
            [-1, -2], [-1, 2], [-2, -1], [-2, 1],
            [1, -2], [1, 2], [2, -1], [2, 1],
        ], { maxDist: 1 });
    }

    inline function getKingMoves(coord) {
        return getAllMovesInDirs(coord, [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1],
        ], { maxDist: 1 });
    }

    inline function getPawnMoves(coord:Coord, color:Color) {
        var isOnHomeRow = coord.rank == switch (color) {
            case White: R2;
            case Black: R7;
        };
        var rankDir = switch (color) {
            case White: 1;
            case Black: -1;
        };

        var normalMoves = getAllMovesInDirs(coord, [[rankDir, 0]], {
            maxDist: isOnHomeRow ? 2 : 1,
            excludeCaptures: true,
        });
        var capturingMoves = getAllMovesInDirs(coord,
                [[rankDir, 1], [rankDir, -1]], {
            maxDist: 1,
            onlyCaptures: true,
        });

        return normalMoves.concat(capturingMoves);
    }

    function getAllMovesInDirs(startCoord, dirs:Array<Vec>,
            ?opts:{ ?maxDist:Int, ?excludeCaptures:Bool, ?onlyCaptures:Bool }) {

        var maxDist = 8;
        var excludeCaptures = false;
        var onlyCaptures = false;
        if (opts != null) {
            maxDist = opts.maxDist != null ? opts.maxDist : maxDist;
            excludeCaptures = opts.excludeCaptures != null
                ? opts.excludeCaptures : excludeCaptures;
            onlyCaptures = opts.onlyCaptures != null
                ? opts.onlyCaptures : onlyCaptures;
        }

        var moves = [];

        for (dir in dirs) {
            var dist = 0;
            var coord = startCoord;
            var coordInfo;
            do {
                coord = getCoordOffsetBy(coord, dir);
                coordInfo = getCoordInfo(coord);
                if (coordInfo.isOnBoard) {
                    var isNormalMove = coordInfo.isEmpty;
                    var isCapturingMove = !coordInfo.isEmpty && !coordInfo.isFriendly;
                    if ((!onlyCaptures && isNormalMove)
                            || (!excludeCaptures && isCapturingMove)) {
                        var move = new Move(
                            board.get(startCoord),
                            startCoord, coord,
                            board.get(coord));
                        moves.push(move);
                    }
                    dist += 1;
                }
            } while (coordInfo.isEmpty && dist < maxDist);
        }

        return moves;
    }

    function getCoordInfo(coord) {
        var info = {
            isOnBoard: false,
            isEmpty: false, // note: true implies isOnBoard is true
            isFriendly: false, // note: true implies isEmpty is false
        };

        if (coord == null) { // stop if the coord is invalid
            return info;
        } else {
            info.isOnBoard = true;

            var piece = board.get(coord);
            info.isEmpty = piece == null;
            info.isFriendly = !info.isEmpty && piece.color == turn;

            return info;
        }
    }

    function getCoordOffsetBy(startCoord:Coord, offset:Vec) {
        var rankIndex = startCoord.rank.getIndex();
        var fileIndex = startCoord.file.getIndex();

        rankIndex += offset.rank;
        fileIndex += offset.file;

        // make sure the new coord is within bounds
        if (rankIndex < 0 || rankIndex > 7 || fileIndex < 0 || fileIndex > 7) {
            return null;
        }

        var newRank = Rank.createByIndex(rankIndex);
        var newFile = File.createByIndex(fileIndex);
        return new Coord(newRank, newFile);
    }

}
