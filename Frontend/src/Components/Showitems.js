import { useDispatch, useSelector } from 'react-redux';

import Item from './Item';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { RowContainer } from './Styles/Styled';
import { listItems } from './Redux/Actions/ItemActions';
import styled from 'styled-components';

export default function Showitems() {
    const dispatch = useDispatch();
    const itemList = useSelector(state => state.itemList);
    const { loading, error, items } = itemList;

    React.useEffect(() => {
        dispatch(listItems({}));
    }, [dispatch]);

    return (
        <React.Fragment>

                {loading ? (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                ) : error ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen> 
                    </div>
                ) : (

                <RowContainer>
                    {items.map((object) => (
                        <Item key={object._id} object={object} />
                    ))}
                </RowContainer>

            )}

        </React.Fragment>
    )
}
