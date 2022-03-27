import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, Checkbox } from '@mui/material';
import { simplex_logo_small, bnb, matic, usdt, busd } from './assets'
import Referral from './Referral';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReactLoading from 'react-loading';
// import { Dropdown } from 'semantic-ui-react'
import Web3 from "web3";
//import Web3 from "web3";
import Web3Modal, { PROVIDER_WRAPPER_CLASSNAME } from "web3modal";


import WalletConnectProvider from "@walletconnect/web3-provider";
import { DateRangeRounded, KeyboardReturnRounded, Navigation } from '@mui/icons-material';



function LandingPage({ params }) {

  const { rate, tokensSold, totalTokens, connectToWallet, accountAddress, mytokenDecimals, atokenDecimals, btokenDecimals, preSaleEndTime, preSaleStartTime, lockingPeriod1, lockingPeriod2 } = params;


  var contractAddress = '0x53bb09134B2F8076Fc35197073E5ADabd22443A9';
  var abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [{ "internalType": "address[]", "name": "_tokens", "type": "address[]" }, { "internalType": "uint256[]", "name": "_prices", "type": "uint256[]" }], "name": "addWhiteListedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "address", "name": "_referralId", "type": "address" }], "name": "buyToken", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "buyers", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "buyersAmount", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "lockingPeriod1Claimed", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_referralPercent", "type": "uint256" }], "name": "createReferral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "getTokenAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lockingPeriod1", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lockingPeriod2", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "percentTokens1", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "preSaleEndTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "preSaleStartTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "referrals", "outputs": [{ "internalType": "bool", "name": "isReferrer", "type": "bool" }, { "internalType": "uint256", "name": "percentage", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "saleTokenDec", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_preSaleStartTime", "type": "uint256" }, { "internalType": "uint256", "name": "_preSaleEndTime", "type": "uint256" }, { "internalType": "uint256", "name": "_lockingPeriod1", "type": "uint256" }, { "internalType": "uint256", "name": "_lockingPeriod2", "type": "uint256" }, { "internalType": "uint256", "name": "_percentTokens1", "type": "uint256" }], "name": "setSalePeriodParams", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_saleToken", "type": "address" }, { "internalType": "uint256", "name": "_totalTokensforSale", "type": "uint256" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "setSaleTokenParams", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stopSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenPrices", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "tokenWL", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalTokensSold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalTokensforSale", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_tokens", "type": "address[]" }, { "internalType": "uint256[]", "name": "_prices", "type": "uint256[]" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }], "name": "updateTokenRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amt", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amt", "type": "uint256" }], "name": "withdrawCurrency", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]


  const { ethereum } = window;
  const web3 = new Web3(window.ethereum);

  const currencyOptions = {
    "bnb": bnb,
    "busd": busd,
    "usdt": usdt
  }

  const bnbToken = "0x0000000000000000000000000000000000000000";

  const mytoken = "0x9a9f13D3C3127FFdc37385b7e7dc1f758bd8e6AB"

  const tokenAbi = [
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

  const [currency, setCurrency] = useState({
    "name": "",
    "img": ""
  });


  const [currencyOptionVisibility, setCurrencyOptionVisibility] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0.00);
  const [smplxAmount, setSmplxAmount] = useState(0.00);
  const [referral, setReferral] = useState(false);
  const [referralAddress, setReferralAddress] = useState("")

  const [atokenrate, setATokenRate] = useState(0);
  const [btokenrate, setBTokenRate] = useState(0);
  //const [accountAddress, setAccountAddress] = useState("");
  //const [rate, setRate] = useState(0);
  //const [tokensSold, setTotalTokensSold] = useState(0);
  //const [totalTokens, setTotalTokens] = useState(0);
  const [defaultProvider, setDefaultProvider] = useState("");
  //const  [mytokenDecimals,setMyTokenDecimals] = useState(Math.pow(10,0));
  //const  [atokenDecimals,setATokenDecimals] = useState(Math.pow(10,0));
  // const  [btokenDecimals,setBTokenDecimals] = useState(Math.pow(10,0));
  const [selectedCurrencyAddress, setSelectedCurrencyAddress] = useState(bnbToken);
  const [loading, setLoading] = useState(false);
  const [dateDisplay, setDate] = useState('');


  const bnbDecimals = 18;


  const dateConversion = (date) => {
    var ts = date;

    // convert unix timestamp to milliseconds
    var ts_ms = ts * 1000;

    // initialize new Date object
    var date_ob = new Date(ts_ms);

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear();

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);

    // hours as 2 digits (hh)
    var hours = ("0" + date_ob.getHours()).slice(-2);

    // minutes as 2 digits (mm)
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // seconds as 2 digits (ss)
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);

    // date as YYYY-MM-DD format
    console.log("Date as DD-MM-DD Format: " + year + "-" + month + "-" + date);

    console.log("\r\n");

    //setDate(hours + ":" + minutes + ":" + seconds);

    // date & time as YYYY-MM-DD hh:mm:ss format: 

    return (<h2>PreSale <span>ends</span> on <span>{date}/{month}</span> {hours + ":" + minutes + ":" + seconds}</h2>)
    //return( <span>`${date}/${month}`</span>);


    //return( `${date} + "/" + month  + " " + {hours + ":" + minutes + ":" + seconds});

    console.log("\r\n");

    // time as hh:mm format: 
    //return("Time as hh:mm Format: " + hours + ":" + minutes);

  }


  useEffect(() => {

    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.tokenPrices(atoken).call().then(function (info) {
      console.log("atokenlandingpage", atokenDecimals)
      setATokenRate(1 / (parseInt(info) / Math.pow(10, atokenDecimals)));
    });
    contract.methods.tokenPrices(btoken).call().then(function (info) {
      setBTokenRate(1 / (parseInt(info) / Math.pow(10, btokenDecimals)));
    });




  }, [atokenDecimals, btokenDecimals]);

  const history = useNavigate();

  const handleDropDownClick = (e) => {
    setCurrency({
      "name": `${e.target.id}`,
      "img": currencyOptions[e.target.id]
    })
    setCurrencyOptionVisibility(false)
  }


  const getMaxBalance = async () => {

    const contract = new web3.eth.Contract(abi, contractAddress);
    var amount;
    console.log("enteruseeffect")
    console.log('buyAmount', buyAmount)
    console.log('currency', currency.name);
    const myTokenContract = new web3.eth.Contract(tokenAbi, mytoken);

    const aTokenContract = new web3.eth.Contract(tokenAbi, atoken);

    const bTokenContract = new web3.eth.Contract(tokenAbi, btoken);

    if (selectedCurrencyAddress === bnbToken) {
      const bnbBalance = await web3.eth.getBalance(accountAddress);
      console.log('bnbBalance', bnbBalance)
      setBuyAmount((bnbBalance / Math.pow(10, bnbDecimals)).toFixed(6));
    }
    if (selectedCurrencyAddress === atoken) {

      aTokenContract.methods.balanceOf((accountAddress)).call().then(function (info) {
        console.log("atokenbalance ", info);
        console.log("atokenbalance ", info / Math.pow(10, atokenDecimals).toFixed(6));
        setBuyAmount(((info / Math.pow(10, atokenDecimals)).toFixed(6)));
      });

    }
    if (selectedCurrencyAddress === btoken) {

      bTokenContract.methods.balanceOf(accountAddress).call().then(function (info) {
        console.log("btokenbalance ", info);
        setBuyAmount((info / Math.pow(10, btokenDecimals)).toFixed(6));
      });

    }


  }


  const buySimplex = async () => {

    const chainId = await web3.eth.net.getId();
    console.log("chainId", chainId)

    if ((accountAddress === "") || (chainId !== 97)) {
      console.log("insidechain")
      await connectToWallet();
      return
    }

    const date = Date.now();
    if (date > (preSaleEndTime * 1000)) {
      alert("Presale has ended");
      return
    }

    const contract = new web3.eth.Contract(abi, contractAddress);
    var amount;

    const sendReferralAddress = referralAddress === "" ? "0x0000000000000000000000000000000000000000" : referralAddress;


    const myTokenContract = new web3.eth.Contract(tokenAbi, mytoken);

    const aTokenContract = new web3.eth.Contract(tokenAbi, atoken);

    const bTokenContract = new web3.eth.Contract(tokenAbi, btoken);

    if (selectedCurrencyAddress === bnbToken) {
      const amount = (buyAmount * Math.pow(10, bnbDecimals)).toLocaleString('fullwide', { useGrouping: false });
      console.log("buytokenbnnb", amount)
      let nftTxn = await contract.methods.buyToken(bnbToken, '0', String(sendReferralAddress)).send({ from: accountAddress, value: amount });

    }
    if (selectedCurrencyAddress === atoken) {
      const amount = (buyAmount * Math.pow(10, atokenDecimals)).toLocaleString('fullwide', { useGrouping: false });
      console.log("buytokenmatic", amount)
      let nftTxn = await aTokenContract.methods.approve(contractAddress, amount).send({ from: accountAddress });
      console.log('nfttxn', nftTxn)
      if (nftTxn) {
        let buyToken = await contract.methods.buyToken(atoken, amount, String(sendReferralAddress)).send({ from: accountAddress });
        // let buyAToken = await contract.methods.buyToken(String(atoken),String((buyAmount*Math.pow(10,atokenDecimals))), String(referral)).send({from: accountAddress });
      }
    }
    if (selectedCurrencyAddress === btoken) {
      const amount = (buyAmount * Math.pow(10, btokenDecimals)).toLocaleString('fullwide', { useGrouping: false });
      console.log("buytokenustd", amount)

      let nftTxn = await bTokenContract.methods.approve(contractAddress, amount).send({ from: accountAddress });
      console.log("nftTxn", nftTxn)
      if (nftTxn) {
        let buyAToken = await contract.methods.buyToken(btoken, amount, String(sendReferralAddress)).send({ from: accountAddress });
      }

    }


  }
  useEffect(() => {

    const contract = new web3.eth.Contract(abi, contractAddress);
    var amount;
    console.log("enteruseeffect", rate, atokenrate, btokenrate, buyAmount)
    console.log("enteruseeffect")
    if (currency && (currency.name === "" || currency.name === "bnb")) {
      setSelectedCurrencyAddress(bnbToken);
      console.log("buyamountbnb", buyAmount)
      setSmplxAmount((rate * buyAmount).toFixed(6));
      // var amount1= (buyAmount*(Math.pow(10,bnbDecimals)));
      //  amount = String(amount1.toLocaleString('fullwide', { useGrouping: false }));
    }
    if (currency && (currency.name === "busd")) {
      setSelectedCurrencyAddress(atoken);
      console.log("buyamountatoken", buyAmount, atokenrate, atokenrate * buyAmount)
      setSmplxAmount((atokenrate * buyAmount).toFixed(6));
      // var amount1= (buyAmount*(Math.pow(10,atokenDecimals)));
      // amount = amount1.toLocaleString('fullwide', { useGrouping: false });
      //  console.log("atokenamount",amount)
    }
    if (currency && (currency.name === "usdt")) {
      //var amount1= (buyAmount*(Math.pow(10,btokenDecimals)));
      // amount = String(amount1.toLocaleString('fullwide', { useGrouping: false }));
      setSelectedCurrencyAddress(btoken);
      console.log("buyamountatoken", buyAmount)
      setSmplxAmount((btokenrate * buyAmount).toFixed(6));

    }



  }, [buyAmount, currency.name]);

  const handleCheckBox = (e) => {
    setReferral(e.target.checked);
  }


  const createReferral = async () => {

    if (accountAddress === "") {
      await connectToWallet();
      return
    }

    history('/referral')
  }

  const fetchInitialInfo = async (web3) => {

    /*const web3Modal = new Web3Modal({
        //network: "mainnet", // optional
        //cacheProvider: true, // optional
        providerOptions // required
      });
      
    //  const provider = await web3Modal.connect();
      
    //  const web3 = new Web3(ethereum.window);*/

    //contract instance
    const contract = new web3.eth.Contract(abi, contractAddress);

    contract.methods.totalTokensSold().call().then(function (info) {
      alert("info: ", info);
    });

    contract.methods.totalTokensForSale().call().then(function (info) {
      console.log("info: ", info);
    });

    contract.methods.rate().call().then(function (info) {
      console.log("info: ", info);   //priceofonetokeninbnb
    });

    contract.methods.tokenPrices(atoken).call().then(function (info) {
      console.log("ustdtokenprice ", info);
    });
    contract.methods.tokenPrices(btoken).call().then(function (info) {
      console.log("ustdtokenprice ", info);
    });


  }



  const date = new Date(preSaleStartTime)
  console.log(date.getDate())
  return (
    <MainContainer>
      <ButtonContainer1>
        <Button className="hello" onClick={() => { history('/claim') }}> <h3>Claim $SMPLX</h3></Button>
        <Button onClick={() => { connectToWallet() }}>
          <AccountBalanceWalletIcon />
          <h3>{(accountAddress === "") ? "Connect Wallet" : `${accountAddress}`}</h3>
        </Button>
      </ButtonContainer1>
      <MainInfoContainer>
        <MainInfo>
          <h1>Launchpad <span>PreSale</span> is Live</h1>
          <h2>Price of <span>{1}BNB</span> per <span>{rate} $SMPLX</span></h2>
          {dateConversion(preSaleEndTime)}
          <ProgressBarContainer>
            <SliderContainer>
              <CompletedProgress style={{ width: `${(parseFloat(tokensSold) / parseFloat(totalTokens) * 100)}%` }} ></CompletedProgress>
              <TotalProgress></TotalProgress>
            </SliderContainer>
            <ProgressRange>
              <h4>{`${parseFloat(tokensSold).toLocaleString("en")}`}<div>$SMPLX</div></h4>
              <h4>{`${parseFloat(totalTokens).toLocaleString("en")}`}<div>$SMPLX</div></h4>
            </ProgressRange>
          </ProgressBarContainer>
          <SaleInfo>
            <h1><span>{tokensSold} $SMPLX</span> sold</h1>
            <Button onClick={createReferral}>
              Create your referral
            </Button>
          </SaleInfo>
        </MainInfo>
        <MainTransactionContainer>
          <TransactionContainer>
            <Border>
              <LabelContainer>
                <h4>Buy</h4>
                <Button onClick={getMaxBalance}>max</Button>

              </LabelContainer>
              <BuyInputContainer>
                <input type="number" value={buyAmount} placeholder="0.00" step={1} onChange={(e) => { setBuyAmount(e.target.value) }} />
                <DropDown>
                  <Placeholder onClick={() => { setCurrencyOptionVisibility(true) }}>
                    <KeyboardArrowDownIcon />{currency.name === "" ?
                      (<DropDownItem className='DropDownSelection'>
                        <img src={bnb} alt="bnb" /><p>BNB</p>
                      </DropDownItem>)
                      : <DropDownItem className='DropDownSelection'>
                        <img src={currency.img} alt={currency.name} /> <p>{currency.name.toUpperCase()}</p>
                      </DropDownItem>}
                  </Placeholder>
                  {currencyOptionVisibility && <DropDownOptions >
                    {
                      Object.keys(currencyOptions).map((key) => {
                        return (
                          <DropDownItem className='DropDownItem' key={`${key}`} id={`${key}`} onClick={handleDropDownClick}>
                            <img id={`${key}`} src={currencyOptions[key]} alt={key} /> <p id={`${key}`}>  {key.toUpperCase()} </p>
                          </DropDownItem>
                        )
                      })
                    }
                  </DropDownOptions>}
                </DropDown>
              </BuyInputContainer>
            </Border>
            <Border>
              <LabelContainer>
                <h4>Get</h4>
              </LabelContainer>
              <SellInputContainer>
                <input type="number" disabled value={smplxAmount} placeholder="0.00" />
                <img src={simplex_logo_small} alt="Smplx logo " /><p>SIMPLEX</p>
              </SellInputContainer>
            </Border>
          </TransactionContainer>
          <CheckboxContainer>
            <Checkbox onChange={handleCheckBox} /><p>Have a referral?</p>

          </CheckboxContainer>

          {referral && <input type="text" value={referralAddress} placeholder="0x0000..." onChange={(e => setReferralAddress(e.target.value))} />}


          <ButtonContainer>
            <Button onClick={buySimplex}>
              {loading === true ? (<ReactLoading type="spin" color="blue" height={40} width={40} />) : "Buy $SMPLX"}
            </Button>
          </ButtonContainer>


        </MainTransactionContainer>

      </MainInfoContainer>

    </MainContainer >
  )
}

