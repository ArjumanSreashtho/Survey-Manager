const requireCredit = (req, res, next) => {
  if (req.user.credits <= 0) {
    return res.status(403).json({ error: "Not enough credits." });
  }
  next();
};

module.exports = requireCredit;
