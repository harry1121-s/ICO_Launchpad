const { expect } = require("chai");
const { ethers } = require("hardhat");
var fs = require('fs');
const { start } = require("repl");
const { defaultAccounts } = require("ethereum-waffle");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");


describe("ICO_Launchpad", function () {

    let start, end, lock1, lock2;
    let WLTokens = [], price = [];
    let airdropAddress = [], airdropAmount = [];
    let addr0 = '0x0000000000000000000000000000000000000000';
    
    const advanceBlock = () => new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: '2.0',
            method: 'evm_mine',
            id: new Date().getTime(),
        }, async (err, result) => {
            if (err) { return reject(err) }
            // const newBlockhash =await web3.eth.getBlock('latest').hash
            return resolve()
        })
    })
    
    const advanceBlocks = async (num) => {
        let resp = []
        for (let i = 0; i < num; i += 1) {
            resp.push(advanceBlock())
        }
        await Promise.all(resp)
    }
    
    const advancetime = (time) => new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: '2.0',
            method: 'evm_increaseTime',
            id: new Date().getTime(),
            params: [time],
        }, async (err, result) => {
            if (err) { return reject(err) }
            const newBlockhash = (await web3.eth.getBlock('latest')).hash
    
            return resolve(newBlockhash)
        })
    })

    before(async () => {
        const PreSale = await ethers.getContractFactory("preSale");
        presale = await PreSale.deploy();	
        await presale.deployed();


        const myToken = await ethers.getContractFactory("myToken");
        mytoken = await myToken.deploy();
        await mytoken.deployed();

        const airDrop = await ethers.getContractFactory("airDrop");
        adrop = await airDrop.deploy();
        await adrop.deployed();

        await mytoken.approve(adrop.address, (100 * 10**18).toLocaleString('fullwide', { useGrouping: false }));
        await adrop.setAirDrop(mytoken.address, (100 * 10**18).toLocaleString('fullwide', { useGrouping: false }));

        //console.log(await mytoken.totalSupply());

        const tokenA = await ethers.getContractFactory("TokenA");
        atoken = await tokenA.deploy();
        await atoken.deployed();

        const TokenB = await ethers.getContractFactory("TokenB");
        btoken = await TokenB.deploy();
        await btoken.deployed();

        WLTokens = [atoken.address, btoken.address];
        price = [String(10**18), String(5* 10**18)];

        accounts = await ethers.getSigners();

        airdropAddress = [accounts[5].address, accounts[6].address, accounts[7].address, accounts[8].address, accounts[9].address];
        airdropAmount = [String(97 * 10**18), String(10**18), String(10**18), String(10**18), String(10**18)];

        start = 7 * 24 * 60 * 60;
        end = 14 * 24 * 60 * 60;
        lock1 = 21 * 24 * 60 * 60;
        lock2 = 28 * 24 * 60 * 60;

        const blockNumBefore = await ethers.provider.getBlockNumber();
        const blockBefore = await ethers.provider.getBlock(blockNumBefore);
        timestamp = blockBefore.timestamp;
    });

    it("Should check for Contract's ownership", async function(){

        expect(await presale.owner()).to.equal(accounts[0].address);
        expect(await mytoken.owner()).to.equal(accounts[0].address);

    });

    it("Should set correct Params for the PreSale contract", async function(){

        //set sale time
        await presale.setSalePeriodParams(
            timestamp + start,
            timestamp + end,
            timestamp + lock1,
            timestamp + lock2,
            30
            );
        await mytoken.approve(presale.address, "20000000000000000000000000");
        await presale.setSaleTokenParams(mytoken.address, "20000000000000000000000000", String(10**18));
        
        await presale.addWhiteListedToken(WLTokens, price);

        contractBal = await mytoken.balanceOf(presale.address);
        saleTokens = await presale.totalTokensforSale();
        startTime = await presale.preSaleStartTime();
        endTime = await presale.preSaleEndTime();
        lockTime1 = await presale.lockingPeriod1();
        lockTime2 = await presale.lockingPeriod2();
        lockRate = await presale.percentTokens1();
        
        tokensWL = await presale.tokenWL(atoken.address);
        tokensPrice = await presale.tokenPrices(atoken.address);
        
        tokenAmt = await presale.getTokenAmount(atoken.address, String(2* 10**18));

        expect(String(saleTokens)).to.equal(String(contractBal));
        expect(String(startTime)).to.equal(String(timestamp + start));
        expect(String(endTime)).to.equal(String(timestamp + end));
        expect(String(lockTime1)).to.equal(String(timestamp + lock1));
        expect(String(lockTime2)).to.equal(String(timestamp + lock2));
        expect(String(lockRate)).to.equal(String(30));
        expect(tokensWL).to.equal(true);
        expect(tokenAmt).to.equal(String(2 * 10**18));

    });

    it("Should update Token prices.", async function(){

        price = [String(5 * 10**18), String(10 * 10**18)];
        await presale.updateTokenRate(WLTokens, price, 0);

        tokenPrice1 = await presale.tokenPrices(atoken.address);

        tokenPrice2 = await presale.tokenPrices(btoken.address);

        expect(tokenPrice1).to.equal(String(5 * 10**18));
        expect(tokenPrice2).to.equal(String(10 * 10**18));

    });

    it("Should not allow users to buy Sale Token.", async function(){

        accountA = accounts[1];
        accountB = accounts[2];
        accountC = accounts[4];

        await atoken.transfer(accountA.address, "100000000000000000000000");
        await btoken.transfer(accountB.address, "100000000000000000000000");
    
        await atoken.connect(accountA).approve(presale.address, "20000000000000000000000");
        await expect(presale.connect(accountB)
        .buyToken(atoken.address, "20000000000000000000000", accountA.address))
        .to.be.revertedWith("Presale: Sale hasn't started");

    });


    it("Should create referral", async function(){
      await presale.connect(accountA).createReferral(250);
      refObj = await presale.referrals(accountA.address);
      expect(refObj.percentage).to.equal(250);
      expect(refObj.isReferrer).to.equal(true);
    });

    it("Should fail in setting Sale Period Params.", async function(){

        await expect(presale.connect(accounts[1]).setSalePeriodParams(
            timestamp - start,
            timestamp + end,
            timestamp + lock1,
            timestamp + lock2,
            30)).to.be.revertedWith("Ownable: caller is not the owner");

        await expect(presale.setSalePeriodParams(
            timestamp - start,
            timestamp + end,
            timestamp + lock1,
            timestamp + lock2,
            30)).to.be.revertedWith("PreSale: Starting time is less than current TimeStamp!");

        await advancetime(8 * 24 * 60 * 60);
        await advanceBlock();

        await expect(presale.setSalePeriodParams(
            timestamp + start + 1 * 24 *60 * 60,
            timestamp + end,
            timestamp + lock1,
            timestamp + lock2,
            30)).to.be.revertedWith("PreSale: Sale has already started. Cannot change Sale Params!");

        // await mytoken.approve(presale.address, 400000);
        await expect(presale.setSaleTokenParams(
            mytoken.address, "40000000000000000000000", String(10**18)
        )).to.be.revertedWith("PreSale: Sale has already started. Cannot change Sale Params!");

    });


    it("Should allow users to buy Sale Token.", async function(){

        await advancetime(2 * 24 * 60 * 60);
        await advanceBlock();

        await atoken.connect(accountA).approve(presale.address, "20000000000000000000000");
        await expect(presale.connect(accountA).
        buyToken(atoken.address, "20000000000000000000000", accountA.address))
        .to.be.revertedWith("PreSale: Cannot refer yourself!");
        await presale.connect(accountA).buyToken(atoken.address, "20000000000000000000000", addr0);

        buyerAmt1 = await presale.buyersAmount(accountA.address);
        expect(buyerAmt1.amount).to.equal("4000000000000000000000");
       
        await btoken.connect(accountB).approve(presale.address, "30000000000000000000000");
        await expect(presale.connect(accountB).
        buyToken(btoken.address, "30000000000000000000000", accountC.address))
        .to.be.revertedWith("PreSale: Referral does not exist!");
        await presale.connect(accountB).buyToken(btoken.address, "30000000000000000000000", accountA.address);

        await presale.connect(accountC).buyToken(addr0, 0, addr0, {value: ethers.utils.parseEther("1.0")});

        
        buyerAmt2 = await presale.buyersAmount(accountB.address);
        buyerAmt11 = await presale.buyersAmount(accountA.address);
        buyerAmt3 = await presale.buyersAmount(accountC.address);

        expect(buyerAmt2.amount).to.equal("3007500000000000000000");
        expect(await buyerAmt11.amount).to.equal("4007500000000000000000");
        expect(buyerAmt3.amount).to.equal(String(10**18));
        expect(await atoken.balanceOf(presale.address)).to.equal("20000000000000000000000");
        expect(await btoken.balanceOf(presale.address)).to.equal("30000000000000000000000");
        expect(await atoken.balanceOf(accountA.address)).to.equal("80000000000000000000000");
        expect(await btoken.balanceOf(accountB.address)).to.equal("70000000000000000000000");

    });

    it("Should update Token price during sale.", async function(){

        price = [String(4 * 10**18), String(15 * 10**18)];
        await presale.updateTokenRate(WLTokens, price, String(10**19));

        tokenPrice1 = await presale.tokenPrices(atoken.address);
        tokenPrice2 = await presale.tokenPrices(btoken.address);
        tokenPrice3 = await presale.rate();

        expect(tokenPrice1).to.equal(String(4 * 10**18));
        expect(tokenPrice2).to.equal(String(15 * 10**18));
        expect(String(tokenPrice3)).to.equal(String(10**19));
    });

    it("Should allow users to buy Sale Token with new rates.", async function(){

        await advancetime(24 * 60 * 60);
        await advanceBlock();

        await atoken.connect(accountA).approve(presale.address, "10000000000000000000000");
        await presale.connect(accountA).buyToken(atoken.address, "10000000000000000000000", addr0);

        await btoken.connect(accountB).approve(presale.address, "10000000000000000000000");
        await presale.connect(accountB).buyToken(btoken.address, "10000000000000000000000", accountA.address);

        await presale.connect(accountC).buyToken(addr0, 0, accountA.address, {value: ethers.utils.parseEther("1.0")});

        buyerAmt1 = await presale.buyersAmount(accountA.address);
        buyerAmt2 = await presale.buyersAmount(accountB.address);

        buyerAmt3 = await presale.buyersAmount(accountC.address);

        expect(buyerAmt1.amount).to.equal("6509166916666666666666");
        expect(buyerAmt2.amount).to.equal("3675833333333333333332");
        expect(buyerAmt3.amount).to.equal("1100250000000000000");
        expect(await atoken.balanceOf(presale.address)).to.equal("30000000000000000000000");
        expect(await btoken.balanceOf(presale.address)).to.equal("40000000000000000000000");
        expect(await atoken.balanceOf(accountA.address)).to.equal("70000000000000000000000");
        expect(await btoken.balanceOf(accountB.address)).to.equal("60000000000000000000000");

    });

    it("Should stop Sale.", async function(){
        await presale.stopSale();
    })

    it("Should not allow users to buy Sale Token after sale has ended.", async function(){

        await atoken.connect(accountA).approve(presale.address, 10000);
        await expect(presale.connect(accountA)
        .buyToken(atoken.address, 10000, addr0))
        .to.be.revertedWith("PreSale: Sale has already ended");

    });

    it("Should allow users to withdraw Sale Token.", async function(){

        await advancetime(7 * 24 * 60 * 60);
        await advanceBlock();

        await expect(presale
            .connect(accountA)
            .withdrawToken()
            ).to.be.revertedWith("PreSale: 1st Locking Period active!");

        await advancetime(7 * 24 * 60 * 60);
        await advanceBlock();

        await presale.connect(accountA).withdrawToken();
        await presale.connect(accountB).withdrawToken();
        await presale.connect(accountC).withdrawToken();

        expect(await mytoken.balanceOf(accountA.address)).to.equal("1952750074999999999999");
        expect(await mytoken.balanceOf(accountB.address)).to.equal("1102749999999999999999");
        expect(await mytoken.balanceOf(accountC.address)).to.equal("330075000000000000");

        await expect(presale
            .connect(accountA)
            .withdrawToken()
            ).to.be.revertedWith("Presale: 1st locking claimed");

        await advancetime(15 * 24 * 60 * 60);
        await advanceBlock();

        await presale.connect(accountA).withdrawToken();
        await presale.connect(accountB).withdrawToken();
        await presale.connect(accountC).withdrawToken();

        expect(await mytoken.balanceOf(accountA.address)).to.equal("6509166916666666666666");
        expect(await mytoken.balanceOf(accountB.address)).to.equal("3675833333333333333332");
        expect(await mytoken.balanceOf(accountC.address)).to.equal("1100250000000000000");

        expect(await mytoken.balanceOf(presale.address)).to.equal("19989813899500000000000002");
    });

    it("Should allow Owner to withdraw funds", async function(){

        await presale.withdraw(atoken.address, "20000000000000000000000");
        await presale.withdrawAll(btoken.address);

        // console.log(await web3.eth.getBalance(presale.address));

        await presale.withdrawCurrency(String(10**18));

        ownerBal = await web3.eth.getBalance(presale.address);

        expect(String(ownerBal)).to.equal(String(10**18));
        expect(await atoken.balanceOf(presale.address)).to.equal("10000000000000000000000");
        expect(await btoken.balanceOf(presale.address)).to.equal(0);
        

    });

    it("Should check for airdop", async function(){

      await expect(adrop.connect(accountA).airdrop(airdropAddress, airdropAmount))
      .to.be.revertedWith("Ownable: caller is not the owner");
      await expect(adrop.airdrop(airdropAddress, airdropAmount))
      .to.be.revertedWith("Presale: Max airdrop amount exceeded");

      airdropAmount = [String(95 * 10**18), String(10**18), String(10**18), String(10**18), String(10**18)];
      await adrop.airdrop(airdropAddress, airdropAmount);

    //   console.log(await mytoken.balanceOf(adrop.address));
    //   console.log(await adrop.totalAirDrop());
    //   console.log(await adrop.maxAirDropAmount());
      expect(await mytoken.balanceOf(accounts[5].address)).to.equal(String(String(95 * 10**18)));
      expect(await mytoken.balanceOf(accounts[6].address)).to.equal(String(String(10**18)));
      expect(await mytoken.balanceOf(accounts[7].address)).to.equal(String(String(10**18)));
      expect(await mytoken.balanceOf(accounts[8].address)).to.equal(String(String(10**18)));
      expect(await mytoken.balanceOf(accounts[9].address)).to.equal(String(String(10**18)));

    });


});