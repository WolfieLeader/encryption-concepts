export const setTimer = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
