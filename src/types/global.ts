/* eslint-disable @typescript-eslint/no-unused-vars -- Global types may not be used */

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
