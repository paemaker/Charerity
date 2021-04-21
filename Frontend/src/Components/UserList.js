import { Card, ColContainer, PageTitle, TDGreen, THGreen, TRGreen, TableGreen } from './Styles/Styled'
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import { deleteUser, listUsers } from './Redux/Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { USER_DETAILS_RESET } from './Redux/Constants/AllConstants';
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

export default function UserList(props) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const userDelete = useSelector(state => state.userDelete);
    const { loading, error, users } = userList;
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

    const deleteHandler = (user) => {
        if(window.confirm(`ต้องการลบบัญชี "${user.fullname}" หรือไม่?`)) {
            dispatch(deleteUser(user._id));
        };
    };

    React.useEffect(() => {
        dispatch(listUsers());
        dispatch({
            type: USER_DETAILS_RESET
        });
    }, [dispatch, successDelete]);

    return (
        <React.Fragment>
            
            <ColContainer>

                {loadingDelete && (
                    <div style={{padding: '10px 0 30px'}}>
                    <LoadingScreen />
                    </div>
                )}
                {errorDelete && (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen success={false}>{errorDelete}</MessageScreen> 
                    </div>
                )}

                {successDelete && (
                <div style={{padding: '10px 10px 30px'}}>
                    <MessageScreen success={true}>บัญชีผู้ใช้ถูกลบแล้ว</MessageScreen> 
                </div>
                )}

                {loading ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                ) : error ? (
                    <div style={{padding: '10px 10px 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen> 
                    </div>
                ) : (

                    <Card width center>
                        <PageTitle>บัญชีผู้ใช้งาน</PageTitle>
                        <div>
                            <TableGreen>
                                <thead>
                                    <TRGreen>
                                        <THGreen>หมายเลขผู้ใช้</THGreen>
                                        <THGreen>ชื่อผุ้ใช้</THGreen>
                                        <THGreen>อีเมล</THGreen>
                                        <THGreen>ผู้บริจาค</THGreen>
                                        <THGreen>แอดมิน</THGreen>
                                        <THGreen>อื่น</THGreen>
                                    </TRGreen>
                                </thead>
                                <tbody>
                                    {users.map(object => (
                                        <TRGreen key={object._id}>
                                            <TDGreen>{object._id}</TDGreen>
                                            <TDGreen>{object.fullname}</TDGreen>
                                            <TDGreen>{object.email}</TDGreen>
                                            <TDGreen>{object.isGiver ? "ใช่" : "ไม่ใช่"}</TDGreen>
                                            <TDGreen>{object.isAdmin ? "ใช่" : "ไม่ใช่"}</TDGreen>                                                
                                            <TDGreen>
                                                <div style={{display: 'flex'}}>
                                                    <Button 
                                                        style={{ marginRight: '5px' }}
                                                        onClick={() => {props.history.push(`/user/${object._id}/edit`)}}
                                                    ><RiEdit2Line /></Button>
                                                    <Button
                                                        delete
                                                        onClick={() => deleteHandler(object)}
                                                    ><RiDeleteBin5Line />
                                                    </Button>
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
