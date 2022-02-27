import React from 'react'
import styled from 'styled-components'




function ExternalLinkCollection({ title, items }) {
    return (
        <ExternalLinkListContainer>
            <h1>{title}</h1>
            <ExternalLinkList>
                {items.map((item) => { return (<h4 key={item}>{item}</h4>) })}
            </ExternalLinkList>
        </ExternalLinkListContainer>
    )
}

export default ExternalLinkCollection

const ExternalLinkListContainer = styled.div`
    color:white;
    width:fit-content;
    margin:20px; 
    margin-right:80px;
    
    
    >h1{
        margin-bottom: 20px;
        font-size: 18px;
    }
`;

const ExternalLinkList = styled.div`
    >h4{
        font-weight: 200;
    }`;
