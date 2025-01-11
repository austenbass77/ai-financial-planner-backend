const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;
  // Simulate AI response
  res.json({ response: `You said: ${message}. Let me assist you with that.` });
});

module.exports = router;
