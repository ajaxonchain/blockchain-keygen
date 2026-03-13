import chalk from "chalk";

const DIVIDER = chalk.dim("│");

function line(text = "") {
  if (!text) console.log(DIVIDER);
  else console.log(`${DIVIDER} ${text}`);
}

export { DIVIDER, line };

