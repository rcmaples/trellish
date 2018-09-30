const jsonValidator = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      code: 400,
      reason: 'BadRequest',
      message: 'Request not formatted correctly.'
    });
  } else {
    next();
  }
};

module.exports = jsonValidator;
