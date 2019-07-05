class ErrorHandler extends Error {
  constructor(message, status = 404) {
    super(message);
    this.status = status;
  }
}

export default ErrorHandler;
