import React from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    height: 100%;
    z-index: 100;
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