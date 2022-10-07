import { Actions } from "./colors";

export const log = (message: string, ...args: any[]) => {
  if (args.length > 0) {
    console.log(...args, message, Actions.reset);
  } else {
    console.log(message);
  }
};
