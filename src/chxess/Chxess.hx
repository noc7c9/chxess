package chxess;

import haxe.ds.HashMap;
using haxe.EnumTools.EnumValueTools;

import chxess.Coord;
import chxess.Piece;


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

    public function getMoves(coord) {
        var coord = Coord.fromString(coord);
        var piece = board.get(coord);

        if (piece == null) {
            return [];
        } else {
            var moveCoords;

            // only calculate moves if the piece of the current turn color
            if (turn != piece.color) {
                return [];
            }

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
            return moveCoordsToStrings(moveCoords,
                Piece.typeToString(piece.type));
        }
    }

    function moveCoordsToStrings(moveCoords, piecePrefix:String) {
        return moveCoords.map(function (moveCoord) {
            return piecePrefix + moveCoord.toString();
        });
    }

    function getQueenMoveCoords(coord) {
        return getRiderMoveCoords(coord, [
            [1, 1], [1, -1], [-1, 1], [-1, -1],
            [1, 0], [-1, 0], [0, 1], [0, -1],
        ]);
    }

    function getBishopMoveCoords(coord) {
        return getRiderMoveCoords(coord, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }

    function getRookMoveCoords(coord) {
        return getRiderMoveCoords(coord, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
    }

    function getKnightMoveCoords(coord) {
        return getLeaperMoveCoords(coord, [
            [-1, -2], [-1, 2], [-2, -1], [-2, 1],
            [1, -2], [1, 2], [2, -1], [2, 1],
        ]);
    }

    function getKingMoveCoords(coord) {
        return getLeaperMoveCoords(coord, [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1],
        ]);
    }

    function getPawnMoveCoords(startCoord, color:Color) {
        var moves = [];
        var rankDir = switch (color) {
            case White: 1;
            case Black: -1;
        };
        var homeRow:Rank = switch (color) {
            case White: R2;
            case Black: R7;
        };

        // single pawn push
        var coord = getCoordOffsetBy(startCoord, rankDir, 0);
        var coordInfo = getCoordInfo(coord);
        if (coordInfo.isEmpty) {
            moves.push(coord);
        } else {
            // if the single push is blocked, the double push is as well
            // so stop here
            return moves;
        }

        // double pawn push
        if (startCoord.rank == homeRow) {
            var coord = getCoordOffsetBy(startCoord, rankDir * 2, 0);
            var coordInfo = getCoordInfo(coord);
            if (coordInfo.isEmpty) {
                moves.push(coord);
            }
        }

        return moves;
    }

    function getRiderMoveCoords(startCoord, dirs:Array<Array<Int>>) {
        var moves = [];
        for (dir in dirs) {
            for (coord in getAllMoveCoordsInDir(startCoord, dir[0], dir[1])) {
                moves.push(coord);
            }
        }
        return moves;
    }

    function getLeaperMoveCoords(startCoord, offsets:Array<Array<Int>>) {
        var moves = [];
        for (offset in offsets) {
            var coord = getCoordOffsetBy(startCoord, offset[0], offset[1]);
            var coordInfo = getCoordInfo(coord);
            if (coordInfo.isEmpty) {
                moves.push(coord);
            }
        }
        return moves;
    }

    function getAllMoveCoordsInDir(coord, rankDir, fileDir) {
        var moves = [];

        var coordInfo;
        do {
            coord = getCoordOffsetBy(coord, rankDir, fileDir);
            coordInfo = getCoordInfo(coord);
            if (coordInfo.isEmpty) {
                moves.push(coord);
            }
        } while (coordInfo.isEmpty);

        return moves;
    }

    function getCoordInfo(coord) {
        var info = {
            isEmpty: false, // note: true implies isOnBoard is true
            isFriendly: false, // note: true implies isEmpty is false
        };

        if (coord == null) { // stop if the coord is invalid
            return info;
        } else {
            var piece = board.get(coord);
            info.isEmpty = piece == null;
            info.isFriendly = !info.isEmpty && piece.color == turn;
            return info;
        }
    }

    function getCoordOffsetBy(startCoord:Coord, rankOffset, fileOffset) {
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