export default LandingPage;

const MainContainer = styled.div`  
    width:100%;
    display:flex;
    flex-direction:column;
    padding:20px 0;
    align-items:center;
    justify-content: center;
/*     
    >Button{
        background-color:#48dca8;
        border-radius:50px;
        color:white;
        padding:0;
        border:1px solid #48dca8;
        transition:all 0s ;
        :hover{
            background-color:white;
            >h3{
                color:black;
            }
            >.MuiSvgIcon-root{
                background-color:#48dca8;
            }
        }
        >.MuiSvgIcon-root{
            border-radius:50px;
            padding:15px;
            font-size:24px;
            border:1px solid #48dca8;
        }
        >h3{
            padding:0 10px;
        }
    } */
    
  
`;

const ButtonContainer1 = styled.div`
    // *{border:1px solid black}
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:center;
    margin:0px 20px;
    padding:20px 0;
    /* // direction:row; */
    
    >.hello{
      padding:15px 0px
    }
    >Button{
      background-color:#48dca8;
      border-radius:50px;
      color:white;
      padding:0;
      border:1px solid #48dca8;
      transition:all 0s ;
      margin:20px ;
      /* padding:10px 0; */
      :hover{
         background-color:white;
        >h3{
            color:black;
        }
        >.MuiSvgIcon-root{
          background-color:#48dca8;
        } 
      } 
      >.MuiSvgIcon-root{
        border-radius:50px;
        padding:15px;
        font-size:24px;
        border:1px solid #48dca8;
      }
      >h3{
        padding:0 10px;
        
        word-break: break-all;
      }
    }
`;

