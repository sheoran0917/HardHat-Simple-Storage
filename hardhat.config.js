require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL || "https://eth.sepolia/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "Key"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Key"
const LOCAL_RPC_URL = process.env.LOCAL_RPC_URL || "https://eth.sepolia/example"
const LOCAL_PRIVATE_KEY = process.env.LOCAL_PRIVATE_KEY || "Key"
const COIN_MARKET_KEY = process.env.COIN_MARKET_API_KEY || "Key"

module.exports = {
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: LOCAL_RPC_URL,
            // accounts: [LOCAL_PRIVATE_KEY], - We do not need accounts as hardhat will automatically provide for us
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    solidity: "0.8.18",
    gasReporter: {
        enabled: false,
        outputFile: "gasreporter.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COIN_MARKET_KEY,
        // token: "MATIC",
    },
}
