class CustomError extends Error {
  constructor(message, code, res) {
    console.log({ message, res });
    super(message);
    this.code = code;
    res.status(code).send(message);
  }
}

module.exports = CustomError;
