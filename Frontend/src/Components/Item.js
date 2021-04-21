import { Card, Title } from './Styles/Styled';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import React from 'react';
import { detailItems } from './Redux/Actions/ItemActions';
import styled from 'styled-components';

const Img = styled.img`
    width: 100%;
    max-width: 300px;
`;
const Button = styled.button`
    background-color: #f8ede3;
    color: #28b5b5;
    border: 2px solid #28b5b5;
    font-size: 15px;
    cursor: pointer;
    padding: 10px;
    transition: 0.5s;
    width: 100%;

    :hover {
        color: #f8f5f1;
        background-color: #8fd9a8;
        border: 2px solid #8fd9a8;
    }
`;
const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;
const Detail = styled.h4`
    margin: 0;
    padding: 0;
    color: #4b778d;
`;
const LinkTo = styled(Link)`
    text-decoration: none;

    ${Button}:hover & {
        color: #8fd9a8;
    }
`;

export default function Item(props) {
    const dispatch = useDispatch();
    const { object } = props;
    const itemId = object._id;

    const addToBasketHandler = () => {
        props.history.push(`/basket/${itemId}`);
    }

    React.useEffect(() => {
        dispatch(detailItems(itemId));
    }, [dispatch, itemId]);

    return (
        <React.Fragment>

                <Card key={object._id}>
                    <Img src={object.image} alt={object.title} />
                    <Section>
                        <Title>{object.title}</Title>
                    </Section>
                    <Detail>จำนวน : {object.quantity} เล่ม</Detail>
                    <Detail style={{marginBottom: '10px'}}>ผู้เขียน : {object.writer}</Detail>

                    <LinkTo to={`/detail/${object._id}`}>
                        <Button>
                            รายละเอียด
                        </Button>
                    </LinkTo>

                </Card>

        </React.Fragment>
    )
}
