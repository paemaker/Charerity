import { Card, ColContainer, Form, Input, Label, PageTitle } from './Styles/Styled'
import { detailsUser, updateUser } from './Redux/Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { USER_UPDATE_RESET } from './Redux/Constants/AllConstants';
import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    font-size: ${props => props.register ? "1em" : "0.8em"};
    padding: ${props => props.register ? "0.5em 2em" : ""};
    margin: ${props => props.register ? "50px 0 30px" : ""};
    margin-left: ${props => props.register ? "" : "10px"};
    border: solid 2px #28b5b5;
    width: ${props => props.register ? "50%" : ""};
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: #8fd9a8;
        border: solid 2px #8fd9a8;
    }

    @media (max-width: 770px) {
        margin: ${props => props.register ? "50px 0 30px" : ""};
        padding: ${props => props.register ? "0.5em 2em;" : ""};
        margin-left: 0;
    }
`;
const CheckboxInput = styled.input`
    margin: 0 15px 0 0;
`;

export default function UserEdit(props) {
    const [fullname, setFullname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isGiver, setIsGiver] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, error, user } = userDetails;
    const { 
        loading: loadingUpdate,
        error: errorUpdate, 
        success: successUpdate 
    } = userUpdate;
    const userId = props.match.params.id;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            _id: userId,
            fullname,
            username,
            email,
            isGiver,
            isAdmin
        }));
    };

    React.useEffect(() => {
        if(successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET,
            });
            props.history.push('/userlist');
        }
        if(!user) {
            dispatch(detailsUser(userId));
        } else {
            setFullname(user.fullname);
            setUsername(user.username);
            setEmail(user.email);
            setIsGiver(user.isGiver);
            setIsAdmin(user.isAdmin);
        }
    } ,[dispatch, user, userId, successUpdate, userId, props.history]);

    return (
        <React.Fragment>
            
            <ColContainer>
                {loading && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>)}
                {error && (
                    <div style={{margin: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen>
                    </div>)}

                {loadingUpdate && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>)}
                {errorUpdate && (
                    <div style={{margin: '10px 0 30px'}}>
                        <MessageScreen success={false}>{errorUpdate}</MessageScreen>
                    </div>)}

                <Card width center>
                    <PageTitle>แก้ไขสถานะผู้ใช้</PageTitle>

                    <Form onSubmit={submitHandler}>
                        <div style={{width: '50%'}}>
                            <Label htmlFor='fullname'>ชื่อจริงและชื่อสกุล</Label>
                            <Input 
                                placeholder='กรอกชื่อจริงและชื่อสกุลของคุณ' 
                                type='text'
                                id='fullname'
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            ></Input>

                            <Label htmlFor='username'>ชื่อผู้ใช้</Label>
                            <Input
                                placeholder='กรอกชื่อผู้ใช้ของคุณ' 
                                type='text'
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            ></Input>

                            <Label htmlFor='email'>อีเมล</Label>
                            <Input 
                                placeholder='กรอกอีเมลของคุณ' 
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>
                            
                            <CheckboxInput 
                                type='checkbox'
                                id='isGiver'
                                checked={isGiver}
                                onChange={(e) => setIsGiver(e.target.checked)}
                            ></CheckboxInput>
                            <Label htmlFor='isGiver'>ผู้บริจาค</Label>

                            <CheckboxInput
                                type='checkbox'
                                id='isAdmin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                style={{marginLeft: '20px'}}
                            ></CheckboxInput>
                            <Label htmlFor='isAdmin'>แอดมิน</Label>
                        </div>

                        <Button register type="submit">
                            ยืนยัน
                        </Button>
                    </Form>

                </Card>
            </ColContainer>

        </React.Fragment>
    )
}
