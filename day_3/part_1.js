import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_3/input.txt", { encoding: "utf-8" });
const operations = input.match(/mul\(\d{1,3},\d{1,3}\)/g);

let result = 0;

for (const operation of operations) {
    const [leftNumber, rightNumber] = operation
        .substring(4, operation.indexOf(")"))
        .split(",");

    result += leftNumber * rightNumber;
}

console.log(result);