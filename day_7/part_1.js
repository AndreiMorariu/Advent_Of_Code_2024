import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_7/input.txt", { encoding: "utf-8" });

const map = {};

const splittedInput = input.trim().split("\r\n");

for (let i = 0; i < splittedInput.length; i++) {
	const [result, numbers] = splittedInput[i].trim().split(":");
	const numbersArray = numbers.trim().split(" ").map(Number);
	map[result] = numbersArray;
}

const validEquations = new Set();

for (let [key, value] of Object.entries(map)) {
	key = parseInt(key);
	const combinations = possibleCombinations(value.length - 1);
	for (let i = 0; i < combinations.length; i++) {
		const operatorCombination = combinations[i];
		let equation = "";

		for (let j = 0; j < value.length; j++) {
			equation += `${value[j]} `;
			if (j < operatorCombination.length) {
				equation += `${operatorCombination[j]} `;
			}
		}

		const result = calculateResult(equation.trim());

		if (result === key) validEquations.add(result);
	}
}

function possibleCombinations(numOperators) {
	const operators = ["+", "*"];
	const combinations = [];

	const totalCombinations = Math.pow(2, numOperators);

	for (let i = 0; i < totalCombinations; i++) {
		let combination = [];
		let bitmask = i;

		for (let j = 0; j < numOperators; j++) {
			combination.push(operators[bitmask % 2]);
			bitmask = Math.floor(bitmask / 2);
		}

		combinations.push(combination);
	}

	return combinations;
}

function calculateResult(equation) {
	const tokens = equation.split(" ");

	let result = parseInt(tokens[0]);

	for (let i = 1; i < tokens.length; i += 2) {
		const operator = tokens[i];
		const nextNumber = parseInt(tokens[i + 1]);

		operator === "+" ? (result += nextNumber) : (result *= nextNumber);
	}

	return result;
}

console.log(Array.from(validEquations).reduce((a, b) => a + b));
