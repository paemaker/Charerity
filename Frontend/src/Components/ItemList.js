import { Card, ColContainer, PageTitle, TDGreen, THGreen, TRGreen, TableGreen } from './Styles/Styled'
import { ITEM_CREATE_RESET, ITEM_DELETE_RESET } from './Redux/Constants/AllConstants';
import { RiAddBoxLine, RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import { createItem, deleteItem, listItems } from './Redux/Actions/ItemActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    color: ${props => props.delete ? "#ff7171" : "#f8f5f1"};
    background-color: ${props => props.delete ? "#f8ede3" : "#ffb037"};
    padding: 0.5em 2em;
    border: ${props => props.delete ? "solid 2px #ff7171" : "solid 2px #ffb037"};
    width: 100%;
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: ${props => props.delete ? "#ff7171" : "#ffe268"};
        border: ${props => props.delete ? "solid 2px #ff7171" : "solid 2px #ffe268"};
    }

    @media (max-width: 770px) {
        margin: 50px 0 30px;
        padding: 0.5em 2em;
        margin-left: 0;
    }
`;
const AddButton = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    padding: 0.5em 2em;
    margin-bottom: 5px;
    border: solid 2px #28b5b5;
    width: 100%;
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: #8fd9a8;
        border: solid 2px #8fd9a8;
    }
`;

export default function ItemList(props) {
    const dispatch = useDispatch();
    const itemList = useSelector(state => state.itemList);
    const itemCreate = useSelector(state => state.itemCreate);
    const itemDelete = useSelector(state => state.itemDelete);
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, items } = itemList;
    const { 
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        item: createdItem
    } = itemCreate;
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = itemDelete;
    const { userData } = userLogin;
    const giverMode = props.match.path.indexOf('/giver') >= 0;

    const addHandler = () => {
        dispatch(createItem());
    };

    const deleteHandler = (item) => {
        if(window.confirm(`ต้องการลบข้อมูล ${item.title} หรือไม่`)) {
            dispatch(deleteItem(item._id));
        };
    };

    React.useEffect(() => {
        if(successCreate) {
            dispatch({
                type: ITEM_CREATE_RESET,
            });
            props.history.push(`/detail/${createdItem._id}/edit`);
        }

        if(successDelete) {
            dispatch({
                type: ITEM_DELETE_RESET,
            });
        }

        dispatch(listItems({ giver: giverMode ? userData._id : '' }));
    }, [dispatch, createdItem, props.history, successCreate, successDelete]);

    return (
        <React.Fragment>

            <ColContainer>
                {loadingDelete && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>)}

                {errorDelete && (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{errorDelete}</MessageScreen> 
                    </div>)}
                
                {loadingCreate && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>)}

                {errorCreate && (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen success={false}>{errorCreate}</MessageScreen> 
                    </div>)}

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
                        <PageTitle>รายการหนังสือ</PageTitle>
                        <div>
                            <AddButton onClick={addHandler}><RiAddBoxLine /></AddButton>
                        </div>
                        <div>
                            <TableGreen>
                                <thead>
                                    <TRGreen>
                                        <THGreen>รหัสหนังสือ</THGreen>
                                        <THGreen>ชื่อหนังสือ</THGreen>
                                        <THGreen>จำนวน</THGreen>
                                        <THGreen>ประเภท</THGreen>
                                        <THGreen>อื่น ๆ</THGreen>
                                    </TRGreen>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <TRGreen key={item._id}>
                                            <TDGreen>{item._id}</TDGreen>
                                            <TDGreen>{item.title}</TDGreen>
                                            <TDGreen>{item.quantity}</TDGreen>
                                            <TDGreen>{item.category}</TDGreen>
                                            <TDGreen>
                                                <div style={{display: 'flex'}}>
                                                    <Button
                                                        style={{ marginRight: '5px' }}
                                                        onClick={() => {props.history.push(`/detail/${item._id}/edit`)}}
                                                    ><RiEdit2Line /></Button>
                                                    <Button
                                                        delete
                                                        onClick={() => deleteHandler(item)}
                                                    ><RiDeleteBin5Line /></Button>
                                                </div>
                                            </TDGreen>
                                        </TRGreen>
                                    ))}
                                </tbody>
                            </TableGreen>
                        </div>
                    </Card>
                )}
            </ColContainer>

        </React.Fragment>
    )
}
