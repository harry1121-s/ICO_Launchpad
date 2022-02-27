import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Referral from './Referral';
import LandingPage from './LandingPage';
import Web3 from "web3";

function Main() {


  const {ethereum}=window;
  const web3 = new Web3(window.ethereum);

  var contractAddress = '0x64d7DDD192A58D5A5f0607515921889C96a3BB24';
  var abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_prices","type":"uint256[]"}],"name":"addWhiteListedToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_referralId","type":"address"}],"name":"buyToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"buyersAmount","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"lockingPeriod1Claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_referralPercent","type":"uint256"}],"name":"createReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockingPeriod1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockingPeriod2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentTokens1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrals","outputs":[{"internalType":"bool","name":"isReferrer","type":"bool"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"saleTokenDec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_preSaleStartTime","type":"uint256"},{"internalType":"uint256","name":"_preSaleEndTime","type":"uint256"},{"internalType":"uint256","name":"_lockingPeriod1","type":"uint256"},{"internalType":"uint256","name":"_lockingPeriod2","type":"uint256"},{"internalType":"uint256","name":"_percentTokens1","type":"uint256"}],"name":"setSalePeriodParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_saleToken","type":"address"},{"internalType":"uint256","name":"_totalTokensforSale","type":"uint256"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setSaleTokenParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenPrices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenWL","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensforSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_prices","type":"uint256[]"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"updateTokenRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"withdrawCurrency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

  const [rate, setRate] = useState(0);
  const [tokensSold, setTotalTokensSold] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [accountAddress,setAccountAddress] = useState('');
  

  useEffect(() => {
 
  const web3 = new Web3(window.ethereum);


  const contract = new web3.eth.Contract(abi, contractAddress);

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


    }, []);


    const connectToWallet = async() => {
    

     
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
          <Route path="/" element={<LandingPage  params={{tokensSold, totalTokens, rate,connectToWallet,accountAddress}}/> } />
        <Route path="/referral" element={<Referral accountAddress={accountAddress}/>} />
        </Routes>
    
    </Router>
    </div>
  );
}

export default Main;
