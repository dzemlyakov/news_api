class UnauthorizedError extends Error {
  constructor(messege) {
    super(messege);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
