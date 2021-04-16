import { RiHome2Line, RiLoginBoxLine, RiShoppingBasketLine } from 'react-icons/ri';

import { Link } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Nav = styled.nav`
    padding: 0 20px;
    min-height: 9vh;
    background: #f8ede3;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 769px) {
        justify-content: center;
    }
`;
const DesktopLogo = styled.h1`
    font-size: 40px;
    color: #4b778d;
    border: 1px solid #4b778d;
    padding: 5px;
    cursor: default;
    background-color: #f8ede3;

    @media (max-width: 770px) {
        display: none;
    }
`;
const MobileLogo = styled.h1`
    font-size: 30px;
    color: #4b778d;
    border: 1px solid #4b778d;
    padding: 5px;

    @media (min-width: 769px) {
        display: none;
    }
`;
const Menu = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid #4b778d;
    background-color: #f8ede3;

    li:nth-child(2) {
        margin: 0px 20px;
    }

    @media (max-width: 768px) {
        display: none;
    }
`; 
const ListItem = styled.li`
`;
const LinkToMb = styled.a`
    font-size: 20px;
    color: #4b778d;
    text-decoration: none;
    padding: 0 10px;
    :hover {
        text-decoration: underline;
    }
`;
const LinkToDp = styled.a`
    font-size: 20px;
    color: #4b778d;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    letter-spacing: 1px;

    :hover {
        transform: scale(0.7);
    }
`;
const NavIcon = styled.button`
    background: none;
    cursor: pointer;
    border: none;
    outline: none;

    @media (min-width: 769px) {
        display: none;
    }
`;
const Line = styled.span`
    display: block;
    border-radius: 50px;
    width: 25px;
    height: 3px;
    margin: 5px;
    background-color: #4b778d;
    transition: width 0.4s ease-in-out;

    :nth-child(2) {
        width: ${props => (props.open ? "40%" : "70%")};
    }
`;
const Overlay = styled.div`
    position: absolute;
    height: ${props => (props.open ? "91vh" : 0)};
    width: 100vw;
    background: #f8ede3;
    transition: height 0.4s ease-in-out;

    @media (min-width: 769px) {
        display: none;
    }
`;
const OverlayMenu = styled.ul`
    list-style: none;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    
    li {
        opacity: ${props => (props.open ? 1 : 0)};
        font-size: 25px;
        margin: 30px 0px;
        transition: opacity 0.4s ease-in-out;
    }

    li:nth-child(2) {
        margin: 30px 0px;
    }
`;
const List = styled.span`
    margin: 0 8px;
`;

export default function Navbar() {
    const [toggle, setToggleNav] = React.useState(false);
    const basket = useSelector(state => state.basket);
    const { basketItems } = basket;

    return (
        <React.Fragment>

            <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#f8ede3'}}>
                <DesktopLogo>Sharerity</DesktopLogo>
            </div>
            <Nav>
                <MobileLogo>Sharerity</MobileLogo>

                <Menu>
                    <ListItem>
                        <Link to='/' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>

                            <LinkToDp>
                                <RiHome2Line />

                                <List>หน้าหลัก</List>
                            </LinkToDp>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to='/' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                            <LinkToDp>
                                <RiLoginBoxLine />

                                <List>เข้าสู่ระบบ</List>
                            </LinkToDp>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to='/basket' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                            <LinkToDp>
                                <RiShoppingBasketLine />

                                <List>ตะกร้าหนังสือ</List>
                                {basketItems.length > 0 && (
                                    <span>({basketItems.length})</span>
                                )}
                            </LinkToDp>
                        </Link>
                    </ListItem>
                </Menu>

                <NavIcon onClick={() => setToggleNav(!toggle)}>
                    <Line open={toggle} />
                    <Line open={toggle} />
                    <Line open={toggle} />
                </NavIcon>
            </Nav>

            <Overlay open={toggle}>
                <OverlayMenu open={toggle}>
                    <ListItem>
                        <LinkToMb target="#" href="https://www.instagram.com/igor_dumencic/">
                        Instagramsd;fjl
                        </LinkToMb>
                    </ListItem>
                    <ListItem>
                        <LinkToMb target="#" href="https://www.behance.net/igordumencic">
                        Behance
                        </LinkToMb>
                    </ListItem>
                    <ListItem>
                        <LinkToMb target="#" href="https://github.com/Igor178">
                        เข้าสู่ระบบ
                        </LinkToMb>
                    </ListItem>
                </OverlayMenu>
            </Overlay>

        </React.Fragment>
    )
}