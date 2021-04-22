import { Dropdown, DropdownItem, DropdownMenu } from 'styled-dropdown-component';
import {
    RiAdminLine,
    RiBookletLine,
    RiDashboardLine,
    RiEditLine,
    RiFileListLine,
    RiHistoryLine,
    RiHome2Line,
    RiLoginBoxLine,
    RiLogoutBoxLine,
    RiShoppingBasketLine,
    RiUser3Line
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import React from 'react';
import { logoutUser } from './Redux/Actions/UserActions';
import styled from 'styled-components';

const Nav = styled.nav`
    padding: 0 20px;
    min-height: 9vh;
    background: #f8f5f1;
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
    border: 1px solid #28b5b5;
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
    border: 1px solid #28b5b5;
    padding: 5px;

    @media (min-width: 769px) {
        display: none;
    }
`;
const Menu = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    border: 1px solid #28b5b5;
    background-color: #f8ede3;

    @media (max-width: 768px) {
        display: none;
    }
`; 
const ListItem = styled.li`
    font-size: 20px;
    color: #4b778d;
    text-decoration: none;
    display: flex;
    justify-content: center;
    margin: 0 10px;
    align-items: center;
    transition: 0.5s;
    letter-spacing: 1px;

    :hover {
        transform: scale(0.9);
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
    background: #f8f5f1;
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
    padding: 0;
    
    li {
        border: 1px solid #28b5b5;
        padding: 5px;
        text-alignment: center;
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
    cursor: pointer;
`;
const CustomDropdownMenu = styled(DropdownMenu)`
    background: #f8f5f1;
    border: 1px solid #28b5b5;
    border-radius: 0;
    transition: 0.5s;
`;
const CustomDropdownItem = styled(DropdownItem)`
    color: #4b778d;

    :hover {
        color: #4b778d;
        background-color: #f8ede3;
    }
`;

export default function Navbar() {
    const [moreOpen, setMoreOpen] = React.useState(true);
    const [adminOpen, setAdminOpen] = React.useState(true);
    const [toggle, setToggleNav] = React.useState(false);
    const basket = useSelector(state => state.basket);
    const userLogin = useSelector(state => state.userLogin);
    const dispatch = useDispatch();
    const { basketItems } = basket;
    const { userData } = userLogin;

    const logoutHandler = () => {
        if(window.confirm(`ต้องการออกจากบัญชี "${userData.fullname}" หรือไม่?`)) {
            dispatch(logoutUser());
        }
    };

    return (
        <React.Fragment>

            <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#f8f5f1'}}>
                <DesktopLogo>Sharerity</DesktopLogo>
            </div>
            <Nav>
                <MobileLogo>Sharerity</MobileLogo>

                <Menu>
                    <ListItem>
                        <RiHome2Line />
                        <Link to='/' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                            <List>หน้าหลัก</List>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <RiShoppingBasketLine />
                        <Link to='/basket' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                            <List>ตะกร้าหนังสือ</List>
                            {basketItems.length > 0 && (
                                <span>({basketItems.length})</span>
                            )}
                        </Link>
                    </ListItem>

                    {userData ? ( null ) : (
                        <ListItem>
                            <RiLoginBoxLine />
                            <Link to='/login' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                <List>เข้าสู่ระบบ</List>
                            </Link>
                        </ListItem>
                    )}
                </Menu>

                {userData ? (
                    <Menu style={{marginLeft: '10px'}}>
                        <Dropdown>
                            <ListItem>
                            <RiUser3Line />
                                <List onClick={() => setMoreOpen(!moreOpen)}>{userData.fullname}</List>
                            </ListItem>

                            <CustomDropdownMenu hidden={moreOpen} toggle={() => setMoreOpen(!moreOpen)}>
                                {userData && userData.isGiver && (
                                    <>
                                        <CustomDropdownItem>
                                        <RiBookletLine />
                                        <Link to='/itemlist/giver' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                            <List>รายการหนังสือ</List>
                                        </Link>
                                        </CustomDropdownItem>

                                        <CustomDropdownItem>
                                        <RiFileListLine />
                                        <Link to='/orderlist/giver' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                            <List>รายการบริจาค</List>
                                        </Link>
                                        </CustomDropdownItem>
                                    </>
                                )}

                                <CustomDropdownItem>
                                    <RiEditLine />
                                    <Link to='/profile' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                        <List>แก้ไขข้อมูลส่วนตัว</List>
                                    </Link>
                                </CustomDropdownItem>

                                <CustomDropdownItem>
                                    <RiHistoryLine />
                                    <Link to='/orderhistory' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                        <List>ประวัติการรับบริจาค</List>
                                    </Link>
                                </CustomDropdownItem>

                                <CustomDropdownItem>
                                    <RiLogoutBoxLine />
                                    <Link
                                        style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}
                                        onClick={logoutHandler}
                                    >
                                        <List>ออกจากระบบ</List>
                                    </Link>
                                </CustomDropdownItem>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </Menu>
                ) : null}

                {userData && userData.isAdmin && (
                    <Menu style={{marginLeft: '10px'}}>
                        <Dropdown>
                            <ListItem>
                            <RiAdminLine />
                                <List onClick={() => setAdminOpen(!adminOpen)}>แอดมิน</List>
                            </ListItem>

                            <CustomDropdownMenu hidden={adminOpen} toggle={() => setAdminOpen(!adminOpen)}>
                                <CustomDropdownItem>
                                    <RiDashboardLine />
                                    <Link to='/dashboard' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                        <List>แดชบอร์ด</List>
                                    </Link>
                                </CustomDropdownItem>

                                <CustomDropdownItem>
                                    <RiUser3Line />
                                    <Link to='/userlist' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                        <List>ผู้ใช้งาน</List>
                                    </Link>
                                </CustomDropdownItem>

                                <CustomDropdownItem>
                                    <RiBookletLine />
                                    <Link to='/itemlist' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                        <List>รายการหนังสือ</List>
                                    </Link>
                                </CustomDropdownItem>

                                <CustomDropdownItem>
                                    <RiFileListLine />
                                    <Link to='/orderlist' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                                        <List>รายการบริจาค</List>
                                    </Link>
                                </CustomDropdownItem>

                            </CustomDropdownMenu>
                        </Dropdown>
                    </Menu>
                )}

                <NavIcon onClick={() => setToggleNav(!toggle)}>
                    <Line open={toggle} />
                    <Line open={toggle} />
                    <Line open={toggle} />
                </NavIcon>
            </Nav>

            <Overlay open={toggle}>
                <OverlayMenu open={toggle}>

                    <ListItem>
                        <RiHome2Line />
                        <Link to='/' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                            <List>หน้าหลัก</List>
                        </Link>
                    </ListItem>
                    
                    <ListItem>
                        <RiLoginBoxLine />
                        <Link to='/login' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                            <List>เข้าสู่ระบบ</List>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <RiShoppingBasketLine />
                        <Link to='/basket' style={{color: '#4b778d', fontSize: '20px', textDecoration: 'none'}}>
                            <List>ตะกร้าหนังสือ</List>
                            {basketItems.length > 0 && (
                                <span>({basketItems.length})</span>
                            )}
                        </Link>
                    </ListItem>
    
                </OverlayMenu>
            </Overlay>

        </React.Fragment>
    )
}