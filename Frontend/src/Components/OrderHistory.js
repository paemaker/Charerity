import { useDispatch, useSelector } from 'react-redux';

import { BiDetail } from 'react-icons/bi'
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { listOrderHistory } from './Redux/Actions/OrderActions';
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
    margin: 30px 0 10px;
    color: #4b778d;
`;
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
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 30px;
`;
const TR = styled.tr`
    border: 1px solid #28b5b5;
    color: #4b778d;

    :nth-child(even) {
        background-color: #f8f5f1;
    }

    :hover {
        background-color: #d8f8b7;
    }
`;
const TD = styled.td`
    border: 1px solid #28b5b5;
    color: #4b778d;
    text-align: left;
    padding: 8px;
    text-align: center;
`;
const TH = styled.th`
    background-color: #28b5b5;
    border: 1px solid #28b5b5;
    color: #f8f5f1;
    text-align: left;
    padding: 8px;
    text-align: center;
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
            
            <Container>
                <Card>
                    <PageTitle>ประวัติการรับบริจาค</PageTitle>
                    {loading ? (
                            <div style={{margin: '10px 0 30px'}}>
                                <LoadingScreen />
                            </div>
                        ) : error ? (
                            <div style={{padding: '10px 10px 30px'}}>
                                <MessageScreen>{error}</MessageScreen> 
                            </div>
                        ) : (
                            <div>
                                <Table>
                                    <thead>
                                        <TR>
                                            <TH>หมายเลขรายการ</TH>
                                            <TH>วันที่รับบริจาค</TH>
                                            <TH>วิธีการชำระเงิน</TH>
                                            <TH>สถานะการขนส่ง</TH>
                                            <TH>รายละเอียด</TH>
                                        </TR>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <TR key={order._id}>
                                                <TD>{order._id}</TD>
                                                <TD>{order.createdAt.substring(0, 10)}</TD>
                                                <TD>{order.paymentMethod}</TD>
                                                <TD>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'รอ'}</TD>
                                                <TD>
                                                    <Button 
                                                        onClick={() => {props.history.push(`/order/${order._id}`)}}
                                                    ><BiDetail /></Button>
                                                </TD>
                                            </TR>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    }
                </Card>
            </Container>

        </React.Fragment>
    )
}
