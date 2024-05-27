"use client";

import { ConnectButton, ErrorCode } from "@suiet/wallet-kit";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-400 p-4 flex items-center justify-between font-bold z-[999]">
      <div className="flex space-x-8 items-center">
        <Link href="/">
          <p className="text-[#27628a] text-xl font-bold cursor-pointer">
            SuiGa
          </p>
        </Link>
        <Link href="/games">
          <p className="text-black cursor-pointer">Games Library</p>
        </Link>
        <Link href="/games">
          <p className="text-black cursor-pointer">Marketplace</p>
        </Link>
        <Link href="/games">
          <p className="text-black cursor-pointer">LeaderBoard</p>
        </Link>
      </div>
      <div className="flex space-x-8 items-center">
        <Link href="/games">
          <p className="text-black cursor-pointer">List your Game</p>
        </Link>
        <ConnectButton
          onConnectError={(error) => {
            if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
              console.warn(
                "user rejected the connection to " + error.details?.wallet
              );
            } else {
              console.warn("unknown connect error: ", error);
            }
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
