const { ethers } = require("hardhat")
const { assert, expect } = require("chai")
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

let simpleStorageFactory
let simpleStorage
describe("SimpleStorage", function () {
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("should be equal to 5", async function () {
        const currentValue = await simpleStorage.retrieveFavouriteNumber()
        const expectedValue = "5"
        assert.equal(currentValue, expectedValue)
    })

    it("should update when we call store", async function () {
        const expectedValue = "10"
        const transactionResponse = await simpleStorage.store(expectedValue)
        transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieveFavouriteNumber()
        assert.equal(expectedValue, currentValue)
    })
})
