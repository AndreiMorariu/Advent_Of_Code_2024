import * as fs from "node:fs/promises";

const file = await fs.open("./day_2/input.txt");

let safeReports = 0;

for await (const line of file.readLines()) {
    const lineNumbers = line.split(" ");
    let isValid = false;

    if (isReportValid(lineNumbers)) {
        isValid = true;
    } else {
        for (let i = 0; i < lineNumbers.length; i++) {
            const modifiedNumbers = [
                ...lineNumbers.slice(0, i),
                ...lineNumbers.slice(i + 1),
            ];
            if (isReportValid(modifiedNumbers)) {
                isValid = true;
                break;
            }
        }
    }

    if (isValid) safeReports++;
}

function isReportValid(lineNumbers) {
    let isSafe = true;
    let isIncreasing = false;
    let isDecreasing = false;

    const firstNumber = parseInt(lineNumbers[0]);
    const secondNumber = parseInt(lineNumbers[1]);

    if (firstNumber > secondNumber) isDecreasing = true;
    else if (firstNumber < secondNumber) isIncreasing = true;
    else isSafe = false;

    for (let i = 0; i < lineNumbers.length - 1; i++) {
        let current = parseInt(lineNumbers[i]);
        let next = parseInt(lineNumbers[i + 1]);

        if (isIncreasing) {
            if (next <= current) {
                isSafe = false;
                break;
            }
            const difference = Math.abs(next - current);
            if (difference > 3) {
                isSafe = false;
                break;
            }
        }

        if (isDecreasing) {
            if (next >= current) {
                isSafe = false;
                break;
            }
            const difference = Math.abs(next - current);
            if (difference > 3) {
                isSafe = false;
                break;
            }
        }
    }

    if (isSafe) return true;

    return false;
}

console.log(safeReports); // Result: 621