import { BreadLi, BreadUl, Breadcrumb, Button, Card, ColContainer, Img, Info, PageTitle, TD, TR, Table, Title } from '../Components/Styles/Styled'
import { deliverOrder, detailsOrder } from '../Components/Redux/Actions/OrderActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import { ORDER_DELIVER_RESET } from '../Components/Redux/Constants/AllConstants';
import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    width: 100%;
`;
const Zoning = styled.div`
    margin: 0 0 10px;
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
const OrderIdTitle = styled.span`
    margin: 10px 0 30px;
    color: #28b5b5;
`;
const ZoneImage = styled.div`
    display: grid;
    grid: 350px / auto 620px;
`;
const Image = styled(Img)`
    max-width: 200px;
    margin-top: 0;
    margin-bottom: 0;
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

    return loading ? (
        <div style={{margin: '10px 0 30px'}}>
            <LoadingScreen />
        </div>) :
        error ? (
            <div style={{margin: '10px 0 30px'}}>
                <MessageScreen success={false}>{error}</MessageScreen>
            </div>) :
        (
            <React.Fragment>

                <ColContainer>

                    {loadingDeliver && (
                        <div style={{margin: '10px 0 30px'}}>
                            <LoadingScreen />
                        </div>)}

                    {errorDeliver && (
                        <div style={{padding: '10px 0 30px'}}>
                            <MessageScreen success={false}>{errorDeliver}</MessageScreen> 
                        </div>)}

                    <Card width center>
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
                                <ZoneImage key={item._id}>
                                    <Image src={item.image} alt={item.title} />
                                    <div>
                                        <Table>
                                            <TR>
                                                <TD>
                                                    <Title>ชื่อหนังสือ</Title>
                                                </TD>
                                                <TD>
                                                    <Title>{item.title}</Title>
                                                </TD>
                                            </TR>
                                            <TR>
                                                <TD>
                                                    <Info>ผู้เขียน</Info>
                                                </TD>
                                                <TD>
                                                    <Info>{item.writer}</Info>
                                                </TD>
                                            </TR>
                                            <TR>
                                                <TD>
                                                    <Info>จำนวน</Info>
                                                </TD>
                                                <TD>
                                                    <Info>{item.quantity}</Info>
                                                </TD>
                                            </TR>
                                            <TR>
                                                <TD>
                                                    <Info>ประเภท</Info>
                                                </TD>
                                                <TD>
                                                    {item.category.map(cat => (
                                                        <Info>{cat.value}</Info>
                                                    ))}
                                                </TD>
                                            </TR>
                                        </Table>
                                    </div>
                                </ZoneImage>
                                ))}
                            </Zoning>
                        </Section>
                        {userData.isAdmin && !order.isDelivered ? (
                            <Button 
                                order
                                onClick={deliverHandler}
                                disabled={order.orderItems.length === 0}
                            >นำส่ง</Button>
                        ) : userData.isReceiver ? null : null}

                    </Card>
                </ColContainer>
                
            </React.Fragment>
    )
}