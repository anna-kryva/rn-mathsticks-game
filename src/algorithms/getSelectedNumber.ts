import { PlayerConfiguration } from '../types';

const getProperResult = (
  takenMatches: number,
  valueEven: number,
  valueOdd: number
): number => {
  if (takenMatches % 2 == 0) {
    return valueEven;
  } else {
    return valueOdd;
  }
};

export default function getSelectedMatches(player: PlayerConfiguration): number {
  const { totalMatches, leftMatches, takenMatches, firstMover } = player;

  if (leftMatches <= 0) {
    return 0;
  }

  if (firstMover && totalMatches === leftMatches) {
    return 2;
  }

  switch (leftMatches % 8) {
    case 0:
    case 4:
      return 3;
    case 1:
    case 5:
      return 1;
    case 2:
      return firstMover ? getProperResult(takenMatches, 2, 1) : 1;
    case 3:
      return firstMover ? getProperResult(takenMatches, 2, 3) : 3;
    case 6:
      return firstMover ? getProperResult(takenMatches, 1, 2) : 1;
    case 7:
      return firstMover ? getProperResult(takenMatches, 3, 2) : 3;
    default:
      return 0;
  }
}
