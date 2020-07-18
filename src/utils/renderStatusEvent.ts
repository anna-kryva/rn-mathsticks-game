import { StatusEvent } from '../types';

const renderStatusEvent = (selectedNumber: number, isAI: boolean): StatusEvent => ({
  timestamp: Date.now(),
  status: `${isAI ? 'AI' : 'Player'} has chosen ${selectedNumber} matchstick${
    selectedNumber != 1 ? 's' : ''
  }.`,
});

export default renderStatusEvent;