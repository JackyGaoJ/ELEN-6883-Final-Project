const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC20", function() {
  let MyERC20, token, owner, addr1, addr2;

  beforeEach(async() => {
   
    [owner, addr1, addr2, _] = await ethers.getSigners();
     MyERC20 = await ethers.getContractFactory('MyERC20');
    token = await MyERC20.deploy();
      await token.deployed()
  })

  describe('Deployment', () => {
    it("Should set the right owner", async () => {
      expect (await token.owner()).to.equal(owner.address);
    })

    it("Should assign the total supply of tokens to the owner", async () => {
      const ownerBalance = await token.balanceOf(owner.address)
      //console.log("ownerBalance:%s ", ownerBalance)
      expect(await token.totalSupply()).to.equal(ownerBalance)
    })
  })

  describe('Transactions', () => {
    it("Should transfer tokens between accounts", async () => {
    	
    	 /*const [owner,addr1] = await ethers.getSigners()
  console.log("owner address: ", owner.address)
  console.log("addr1] address: ", addr1.address)
  const ERC20 = await ethers.getContractFactory("MyERC20")
  const erc20 = await ERC20.deploy()
  await erc20.deployed()
  console.log("ERC20 deployed to:", erc20.address)
  console.log("Initial balance:%s ", await erc20.balanceOf(owner.address))
console.log("erc20 Initial balance: %s", await erc20.balanceOf(erc20.address))
await erc20.transfer(addr1.address, 50)
   console.log("addr1 Initial balance:%s ", await erc20.balanceOf(addr1.address))
  await erc20.mint(5000)
  console.log("New balance: ", await erc20.balanceOf(owner.address))*/
   
    	 const ownerBalance = await token.balanceOf(owner.address)
    	 console.log("ownerBalance:%s ", ownerBalance)
      await token.transfer(addr1.address, 50)
      const addr1Balance = await token.balanceOf(addr1.address)
      console.log("addr1Balance %s", addr1Balance)
      expect(addr1Balance).to.equal(50)
    })

    it("Should fail if not enough tokens", async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address)
      await expect(token.connect(addr1).transfer(owner.address, 1))
        .to.be.revertedWith("transfer amount exceeds balance")

      expect(
        await token.balanceOf(owner.address)
      ).to.equal(initialOwnerBalance)
    })
  })
  it('Should update balances after transfers', async () => {
    const initialOwnerBalance = await token.balanceOf(owner.address);

    await token.transfer(addr1.address, 100);
    await token.transfer(addr2.address, 50);

    const finalOwnerBalance = await token.balanceOf(owner.address);
    expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);

    const addr2Balance = await token.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });
})