interface ErrorReporter {
  send(error: Error): void;
}

export type { ErrorReporter };
