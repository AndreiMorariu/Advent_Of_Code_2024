import * as fs from "node:fs/promises";

const input = await fs.open("./day_1/input.txt");

const leftSide = [];
const rightSide = [];

for await (const line of input.readLines()) {
    const [leftNumber, rightNumber] = line.split("   ");
    leftSide.push(leftNumber);
    rightSide.push(rightNumber);
}

if (leftSide.length !== rightSide.length) process.exit(64);

const differences = [];

const sortedLeftSide = leftSide.sort((a, b) => a - b);
const sortedRightSide = rightSide.sort((a, b) => a - b);

for (let i = 0; i < sortedLeftSide.length; i++) {
    const difference = Math.abs(
        parseInt(sortedLeftSide[i]) - parseInt(sortedRightSide[i])
    );

    differences.push(difference);
}

console.log(differences.reduce((a, b) => a + b)); // Result: 1765812