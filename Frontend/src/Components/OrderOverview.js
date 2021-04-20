import { deliverOrder, detailsOrder } from './Redux/Actions/OrderActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import { ORDER_DELIVER_RESET } from './Redux/Constants/AllConstants';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
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
    margin: 30px 0 10px;
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
    border: 1px solid #28b5b5;

    :hover {
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        background-color: #f8ede3;
    }
`;
const ZoneTitle = styled.h3`
    cursor: default;
    color: #4b778d;
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
const OrderIdTitle = styled.span`
    margin: 10px 0 30px;
    color: #28b5b5;
`;
const Img = styled.img`
    width: 100%;
    max-width: 300px;
`;

export default function OrderOverview(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const orderDetails = useSelector(state => state.orderDetails);
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { userData } = userLogin;
    const { loading, error, order } = orderDetails
    const { 
        loading: loadingDeliver, 
        error: errorDeliver, 
        success: successDeliver  
    } = orderDeliver;
    const orderId = props.match.params.id;

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };

    React.useEffect(() => {
        if(!order || successDeliver || (order && order._id !== orderId))  {
            dispatch(detailsOrder(orderId));
            dispatch({
                type: ORDER_DELIVER_RESET
            });
        }
    }, [dispatch, orderId, successDeliver]);

    return loading ? (<LoadingScreen />) :
        error ? (<MessageScreen></MessageScreen>) :
    (
        <React.Fragment>

            <Container>

                {loadingDeliver && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                )}
                {errorDeliver && (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen color={false}>{errorDeliver}</MessageScreen> 
                    </div>
                )}

                <Card>
                    <PageTitle>รายละเอียดการรับบริจาค</PageTitle>
                    <OrderIdTitle><strong>หมายเลขรายการ : {order._id}</strong></OrderIdTitle>
                    
                    <Section>
                        {order.isDelivered ? (
                            <Zoning>
                                <ZoneDetail style={{margin: 0}}>
                                    <strong>สถานะการขนส่ง : </strong>พัสดุได้รับการจัดส่งแล้ว {order.deliveredAt}
                                </ZoneDetail>
                            </Zoning> ) : (
                            <Zoning>
                                <ZoneDetail style={{margin: 0}}>
                                    <strong>สถานะการขนส่ง : </strong>พัสดุอยู่ระหว่างการขนส่ง
                                </ZoneDetail>
                            </Zoning>
                        )}
                        <Zoning>
                            <ZoneTitle>ที่อยู่ในการจัดส่ง</ZoneTitle>
                            <ZoneDetail><strong>ชื่อผู้รับ : </strong>{order.shippingAddress.fullname}</ZoneDetail>
                            <ZoneDetail><strong>เบอร์โทรศัพท์ : </strong>{order.shippingAddress.phoneNumber}</ZoneDetail>
                            <ZoneDetail><strong>ที่อยู่ : </strong>{order.shippingAddress.address} อำเภอ {order.shippingAddress.district}
                                จังหวัด {order.shippingAddress.province} รหัสไปรษณีย์ {order.shippingAddress.postal}
                            </ZoneDetail>
                        </Zoning>

                        <Zoning>
                            <ZoneTitle>ชำระเงิน</ZoneTitle>
                            <ZoneDetail><strong>วิธีการชำระเงิน : </strong>{order.paymentMethod}</ZoneDetail>
                        </Zoning>

                        <Zoning>
                            <ZoneTitle>หนังสือที่รับบริจาค</ZoneTitle>
                            {order.orderItems.map(item => (
                                <React.Fragment>
                                    <ZoneDetail>{item.title}</ZoneDetail>
                                    <ZoneDetail>{item.writer}</ZoneDetail>
                                    <ZoneDetail>
                                        <Img src={item.image} alt={item.title} />
                                    </ZoneDetail>
                                </React.Fragment>
                            ))}
                        </Zoning>
                    </Section>
                    {userData.isAdmin && !order.isDelivered && (
                        <Button 
                            order
                            onClick={deliverHandler}
                            // disabled={order.orderItems.length === 0}
                        >นำส่ง</Button> 
                    )}

                </Card>
            </Container>
            
        </React.Fragment>
    )
}