import { BreadLi, BreadUl, Breadcrumb, Button, Card, ColContainer, Img, Info, PageTitle, TD, TR, Table, Title } from './Styles/Styled'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import { ORDER_CREATE_RESET } from './Redux/Constants/AllConstants';
import React from 'react';
import { createOrder } from './Redux/Actions/OrderActions';
import styled from 'styled-components';

const Section = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    width: 100%;
`;
const Zoning = styled.div`
    margin: 0 0 5px;
    padding: 10px;
    transition: 0.5s;
    border: 1px solid #8fd9a8;
`;
const ZoneTitle = styled(Title)`
    text-align: center
`;
const ZoneDetail = styled.p`
    cursor: default;
    color: #4b778d;
    margin: 0 0 10px;
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

export default function Overview(props) {
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket);
    const orderCreate = useSelector(state => state.orderCreate);
    const { basketItems } = basket;
    const { loading, success, error, order } = orderCreate;
    
    if(!basket.paymentMethod) {
        props.history.push('/payment');
    };

    const placeOrderHandler = () => {
        if(window.confirm(`ยืนยันรายการนี้หรือไม่?`)) {
            dispatch(createOrder({
                ...basket,
                orderItems: basket.basketItems,
            }));
        }
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

            <ColContainer>
                {loading && (
                <div style={{margin: '10px 0 30px'}}>
                    <LoadingScreen />
                </div>)}
                {error && (
                <div style={{margin: '10px 0 30px'}}>
                    <MessageScreen success={false}>{error}</MessageScreen>
                </div>)}

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
                            <Link to='/payment' style={{color: '#4b778d'}}>
                                <BreadLi>ที่อยู่ในการจัดส่ง</BreadLi>
                            </Link>
                        <BreadLi>/</BreadLi>
                        <BreadLi>ภาพรวม</BreadLi>
                    </BreadUl>
                </Breadcrumb>

                <Card width center>
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
                                                    <Info>รายละเอียด</Info>
                                                </TD>
                                                <TD>
                                                    <Info>{item.description}</Info>
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
                                                    <Info>{item.category}</Info>
                                                </TD>
                                            </TR>
                                        </Table>
                                    </div>
                                </ZoneImage>
                            ))}
                        </Zoning>
                        <Button 
                            order
                            onClick={placeOrderHandler}
                            disabled={basket.basketItems.length === 0}
                        >เสร็จสิ้น</Button>
                    </Section>

                </Card>
            </ColContainer>
            
        </React.Fragment>
    )
}