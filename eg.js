import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Wallet, HDNodeWallet } from "ethers";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

import {BIP32Factory } from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";


const mnemonic = generateMnemonic();

console.log("Mnemonic:", mnemonic);
const seed = mnemonicToSeedSync(mnemonic);

bitcoin.initEccLib(ecc);
const bip32 = BIP32Factory(ecc);

const wallet = "Bitcoin";

if(wallet === "Solana") {

  for (let i = 0; i < 1; i++) {
    const path = `m/44'/501'/${i}'/0'`; 
    
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
  
    const keypair = Keypair.fromSecretKey(secret.secretKey);

    console.log(`Public Key ${i}:`, keypair.publicKey.toBase58());
    console.log(`Private Key ${i}:`, bs58.encode(keypair.secretKey));

  }
} else if(wallet === "Ethereum") {

  for(let i=0; i<1; i++) {

    const path = `m/44'/60'/0'/0/${i}`; 

    const wallet = HDNodeWallet.fromPhrase(mnemonic, undefined, path);

    console.log(`Public Key ${i}:`, wallet.address);
    console.log(`Private Key ${i}:`, wallet.privateKey);
  }
} else if (wallet === "Bitcoin") {

  const root = bip32.fromSeed(seed);

  for(let i=0; i<100; i++) {
    const path = `m/44'/0'/0'/0/${i}`; 

    const child = root.derivePath(path);

    const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey });

    console.log(`Address ${i}:`, address);
    console.log(`Private Key ${i}:`, child.toWIF());
  }
}

