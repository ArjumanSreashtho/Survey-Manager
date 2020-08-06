const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You are not logged in." });
  }
  next();
};

module.exports = requireLogin;
