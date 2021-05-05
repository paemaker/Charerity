import { AiOutlineFacebook, AiOutlineMail } from 'react-icons/ai';

import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f8ede3;
    width: 100%;
    height: auto;
    display: grid;
    grid: auto / 1fr 1fr 1fr;
`;
const LogoSection = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Logo = styled.h1`
    font-size: 40px;
    color: #4b778d;
    border: 1px solid #28b5b5;
    padding: 5px;
    cursor: default;
    background-color: #f8ede3;

    @media (max-width: 770px) {
        display: none;
    }
`;
const TextSection = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`;
const ContactSection = styled.div`
    grid-area: 1 / 3 / 2 / 4;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
`;
const Detail = styled.div`
    color: #4b778d;
`;
const H3 = styled.h3`
    color: #4b778d;
`;

export default function Footer() {
    return (
        <React.Fragment>

            <Container>
                <LogoSection>
                    <Logo>Sharerity</Logo>
                </LogoSection>

                <TextSection>
                    <H3>เว็บไซต์บริจาคหนังสือ</H3>
                </TextSection>

                <ContactSection>
                    <Detail>
                        <AiOutlineMail /> chmsn@kkumail.com
                        <br/>
                        <AiOutlineMail /> saharat_sipuwong@kkumail.com
                        <br/>
                        <AiOutlineFacebook /> Chumsin Sinchum
                        <br/>
                        <AiOutlineFacebook /> Kurt Saharat
                    </Detail>
                </ContactSection>
            </Container>
            
        </React.Fragment>
    )
}
