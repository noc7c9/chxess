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

    public function new(rank, file) {
        this.rank = rank;
        this.file = file;
    }

    public function hashCode() {
        return rank.getIndex() + 8 * file.getIndex();
    }

    public function toString() {
        var fileString = Coord.fileToString(file);
        var rankString = Coord.rankToString(rank);
        return fileString + rankString;
    }

    public static function fromString(str) {
        var file = Coord.fileFromString(str.charAt(0));
        var rank = Coord.rankFromString(str.charAt(1));
        return new Coord(rank, file);
    }

    public static function fileToString(file:File) {
        return file.getName().toLowerCase();
    }

    public static function fileFromString(str:String):File {
        return switch (str.toUpperCase()) {
            case 'A': A;
            case 'B': B;
            case 'C': C;
            case 'D': D;
            case 'E': E;
            case 'F': F;
            case 'G': G;
            case 'H': H;
            case _: throw 'Error: Invalid file string: ' + str;
        };
    }

    public static function rankToString(rank:Rank) {
        return rank.getName().charAt(1);
    }

    public static function rankFromString(str):Rank {
        return switch (str) {
            case '1': R1;
            case '2': R2;
            case '3': R3;
            case '4': R4;
            case '5': R5;
            case '6': R6;
            case '7': R7;
            case '8': R8;
            case _: throw 'Error: Invalid rank string: ' + str;
        };
    }

}
