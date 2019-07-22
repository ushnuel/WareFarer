class feedbackHandler {
  static message(res, data, status = 200) {
    res.status(status).json({
      status,
      data,
    });
  }

  // eslint-disable-next-line no-unused-vars
  static error(err, req, res, next) {
    const { status = 500, message } = err;
    const error = status === 500 ? 'Server Error' : message;
    res.status(status).json({
      status,
      error,
    });
  }
}

export default feedbackHandler;
