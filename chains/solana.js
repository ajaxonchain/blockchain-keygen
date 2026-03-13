import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";



function generateSolanaKeys(seed, count) {
  const keys = [];

  for (let i = 0; i < count; i++) {
    const path = `m/44'/501'/${i}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
    const keypair = Keypair.fromSecretKey(secret.secretKey);

    keys.push({
      index: i + 1,
      address: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey),
    });
  }

  return keys;
}

export { generateSolanaKeys };