pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
contract NFTtoken is Ownable, ERC721 {
    string public _name = "Heroes of Peace NFT";
    string public _symbol = "CNN_NFT";
    string public originalAddress = "0x834132E4e2Db04735100455648F74860889cbe89";
    uint256[] public tarots;
    mapping(address=>uint256[] ) public addrtokenIds;

    constructor() ERC721(_name, _symbol) {
      _mint(_msgSender(), 10000000 * 10 ** decimals());
    }   
    function decimals() public pure returns (uint8) {
        return 18;
    }
    function mint() public  onlyOwner{
		require(tarots.length <= 0, "only can mint once");
		for (uint256 i = 0; i < 5; i++) {
			tarots.push(i);
			_mint(msg.sender, i);
		}
		addrtokenIds[msg.sender]=tarots;
	}
 function transfer(address _to, uint256 _tokenId) external virtual  
  {
  uint256[] storage tokenIds = addrtokenIds[msg.sender];
		
		bool isExist = false;
		uint i = 0;
		while(i < tokenIds.length) {
			if (tokenIds[i] == _tokenId) {
				isExist = true;
				break;
			}
			i += 1;
		}
		require(isExist, "account should contains tokenId");

			for(uint j = i; j < tokenIds.length - 1; j++) {
			tokenIds[j] = tokenIds[j+1];
		}
			tokenIds.pop();	
		addrtokenIds[_to].push(_tokenId);
     emit Transfer(msg.sender, _to, _tokenId);
  }
  function ownerOftoken(uint256 _tokenId) public returns (address owner)
  {
    return ownerOf(_tokenId);
  }
}

