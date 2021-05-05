import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f5f1;
    // padding: 50px 0;
    height: 100%;
`;

export default function LoadingScreen(props) {
    const [color, setColor] = React.useState('#28b5b5')
    return (
        <React.Fragment>

            <Container>
                <ClipLoader color={color} size={120} />
            </Container>


        </React.Fragment>
    );
}