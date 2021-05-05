import { BreadLi, BreadUl, Breadcrumb, Button, Card, ColContainer, Img, PageTitle, Title } from '../Components/Styles/Styled';
import { addToBasket, removeFromBasket } from '../Components/Redux/Actions/BasketActions';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import styled from 'styled-components';

const Image = styled(Img)`
    width: 100%;
    max-width: 220px;
    margin: 0;
`;
const ItemTitle = styled(Title)`
    text-transform: uppercase;
    color: #4b778d;
    
    @media (min-width: 769px) {
        margin: 0 10px;
    }
`;
const Buttons = styled(Button)`
    color: ${props => props.confirm ? "#f8ede3" : "#ff7171"};
    background-color: ${props => props.confirm ? "#28b5b5" : "#f8ede3"};
    margin: ${props => props.confirm ? "5px 0" : "5px 0"};
    border: ${props => props.confirm ? "solid 2px #28b5b5" : "solid 2px #ff7171"};
    width: ${props => props.confirm ? "100%" : "100%"};
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
const Section = styled.div`
    display: flex;
    flex-flow: column wrap;

    @media (max-width: 770px) {
        justify-content: center;
        align-items: center;
    }
`;
const SelectedSection = styled.div`
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

export default function Basket(props) {
    const dispatch = useDispatch();
    const basket = useSelector(state => state.basket);
    const { basketItems, error } = basket;
    const itemId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const removeFromBasketHandler = (id) => {
        dispatch(removeFromBasket(id));
    };
    const checkOutHandler = () => {
        props.history.push('/login?redirect=shipping');
    };

    React.useEffect(() => {
        if(itemId) {
            dispatch(addToBasket(itemId, quantity));
        }
    }, [dispatch, itemId]);

    return (
        <React.Fragment>

            <ColContainer>
                {error && (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen>
                    </div>
                )}

                {basketItems.length !== 0 ? (
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
                            <BreadLi>ตะกร้าหนังสือ</BreadLi>
                        </BreadUl>
                    </Breadcrumb>
                ) : null}
                    
                {basketItems.length === 0 ? (
                    <MessageScreen success={false}>
                        ตะกร้าหนังสือยังว่างเปล่าอยู่ รับบริจาคหนังสือซักหน่อยไหม?<br/>
                        <Link 
                            to='/'
                            style={{textDecoration: 'none', marginTop: '20px'}}
                        ><Button>ไปหน้าหลัก</Button>
                        </Link>
                    </MessageScreen>
                ) : (
                    
                <>
                    {basketItems.map(object => (
                        <Card width center key={object.item}>
                            <PageTitle>ตะกร้าหนังสือ</PageTitle>

                            <SelectedSection>
                                <Image src={object.image} alt={object.title} />

                                <Section>
                                    <ItemTitle>{object.title}</ItemTitle>
                                    <div style={{margin: '0 10px'}}>{object.writer}</div>
                                </Section>

                                <Section>
                                    <ItemTitle>จำนวน</ItemTitle>
                                    <div style={{margin: '0 40px'}}>{object.quantity}</div>
                                </Section>
                                
                                <div style={{width: '100px'}}>
                                    <Buttons
                                        onClick={() => removeFromBasketHandler(object.item)}
                                    >
                                        ลบ
                                    </Buttons>
                                    <br/>
                                    <Buttons
                                        confirm 
                                        disabled={basketItems.length === 0}
                                        onClick={checkOutHandler}
                                    >
                                        ต่อไป
                                    </Buttons>
                                </div>
                            </SelectedSection>
                            <div style={{marginBottom: '30px'}} />
                        </Card>
                    ))}
                </>

                )}
            </ColContainer>

        </React.Fragment>
    )
}
