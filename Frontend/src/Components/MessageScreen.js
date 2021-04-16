import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    // padding: 0 30px;
    border: 1px solid #ff7171;
    background-color: #f8ede3;
`;
const Error = styled.h1`
    color: #ff7171;
    cursor: default;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 30px;
`;

export default function MessageScreen(props) {
    return (
        <React.Fragment>
            
            <Container>
                <Error>{props.children}</Error>
            </Container>

        </React.Fragment>
    );
}