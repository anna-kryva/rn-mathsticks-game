import { StatusEvent } from '../types';

const renderStatusEvent = (selectedNumber: number): StatusEvent => ({
  timestamp: Date.now(),
  status: `Player has chosen ${selectedNumber} matchstick${
    selectedNumber != 1 ? 's' : ''
  }.`,
});

export default renderStatusEvent;