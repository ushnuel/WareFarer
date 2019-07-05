class feedbackHandler {
  static message(res, data, status = 200) {
    res.status(status).json({
      status,
      data,
    });
  }

  static error(err, req, res, next) {
    const { status = 500, message } = err;
    const error = status === 500 ? 'Server Error' : message;
    console.log('err: ', err);
    res.status(status).json({
      status,
      error,
    });
  }
}

export default feedbackHandler;
