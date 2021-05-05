import { BreadLi, BreadUl, Breadcrumb, Button, Card, ColContainer, Form, Input, Label, PageTitle } from '../Components/Styles/Styled';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { saveShippingAddress } from '../Components/Redux/Actions/BasketActions';
import styled from 'styled-components';

const SubmitButton = styled(Button)`
    margin: 50px 0 30px;

    @media (max-width: 770px) {
        margin: 50px 0 30px;
        padding: 0.5em 2em;
        margin-left: 0;
    }
`;

export default function Shipping(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const basket = useSelector(state => state.basket);
    const { userData } = userLogin;
    const { shippingAddress, basketItems } = basket;

    if(!userData) {
        props.history.push('/login');
    }

    const [fullname, setFullname] = React.useState(shippingAddress.fullname);
    const [phoneNumber, setPhoneNumber] = React.useState(shippingAddress.phoneNumber);
    const [address, setAddress] = React.useState(shippingAddress.address);
    const [district, setDistrict] = React.useState(shippingAddress.district);
    const [province, setProvince] = React.useState(shippingAddress.province);
    const [postal, setPostal] = React.useState(shippingAddress.postal);
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullname, phoneNumber, address, district, province, postal}));
        props.history.push('/payment');
    };
    return (
        <React.Fragment>

            <ColContainer>
                <Breadcrumb>
                    <BreadUl>
                        <Link to='/' style={{color: '#4b778d'}}>
                            <BreadLi>หน้าหลัก</BreadLi>
                        </Link>
                        <BreadLi>/</BreadLi>
                        {basketItems.map(object => (
                            <Link to={`/detail/${object.item}`} style={{color: '#4b778d'}}>
                                <BreadLi>{object.title}</BreadLi>
                            </Link>
                        ))}
                        <BreadLi>/</BreadLi>
                        <Link to='/basket' style={{color: '#4b778d'}}>
                            <BreadLi>ตะกร้าหนังสือ</BreadLi>
                        </Link>
                        <BreadLi>/</BreadLi>
                        <BreadLi>ที่อยู่ในการจัดส่ง</BreadLi>
                    </BreadUl>
                </Breadcrumb>

                <Card width center>
                    <PageTitle>ที่อยู่ในการจัดส่ง</PageTitle>

                    <Form onSubmit={submitHandler}>
                        <div style={{width: '50%'}}>
                            <Label htmlFor='fullname'>ชื่อผู้รับ</Label>
                            <Input 
                                required
                                placeholder='กรอกชื่อจริงและชื่อสกุลของคุณ' 
                                type='text'
                                id='fullname'
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            ></Input>

                            <Label htmlFor='phoneNumber'>เบอร์โทรศัพท์</Label>
                            <Input 
                                required
                                placeholder='กรอกเบอร์โทรศัพท์ของคุณ' 
                                type='tel'
                                id='phoneNumber'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            ></Input>

                            <Label htmlFor='adress'>ที่อยู่</Label>
                            <Input 
                                required
                                placeholder='กรอกที่อยู่ของคุณ' 
                                type='text'
                                id='adress'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></Input>

                            <Label htmlFor='district'>อำเภอ</Label>
                            <Input 
                                required
                                placeholder='กรอกอำเภอของคุณ' 
                                type='text'
                                id='district'
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            ></Input>

                            <Label htmlFor='province'>จังหวัด</Label>
                            <Input 
                                required
                                placeholder='กรอกจังหวัดของคุณ' 
                                type='text'
                                id='province'
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            ></Input>

                            <Label htmlFor='postal'>รหัสไปรษณีย์</Label>
                            <Input 
                                required
                                placeholder='กรอกรหัสไปรษณีย์ของคุณ' 
                                type='text'
                                id='postal'
                                value={postal}
                                onChange={(e) => setPostal(e.target.value)}
                            ></Input>

                            {/* <Label>ที่อยู่บนแผนที่</Label>
                            <Button>เปิดแผนที่</Button> */}
                            <SubmitButton continue type='submit'>ต่อไป</SubmitButton>
                        </div>
                    </Form>
                </Card>
            </ColContainer>
            
        </React.Fragment>
    )
}
