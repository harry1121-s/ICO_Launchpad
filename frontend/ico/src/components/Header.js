import React from 'react'
import styled from 'styled-components'
import { simplex_ico_logo } from "./assets.js"

function Header() {
    return (
        <HeaderContainer>
            <HeaderLogoContainer>
                <img src={simplex_ico_logo} alt="Logo" />
            </HeaderLogoContainer>
            {/* <BottomLine /> */}
        </HeaderContainer>

    )
}

export default Header;


const HeaderContainer = styled.div`
        display:flex;
        flex-direction: column;
        align-items:center;
`;

const HeaderLogoContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;   
    padding:30px 0;
    >img{
        object-fit:contain;
        height:6vh;
    }
    
`;

// const BottomLine = styled.div`
//     display:block;
//     border-bottom: 2px solid black;
//     /* box-shadow: 0 2px 3px rgba(0,0,0); */
//     width:70%;
//     margin-bottom: 10px;
//     @media (max-width:400px) {
//         width:100%;
//     }
    
// `;