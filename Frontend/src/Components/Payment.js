import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from './Redux/Actions/BasketActions';

const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    justify-content: center;
    background-color: #f8f5f1;
`;
const Card = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: solid 1px #28b5b5;
    width: 1000px;
    transition: 0.5s;
    background-color: #f8f5f1;

    :hover {
        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)
        ;
        background-color: #f8ede3;
    }
`;
const PageTitle = styled.h1`
    text-transform: uppercase;
    margin: 30px 0 10px;
    color: #4b778d;
`;
const Description = styled.span`
    margin: 10px 0 30px;
    color: #28b5b5;
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
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Label = styled.h3`
    margin: 0 0 15px 0;
    color: #4b778d;
`;

export default function Payment(props) {
    const [paymentMethod, setPaymentMethod] = React.useState('ผู้รับบริจาคชำระเงินเอง');
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket);
    const { shippingAddress } = basket;

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

            <Container>
                <Card>
                    <PageTitle>ชำระเงิน</PageTitle>
                    <Description>ผู้ใช้งานสามารถเลือกชำระเงินได้</Description>

                    <Form onSubmit={submitHandler}>
                        <div>
                            <Label>เลือกวิธีการชำระเงิน</Label>
                            <RadioInput 
                                required
                                checked
                                type='radio'
                                id='free'
                                name='paymentMethod'
                                value='ผู้รับบริจาคชำระเงินเอง'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></RadioInput>
                            <label htmlFor='free' style={{color: '#28b5b5'}}>ผู้รับบริจาคชำระเงินเอง</label>
                            <br/>
                            <RadioInput 
                                required
                                type='radio'
                                id='online'
                                name='paymentMethod'
                                value='ผู้บริจาคชำระเงินเอง'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></RadioInput>
                            <label htmlFor='online' style={{color: '#28b5b5'}}>ผู้บริจาคชำระเงินเอง</label>
                        </div>

                        <Button continue>ต่อไป</Button>
                    </Form>

                </Card>
            </Container>
            
        </React.Fragment>
    )
}
