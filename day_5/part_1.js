import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_5/input.txt", { encoding: "utf-8" });

const pageOrderingRulesString = input.split("-")[0].trim();
const updatesString = input.split("-")[1].trim();

const orderingRules = {};

for (const rule of pageOrderingRulesString.split("\n")) {
	const [before, after] = rule.split("|");
	const parsedAfter = after?.replace(/(\r\n|\n|\r)/gm, "");
	if (orderingRules.hasOwnProperty(before))
		orderingRules[before].push(parsedAfter);
	else orderingRules[before] = [parsedAfter];
}

const updatesArray = updatesString.split("\r\n").map((update) => {
	return update.split(",");
});

function isUpdateCorrect(update) {
	const pageIndices = new Map();
	update.forEach((page, index) => pageIndices.set(page, index));

	for (const [before, afterList] of Object.entries(orderingRules)) {
		const beforeIndex = pageIndices.get(before);

		for (const after of afterList) {
			const afterIndex = pageIndices.get(after);

			if (beforeIndex !== undefined && afterIndex !== undefined) {
				if (beforeIndex >= afterIndex) return false;
			}
		}
	}
	return true;
}

const correctUpdates = [];
for (const update of updatesArray) {
	if (isUpdateCorrect(update)) {
		correctUpdates.push(update);
	}
}

const middlePagesSum = correctUpdates
	.map((update) => update[Math.floor(update.length / 2)])
	.map(Number)
	.reduce((sum, page) => sum + page, 0);

console.log(middlePagesSum);
