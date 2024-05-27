"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import games from "@/components/data/games";
import Image from "next/image";

type Game = {
  name: string;
  description: string;
  image: string;
  link: string;
  leaderboard: { player: string; score: number }[];
  stats: {
    totalPlayers: number;
    highestScore: number;
    averageScore: number;
  };
};

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start bg-gray-200 text-black p-8 h-full w-full ">
        {selectedGame ? (
          <div className="w-full h-full p-4 z-1">
            <button
              className="mb-4 text-[#4191c6] hover:text-[#306b93]"
              onClick={() => setSelectedGame(null)}
            >
              &lt; Back to Games List
            </button>
            <div className="w-full h-full flex flex-col">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full h-full bg-gray-100 rounded-xl shadow-xl p-4 flex min-h-[450px] justify-center items-start">
                  <div>
                    <Image
                      src={selectedGame.image}
                      alt={selectedGame.name}
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3 md:ml-8">
                    <h2 className="text-3xl font-semibold mb-4">
                      {selectedGame.name}
                    </h2>
                    <p className="text-lg mb-4">{selectedGame.description}</p>
                    <a
                      href={selectedGame.link}
                      className="text-black bg-[#4191c691] px-4 py-2 rounded-xl hover:text-[#686868] font-bold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Play Now
                    </a>
                  </div>
                </div>
                <div className="w-full h-full flex flex-col  bg-gray-100 p-4 px-12 rounded-xl shadow-xl min-h-[450px]">
                  <h3 className="text-2xl font-semibold text-start mt-8 mb-4 text-[#4191c6]">
                    Leaderboard
                  </h3>
                  <span className="bg-[#4191c657] rounded-full h-[1px] w-full" />

                  <ul className="mb-4">
                    {selectedGame.leaderboard.map((entry, index) => (
                      <div key={index} className="w-full h-full flex flex-col">
                        <li className="flex justify-between items-center hover:bg-[#4191c654] text-black p-3 rounded-md">
                          <div className="flex items-center gap-x-4">
                            <span className="text-lg font-bold">
                              {index + 1}
                            </span>
                            <span className="px-2 py-3 bg-white text-[#4191c6] rounded-lg font-semibold">
                              {entry.score}
                            </span>
                          </div>
                          <span className="text-lg font-semibold">
                            {entry.player}
                          </span>
                        </li>
                        <span className="bg-[#4191c657] rounded-full h-[1px] w-full"></span>
                      </div>
                    ))}
                  </ul>
                </div>

                <div className="w-full h-full flex flex-col bg-gray-100 p-4 px-12 rounded-xl shadow-xl min-h-[450px]">
                  <h3 className="text-2xl font-semibold text-start mt-8 mb-4 text-[#4191c6]">
                    Game Stats
                  </h3>
                  <span className="bg-[#4191c657] rounded-full h-[1px] w-full mb-4" />
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-black p-3 bg-white rounded-md shadow-md">
                      <div className="flex items-center gap-x-4">
                        <span className="text-lg font-bold">
                          Total Players:
                        </span>
                        <span className="px-2 py-1 bg-[#4191c6] text-white rounded-lg font-semibold">
                          {selectedGame.stats.totalPlayers}
                        </span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center text-black p-3 bg-white rounded-md shadow-md">
                      <div className="flex items-center gap-x-4">
                        <span className="text-lg font-bold">
                          Highest Score:
                        </span>
                        <span className="px-2 py-1 bg-[#4191c6] text-white rounded-lg font-semibold">
                          {selectedGame.stats.highestScore}
                        </span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center text-black p-3 bg-white rounded-md shadow-md">
                      <div className="flex items-center gap-x-4">
                        <span className="text-lg font-bold">
                          Average Score:
                        </span>
                        <span className="px-2 py-1 bg-[#4191c6] text-white rounded-lg font-semibold">
                          {selectedGame.stats.averageScore}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                className="p-4 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition"
                onClick={() => setSelectedGame(game)}
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  width={300}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold text-[#4191c6]">
                  {game.name}
                </h2>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
