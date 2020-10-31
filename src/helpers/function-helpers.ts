export const call = <TReturn, TArgs extends unknown[]>(fn?: (...args: TArgs) => TReturn, ...args: TArgs): TReturn =>
    fn ? fn(...args) : undefined;
