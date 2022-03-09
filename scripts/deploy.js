const CONFIG = require("../credentials.json");
var fs = require('fs');
const linkABI = (JSON.parse(fs.readFileSync('./artifacts/contracts/myToken.sol/myToken.json', 'utf8'))).abi;
const { web3, ethers } = require('hardhat');

contract("Presale Deployment", () => {
    let presale;
    let mytoken;
    let atoken;
    let btoken;
    let tx;
    let adrop;

    const provider = new ethers.providers.JsonRpcProvider(CONFIG["BSCTESTNET"]["URL"]);
    const signer = new ethers.Wallet(CONFIG["BSCTESTNET"]["PKEY"]);
    const account = signer.connect(provider);

    before(async () => {

      // const airDrop = await ethers.getContractFactory("airDrop");
      // adrop = await airDrop.deploy();
      // await adrop.deployed();

      const PreSale = await ethers.getContractFactory("preSale");
      presale = await PreSale.deploy();	
      await presale.deployed();


      // const myToken = await ethers.getContractFactory("myToken");
      // mytoken = await myToken.deploy();
      // await mytoken.deployed();

      // //console.log(await mytoken.totalSupply());

      // const tokenA = await ethers.getContractFactory("TokenA");
      // atoken = await tokenA.deploy();
      // await atoken.deployed();

      // const TokenB = await ethers.getContractFactory("TokenB");
      // btoken = await TokenB.deploy();
      // await btoken.deployed();

	  WLTokens = ["0x603Ce222a02cE7E77E0cA3a9BB2870B821Dda8B3", "0x5009b8bBa2e4dEa6D86198F44743f732264D4349"];
      price = ["10000000000000000000", "5000000000000000000000"];

      end = 3 * 60 * 60;
      lock1 = 4 * 60 * 60;
      lock2 = 5 * 60 * 60;


      console.log({
        presale: presale.address,
        // mytoken: mytoken.address,
        // atoken: atoken.address,
        // btoken: btoken.address,
        // airdrop: adrop.address
      })

    })

    after(async () => {
        console.log('\u0007');
        console.log('\u0007');
        console.log('\u0007');
        console.log('\u0007');
    })

    it ("should set correct params for presale contract", async () => {
    const tokenLink = new ethers.Contract("0x9a9f13D3C3127FFdc37385b7e7dc1f758bd8e6AB", linkABI, account);
    tx = await tokenLink.approve(presale.address, "100000000000000000000000");
    await tx.wait();
		// tx = await mytoken.approve(presale.address, "9000000000000000000000000000000000");
		// await tx.wait()
		tx = await presale.setSaleTokenParams("0x9a9f13D3C3127FFdc37385b7e7dc1f758bd8e6AB", "100000000000000000000000", "10000000000000000");
		await tx.wait()
		tx = await presale.addWhiteListedToken(WLTokens, price);
		await tx.wait()
		currentTime = Math.floor(Date.now() / 1000);
		tx = await presale.setSalePeriodParams( currentTime + 10, currentTime + end, currentTime + lock1, currentTime + lock2, 30);
		await tx.wait()
    })

    // it("Should set the airdrop", async() => {
    //   const tokenLink = new ethers.Contract("0x9a9f13D3C3127FFdc37385b7e7dc1f758bd8e6AB", linkABI, account);
    //   tx = await tokenLink.approve(adrop.address, "1000000000000000000000");
    //   await tx.wait();
    //   tx = await adrop.setAirDrop("0x9a9f13D3C3127FFdc37385b7e7dc1f758bd8e6AB", "1000000000000000000000");
    //   await tx.wait();
    // })
})