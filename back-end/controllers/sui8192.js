const { getLeaderboard } = require("../services/sui8192.js");

exports.getLeaderboard = async (req, res) => {
  try {
    console.log("in controllers");
    const leaderboard = await getLeaderboard();
    console.log("l", leaderboard);
    res.status(200).json({ leaderboard });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
