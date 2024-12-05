import * as fs from "node:fs/promises";

const DO = "do()";
const DONT = "don't()";

const input = await fs.readFile("./day_3/input.txt", { encoding: "utf-8" });
const operations = input.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g);

let result = 0;

let left = 0;
let right = left + 1;

while (right < operations.length - 1) {
	if (operations[left] === DONT) {
		if (operations[right] === DO) {
			left = right;
			right++;
		} else {
			right++;
			continue;
		}
	}

	if (operations[left] === DO) {
		left++;
		right++;
	}

	const [leftNumber, rightNumber] = operations[left]
		.substring(4, operations[left].indexOf(")"))
		.split(",");

	result += leftNumber * rightNumber;

	left++;
	right++;
}

console.log(result);
