import { Card, ColContainer, PageTitle, TDGreen, THGreen, TRGreen, TableGreen } from '../Components/Styles/Styled'
import { useDispatch, useSelector } from 'react-redux';

import { BiDetail } from 'react-icons/bi'
import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import { listOrderHistory } from '../Components/Redux/Actions/OrderActions';
import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    padding: 0.5em 2em;
    border: solid 2px #28b5b5;
    width: 100%;
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

export default function OrderHistory(props) {
    const dispatch = useDispatch();
    const orderHistory = useSelector(state => state.orderHistory);
    const { loading, error, orders } = orderHistory;

    React.useEffect(() => {
        dispatch(listOrderHistory());
    }, [dispatch]);

    return (
        <React.Fragment>
            
            <ColContainer>
                {loading ? (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                ) : error ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen> 
                    </div>
                ) : (
                    <Card width center>
                        <PageTitle>ประวัติการรับบริจาค</PageTitle>
                        <div>
                            <TableGreen>
                                <thead>
                                    <TRGreen>
                                        <THGreen>หมายเลขรายการ</THGreen>
                                        <THGreen>วันที่รับบริจาค</THGreen>
                                        <THGreen>วิธีการชำระเงิน</THGreen>
                                        <THGreen>สถานะการขนส่ง</THGreen>
                                        <THGreen>รายละเอียด</THGreen>
                                    </TRGreen>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <TRGreen key={order._id}>
                                            <TDGreen>{order._id}</TDGreen>
                                            <TDGreen>{order.createdAt.substring(0, 10)}</TDGreen>
                                            <TDGreen>{order.paymentMethod}</TDGreen>
                                            <TDGreen>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'รอ'}</TDGreen>
                                            <TDGreen>
                                                <Button 
                                                    onClick={() => {props.history.push(`/order/${order._id}`)}}
                                                ><BiDetail /></Button>
                                            </TDGreen>
                                        </TRGreen>
                                    ))}
                                </tbody>
                            </TableGreen>
                        </div>
                    </Card>
                )}
            </ColContainer>

        </React.Fragment>
    )
}
