import {normalizeString} from "./string-helper";

export async function parseNumber(value: string): Promise<number> {
    const numberResult = Number(normalizeString(value));
    if (Number.isNaN(numberResult)) {
        throw new Error(`Display is not a number: "${value}"`);
    }
    return numberResult;
}