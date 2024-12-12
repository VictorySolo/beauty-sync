//  Extended Error class
class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
//  export module
module.exports = HttpError;
