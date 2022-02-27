import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { bscscan, simplex_logo_white, card1, card2, card3, card4, twitter, mail, github, medium, instagram, telegram } from "./assets"



function Footer() {
    return (
        <FooterContainer >

            <FooterPattern>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path style={{ fill: "#04D169" }} opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z" />
                    <path style={{ fill: "#04D169" }} opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z" />
                    <path style={{ fill: "#04D169" }} d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z" />
                </svg>
            </FooterPattern>



            <FooterItems>
                <FooterSiteDesc>
                    <img src={simplex_logo_white} alt="Simplex Logo" />
                    <p>The World First Decentralized Blockchain Service Provider For Crypto Beginners, Next Generation Rewards Earning Platform & NFT MART</p>
                    <Button> BUY NOW</Button>
                </FooterSiteDesc>

                <ExternalLinkListContainer>
                    <h1>Company</h1>
                    <ExternalLinkList>
                        <h4>About</h4>
                        <h4>Team</h4>
                        <h4>Roadmap</h4>
                        <h4>Whitepaper</h4>
                        <h4>Contact</h4>
                    </ExternalLinkList>
                </ExternalLinkListContainer>

                <ExternalLinkListContainer>
                    <h1>Ecosystem</h1>
                    <ExternalLinkList>
                        <h4>Wallet</h4>
                        <h4>Dapps</h4>
                        <h4>Staking</h4>
                        <h4>NFT Mart</h4>
                        <h4>Launchpad</h4>
                    </ExternalLinkList>
                </ExternalLinkListContainer>

                <PaymentAndMedia>

                    <h3>Accepting Credit Cards soon</h3>
                    <Payment>
                        <img src={card1} alt="Card1" />
                        <img src={card2} alt="Card2" />
                        <img src={card3} alt="Card3" />
                        <img src={card4} alt="Card4" />
                    </Payment>

                    <h3>Our Media :</h3>
                    <MediaLine />
                    <Media>
                        <img src={telegram} style={{ backgroundColor: "#29b6f6" }} alt="telegram" />
                        <img src={twitter} style={{ backgroundColor: "#1d9bf0" }} alt="twitter" />
                        <img src={instagram} style={{ backgroundColor: "#FFF" }} alt="instagram" />
                        <img src={medium} style={{ backgroundColor: "#000" }} alt="Medium" />
                        <img src={github} style={{ backgroundColor: "#404040" }} alt="github" />
                        <img src={mail} style={{ backgroundColor: "#fa314a" }} alt="twitter" />
                    </Media>
                </PaymentAndMedia>

            </FooterItems>

            {/* <Logos>
                <img src={bscscan} alt="BSC Logo" />
                <img src={certik} alt="Certik Logo" />
                <img src={coingecko} alt="CoinGecko Logo" />
                <img src={coinmarketcap} alt="Coinmarket Logo" />
                <img src={interfi} alt="interfi Logo" />
            </Logos>

            <Button>
                Support
            </Button> */}


            <FooterPattern className='bottomPattern'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path style={{ fill: "#04D169" }} opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z" />
                    <path style={{ fill: "#04D169" }} opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z" />
                    <path style={{ fill: "#04D169" }} d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z" />
                </svg>
            </FooterPattern>

            <Copyright>
                Copyright © 2022. All rights reserved by SimpleX.
            </Copyright>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.div`
    /* margin-top:20px; */
    display:flex;
    width:100%;
    flex-direction: column;
    background-color: #283445;
    /* justify-content:space-between; */
    align-items: center;
    
    >Button{
        border-radius: 100px;
        border:2px solid white;
        width:fit-content;
        color:white;
    }
    >.bottomPattern{
        transform:rotate(180deg)
    }
    
    `;

const FooterItems = styled.div`
    display:flex;
    width:100%;
    flex-wrap: wrap;
    justify-content:space-evenly;
    padding:25px 0;
    /* border:1px solid red; */ 
    *{
        margin:5px 5px;
    }
`;

const FooterSiteDesc = styled.div`
    flex:.4;
    color:white;
    display: inline-block;
    min-width:250px;
    >p{
        margin:20px 0;
        font-size: 20px;
        font-weight: 300;
        text-align: left;
    }
    >img{
        object-fit:contain;
        height:35px;
    }
    
    >Button{
        background-color:#48dca8;
        padding:5px 15px;
        font-weight: 700;
        font-size:20px;
        color:white;
        border-radius: 25px;
    }

    @media (max-width:300px){
        text-align: center;;
    }
`;

const PaymentAndMedia = styled.div`
    color:white;
    >h3{
        padding-top: 5px;
        font-size: 28px;
        font-weight: 400;
    }

`;

const Payment = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin:25px 0;
`;

const MediaLine = styled.div`
    display:inline-block;
    width:40%;
    margin: 10px 0;
    border-bottom: 3px solid #04D169;
`;


const Media = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    
    >img{
        object-fit: contain;
        height:30px;
        padding:5px;
        border-radius: 5px;
        cursor:pointer;
    }
`;

const FooterPattern = styled.div`
    display:inline-block;
    width:100%;
    /* height:50px; */
    >svg{
        width:100%;
        height: 50px;
    }
    >Path{
        fill:#04D169;
    }
`;

const ExternalLinkListContainer = styled.div`
    color:white;
    width:fit-content;
    
    >h1{
        /* margin-bottom: 20px; */
        font-size: 28px;
        padding-top:5px;
        margin-bottom:20px;
    }
`;

const ExternalLinkList = styled.div`
    >h4{
        font-weight: 200;
        margin:8px 0;
        cursor: pointer;
        font-size:18px;
    }
`;

const Logos = styled.div`
    width:100%;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    padding:20px;
    margin:15px;
    >img{
        object-fit:contain;
        height:40px
    }
`;

const Copyright = styled.div`
    display:inline-block;
    padding:20px 0;
    font-size:20px;
    color:white;
    text-align: center;
`;
