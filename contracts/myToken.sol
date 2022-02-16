//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract myToken is ERC20("Harshit", "HAR"), Ownable{

    constructor()
    {
        _mint(msg.sender, 2500000000 * 10**decimals());
    }

    function decimals()public view virtual override returns(uint8){
        return 18;
    }

}
