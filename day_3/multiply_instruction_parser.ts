import * as P from 'parsimmon';

export type MultiplyInstruction = { operator: string, lhs: number, rhs: number };

// const OptionalCorruption = P.regex(/.*?/).map(() => null);
// const SkipInvalid = P.regex(/[^a-zA-Z0-9(),]*?/).map(() => null);
const MultiplyOperator = P.regex(/.*?(mul)/).desc('multiply operator').trim(P.optWhitespace);

const OpenParen = P.string('(').desc('open');
const CloseParen = P.string(')').desc('close');
const Comma = P.string(',').desc('comma');

const Operand = P.regex(/^\d{1,3}/).map(Number).desc('operand');

const ValidMultiplyExpression = P.seqMap(
    // OptionalCorruption,
    MultiplyOperator,
    OpenParen,
    Operand,
    Comma,
    Operand,
    CloseParen,
    (operator, _, lhs, __, rhs) => ({ operator: "mul", lhs: lhs, rhs: rhs })
);

const StreamParseMultiplyExpressions = ValidMultiplyExpression.many();

export function ParseMultiplyInstructions(input: string): MultiplyInstruction[] {
    return StreamParseMultiplyExpressions.tryParse(input);
}

const input = "mul(1,2) mul(2,3) mul(3,4)";
const result = StreamParseMultiplyExpressions.tryParse(input);
console.log(result);
