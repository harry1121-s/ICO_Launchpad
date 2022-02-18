pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract airDrop is Ownable{

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public saleToken;
    uint256 internal airDropAmount;

    uint256 internal totalAirDrop;

    constructor(
        address _saleToken,
        uint256 _airDropAmount
    ) public {
        saleToken = _saleToken;
        airDropAmount = _airDropAmount;
    }

    function airdrop(address[] memory _address, uint256[] memory _tokens)external onlyOwner{
        require(_address.length == _tokens.length, "Presale: addresses & tokens arrays length mismatch");
        for(uint256 i = 0; i < _address.length; i+=1){
            require(totalAirDrop.add(_tokens[i]) <= airDropAmount, "Presale: Max airdrop amount exceeded");
            IERC20(saleToken).safeTransfer(_address[i], _tokens[i]);
        }
    }


}