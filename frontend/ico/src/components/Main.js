import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Referral from './Referral';
import LandingPage from './LandingPage';
import Web3 from "web3";

function Main() {


  const {ethereum}=window;
  const web3 = new Web3(window.ethereum);

  const bnbToken = "0x0000000000000000000000000000000000000000";

  const mytoken = "0x9a9f13D3C3127FFdc37385b7e7dc1f758bd8e6AB" 

  const tokenAbi =  [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]

  const atoken = "0x603Ce222a02cE7E77E0cA3a9BB2870B821Dda8B3" //matic

  const btoken = "0x5009b8bBa2e4dEa6D86198F44743f732264D4349" //ustd

  var contractAddress = '0x922fAb9C24aD249F5Db0A621B0fD17d3dfA905d8';
  var abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_prices","type":"uint256[]"}],"name":"addWhiteListedToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_referralId","type":"address"}],"name":"buyToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"buyersAmount","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"lockingPeriod1Claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_referralPercent","type":"uint256"}],"name":"createReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockingPeriod1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockingPeriod2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentTokens1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrals","outputs":[{"internalType":"bool","name":"isReferrer","type":"bool"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"saleTokenDec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_preSaleStartTime","type":"uint256"},{"internalType":"uint256","name":"_preSaleEndTime","type":"uint256"},{"internalType":"uint256","name":"_lockingPeriod1","type":"uint256"},{"internalType":"uint256","name":"_lockingPeriod2","type":"uint256"},{"internalType":"uint256","name":"_percentTokens1","type":"uint256"}],"name":"setSalePeriodParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_saleToken","type":"address"},{"internalType":"uint256","name":"_totalTokensforSale","type":"uint256"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setSaleTokenParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenPrices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenWL","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensforSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_prices","type":"uint256[]"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"updateTokenRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"withdrawCurrency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  const [rate, setRate] = useState(0);
  const [tokensSold, setTotalTokensSold] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [accountAddress,setAccountAddress] = useState('');
  const  [mytokenDecimals,setMyTokenDecimals] = useState(Math.pow(10,0));
  const  [atokenDecimals,setATokenDecimals] = useState(Math.pow(10,0));
  const  [btokenDecimals,setBTokenDecimals] = useState(Math.pow(10,0));
  const [chainId,setChainId] = useState(0);
  //const [atokenrate, setATokenRate] = useState(0);
 // const [btokenrate, setBTokenRate] = useState(0);



  const contract = new web3.eth.Contract(abi, contractAddress);
  const myTokenContract = new web3.eth.Contract(tokenAbi, mytoken);

  const aTokenContract = new web3.eth.Contract(tokenAbi, atoken);

  const bTokenContract = new web3.eth.Contract(tokenAbi, btoken);

 

  console.log("chainidtest",chainId);


  ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });


  const fetchTokenPrices = async () => {
    await myTokenContract.methods.decimals().call().then( function( info ) {
      console.log("mytokendecimals ", info);
      setMyTokenDecimals(info);
    });
  
    await aTokenContract.methods.decimals().call().then( function( info ) {
      console.log("atokendecimals ", info);
      setATokenDecimals(info);
    });
  
    await bTokenContract.methods.decimals().call().then( function( info ) {
      console.log("btokendecimals ", info);
      setBTokenDecimals(info);
    });
  }

  

  useEffect(() => {
 
console.log("gggggggggg")
  contract.methods.totalTokensSold().call().then( function( info ) {
      setTotalTokensSold((info/Math.pow(10,18)).toFixed(6))
    
   });

   contract.methods.totalTokensforSale().call().then( function( info ) {
    console.log("info:2 ", info);
    setTotalTokens((info/Math.pow(10,18)));
  });

  contract.methods.rate().call().then( function( info ) {
      setRate((1/(parseInt(info)/Math.pow(10,18))));
    console.log("rate ", info);
  });

  //const contract = new web3.eth.Contract(abi, contractAddress);
 /* contract.methods.tokenPrices(atoken).call().then( function( info ) {
    console.log("insidetokendecimals",atokenDecimals);
    setATokenRate(Math.pow(10,18)/(parseInt(info)));
  });
  contract.methods.tokenPrices(btoken).call().then( function( info ) {
    setBTokenRate(1/(parseInt(info)/Math.pow(10,18)));
  });*/

  myTokenContract.methods.decimals().call().then( function( info ) {
    console.log("mytokendecimals ", info);
    setMyTokenDecimals(info);
  });

   aTokenContract.methods.decimals().call().then( function( info ) {
    console.log("atokendecimals ", info);
    setATokenDecimals(info);
  });

   bTokenContract.methods.decimals().call().then( function( info ) {
    console.log("btokendecimals ", info);
    setBTokenDecimals(info);
  });


    }, [accountAddress]);
    //const chainId = await web3.eth.net.getId();


    const connectToWallet = async() => {

      const chainId = await web3.eth.net.getId();
      setChainId(chainId);
      console.log("chainId: ", chainId);
      if(chainId !== 97){
        alert("Please connect to correct network");
        return;
      }
  
        try{
            const accounts = await ethereum.request({ method:'eth_requestAccounts'});
            console.log("found an account",accounts[0] ); 
           setAccountAddress(accounts[0])  
         }catch(error){
           console.log(error)
         }
            //fetchInitialInfo(web3)
   }


  return (
    <div className="App"> 
    <Router>
    
        <Routes>
          <Route path="/" element={<LandingPage  params={{tokensSold, totalTokens, rate,connectToWallet,accountAddress,mytokenDecimals,atokenDecimals,btokenDecimals,chainId}}/> } />
        <Route path="/referral" element={<Referral accountAddress={accountAddress} connectToWallet={connectToWallet} chainId={chainId}/>} />
        </Routes>
    
    </Router>
    </div>
  );
}

export default Main;
