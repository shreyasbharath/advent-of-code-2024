import * as P from 'parsimmon';

// const OptionalCorruption = P.regex(/.*/).map(() => null);
const MultiplyOperator = P.regex(/.*mul/).desc('multiply operator');

const OpenParen = P.string('(').desc('open');
const CloseParen = P.string(')').desc('close');
const Comma = P.string(',').desc('comma');

const Operand = P.regex(/^\d{1,3}/).map(Number).desc('operand');

const MultiplyExpression = P.seqMap(
    MultiplyOperator,
    OpenParen,
    Operand,
    Comma,
    Operand,
    CloseParen,
    (operator, _, lhs, __, rhs) => ({ operator, lhs, rhs })
);

const SkipInvalid = P.regex(/[^a-zA-Z0-9(),]*/).map(() => null);

const ResilientMultiplyExpression = P.seqMap(
    SkipInvalid,
    MultiplyExpression,
    SkipInvalid,
    (_, expr) => expr
)

const input = "xblahblahmul(1,2)";
const result = ResilientMultiplyExpression.tryParse(input);

console.log(result);
