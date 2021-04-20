import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { detailItems } from './Redux/Actions/ItemActions';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
    padding: 60px 150px;
    background-color: #f8f5f1;
`;
const Card = styled.div`
    width: 100%;
    min-width: 1000px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid #28b5b5;
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

            {loading ? (
                <LoadingScreen />
                ) : error ? (
                <MessageScreen>{error}</MessageScreen>
                ) : (
                
                <Container>
                    <Breadcrumb>
                        <BreadUl>
                            <Link to='/' style={{color: '#4b778d'}}>
                                <BreadLi>หน้าหลัก</BreadLi>
                            </Link>
                            <BreadLi>/</BreadLi>
                            <BreadLi>หนังสือ</BreadLi>
                            <BreadLi>/</BreadLi>
                            <BreadLi>{item.title}</BreadLi>
                        </BreadUl>
                    </Breadcrumb>

                    <Card>
                        <Img src={item.image} />
                        <Section>
                            <Title>{item.title}</Title>
                            <h3 style={{color: '#4b778d'}}>Owner : {item.writer}</h3>
                            <div style={{color: '#4b778d'}}>{item.content}</div>
                            {
                                item.quantity > 0 && (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Button onClick={addToBasketHandler}>รับ</Button>
                                        </div>
                                    </>
                                )
                            }
                        </Section>
                    </Card>
                </Container>
            )}

        </React.Fragment>
    )
}
