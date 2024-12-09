import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_9/input.txt", { encoding: "utf-8" });

let arr = [];

let left = 0;
let right = 1;

while (right <= input.length) {
	arr.push([parseInt(input[left], 10), parseInt(input[right], 10) || 0]);
	left += 2;
	right += 2;
}

let str = "";

for (let i = 0; i < arr.length; i++) {
	const element = arr[i];
	const [fileSize, freeSpace] = element;
	for (let j = 0; j < fileSize; j++) str += i;
	for (let k = 0; k < freeSpace; k++) str += ".";
}

const strArr = str.split("");

let left2 = 0;
let right2 = strArr.length - 1;
while (left2 < right2) {
	if (strArr[left2] !== ".") {
		left2++;
	} else if (strArr[right2] === ".") {
		right2--;
	} else {
		strArr[left2] = strArr[right2];
		strArr[right2] = ".";
		left2++;
		right2--;
	}
}

let result = 0;
for (let i = 0; i < strArr.length; i++) {
	if (strArr[i] === ".") break;
	result += i * strArr[i];
}

console.log(result);
