// data/games.js
const games = [
  {
    id: 1,
    name: "Sui Adventure",
    description: "An exciting adventure game on the Sui platform.",
    image: "/images/adventure.png",
    link: "https://sui-adventure.example.com",
    leaderboard: [
      { player: "0xe146...4818b49faa2", score: 4500 },
      { player: "0xb60e...25321b1a85f", score: 3500 },
      { player: "0xr52s...12318as1292", score: 2000 },
    ],
    stats: {
      totalPlayers: 1000,
      highestScore: 5000,
      averageScore: 2500,
    },
  },
  {
    id: 2,
    name: "Sui Puzzle",
    description: "A challenging puzzle game to test your skills.",
    image: "/images/puzzle.png",
    link: "https://sui-puzzle.example.com",
    leaderboard: [
      { player: "0xe146...4818b49faa2", score: 4500 },
      { player: "0xb60e...25321b1a85f", score: 3500 },
      { player: "0xr52s...12318as1292", score: 2000 },
    ],
    stats: {
      totalPlayers: 800,
      highestScore: 4500,
      averageScore: 2200,
    },
  },
  {
    id: 3,
    name: "Sui Racing",
    description: "A fast-paced racing game with stunning graphics.",
    image: "/images/racing.png",
    link: "https://sui-racing.example.com",
    leaderboard: [
      { player: "0xe146...4818b49faa2", score: 6000 },
      { player: "0xe146...4818b49faa2", score: 5000 },
      { player: "0xe146...4818b49faa2", score: 4000 },
    ],
    stats: {
      totalPlayers: 1200,
      highestScore: 6000,
      averageScore: 3000,
    },
  },
  {
    id: 4,
    name: "Sui Shooter",
    description: "An action-packed shooter game for thrill-seekers.",
    image: "/images/racing.png",
    link: "https://sui-shooter.example.com",
    leaderboard: [
      { player: "0xe146...4818b49faa2", score: 7000 },
      { player: "0xe146...4818b49faa2", score: 6000 },
      { player: "0xe146...4818b49faa2", score: 5000 },
    ],
    stats: {
      totalPlayers: 1500,
      highestScore: 7000,
      averageScore: 3500,
    },
  },
];

export default games;
