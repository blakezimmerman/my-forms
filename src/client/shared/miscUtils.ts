interface Matched<T, U> {
  on: (pred: Pred<T>, fn: Fn<T, U>) => Matched<T, U>;
  otherwise: (fn: (...args: T[]) => U) => U;
}

type Pred<T> = (...args: T[]) => boolean;
type Fn<T, U> = (...args: T[]) => U;

interface Match<T, U> {
  on: (pred: Pred<T>, fn: Fn<T, U>) => Matched<T, U> | Match<T, U>;
  otherwise: (fn: (...args: T[]) => U) => U;
}

const matched = <T, U>(x: U): Matched<T, U> => ({
  on: () => matched(x),
  otherwise: () => x
});

export const match = <T, U>(...args: T[]): Match<T, U> => ({
  on: (pred, fn) => (
    pred(...args)
      ? matched<T, U>(fn(...args))
      : match<T, U>(...args)
  ),
  otherwise: (fn: (...args: T[]) => U) => fn(...args)
});

export const is = <T>(...args: T[]) => (...y: T[]) => args.some((x: T) => x === y[0]);

export const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

export const range = (lower: number, upper: number) =>
  Array.from(new Array(upper - lower), (x, i) => i + lower);
