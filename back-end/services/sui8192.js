exports.getLeaderboard = async (req, res) => {
  const fetch = await import("node-fetch").then((module) => module.default);
  const url = "https://sui-node.ethoswallet.xyz/";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "0",
        method: "sui_multiGetObjects",
        params: [
          [
            "0xa834ebce466a79a3e2136c05fadce0322318051e0609f208a5d42cc04e0a67a3",
          ],
          {
            showContent: true,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.result[0].data.content.fields.top_games.map((game) => {
      return {
        game_id: game.fields.game_id,
        leader_address: game.fields.leader_address,
        score: game.fields.score,
        top_tile: game.fields.top_tile,
      };
    });
  } catch (error) {
    throw error;
  }
};
