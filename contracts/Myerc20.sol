pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
contract MyERC20 is Ownable, ERC20 {

    constructor() ERC20("MyERC20", "MyERC20") {
        _mint(_msgSender(), 10000000 * 10 ** decimals());
       //_mint(_msgSender(), 1000);
     //   10000000 * 10 ** decimals());
       // balances[msg.sender] = 10000000 * 10 ** decimals();
    }
    
    function decimals() public pure override returns (uint8) {
        return 18;
    }
    
    function mint(uint256 amount) public onlyOwner {
        _mint(_msgSender(), amount);
        
    }
    
}