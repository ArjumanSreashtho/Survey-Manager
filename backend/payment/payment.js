const router = require("express").Router();
const Stripe = require("stripe");

const requireLogin = require("../middleware/requireLogin");
const keys = require("../config/keys");

const stripe = Stripe(keys.STRIPE_SECRET_KEY);

router.post("/stripe", requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    source: req.body.id,
    description: "My First Test Charge (created for API docs)",
  });
  req.user.credits += 5;
  const user = await req.user.save();
  res.json(user);
});

module.exports = router;