const MainInfoContainer = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content:space-evenly;
    flex-wrap:wrap; 
    margin:20px 0;
    padding:20px 0;
    direction:row

`;

const MainInfo = styled.div`
    background-color:white;
    box-shadow: 0 10px 10px rgba(0,0,0,.3);
    border-radius:50px;
    padding:20px 30px;
    >h1{
        text-align: center;
        margin:10px auto;
        margin-bottom:27px;
    >span{
        color:#00b638;
    }
    };
    h2{
        margin-bottom:30px;
    }
    >h2>span{
        color:#548CFF;
    }
    >h3{
        color:#00b638;;
    }
    @media (max-width:700px) {
        background-color:transparent;    
    }
`;


const ButtonContainer = styled.div`
    display:flex;
    justify-content: center;
    
    >Button{
        color:white;
        display:block;
        justify-self: center;
        padding:10px 50px;
        font-weight:600;
        background-color:#48dca8;
        border-radius:25px;
        :hover{
            background-color:#548CFF;
        } 
    }
`;

const ProgressBarContainer = styled.div`
    position:relative;
    margin:30px auto;  
`;

const CompletedProgress = styled.div`
    display:inline-block;
    height:25px;
    position:absolute;
    z-index:999;
    background-color:#48dca8;
    border-radius:25px;
    border:1px solid #48dca8;
