import PCancelable from 'p-cancelable';

const delay = (ms: number) => {
  return new PCancelable<number>((resolve, reject, onCancel) => {
    const timer = setTimeout(resolve, ms);

    onCancel.shouldReject = false;
    onCancel(() => clearTimeout(timer));
  });
};

export default delay;
