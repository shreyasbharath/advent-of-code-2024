import { ParseMultiplyInstructions, ExecuteMultiplyInstructions } from '../day_3/multiply_instruction_parser';
import { readStringFromFile } from '../shared/utils';

const input = readStringFromFile('./day_3/data.csv');

var potentialInstructionCount = (input.match(/mul/g) || []).length;

const instructions = ParseMultiplyInstructions(input);
let validMultiplyInstructions = instructions.filter(i => i.operator === 'mul');
console.log(`Num valid instructions ${validMultiplyInstructions.length} out of potential ${potentialInstructionCount}`);
console.log("Valid mul instructions: ", validMultiplyInstructions[validMultiplyInstructions.length - 1]);

const multipliedTotal = ExecuteMultiplyInstructions(instructions);

console.log(`Total: ${multipliedTotal}`);
