"use client";

import { useMemo } from "react";
import {
  useWallet,
  useAccountBalance,
  addressEllipsis,
  formatSUI,
  SuiChainId,
  ConnectButton,
  ErrorCode,
} from "@suiet/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

const sampleNft = new Map([
  [
    "sui:devnet",
    "0xe146dbd6d33d7227700328a9421c58ed34546f998acdc42a1d05b4818b49faa2::nft::mint",
  ],
  [
    "sui:testnet",
    "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint",
  ],
  [
    "sui:mainnet",
    "0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::nft::mint",
  ],
]);

export default function Home() {
  const wallet = useWallet();
  const { balance } = useAccountBalance();
  const nftContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return sampleNft.get(wallet.chain.id) ?? "";
  }, [wallet]);

  async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;

    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.pure("Suiet NFT"),
          tx.pure("Suiet Sample NFT"),
          tx.pure(
            "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4"
          ),
        ],
      });
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log("executeMoveCall success", resData);
      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  }

  async function handleSignMsg() {
    if (!wallet.account) return;
    try {
      const msg = "Hello world!";
      const msgBytes = new TextEncoder().encode(msg);
      const result = await wallet.signPersonalMessage({
        message: msgBytes,
      });
      const verifyResult = await wallet.verifySignedMessage(
        result,
        wallet.account.publicKey
      );
      console.log("verify signedMessage", verifyResult);
      if (!verifyResult) {
        alert(`signMessage succeed, but verify signedMessage failed`);
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`);
      }
    } catch (e) {
      console.error("signMessage failed", e);
      alert("signMessage failed (see response in the console)");
    }
  }

  const chainName = (chainId: string | undefined) => {
    switch (chainId) {
      case SuiChainId.MAIN_NET:
        return "Mainnet";
      case SuiChainId.TEST_NET:
        return "Testnet";
      case SuiChainId.DEV_NET:
        return "Devnet";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-black">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Sui Games</h1>
          <p className="text-lg mb-8">
            Discover and play all the amazing Sui games in one place.
          </p>
        </motion.div>

        <motion.div
          className="w-3/4 md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-lg text-center flex items-center flex-col"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="text-lg mb-4">
            Our platform aggregates all Sui-based games, providing a one-stop
            solution for gamers to discover, play, and enjoy various games
            seamlessly.
          </p>
          <p className="text-lg mb-8">
            Whether you&apos;re looking for the latest releases or classic
            favorites, Sui Games has something for everyone.
          </p>
          <Link href="/games">
            <p className="bg-[#6FBCF0] hover:bg-[#4191c6] text-black font-bold py-2 px-8 rounded-full transition duration-300 ">
              Discover Games
            </p>
          </Link>
        </motion.div>

        {/* <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ConnectButton
            onConnectError={(error) => {
              if (
                error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED
              ) {
                console.warn(
                  "user rejected the connection to " + error.details?.wallet
                );
              } else {
                console.warn("unknown connect error: ", error);
              }
            }}
          />
        </motion.div> */}
      </main>
    </>
  );
}

{
  /* <div className="flex flex-col items-center">
          {!wallet.connected ? (
            <p className="my-8">Connect DApp with Suiet wallet now!</p>
          ) : (
            <div className="my-8 text-center">
              <p>Current wallet: {wallet.adapter?.name}</p>
              <p>
                Wallet status:{" "}
                {wallet.connecting
                  ? "connecting"
                  : wallet.connected
                  ? "connected"
                  : "disconnected"}
              </p>
              <p>
                Wallet address: {addressEllipsis(wallet.account?.address ?? "")}
              </p>
              <p>Current network: {chainName(wallet.chain?.id)}</p>
              <p>
                Wallet balance:{" "}
                {formatSUI(balance ?? 0, {
                  withAbbr: false,
                })}{" "}
                SUI
              </p>

              <div className="flex flex-col items-center mt-4">
                {nftContractAddr && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleExecuteMoveCall(nftContractAddr)}
                  >
                    Mint {chainName(wallet.chain?.id)} NFT
                  </button>
                )}
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleSignMsg}
                >
                  Sign Message
                </button>
              </div>
            </div>
          )}
        </div> */
}
