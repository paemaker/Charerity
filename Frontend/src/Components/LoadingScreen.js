import ContentLoader from 'react-content-loader';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 30px;
    border: 1px solid #d2e69c;
    background-color: #f8ede3;
`;
const Loading = styled.h1`
    color: #d2e69c;
    padding: 0 30px;
    cursor: default;
`;

export default function LoadingScreen(props) {
    return (
        <React.Fragment>

            <Container>
                <Loading>กำลังโหลด...</Loading>
            </Container>

            {/* <ContentLoader
                height={'100%'}
                width={'100%'}
                viewBox="0 0 400 200"
                backgroundColor="#d9d9d9"
                foregroundColor="#4b778d"
                {...props}
            >
                <rect x="15" y="15" rx="4" ry="4" width="130" height="10" />
                <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
                <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />
                <rect x="15" y="50" rx="3" ry="3" width="90" height="10" />
                <rect x="115" y="50" rx="3" ry="3" width="60" height="10" />
                <rect x="185" y="50" rx="3" ry="3" width="200" height="10" />
                <rect x="15" y="90" rx="3" ry="3" width="130" height="10" />
                <rect x="160" y="90" rx="3" ry="3" width="120" height="10" />
                <rect x="290" y="90" rx="3" ry="3" width="95" height="10" />
                <rect x="15" y="130" rx="3" ry="3" width="130" height="10" />
                <rect x="160" y="130" rx="3" ry="3" width="225" height="10" />
            </ContentLoader> */}
            

        </React.Fragment>
    );
}