import { HDNodeWallet } from "ethers";



function generateEthereumKeys(mnemonic, count) {
  const keys = [];

  for (let i = 0; i < count; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = HDNodeWallet.fromPhrase(mnemonic, undefined, path);

    keys.push({
      index: i + 1,
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
  }

  return keys;
}

export { generateEthereumKeys };