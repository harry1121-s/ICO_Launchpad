import { Button } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components'
import Web3 from "web3";
import Countdown from 'react-countdown';
import CountDownTimer from '@inlightmedia/react-countdown-timer';

function Claim({ accountAddress , connectToWallet,preSaleEndTime}) {
    const [userShare, setUserShare] = useState(250);
    const [partnerShare, setPartnerShare] = useState(250);
    const [account,setAccountAddress] = useState(accountAddress);

    console.log("presale",preSaleEndTime)

    var contractAddress = '0x922fAb9C24aD249F5Db0A621B0fD17d3dfA905d8';
    var abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_prices","type":"uint256[]"}],"name":"addWhiteListedToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_referralId","type":"address"}],"name":"buyToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"buyers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"buyersAmount","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"lockingPeriod1Claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_referralPercent","type":"uint256"}],"name":"createReferral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockingPeriod1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockingPeriod2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentTokens1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"preSaleStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referrals","outputs":[{"internalType":"bool","name":"isReferrer","type":"bool"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"saleTokenDec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_preSaleStartTime","type":"uint256"},{"internalType":"uint256","name":"_preSaleEndTime","type":"uint256"},{"internalType":"uint256","name":"_lockingPeriod1","type":"uint256"},{"internalType":"uint256","name":"_lockingPeriod2","type":"uint256"},{"internalType":"uint256","name":"_percentTokens1","type":"uint256"}],"name":"setSalePeriodParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_saleToken","type":"address"},{"internalType":"uint256","name":"_totalTokensforSale","type":"uint256"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"setSaleTokenParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stopSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenPrices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenWL","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokensforSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"uint256[]","name":"_prices","type":"uint256[]"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"updateTokenRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"withdrawCurrency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]


    const mytoken = "0x22b941baaB9E8E07720A3e19be63799E7F1C4313" 

    const atoken = "0xa3CA6Fba7cb953c13df7272032870Bbb913A0ae7" //matic

    const btoken = "0x5009b8bBa2e4dEa6D86198F44743f732264D4349" //ustd

    const handleSlider = (e) => {
        setUserShare(e.target.value);
        setPartnerShare(e.target.max - e.target.value)

    }
 //console.log('ISOO',preSaleEndTime.toisoString())


    const generateReferral = async () => {

        const {ethereum}=window;
      
        const web3 = new Web3(window.ethereum);
        const chainId = await web3.eth.net.getId();

        if((accountAddress==="" ) || (chainId!==97)){
            await connectToWallet();
            return
        }

        const contract = new web3.eth.Contract(abi, contractAddress);

        try{
            const accounts = await ethereum.request({ method:'eth_requestAccounts'});
            console.log("found an account",accounts[0] ); 
           setAccountAddress(accounts[0])  
         }catch(error){
           console.log(error)
         }

        let nftTxn = await contract.methods.createReferral((userShare)).send({from: account});

        console.log(nftTxn);
    }
    return (
        <MainContainer>
        <ReferralContainer>
            <h1>Get Your SMPLX Coins !!!!!!!</h1>
        </ReferralContainer>
        </MainContainer>
    )
}

export default Claim


const MainContainer = styled.div`  
    width:100%;
    display:flex;
    flex-direction:column;
    padding:20px 0;
    align-items:center;
    justify-content: center;

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
    }
`;


const ReferralContainer = styled.div`

    box-shadow:0 10px 10px rgba(0,0,0,.6);
    border-radius: 35px;
    padding:45px;
    display:flex;
    flex-direction: column;
    *{
        margin:0;
        /* border:1px solid black; */
    }

    >Button{
        color:white;
        background-color: #48dca8;
        border-radius:50px;
        align-self: center;
        padding:2px 14px;
        :hover{
            background-color:#548CFF;
        }
        :focus{
            background-color:blue;
        }
    }
`
const UserShareContainer = styled.div`
    text-align:left;
    margin-top:15px;
    color: #00db76;
`;
const PartnerShareContainer = styled.div`
    text-align:right;
    margin-bottom:15px;
    color:#548CFF;
`;

const SliderInfo = styled.div`
    margin: 20px 0;
    `;


const Slider = styled.div`
    >input{
        width:100%;
        opacity:.7;
        -webkit-transition: .2s;
        transition: opacity .2s;    
        margin:5px 0;
        :hover{
            opacity:1;
        }
    }

`;

