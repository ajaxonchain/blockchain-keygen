import {line, DIVIDER} from "../theme/divider.js";
import { CHAIN_STYLES } from "../theme/theme.js";
import chalk from "chalk";


function displayKeys(keys, chain) {
  const style = CHAIN_STYLES[chain];

  for (const k of keys) {
    console.log(style.color(`${style.icon} Wallet ${k.index}`));

    console.log(`${DIVIDER} ${chalk.gray("Public  ")} ${chalk.white(k.address)}`);
    console.log(`${DIVIDER} ${chalk.gray("Private ")} ${chalk.white(k.privateKey)}`);

    console.log(DIVIDER);
  }
}


export default displayKeys;