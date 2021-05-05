import { Button, RowContainer } from './Styles/Styled';
import { useDispatch, useSelector } from 'react-redux';

import Item from './Item';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { listItems } from './Redux/Actions/ItemActions';

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
                    <LoadingScreen />
                ) : error ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen> 
                    </div>
                ) : (

                <RowContainer>
                    {items.length === 0 && (
                        <MessageScreen success={false}>
                            หน้าแสดงสือยังว่างเปล่าอยู่ บริจาคหนังสือซักหน่อยไหม?<br/>
                            <Link 
                                to='/itemlist/giver'
                                style={{textDecoration: 'none', marginTop: '20px'}}
                            ><Button>บริจาคหนังสือ</Button>
                            </Link>
                        </MessageScreen>
                    )}

                    {items.map(object => (
                        <Item key={object._id} object={object} />
                    ))}
                </RowContainer>

            )}

        </React.Fragment>
    )
}
