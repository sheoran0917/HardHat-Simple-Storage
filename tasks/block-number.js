// tasks are butter for plugin and scripts are useful for your own local development env
const { task } = require("hardhat/config")

task("block-number", "Print the current block number").setAction(
    //const blockTask = async function(tasks, hre) => {}
    //aync function blockTask(tasks,hre) {}
    // all three above are same
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number is ${blockNumber}`)
    }
)

module.exports = {}
