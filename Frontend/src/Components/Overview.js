import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import { ORDER_CREATE_RESET } from './Redux/Constants/AllConstants';
import React from 'react';
import { createOrder } from './Redux/Actions/OrderActions';
import styled from 'styled-components';

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
    background-color: #f8f5f1;
    box-sizing: border-box;
    width: 1000px;
    transition: 0.5s;

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
    margin: 30px 0 30px;
    color: #4b778d;
`;
const Section = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    width: 100%;
`;
const Zoning = styled.div`
    margin: 0 10px 5px 10px;
    padding: 10px;
    transition: 0.5s;
    border: 1px solid #f8f5f1;

    // :hover {
    //     box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    //     background-color: #f8ede3;
    // }
`;
const ZoneTitle = styled.h3`
    cursor: default;
    color: #4b778d;
    // border: 1px solid #28b5b5;
    text-align: center
`;
const ZoneDetail = styled.p`
    cursor: default;
    color: #4b778d;
    margin: 0 0 10px;

`;
const Button = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    font-size: 1em;
    padding: 0.5em 2em;
    margin: ${props => props.order ? "50px 0 30px" : "10px 0 30px"};
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
const Img = styled.img`
    width: 100%;
    max-width: 300px;
`;

export default function Overview(props) {
    const basket = useSelector(state => state.basket);
    const orderCreate = useSelector(state => state.orderCreate);
    const dispatch = useDispatch();
    const { loading, success, error, order } = orderCreate;
    
    if(!basket.paymentMethod) {
        props.history.push('/payment');
    };

    const placeOrderHandler = () => {
        dispatch(createOrder({
            ...basket,
            orderItems: basket.basketItems,
        }));
    };

    React.useEffect(() => {
        if(success) {
            props.history.push(`/order/${order._id}`);
            dispatch({
                type: ORDER_CREATE_RESET
            });
        }
    }, [success, order, props.history, dispatch]);

    return (
        <React.Fragment>

            <Container>
                <Card>
                    <PageTitle>ภาพรวม</PageTitle>

                    <Section>
                        <Zoning>
                            <ZoneTitle>ที่อยู่ในการจัดส่ง</ZoneTitle>
                            <ZoneDetail><strong>ชื่อผู้รับ : </strong>{basket.shippingAddress.fullname}</ZoneDetail>
                            <ZoneDetail><strong>เบอร์โทรศัพท์ : </strong>{basket.shippingAddress.phoneNumber}</ZoneDetail>
                            <ZoneDetail><strong>ที่อยู่ : </strong>{basket.shippingAddress.address} อำเภอ {basket.shippingAddress.district}
                            จังหวัด {basket.shippingAddress.province} รหัสไปรษณีย์ {basket.shippingAddress.postal}
                            </ZoneDetail>
                        </Zoning>

                        <Zoning>
                            <ZoneTitle>ชำระเงิน</ZoneTitle>
                            <ZoneDetail><strong>วิธีการชำระเงิน : </strong>{basket.paymentMethod}</ZoneDetail>
                        </Zoning>

                        <Zoning>
                            <ZoneTitle>หนังสือที่รับบริจาค</ZoneTitle>
                            {basket.basketItems.map(item => (
                                <React.Fragment>
                                    <ZoneDetail>
                                        <Img src={item.image} alt={item.title} />
                                    </ZoneDetail>
                                    <ZoneDetail>{item.title}</ZoneDetail>
                                    <ZoneDetail>{item.writer}</ZoneDetail>
                                </React.Fragment>
                            ))}
                        </Zoning>
                    </Section>
                    <Button 
                        order
                        onClick={placeOrderHandler}
                        disabled={basket.basketItems.length === 0}
                    >เสร็จสิ้น</Button>
                    {loading && <LoadingScreen />}
                    {error && <MessageScreen>{error}</MessageScreen>}

                </Card>
            </Container>
            
        </React.Fragment>
    )
}