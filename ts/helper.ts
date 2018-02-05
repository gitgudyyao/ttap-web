import { Str } from "./util/str";

import { BeautifySubjectName } from "./util/beautifySubjectName";

export function GetInitial(input: string): string {
    let result = BeautifySubjectName(input).trim();
    if (new Str(result).Contains("(")) {
        result = result
            .substring(0, result.indexOf("("))
            .trim();
    }
    return result
        .split(" ")
        .map((word) => {
            switch (word.toLowerCase()) {
                case "i":
                    return "1";
                case "ii":
                    return "2";
                default:
                    return word;

            }
        })
        .map((word) => (IsNonWhiteSpaceSymbols(word[0]) ?
            word[0] :
            ""))
        .join("");

    function IsNonWhiteSpaceSymbols(char: string): boolean {
        return char !== " " && new Str(char).IsAlphaNumeric();
    }
}

export function DecToBin(digit: number, outputBinaryLength: number) {
    let out = "";
    while (outputBinaryLength--) {
        out += (digit >> outputBinaryLength) & 1;
    }
    return out;
}
