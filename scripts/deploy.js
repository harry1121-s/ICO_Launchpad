const CONFIG = require("../credentials.json");

const { web3, ethers } = require('hardhat');

contract("Presale Deployment", () => {
    let presale;
	let mytoken;
	let atoken;
	let btoken;
    let tx;

    const provider = new ethers.providers.JsonRpcProvider(CONFIG["RINKEBY"]["URL"]);
    const signer = new ethers.Wallet(CONFIG["RINKEBY"]["PKEY"]);
    const account = signer.connect(provider);

    before(async () => {
      const PreSale = await ethers.getContractFactory("preSale");
      presale = await PreSale.deploy();	
      await presale.deployed();


      const myToken = await ethers.getContractFactory("myToken");
      mytoken = await myToken.deploy();
      await mytoken.deployed();

      //console.log(await mytoken.totalSupply());

      const tokenA = await ethers.getContractFactory("TokenA");
      atoken = await tokenA.deploy();
      await atoken.deployed();

      const TokenB = await ethers.getContractFactory("TokenB");
      btoken = await TokenB.deploy();
      await btoken.deployed();

	  WLTokens = [atoken.address, btoken.address];
      price = ["10000000000000000000", "5000000000000000000000"];

      end = 7 * 24 * 60 * 60;
      lock1 = 8 * 24 * 60 * 60;
      lock2 = 9 * 24 * 60 * 60;


      console.log({
        presale: presale.address,
        mytoken: mytoken.address,
        atoken: atoken.address,
        btoken: btoken.address
      })

    })

    after(async () => {
        console.log('\u0007');
        console.log('\u0007');
        console.log('\u0007');
        console.log('\u0007');
    })

    it ("should set correct params for presale contract", async () => {
		tx = await mytoken.approve(presale.address, "9000000000000000000000000000000000");
		await tx.wait()
		tx = await presale.setSaleTokenParams(mytoken.address, "100000000000000000000000", "10000000000000000");
		await tx.wait()
		tx = await presale.addWhiteListedToken(WLTokens, price);
		await tx.wait()
		currentTime = Math.floor(Date.now() / 1000);
		tx = await presale.setSalePeriodParams( currentTime + 1000, currentTime + end, currentTime + lock1, currentTime + lock2, 30);
		await tx.wait()
    })
})