import { addToBasket, removeFromBasket } from './Redux/Actions/BasketActions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import MessageScreen from './MessageScreen';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    justify-content: center;
    background-color: #f8ede3;
`;
const Card = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: solid 1px #4b778d;
    width: 1000px;
    transition: 0.5s;
    background-color: #f8ede3;
    :hover {
        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)
        ;
    }
`;
const Page = styled.h1`
    text-transform: uppercase;
    margin: 30px 0 80px;
    color: #4b778d;
`;
const Selected = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    @media (max-width: 770px) {
        flex-flow: column wrap;
        justify-content: flex-start;
        align-items: center;
    }
`;
const Img = styled.img`
    width: 100%;
    max-width: 300px;
    max-height: 300px;
`;
const Title = styled.h3`
    text-transform: uppercase;
    color: #4b778d;
    
    @media (min-width: 769px) {
        margin: 0 10px;
    }
`;
const Button = styled.button`
    cursor: pointer;
    color: ${props => props.confirm ? "#f8ede3" : "#ff7171"};
    background-color: ${props => props.confirm ? "#28b5b5" : "#f8ede3"};
    font-size: 1em;
    margin: 0 0 0 10px;
    padding: 0.5em 2em;
    margin: ${props => props.confirm ? "80px 0 30px" : "0"};
    border: ${props => props.confirm ? "solid 2px #28b5b5" : "solid 2px #ff7171"};
    border-radius: 3px;
    width: ${props => props.confirm ? "50%" : ""};
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: ${props => props.confirm ? "#8fd9a8" : "#ff7171"};
        border: ${props => props.confirm ? "solid 2px #8fd9a8" : "solid 2px #ff7171"};
    }

    @media (max-width: 770px) {
        display: ${props => props.confirm ? "" : "none"};
        margin: 10px 0 30px;
        padding: 0.5em 2em;
    }
`;
const DescriptionSection = styled.div`
    display: flex;
    flex-flow: column wrap;

    @media (max-width: 770px) {
        justify-content: center;
        align-items: center;
    }
`;
const DeleteButton = styled.button`
    cursor: pointer;
    color: #ff7171;
    font-size: 1em;
    padding: 0.5em 2em;
    border: solid 2px #ff7171;
    border-radius: 3px;
    width: 50%;
    transition: 0.5s

    :hover {
        background-color: #ff7171;
        color: #f8ede3;
    }

    @media (min-width: 769px) {
        display: none;
    }
`;
const QtySection = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;

    @media (max-width: 770px) {
        margin: 0 0 10px;
        display: flex;
        flex-direction: rows;
    }
`;
const GoToButton = styled.button`
    background-color: #4b778d;
    color: #ffffff;
    font-size: 1em;
    margin: 20px 0;
    padding: 0.5em 2em;
    border: 2px solid #4b778d;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.5s;

    :hover {
        background-color: #8fd9a8;
        color: #ffffff;
        border: 2px solid #8fd9a8;
    }
`;

export default function Basket(props) {
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket);
    const { basketItems } = basket;
    const itemId = props.match.params.id;

    const removeFromBasketHandler = (id) => {
        dispatch(removeFromBasket(id));
    };
    const checkOutHandler = () => {
        props.history.push('/register?redirect=shipping');
    };

    React.useEffect(() => {
        if(itemId) {
            dispatch(addToBasket(itemId));
        }
    }, [dispatch, itemId]);

    return (
        <React.Fragment>

                <Container>
                    {basketItems.length === 0 ? (
                        <MessageScreen>
                            ตะกร้าหนังสือยังว่างเปล่าอยู่ รับบริจาคหนังสือซักหน่อยไหม?
                            <br/>
                            <Link 
                                to='/'
                                style={{textDecoration: 'none'}}
                            >
                                <GoToButton>ไปหน้าหลัก</GoToButton>
                            </Link>
                        </MessageScreen>
                    ) : (
                    
                    <>
                        {basketItems.map(object => (
                            <Card key={object.item}>
                                <Page>ตะกร้าหนังสือ</Page>
                                <Selected>
                                    <Img src={object.src} alt={object.title} />

                                    <DescriptionSection>
                                        <Title>{object.title}</Title>
                                        <div style={{margin: '0 10px'}}>{object.owner}</div>
                                    </DescriptionSection>

                                    <QtySection>
                                        <Title>จำนวน</Title>
                                        <span>{object.count}</span>
                                    </QtySection>

                                    <div>
                                        <Button
                                            onClick={() => removeFromBasketHandler(object.item)}
                                        >
                                            ลบ
                                        </Button>
                                    </div>
                                </Selected>

                                <DeleteButton 
                                    onClick={() => removeFromBasketHandler(object.item)}
                                >
                                    ลบ
                                </DeleteButton>
                                <Button 
                                    confirm 
                                    disabled={basketItems.length === 0}
                                    onClick={checkOutHandler}
                                >
                                    ต่อไป
                                </Button>
                            </Card>
                        ))}
                    </>

                    )}
                </Container>

        </React.Fragment>
    )
}
