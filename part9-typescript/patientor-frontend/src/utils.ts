export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const entryStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}