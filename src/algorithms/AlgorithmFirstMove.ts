const getProperResult = (playerScore: number, valueEven: number, valueOdd: number) => {
  if (playerScore % 2 == 0) {
    return valueEven;
  } else {
    return valueOdd;
  }
};

export default function numberToTakeWhenFirst(
  leftMatches: number,
  playerScore: number,
  firstIteration = false
): number {
  if (leftMatches <= 0) {
    return 0;
  }

  if (firstIteration) {
    return 2;
  } else {
    switch (leftMatches % 8) {
      case 0:
      case 4:
        return 3;
      case 1:
      case 5:
        return 1;
      case 2:
        return getProperResult(playerScore, 2, 1);
      case 3:
        return getProperResult(playerScore, 2, 3);
      case 6:
        return getProperResult(playerScore, 1, 2);
      case 7:
        return getProperResult(playerScore, 3, 2);
      default:
        throw new Error('Problem');
    }
  }
}
