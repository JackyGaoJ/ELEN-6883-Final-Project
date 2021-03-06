const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTtoken", function() {
  let MyERC20, token, owner, addr1, addr2;
  let _name = "Heroes of Peace NFT";
  let _symbol = "CNN_NFT";
  beforeEach(async() => {
   
    [owner, addr1, addr2, _] = await ethers.getSigners();
   // console.log("address:%s\n%s\n%s", owner.address,addr1.address,addr2.address)
     MyERC20 = await ethers.getContractFactory('NFTtoken');
    token = await MyERC20.deploy();
      await token.deployed()
  })

  describe('Deployment', () => {
  		
    it("Should set the right owner", async () => {
    	console.log("ownerBalance:%s ", owner.address)
      expect (await token.owner()).to.equal(owner.address);
      console.log("owner:%s ", token.creatorOftoken(1))
    })
     it("get name", async () => {
     	nftname=await token.name()
    	console.log("name:%s ",nftname)
      expect (nftname).to.equal(_name);
    })
    it("get symbol", async () => {
     	nftsymbol=await token.symbol()
    	console.log("symbol:%s ",nftsymbol)
      expect (nftsymbol).to.equal(_symbol);
    })
  
 })
 
 describe('mint', () => {
  		
    it("Should set the right owner", async () => {
    await token.mint();
  
     s=await token.ownerOftoken(1)

     
     s=await token.ownerOftoken(2)

    await token.transfer(addr1.address,2);
    s=await token.ownerOftoken(2)
   
     
    })
 })
 describe('transfer', () => {
  		
    it("transfer 2 to addr1.address", async () => {
    	 await token.mint();
    	 console.log(addr1.address)
    	 
    await token.transfer(addr1.address,2);
    s=await token.ownerOftoken(2)
      console.log(s.address)
    console.log("symbol:%s ",s)
     
    })

  it("transfer 3 to addr1.address", async () => {
    	 await token.mint();
    	 console.log(addr1.address)
   // await token.transfer(addr1.address,3);
     expect (await token.transfer(addr1.address,3)).to.throws("account should contains tokenId");
     
    })
     it("transfer 2  to addr1.address,transfer 2  to addr1.address", async () => {
    	 await token.mint();
      expect ( await token.transfer(addr1.address,2)).to.throws("account should contains tokenId");
    
    })
 })
 })
