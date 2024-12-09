import * as P from 'parsimmon';

export type MultiplyInstruction = { operator: string, lhs: number, rhs: number };

const MultiplyOperator = P.regex(/.*?mul/).desc('multiply operator').trim(P.optWhitespace);

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
    (_, __, lhs, ___, rhs) => ({ operator: "mul", lhs: lhs, rhs: rhs })
);

const OptionalCorruption = P.any;

const ParseMultiplyExpressions = P.alt(ValidMultiplyExpression, OptionalCorruption);

// const StreamParseMultiplyExpressions = ParseMultiplyExpressions.many();

const StreamParseMultiplyExpressions = P.seqMap(
    ValidMultiplyExpression.many(), // Match zero or more valid "add(x,y)" expressions
    OptionalCorruption.many(),   // Skip over any invalid content (non-add expressions)
    (validInstructions) => validInstructions // We only care about valid instructions
);

export function ParseMultiplyInstructions(input: string): MultiplyInstruction[] {
    const result = StreamParseMultiplyExpressions.tryParse(input);
    console.log(result);
    return result;
}

// const input = "mul(1,2) mul(2,3) mul(3,4) mul (4,5) xmul(5,6) mul(6, 7) mul(10,20) mul(6,9!) ?(12,34) mul[3,7] mul(32,64] mul(32,64) (mul(11,8)mul(8,5)) mul ( 2 , 4 )";
// const result = StreamParseMultiplyExpressions.tryParse(input);
// console.log(result);
