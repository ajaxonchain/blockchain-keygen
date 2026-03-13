import { BIP32Factory } from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";


function generateBitcoinKeys(seed, count) {
  bitcoin.initEccLib(ecc);

  const bip32 = BIP32Factory(ecc);
  const root = bip32.fromSeed(seed);

  const keys = [];

  for (let i = 0; i < count; i++) {
    const path = `m/44'/0'/0'/0/${i}`;
    const child = root.derivePath(path);

    const { address } = bitcoin.payments.p2pkh({
      pubkey: child.publicKey,
    });

    keys.push({
      index: i + 1,
      address,
      privateKey: child.toWIF(),
    });
  }

  return keys;
}

export { generateBitcoinKeys };