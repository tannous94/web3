require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/BAsp593xLA7BWRc2XGoSmPistJY2rIet",
      accounts: ["private-key-of-owner-wallet"]
    }
  },
};
