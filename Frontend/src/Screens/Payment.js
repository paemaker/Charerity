import { BreadLi, BreadUl, Breadcrumb, Card, ColContainer, Form, Label, PageTitle } from '../Components/Styles/Styled'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { savePaymentMethod } from '../Components/Redux/Actions/BasketActions';
import styled from 'styled-components';

const Description = styled.p`
    margin: 0;
    color: #4b778d;
`;
const Button = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    font-size: 1em;
    padding: 0.5em 2em;
    margin: ${props => props.continue ? "50px 0 30px" : "10px 0 30px"};
    border: solid 2px #28b5b5;
    width: 50%;
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: #8fd9a8;
        border: solid 2px #8fd9a8;
    }

    @media (max-width: 770px) {
        margin: 50px 0 30px;
        padding: 0.5em 2em;
        margin-left: 0;
    }
`;
const RadioInput = styled.input`
    margin: 0 15px 0 0;
`;

export default function Payment(props) {
    const [paymentMethod, setPaymentMethod] = React.useState('ผู้รับบริจาคชำระเงินเอง');
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket);
    const { shippingAddress, basketItems } = basket;

    if(!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/overview');
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
                            <Link to='/shipping' style={{color: '#4b778d'}}>
                                <BreadLi>ที่อยู่ในการจัดส่ง</BreadLi>
                            </Link>
                        <BreadLi>/</BreadLi>
                        <BreadLi>การชำระเงิน</BreadLi>
                    </BreadUl>
                </Breadcrumb>

                <Card width center>
                    <PageTitle>วิธีการชำระเงิน</PageTitle>
                    <div style={{marginBottom: '20px'}}>
                        <Description>1. <strong>ผู้รับบริจาคชำระเงินเอง</strong> หมายถึง การชำระเงินปลายทาง</Description>
                        <Description>2. <strong>ผู้บริจาคชำระเงินเอง</strong> หมายถึง การชำระเงินที่บริษัทส่งพัสดุ</Description>
                    </div>

                    <Form onSubmit={submitHandler}>
                        <div>
                            <h3 style={{color: '#28b5b5', margin: '0 0 10px'}}>เลือกวิธีการชำระเงิน</h3>
                            <RadioInput 
                                required
                                checked
                                type='radio'
                                id='free'
                                name='paymentMethod'
                                value='ผู้รับบริจาคชำระเงินเอง'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></RadioInput>
                            <Label htmlFor='free'>ผู้รับบริจาคชำระเงินเอง</Label>
                            <br/>
                            <RadioInput 
                                required
                                type='radio'
                                id='online'
                                name='paymentMethod'
                                value='ผู้บริจาคชำระเงินเอง'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></RadioInput>
                            <Label htmlFor='online'>ผู้บริจาคชำระเงินเอง</Label>
                        </div>

                        <Button continue>ต่อไป</Button>
                    </Form>

                </Card>
            </ColContainer>
            
        </React.Fragment>
    )
}
