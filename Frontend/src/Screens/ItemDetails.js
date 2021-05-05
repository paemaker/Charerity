import { BreadLi, BreadUl, Breadcrumb, Button, ColContainer, ContentSection, DetailCard, ImageSection, Img } from '../Components/Styles/Styled';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { detailItems } from '../Components/Redux/Actions/ItemActions';
import styled from 'styled-components';

const Title = styled.h2`
    color: #4b778d;
    text-transform: upppercase;
    padding: 0;
    margin: 0;
`;
const Info = styled.p`
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
const LinkTo = styled(Link)`
    color: #4b778d;
    text-decoration: underline;

    :hover {
        color: #8fd9a8;
    }
`;

export default function ItemDetails(props) {
    const dispatch = useDispatch();
    const itemDetails = useSelector(state => state.itemDetails);
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
                                        {item.category.map(cat => (
                                            <Info>{cat.value}</Info>
                                        ))}
                                    </TD>
                                </TR>
                                <TR>
                                    <TD>
                                        <Info>ผู้บริจาค</Info>
                                    </TD>
                                    <TD>
                                        <Info giver>
                                            <LinkTo to={`/giver/${item.giver._id}`}>
                                                {item.giver.giver.username}
                                            </LinkTo>
                                        </Info>
                                    </TD>
                                </TR>
                            </Table>
                            {/* <span>
                                <ReactStars value={item.giver.giver.rating} />
                                <span>{item.giver.giver.numReviews}</span>
                            </span> */}

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
