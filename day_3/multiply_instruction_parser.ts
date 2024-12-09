import * as P from 'parsimmon';

export type MultiplyInstruction = { operator: string, lhs: number, rhs: number };

const MultiplyOperator = P.regex(/.*?mul/).desc('multiply operator');

const OpenParen = P.string('(').desc('open');
const CloseParen = P.string(')').desc('close');
const Comma = P.string(',').desc('comma');

const Operand = P.regex(/^\d{1,3}/).map(Number).desc('operand');

const ValidMultiplyExpression = P.seqMap(
    MultiplyOperator,
    OpenParen,
    Operand,
    Comma,
    Operand,
    CloseParen,
    function (operator, open, lhs, _comma, rhs, _close) {
        return { operator: "mul", lhs: lhs, rhs: rhs };
    }
);

const OptionalCorruption = P.any;

const StreamParseMultiplyExpressions = P.seqMap(
    ValidMultiplyExpression.many(), // Match zero or more valid "add(x,y)" expressions
    OptionalCorruption.many(),   // Skip over any invalid content (non-add expressions)
    (validInstructions) => validInstructions // We only care about valid instructions
);

export function ParseMultiplyInstructions(input: string): MultiplyInstruction[] {
    const result = StreamParseMultiplyExpressions.tryParse(input);
    return result;
}

export function ExecuteMultiplyInstructions(instructions: MultiplyInstruction[]): number {
    let total = instructions.reduce(function (accumulator, instruction) {
        return accumulator + (instruction.lhs * instruction.rhs);
    }, 0);
    return total;
}
