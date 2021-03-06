const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")

async function main() {

  const [owner] = await ethers.getSigners()

  const ERC721 = await ethers.getContractFactory("NFTtoken")
  const erc721 = await ERC721.deploy()
  await erc721.deployed()
  console.log("ERC721 deployed to:", erc721.address)
  //console.log("Initial balance: ", await erc721.balanceOf(owner.address))
  await erc721.mint(5000)
 // console.log("New balance: ", await erc721.balanceOf(owner.address))
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})