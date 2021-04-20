import { useDispatch, useSelector } from 'react-redux';

import { Link } from "react-router-dom";
import React from 'react';
import { detailItems } from './Redux/Actions/ItemActions';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    border: solid 1px #28b5b5;
    background-color: #f8f5f1;
    padding: 10px;
    margin: 10px;
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
`;
const ButtonSection = styled.span`
    display: flex;
    justify-content: flex-end
`;
const Img = styled.img`
    width: 100%;
    max-width: 300px;
`;
const Title = styled.h2`
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    color: #4b778d;
`;
const Owner = styled.h4`
    margin: 0 0 15px 0;
    padding: 0;
    color: #4b778d;
`;
const Button = styled.button`
    background-color: ${props => props.detail ? "#f8ede3" : "#28b5b5"};
    color: ${props => props.detail ? "#28b5b5" : "#f8ede3"};
    font-size: 1em;
    margin: 0 0 0 10px;
    padding: 10px 20px;
    border: 2px solid #28b5b5;
    cursor: pointer;
    transition: 0.5s;

    :hover {
        // text-decoration: underline;
        background: ${props => props.detail ? "#8fd9a8" : "#8fd9a8"};
        color: ${props => props.detail ? "#ffffff" : "#ffffff"};
        border: ${props => props.detail ? "2px solid #8fd9a8" : "2px solid #8fd9a8"};
    }
`;
const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;
const Qty = styled.h4`
    margin: 0;
    padding: 0;
    color: #4b778d;
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
                    <Qty>จำนวน : {object.quantity} เล่ม</Qty>
                    <Owner>ผู้เขียน : {object.writer}</Owner>
                    <ButtonSection>
                        <Link to={`/detail/${object._id}`}>
                            <Button detail>
                                รายละเอียด
                            </Button>
                        </Link>

                        {/* <Button onClick={addToBasketHandler}>รับ</Button> */}
                    </ButtonSection>
                </Card>

        </React.Fragment>
    )
}
