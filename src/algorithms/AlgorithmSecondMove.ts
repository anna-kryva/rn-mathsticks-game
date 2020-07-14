export default function numberToTakeWhenSecond(leftMatches: number): number {
  if (leftMatches <= 0) {
    return 0;
  }

  switch (leftMatches % 4) {
    case 0:
    case 3:
      return 3;
    case 1:
    case 2:
      return 1;
    default: 
      throw new Error('Problem');
  }
}
