import { ITEM_CREATE_RESET, ITEM_DELETE_RESET } from './Redux/Constants/AllConstants';
import { RiAddBoxLine, RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import { createItem, deleteItem, listItems } from './Redux/Actions/ItemActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f5f1;
`;
const Card = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: solid 1px #28b5b5;
    background-color: #f8f5f1;
    box-sizing: border-box;
    width: 1000px;
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
const PageTitle = styled.h1`
    text-transform: uppercase;
    margin: 30px 0 10px;
    color: #4b778d;
`;
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
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin: 0 0 30px;
`;
const TR = styled.tr`
    border: 1px solid #28b5b5;
    color: #4b778d;

    :nth-child(even) {
        background-color: #f8f5f1;
    }

    :hover {
        background-color: #d8f8b7;
    }
`;
const TD = styled.td`
    border: 1px solid #28b5b5;
    color: #4b778d;
    text-align: left;
    padding: 8px;
    text-align: center;
`;
const TH = styled.th`
    background-color: #28b5b5;
    border: 1px solid #28b5b5;
    color: #f8f5f1;
    text-align: left;
    padding: 8px;
    text-align: center;
`;

export default function ItemList(props) {
    const dispatch = useDispatch();
    const itemList = useSelector(state => state.itemList);
    const itemCreate = useSelector(state => state.itemCreate);
    const itemDelete = useSelector(state => state.itemDelete);
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

        dispatch(listItems());
    }, [dispatch, createdItem, props.history, successCreate, successDelete]);

    return (
        <React.Fragment>

            <Container>

                {loadingDelete && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                )}
                {errorDelete && (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen color={false}>{errorDelete}</MessageScreen> 
                    </div>
                )}
                
                {loadingCreate && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                )}
                {errorCreate && (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen color={false}>{errorCreate}</MessageScreen> 
                    </div>
                )}
                <Card>
                    <PageTitle>รายการหนังสือ</PageTitle>
                    <div>
                        <AddButton onClick={addHandler}><RiAddBoxLine /></AddButton>
                    </div>

                    {loading ? (
                            <div style={{margin: '10px 0 30px'}}>
                                <LoadingScreen />
                            </div>
                        ) : error ? (
                            <div style={{padding: '10px 10px 30px'}}>
                                <MessageScreen color={false}>{error}</MessageScreen> 
                            </div>
                        ) : (
                            <div>
                                <Table>
                                    <thead>
                                        <TR>
                                            <TH>รหัสหนังสือ</TH>
                                            <TH>วันที่รับบริจาค</TH>
                                            <TH>จำนวน</TH>
                                            <TH>ประเภท</TH>
                                            <TH>อื่น ๆ</TH>
                                        </TR>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <TR key={item._id}>
                                                <TD>{item._id}</TD>
                                                <TD>{item.title}</TD>
                                                <TD>{item.quantity}</TD>
                                                <TD>{item.category}</TD>
                                                <TD>
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
                                                </TD>
                                            </TR>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    }
                </Card>
            </Container>

        </React.Fragment>
    )
}
