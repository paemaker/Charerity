import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    // padding: 0 30px;
    border: ${props => props.success ? "1px solid #28b5b5" : "1px solid #ff7171"};
    background-color: #f8f5f1;
    transition: 0.5s;
    
    :hover {
        background-color: #f8ede3;
        border: 1px solid #28b5b5;
    }
`;
const Error = styled.h1`
    color: #114e60;
    cursor: default;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center
    width: 100%;
    padding: 0 30px;
`;

export default function MessageScreen(props) {
    const { color } = props;

    return (
        <React.Fragment>
            
            <Container success={color}>
                <Error>{props.children}</Error>
            </Container>

        </React.Fragment>
    );
}