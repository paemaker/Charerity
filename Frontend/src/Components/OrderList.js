import { deleteOrder, listOrders } from './Redux/Actions/OrderActions';
import { useDispatch, useSelector } from 'react-redux';

import { BiDetail } from 'react-icons/bi'
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import { ORDER_DELETE_RESET } from './Redux/Constants/AllConstants';
import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
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
const Button = styled.button`
    cursor: pointer;
    color: ${props => props.delete ? "#ff7171" : "#f8f5f1"};
    background-color: ${props => props.delete ? "#f8ede3" : "#28b5b5"};
    padding: 0.5em 2em;
    border: ${props => props.delete ? "solid 2px #ff7171" : "solid 2px #28b5b5"};
    width: 100%;
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: ${props => props.delete ? "#ff7171" : "#8fd9a8"};
        border: ${props => props.delete ? "solid 2px #ff7171" : "solid 2px #8fd9a8"};
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

export default function OrderList(props) {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading, error, orders } = orderList;
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = orderDelete;

    const deleteHandler = (order) => {
        if(window.confirm(`ต้องการลบรายการ "${order._id}" นี้หรือไม่?`)) {
            dispatch(deleteOrder(order._id));
        };
    };

    React.useEffect(() => {
        dispatch(listOrders());
        dispatch({
            type: ORDER_DELETE_RESET,
        });
    }, [dispatch, successDelete]);

    return (
        <React.Fragment>
            
            <Container>
                {loadingDelete && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                )}
                {errorDelete && (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen color={false}>{errorDelete}</MessageScreen> 
                    </div>
                )}

                <Card>
                    <PageTitle>รายการการรับบริจาค</PageTitle>
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
                                            <TH>บัญชีผู้ใช้</TH>
                                            <TH>วันที่รับบริจาค</TH>
                                            <TH>วิธีการชำระเงิน</TH>
                                            <TH>สถานะการขนส่ง</TH>
                                            <TH>อื่น ๆ</TH>
                                        </TR>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <TR key={order._id}>
                                                <TD>{order._id}</TD>
                                                <TD>{order.user.fullname}</TD>
                                                <TD>{order.createdAt.substring(0, 10)}</TD>
                                                <TD>{order.paymentMethod}</TD>
                                                <TD>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'รอ'}</TD>
                                                <TD>
                                                    <div style={{display: 'flex'}}>
                                                        <Button
                                                            style={{ marginRight: '5px' }}
                                                            onClick={() => {props.history.push(`/order/${order._id}`)}}
                                                        ><BiDetail /></Button>
                                                        <Button
                                                            delete
                                                            onClick={() => deleteHandler(order)}
                                                        ><RiDeleteBin5Line /></Button>
                                                    </div>
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
