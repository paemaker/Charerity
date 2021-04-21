import { BreadLi, BreadUl, Breadcrumb, Button, ColContainer, ContentSection, DetailCard, ImageSection, Img } from './Styles/Styled';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { detailItems } from './Redux/Actions/ItemActions';
import styled from 'styled-components';

const Title = styled.h1`
    color: #4b778d;
    text-transform: upppercase;
    padding: 0;
    margin: 0;
`;
const Info = styled.h4`
    color: #4b778d;
    padding: 0;
    margin: 0;
`;
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
`;
const TD = styled.td`
    text-align: left;
    padding: 10px;
`;
const TR = styled.tr`
`;

export default function ItemDetails(props) {
    const dispatch = useDispatch();
    const itemDetails = useSelector((state) => state.itemDetails);
    const { loading, error, item } = itemDetails;
    const itemId = props.match.params.id;

    const addToBasketHandler = () => {
        props.history.push(`/basket/${itemId}`);
    }

    React.useEffect(() => {
        dispatch(detailItems(itemId));
    }, [dispatch, itemId]);

    return (
        <React.Fragment>
                
            <ColContainer>
                {loading ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                ) : error ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen> 
                    </div>
                ) : (
                
                <>
                    <Breadcrumb>
                        <BreadUl>
                            <Link to='/' style={{color: '#4b778d'}}>
                                <BreadLi>หน้าหลัก</BreadLi>
                            </Link>
                            <BreadLi>/</BreadLi>
                            <BreadLi>{item.title}</BreadLi>
                        </BreadUl>
                    </Breadcrumb>

                    <DetailCard>
                        <ImageSection>
                            <Img src={item.image} />
                        </ImageSection>
                        <ContentSection>
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

                            {item.quantity > 0 && (
                                <Button onClick={addToBasketHandler}>รับ</Button>
                            )}
                        </ContentSection>
                    </DetailCard>
                </>

            )}
            </ColContainer>

        </React.Fragment>
    )
}
