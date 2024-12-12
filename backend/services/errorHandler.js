const errorLogger = (err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
};

module.exports = { errorLogger };
