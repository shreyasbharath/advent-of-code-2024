import * as P from 'parsimmon';

export type MultiplyInstruction = { operator: string, lhs: number, rhs: number };

const MultiplyOperator = P.regex(/.*?mul/).desc('multiply operator');

const OpenParen = P.string('(').desc('open');
const CloseParen = P.string(')').desc('close');
const Comma = P.string(',').desc('comma');

const Operand = P.regex(/^\d{1,3}/).map(Number).fallback(0).desc('operand');

const ValidMultiplyExpression = P.seqMap(
    MultiplyOperator,
    OpenParen,
    Operand,
    Comma,
    Operand,
    CloseParen,
    function (_operator, _open, lhs, _comma, rhs, _close) {
        return { operator: "mul", lhs: lhs, rhs: rhs };
    }
);

const OptionalCorruption = P.any.result({ operator: "invalid", lhs: 0, rhs: 0 });

const StreamParseMultiplyExpressions = P.alt(
    ValidMultiplyExpression,
    OptionalCorruption
).many();

export function ParseMultiplyInstructions(input: string): MultiplyInstruction[] {
    const result = StreamParseMultiplyExpressions.parse(input);
    if (!result.status) {
        // console.log(result);
        return [];
    }
    // console.log(result);
    return result.value;
}

export function ExecuteMultiplyInstructions(instructions: MultiplyInstruction[]): number {
    let multiplyInstructions = instructions.filter(i => i.operator === 'mul');
    let total = multiplyInstructions.reduce(function (accumulator, instruction) {
        return accumulator + (instruction.lhs * instruction.rhs);
    }, 0);
    return total;
}
