require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");
const CONFIG = require("./credentials.json");

module.exports = {
  solidity: "0.8.4",
  mocha: {
	timeout: 1000000000000,
},
  networks: {
    rinkeby: {
      url: CONFIG["RINKEBY"]["URL"],
      accounts: [CONFIG["RINKEBY"]["PKEY"]]
    },
    bscTestnet: {
      url: CONFIG["BSCTESTNET"]["URL"],
      accounts: [CONFIG["BSCTESTNET"]["PKEY"]]
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};