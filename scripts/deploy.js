const { ethers, run, network } = require("hardhat")
require("dotenv").config()

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log(network.config.chainId)
    console.log("deploying the contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed Address is ${simpleStorage.address}`)

    if (network.config.chainId === 1115511 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieveFavouriteNumber()
    console.log(`Current value of Number is ${currentValue}`)
    const updatedValue = await simpleStorage.store(10)
    console.log(
        `Updated value of number is ${await simpleStorage.retrieveFavouriteNumber()}`
    )
}

async function verify(contractAddress, args) {
    console.log("Verfying the contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
