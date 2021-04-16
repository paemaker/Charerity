import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { detailItems } from './Redux/Actions/ItemActions';
import styled from 'styled-components';

const OuterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    padding: 60px 150px;
    background-color: #f8ede3;
`;
const Card = styled.div`
    width: 100%;
    min-width: 1100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid #4b778d;
    
    @media (max-width: 770px) {
        flex-wrap: wrap;
    }
`;
const Img = styled.img`
    width: 100%;
    padding: 50px;
    // max-width: 500px;
    // max-height: 300px;
`;
const Section = styled.div`
    width: 100%;
    padding: 50px;
    // background-color: gray;
`;
const Title = styled.h1`
    color: #4b778d;
    text-transform: upppercase;
    display: inline-block;
    padding: 0;
    margin: 0;
`;
const Button = styled.button`
    background-color: #28b5b5;
    color: #ffffff;
    font-size: 1em;
    margin: 20px 0;
    padding: 0.5em 2em;
    border: 2px solid #28b5b5;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.5s;

    :hover {
        background-color: #8fd9a8;
        color: #ffffff;
        border: 2px solid #8fd9a8;
    }
`;
const Breadcrumb = styled.div`
    display: flex;
    flex-flow: rows wrap;
    justify-content: flex-start;
    padding: 10px;
    background-color: #8fd9a8;
    color: #ffffff;
    border: 1px solid #8fd9a8;
    margin: 0 0 10px;
`;
const BreadUl = styled.ul`
    letter-spacing: 1px;
    color: #4b778d;
    margin: 0;
    padding: 0;
    display: inline-flex;
    list-style: none;
    margin-right: 5px;
`;
const BreadLi = styled.li`
    margin-right: 5px;
`;

export default function DetailItem(props) {
    const dispatch = useDispatch();
    const itemDetail = useSelector((state) => state.itemDetail);
    const { loading, error, item } = itemDetail;
    const itemId = props.match.params.id;

    const addToBasketHandler = () => {
        props.history.push(`/basket/${itemId}`);
    }

    React.useEffect(() => {
        dispatch(detailItems(itemId));
    }, [dispatch, itemId]);

    return (
        <React.Fragment>

            {loading ? (
                <LoadingScreen />
                ) : error ? (
                <MessageScreen>{error}</MessageScreen>
                ) : (
                
                <OuterContainer>
                    <Breadcrumb>
                        <BreadUl>
                            <Link to='/' style={{color: '#4b778d'}}>
                                <BreadLi>หน้าหลัก</BreadLi>
                            </Link>
                            <BreadLi>/</BreadLi>
                            <BreadLi>หนังสือ</BreadLi>
                        </BreadUl>
                    </Breadcrumb>

                    <Card>
                        <Img src={item.src} />
                        <Section>
                            <Title>{item.title}</Title>
                            <h3 style={{color: '#4b778d'}}>Owner : {item.owner}</h3>
                            <div style={{color: '#4b778d'}}>{item.content}</div>
                            {
                                item.count > 0 && (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Button onClick={addToBasketHandler}>รับ</Button>
                                        </div>
                                    </>
                                )
                            }
                        </Section>
                    </Card>
                </OuterContainer>
            )}

        </React.Fragment>
    )
}
