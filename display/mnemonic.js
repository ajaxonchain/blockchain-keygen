import chalk from "chalk";
import boxen from "boxen";
import { DIVIDER, line } from "../theme/divider.js";



function displayMnemonic(mnemonic) {
  const wordsArr = mnemonic.split(" ");
  const rows = [];
  for (let i = 0; i < wordsArr.length; i += 6) {
    rows.push(wordsArr.slice(i, i + 6).join("  "));
  }
  const words = rows.join("\n");

  const phraseBox = boxen(chalk.white(words), {
    padding: 1,
    borderStyle: "round",
    borderColor: "gray",
    dimBorder: true,
  });

  line();
  line(chalk.gray("Seed Phrase"));

  console.log(
    phraseBox
      .split("\n")
      .map((l) => `${DIVIDER} ${l}`)
      .join("\n")
  );

  line();

  console.log(
    chalk.bgRed.white.bold(" DANGER ") +
      chalk.red(" Never share your seed phrase. Store it offline.")
  );

  line();
}

export default displayMnemonic;
