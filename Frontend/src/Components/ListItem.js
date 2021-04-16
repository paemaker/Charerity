import { useDispatch, useSelector } from 'react-redux';

import Item from './Item';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { listItems } from './Redux/Actions/ItemActions';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
    height: 100%;
    padding: 60px 150px;
    background-color: #f8ede3;
`;

export default function ListItem() {
    const dispatch = useDispatch();
    const itemList = useSelector(state => state.itemList);
    const { loading, error, items } = itemList;

    React.useEffect(() => {
        dispatch(listItems());
    }, [dispatch]);

    return (
        <React.Fragment>

            {loading ? (
                <LoadingScreen />
                ) : error ? (
                <MessageScreen>{error}</MessageScreen>
                ) : (
                <Container>
                    {items.map((object) => (
                        <Item key={object._id} object={object} />
                    ))}
                </Container>
            )}

        </React.Fragment>
    )
}
