import { BreadLi, BreadUl, Breadcrumb, Card, ColContainer, Form, Label, PageTitle } from './Styles/Styled'
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { detailsUser } from './Redux/Actions/UserActions';
import { listItems } from './Redux/Actions/ItemActions';

export default function Giver(props) {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const itemList = useSelector(state => state.itemList);
    const { loading, error, user } = userDetails;
    const { loading: loadingLogin, error: errorLogin, items } = itemList;
    const giverId = props.match.params.id;

    React.useEffect(() => {
        dispatch(detailsUser());
        dispatch(listItems({
            giver: giverId,
        }));
    }, [dispatch, giverId]);
    return (
        <React.Fragment>

            <ColContainer>
                {loading ? (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                ) : error ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen> 
                    </div>
                ) : (
                    <Card width center>
                        <PageTitle>หน้าแสดงข้อมูล</PageTitle>

                        

                    </Card>
                )}
            </ColContainer>
            
        </React.Fragment>
    )
}
