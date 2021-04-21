import { Card, ColContainer, PageTitle, TD, TDGreen, THGreen, TRGreen, TableGreen } from './Styles/Styled'
import { deleteOrder, listOrders } from './Redux/Actions/OrderActions';
import { useDispatch, useSelector } from 'react-redux';

import { BiDetail } from 'react-icons/bi'
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import { ORDER_DELETE_RESET } from './Redux/Constants/AllConstants';
import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import styled from 'styled-components';

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

export default function OrderList(props) {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList);
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading, error, orders } = orderList;
    const { 
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete 
    } = orderDelete;

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
            
            <ColContainer>
                {loadingDelete && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>)}

                {errorDelete && (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen success={false}>{errorDelete}</MessageScreen> 
                    </div>)}

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
                        <PageTitle>รายการการรับบริจาค</PageTitle>
                        <div>
                            <TableGreen>
                                <thead>
                                    <TRGreen>
                                        <THGreen>หมายเลขรายการ</THGreen>
                                        <THGreen>บัญชีผู้ใช้</THGreen>
                                        <THGreen>วันที่รับบริจาค</THGreen>
                                        <THGreen>วิธีการชำระเงิน</THGreen>
                                        <THGreen>สถานะการขนส่ง</THGreen>
                                        <THGreen>อื่น ๆ</THGreen>
                                    </TRGreen>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <TRGreen key={order._id}>
                                            <TD>{order._id}</TD>
                                            <TD>{order.user.fullname ? null : "ไม่มี"}</TD>
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
