require("@nomicfoundation/hardhat-ethers");

const metamaskKey =
  "0xd9a75d1d1ef2c0be16553e243f4cce82db09c55b781eedfe2e1c0fae9b1afa5e";

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20", // Add the required compiler version here
      },
      {
        version: "0.8.0", // Keep any other versions you need
      },
    ],
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/a24856c45e4a46af865db95f38c1e48e",
      accounts: [metamaskKey],
    },
  },
};
