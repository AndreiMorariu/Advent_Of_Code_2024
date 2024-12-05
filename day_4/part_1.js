import * as fs from "node:fs/promises";

const file = await fs.open("./day_4/input.txt");
const arr = [];
let occurences = 0;

for await (const line of file.readLines()) {
	arr.push([...line]);
}

for (let i = 0; i < arr.length; i++) {
	const row = arr[i];
	for (let j = 0; j < row.length; j++) {
		const char = arr[i][j];
		if (char === "X") {
			let string = "";
			// Check forward (left to right)
			if (j <= row.length - 4) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i][j + k];
				}
				if (string === "XMAS") occurences++;
			}

			// Check backwards (right to left)
			if (j >= 3) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i][j - k];
				}
				if (string === "XMAS") occurences++;
			}

			// Check vertically (top to bottom)
			if (i <= arr.length - 4) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i + k][j];
				}
				if (string === "XMAS") occurences++;
			}

			// Check vertically (bottom to top)
			if (i >= 3) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i - k][j];
				}
				if (string === "XMAS") occurences++;
			}

			// Diagonal (top-left to bottom-right)
			if (i <= arr.length - 4 && j <= row.length - 4) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i + k][j + k];
				}
				if (string === "XMAS") occurences++;
			}

			// Diagonal (top-right to bottom-left)
			if (i <= arr.length - 4 && j >= 3) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i + k][j - k];
				}
				if (string === "XMAS") occurences++;
			}

			// Diagonal (bottom-left to top-right)
			if (i >= 3 && j <= row.length - 4) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i - k][j + k];
				}
				if (string === "XMAS") occurences++;
			}

			// Diagonal (bottom-right to top-left)
			if (i >= 3 && j >= 3) {
				string = arr[i][j];
				for (let k = 1; k <= 3; k++) {
					string += arr[i - k][j - k];
				}
				if (string === "XMAS") occurences++;
			}
		}
	}
}

console.log(occurences);
