// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./OwnerWithdrawable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "hardhat/console.sol";  

contract preSale is OwnerWithdrawable {
    using SafeMath for uint256;
    // using SafeERC20 for IERC20;
    using SafeERC20 for IERC20Metadata;

   
    //Rate wrt to Native Currency of the chain
    uint256 public rate;

    // Token for which presale is being done
    address public saleToken;
    uint public saleTokenDec;

    //Total tokens to be sold in the presale
    uint256 public totalTokensforSale;

    // Whitelist of tokens to buy from
    mapping(address => bool) public tokenWL;

    // 1 Token price in terms of WL tokens
    mapping(address => uint256) public tokenPrices;

    //Strunct to store referral info
    struct Referral {
        bool isReferrer;
        uint256 percentage;
    }
    // Mapping for refferals
    mapping(address => Referral) public referrals;

    //Mapping for referral percentage
    // mapping(address => uint256) public referralPercent;

    //Time when PreSale starts
    uint256 public preSaleStartTime;

    //Time when PreSale ends
    uint256 public preSaleEndTime;

    //1st locking period for the Token
    uint256 public lockingPeriod1;

    //2nd locking period for the Token
    uint256 public lockingPeriod2;

    //Percentage of Tokens available after 1st locking period
    uint256 public percentTokens1;

    // List of Buyers
    address[] public buyers;

    // Amounts bought by buyers
    mapping(address => BuyerTokenDetails) public buyersAmount;

     //
    // Statistics
    //
    uint256 public totalTokensSold;

    struct BuyerTokenDetails {
        uint amount;
        bool lockingPeriod1Claimed;
    }

    //Token buyers' receipt
    // struct BuyReceipt {
    //     address buyer;
    //     uint256 tokenAmount;
    // }
    // BuyReceipt[] public buyReceipts;

    constructor() {
        // rate = 0;
        // saleToken = address(0);
        // totalTokensforSale = 0;
        // preSaleStartTime = 0;
        // preSaleEndTime = 0;
        // lockingPeriod1 = 0;
        // lockingPeriod2 = 0;
        // percentTokens1 = 0;
    }

    //modifier to check if the sale has already started
    modifier saleStarted(){
        if(preSaleStartTime != 0){
            require(block.timestamp < preSaleStartTime, "PreSale: Sale has already started. Cannot change Sale Params!");
        }
        _;
    }

    //modifier to check if the sale is active or not
    modifier saleDuration(){
        require(block.timestamp > preSaleStartTime, "Presale: Sale hasn't started");
        require(block.timestamp < preSaleEndTime, "PreSale: Sale has already ended");
        _;
    }

    //modifier to check if the Sale Duration and Locking periods are valid or not
    modifier saleValid(
        uint256 _preSaleStartTime, uint256 _preSaleEndTime,
        uint256 _lockingPeriod1, uint256 _lockingPeriod2
    ){
        require(block.timestamp < _preSaleStartTime, "PreSale: Starting time is less than current TimeStamp!");
        require(_preSaleStartTime < _preSaleEndTime, "PreSale: Invalid PreSale Dates!");
        require(_preSaleEndTime < _lockingPeriod1, "PreSale: Locking Period cannot be less than sale end period!");
        require(_lockingPeriod1 < _lockingPeriod2,  "PreSale: Invalid Locking Params!");
        _;
    }

    //function to set information of Token sold in Pre-Sale and its rate in Native currency
    function setSaleTokenParams(
        address _saleToken, uint256 _totalTokensforSale, uint256 _rate
    )external onlyOwner saleStarted{
        require(_rate != 0, "PreSale: Invalid Native Currency rate!");
        rate = _rate;
        saleToken = _saleToken;
        saleTokenDec = IERC20Metadata(saleToken).decimals();
        totalTokensforSale = _totalTokensforSale;
        IERC20Metadata(saleToken).safeTransferFrom(msg.sender, address(this), totalTokensforSale);
    }

    //function to set Pre-Sale duration and locking periods
    function setSalePeriodParams(
        uint256 _preSaleStartTime,
        uint256 _preSaleEndTime,
        uint256 _lockingPeriod1,
        uint256 _lockingPeriod2, 
        uint256 _percentTokens1
    )external onlyOwner saleStarted saleValid(_preSaleStartTime, _preSaleEndTime, _lockingPeriod1, _lockingPeriod2){
        
        preSaleStartTime = _preSaleStartTime;
        preSaleEndTime = _preSaleEndTime;
        lockingPeriod1 = _lockingPeriod1;
        lockingPeriod2 = _lockingPeriod2;
        percentTokens1 = _percentTokens1;
     
    }

    // Add a token to buy presale token from, with price
    function addWhiteListedToken(
        address[] memory _tokens,
        uint256[] memory _prices
    ) external onlyOwner saleStarted{
        require(
            _tokens.length == _prices.length,
            "Presale: tokens & prices arrays length mismatch"
        );

        for (uint256 i = 0; i < _tokens.length; i++) {
            require(_prices[i] != 0, "Presale: Cannot set price to 0");
            tokenWL[_tokens[i]] = true;
            tokenPrices[_tokens[i]] = _prices[i];
        }
    }

    function updateTokenRate(
        address[] memory _tokens,
        uint256[] memory _prices,
        uint256 _rate
    )external onlyOwner{
        require(
            _tokens.length == _prices.length,
            "Presale: tokens & prices arrays length mismatch"
        );

        if(_rate != 0){
            rate = _rate;
        }

        for(uint256 i = 0; i < _tokens.length; i+=1){
            require(tokenWL[_tokens[i]] == true, "Presale: Token not whitelisted");
            require(_prices[i] != 0, "PreSale: Cannot set rate as 0");
            tokenPrices[_tokens[i]] = _prices[i];
        }
    }


    // Stop the Sale 
    function stopSale() external onlyOwner {
        require(block.timestamp > preSaleStartTime, "PreSale: Sale hasn't started yet!");
        if(block.timestamp < preSaleEndTime){
            preSaleEndTime = block.timestamp;
        }  
    }

    // Public view function to calculate amount of sale tokens returned if you buy using "amount" of "token"
    function getTokenAmount(address token, uint256 amount)
        public
        view
        returns (uint256)
    {
        uint256 amtOut;
        if(token != address(0)){
            require(tokenWL[token] == true, "Presale: Token not whitelisted");
            // uint tokenDec = IERC20(token).decimals();
            uint256 price = tokenPrices[token];
            amtOut = amount.mul(10**saleTokenDec).div(price);
        }
        else{
            amtOut = amount.mul(10**saleTokenDec).div(rate);
        }
        return amtOut;
    }

    // Public Function to buy tokens. APPROVAL needs to be done first
    function buyToken(address _token, uint256 _amount, address _referralId) external payable saleDuration{
        
        require(msg.sender != _referralId, "PreSale: Cannot refer yourself!");
        uint256 saleTokenAmt;
        if(_token != address(0)){
            require(_amount > 0, "Presale: Cannot buy with zero amount");
            require(tokenWL[_token] == true, "Presale: Token not whitelisted");

            saleTokenAmt = getTokenAmount(_token, _amount);
            require((totalTokensSold + saleTokenAmt) <= totalTokensforSale, "PreSale: Total Token Sale Reached!");
            IERC20Metadata(_token).safeTransferFrom(msg.sender, address(this), _amount);
        }
        else{
            saleTokenAmt = getTokenAmount(address(0), msg.value);
            require((totalTokensSold + saleTokenAmt) < totalTokensforSale, "PreSale: Total Token Sale Reached!");
        }
        // Update Stats
        if(!referrals[_referralId].isReferrer){
            totalTokensSold = totalTokensSold.add(saleTokenAmt);
            buyersAmount[msg.sender].amount = buyersAmount[msg.sender].amount.add(saleTokenAmt);
        }
        else{
            uint256 buyerPercent = 500 - referrals[_referralId].percentage;
            uint256 buyerToken = saleTokenAmt.mul(100000+buyerPercent).div(100000);
            uint256 referrerToken = saleTokenAmt.mul(referrals[_referralId].percentage).div(100000);
            buyersAmount[msg.sender].amount = buyersAmount[msg.sender].amount.add(buyerToken);
            buyersAmount[_referralId].amount = buyersAmount[_referralId].amount.add(referrerToken);
            uint256 refSaleTokens = buyerToken.add(referrerToken);
            require(totalTokensSold.add(refSaleTokens) <= totalTokensforSale, "PreSale: Total Token Sale Reached, cannot give referrals!");
            totalTokensSold = totalTokensSold.add(refSaleTokens);
        }
    }

    function withdrawToken()external {
        uint256 tokensforWithdraw;
        if(block.timestamp < lockingPeriod2){
            require(!buyersAmount[msg.sender].lockingPeriod1Claimed, "Presale: 1st locking claimed");
            require(block.timestamp > lockingPeriod1, "PreSale: 1st Locking Period active!");
            tokensforWithdraw = buyersAmount[msg.sender].amount * percentTokens1 / 100;
            buyersAmount[msg.sender].lockingPeriod1Claimed = true;
        }
        else
        {
            tokensforWithdraw = buyersAmount[msg.sender].amount;
            buyersAmount[msg.sender].lockingPeriod1Claimed = true;
        }
        buyersAmount[msg.sender].amount -= tokensforWithdraw;
        IERC20Metadata(saleToken).safeTransfer(msg.sender, tokensforWithdraw);
    }


    function createReferral(uint256 _referralPercent)external{
        require(_referralPercent>=0 && _referralPercent<=500, "Presale: Referral Percent must be between 0 and 0.5%");
        require(!referrals[msg.sender].isReferrer, "Presale: Referral already created");
        referrals[msg.sender].isReferrer = true;
        referrals[msg.sender].percentage = _referralPercent;
    }

    // function airDrop(address[] memory _address, uint256[] memory _tokens)external onlyOwner{
    //     require(_address.length == _tokens.length, "Presale: addresses & tokens arrays length mismatch");
    //     for(uint256 i = 0; i < _address.length; i+=1){
    //         IERC20(saleToken).safeTransfer(_address[i], _tokens[i]);
    //     }
    // }

}