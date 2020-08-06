const router = require("express").Router();
const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");

const requireLogin = require("../middleware/requireLogin");
const requireCredit = require("../middleware/requireCredit");
const Survey = require("../models/surveyModel");
const mailer = require("../service/mailer");

router.get("/", requireLogin, async (req, res) => {
  try {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  } catch (error) {
    res.send(error);
  }
});

router.post("/webhooks", (req, res) => {
  console.log(req.body);
  const events = req.body.map((event) => {
    const pathname = new URL(event.url).pathname;
    const pattern = new Path("/api/survey/:surveyId/:choice");
    const match = pattern.test(pathname);
    if (match) {
      return {
        email: event.email,
        surveyId: match.surveyId,
        choice: match.choice,
      };
    }
  });

  //Removing undefined elements

  const compactEvents = _.compact(events);

  //Removing duplicate elements

  const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

  //Updating current survey

  console.log(uniqueEvents);

  uniqueEvents.map((event) => {
    Survey.updateOne(
      {
        _id: event.surveyId,
        recipients: {
          $elemMatch: { email: event.email, responded: false },
        },
      },
      {
        $inc: { [event.choice]: 1 },
        $set: { "recipients.$.responded": true },
        lastCheck: new Date(),
      }
    ).exec();
  });

  res.send({});
});

router.get("/:surveyId/:choice", (req, res) => {
  res.send("Thank you for your feedback!!");
});

router.post("/new", requireLogin, requireCredit, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  const survey = new Survey({
    _user: req.user.id,
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => {
      return { email };
    }),
    createDate: Date.now(),
  });

  survey.recipients.map((recipient) => {
    mailer(
      survey.id,
      survey.title,
      survey.subject,
      survey.body,
      recipient.email
    );
  });

  try {
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(422).send(error);
  }
});

module.exports = router;
