package chxess;

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
        var file:File = switch (coord.charAt(0).toUpperCase()) {
            case 'A': A;
            case 'B': B;
            case 'C': C;
            case 'D': D;
            case 'E': E;
            case 'F': F;
            case 'G': G;
            case 'H': H;
            case _: throw 'Error: Invalid coord file: ' + coord.charAt(0);
        };
        var rank:Rank = switch (coord.charAt(1).toUpperCase()) {
            case '1': R1;
            case '2': R2;
            case '3': R3;
            case '4': R4;
            case '5': R5;
            case '6': R6;
            case '7': R7;
            case '8': R8;
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
