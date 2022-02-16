//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenB is ERC20("Bhasker", "B"), Ownable{


    constructor()
    {
        _mint(msg.sender, 2500000000 * 10**decimals());
    }

    function decimals()public view virtual override returns(uint8){
        return 18;
    }

}