`;

const TotalProgress = styled.div`
    display:inline-block;
    width:98%;
    height:25px;
    position:absolute;
    z-index:99;
    background-color:white;
    border-radius:25px;
    border:1px solid #48dca8;
    `;

const ProgressRange = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top: 50px;
    text-align:left;
    `;

const SaleInfo = styled.div`
    text-align:center;
    *{
        margin:20px 0;
    }
    >h1 >span{
        color:#00b638;
    }

    >h3 >span{
        color:#00b638;
    }

    >Button{
        background-color:#48dca8;
        color:white;
        border-radius:25px;
        padding:10px 20px;
        font-weight:600;
        :hover{
            background-color:#548CFF;
        }
    }
`;

const SliderContainer = styled.div`
    *{
        margin:0;
    }
`;

const MainTransactionContainer = styled.div`
    color:black;
    /* border:2px solid  #0094FF; */
    background-color:white;
    box-shadow: 0 10px 10px rgba(0,0,0,.3);
    border-radius:50px;
    padding:35px;
    height:fit-content;
    *{
        margin:5px;
    }

    >input{  
        /* color:#00db76; */
        font-size: 18px;
        outline:none;
        border:none;
        padding:10px 25px;
        background-color: whitesmoke;
        border-radius: 25px;
        
    }

    >input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
    -webkit-appearance: none;
     margin: 0;
     }

     @media (max-width:1000px) {
         margin-top: 20px;
     }
    
`;


