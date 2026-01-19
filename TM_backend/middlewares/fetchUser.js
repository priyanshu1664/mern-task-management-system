module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user; // backend usage
    res.locals.user = req.session.user; // views usage
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};
