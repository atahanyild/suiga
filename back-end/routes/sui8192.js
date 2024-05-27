const express = require("express");
const controller = require("../controllers/sui8192");
const router = express.Router();

router.get("/leaderboard", controller.getLeaderboard);

module.exports = router;
