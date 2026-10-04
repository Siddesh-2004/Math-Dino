export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function makeProblem(n1Range, n2Range) {
  const a = randomInt(Number(n1Range[0]), Number(n1Range[1]));
  const b = randomInt(Number(n2Range[0]), Number(n2Range[1]));
  return { a, b, answer: String(a * b) };
}