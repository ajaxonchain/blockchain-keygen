#!/usr/bin/env node

import { program } from "commander";
import * as clack from "@clack/prompts";
import chalk from "chalk";

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { generateEthereumKeys } from "../chains/ethereum.js";
import { generateSolanaKeys } from "../chains/solana.js";
import { generateBitcoinKeys } from "../chains/bitcoin.js";
import printBanner from "../theme/banner.js";
import displayMnemonic from "../display/mnemonic.js";
import displayKeys from "../display/wallets.js";




async function main() {
  printBanner();

  const chain = await clack.select({
    message: "Select a blockchain:",
    options: [
      { value: "Solana", label: chalk.hex("#9945FF")("◎  Solana"), hint: "ed25519 · BIP-44" },
      { value: "Ethereum", label: chalk.hex("#627EEA")("⬡  Ethereum"), hint: "secp256k1 · BIP-44" },
      { value: "Bitcoin", label: chalk.hex("#F7931A")("₿  Bitcoin"), hint: "P2PKH · BIP-44" },
    ],
  });

  if (clack.isCancel(chain)) {
    clack.cancel("Cancelled.");
    process.exit(0);
  }

  const countRaw = await clack.text({
    message: `How many ${chain} wallets to generate?`,
    validate(v) {

      const n = parseInt(v, 10);
      if (isNaN(n) || n < 1 || n > 100) return "Enter a number between 1 and 100.";
    },
  });

  if (clack.isCancel(countRaw)) {
    clack.cancel("Cancelled.");
    process.exit(0);
  }

  const spinner = clack.spinner();
  spinner.start(`Generating ${chain} keypairs…`);

  await new Promise((r) => setTimeout(r, 600));

  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);
  const n = parseInt(countRaw, 10);

  let keys;

  if (chain === "Solana") keys = generateSolanaKeys(seed, n);
  else if (chain === "Ethereum") keys = generateEthereumKeys(mnemonic, n);
  else keys = generateBitcoinKeys(seed, n);

  spinner.stop(
    chalk.green(`✔ Generated ${n} ${chain} wallet${n > 1 ? "s" : ""} successfully!`)
  );


  displayMnemonic(mnemonic);
  displayKeys(keys, chain);

  console.log(
  chalk.bgYellow.black.bold(" SAFE ") +
    chalk.yellow(" Verify addresses before sending funds."));
  
  clack.outro(
    chalk.gray("Thank you for using KEYGEN!")
  );
}


program
  .name("keygen")
  .description("Multi-chain crypto keypair generator")
  .version("1.0.0")
  .action(main);

program.parseAsync(process.argv).catch((err) => {
  console.error(chalk.red("\nError:"), err.message);
  process.exit(1);
});