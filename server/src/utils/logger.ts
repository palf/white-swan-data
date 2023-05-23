// provided for convenience only; please use a real logging library

export const logger = console;

export type Logger = {
  trace: (payload: NonNullable<unknown>) => void;
  debug: (payload: NonNullable<unknown>) => void;
  info: (payload: NonNullable<unknown>) => void;
  warn: (payload: NonNullable<unknown>) => void;
  error: (payload: NonNullable<unknown>) => void;
};
