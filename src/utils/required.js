function required(message) {
  if (message instanceof Error) {
    throw message;
  }
  throw new Error(message);
}

module.exports = required;