const TransactionContainer = styled.div``;

const LabelContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    font-size: 24px;
    
    >Button{
        border-radius:25px;
        background-color:#2777f8;
        cursor:pointer;
        color:white;
        font-size:16px !important;
        font-weight:500;
        text-transform: lowercase;
        :hover{
            background-color:#2777f8;
        }
    }
   
`;


const BuyInputContainer = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content: space-between;
    background-color:#eef2f2;
    border-radius: 5px;
    padding:1px 10px 1px 1px;
    >input{
        flex:.9;
        margin-top:13px;
        /* color:#00db76; */
        outline:none;
        border:none;
        font-size: 18px;
        padding:10px 25px;
        background-color: #f9f9f9;
        border-radius: 5px;
    }
    >input::-webkit-outer-spin-button,
    >input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    >h4{
        font-size: 20px;
    }
    
    >img{
        object-fit:contain;
        height:25px;
        margin-right:2px;
    }
    >p{
        margin-left: 2px;
    }
    
`;

const SellInputContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    background-color:#eef2f2;
    border-radius: 5px;
    padding:1px 10px 1px 1px;
    >input{
        flex:.9;
        /* color:#00db76; */
        outline:none;
        border:none;
        font-size: 18px;
        padding:10px 25px;
        background-color: #f9f9f9;
        border-radius: 5px;
    }
    >input::-webkit-outer-spin-button,
    >input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    >h4{
        font-size: 20px;
    }
    
    >img{
        object-fit:contain;
        height:25px;
        margin-right:2px;
    }
    >p{
        margin-left: 2px;
    }
`;

const CheckboxContainer = styled.div`
    display:flex;
    align-items:center;
`
const Border = styled.div`
    padding:10px;
    border:2px solid #d9d9d9;
    border-radius:25px;
`;


const DropDown = styled.div`
    display:flex;
    align-items: center;
    position:relative;
    overflow:visible;
    flex-direction: column;;
`
const DropDownOptions = styled.div`
    /* position:absolute; */

    >.DropDownItem :hover{
        background-color: white;
        cursor: pointer;
    }
`;

const DropDownItem = styled.div`
    display: flex;
    align-items:center;
    >img{
        object-fit:contain;
        width:30px;
    }
    :hover{
        background-color: white;
        cursor: pointer;
    }
    
`;

const Placeholder = styled.div`
    display:flex;
    align-items: center;
    cursor:pointer;
    >.DropDownSelection{
        :hover{
            background-color:transparent;
        }
    }
`;