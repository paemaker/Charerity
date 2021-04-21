import { Button, Card, ColContainer, Form, Input, Label, PageTitle } from './Styles/Styled';
import { detailsUser, updateUserProfile } from './Redux/Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen'
import React from 'react';
import { USER_UPDATE_PROFILE_RESET } from './Redux/Constants/AllConstants';
import styled from 'styled-components';

const Buttons = styled(Button)`
    width: 50%;
    margin: 30px 0 50px;
`;

export default function Profile() {
    const [fullname, setFullname] = React.useState('');
    const [username, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const userDetails = useSelector(state => state.userDetails);
    const userProfileUpdate = useSelector(state => state.userProfileUpdate);
    const { userData } = userLogin;
    const { loading, error, user } = userDetails;
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, } = userProfileUpdate;

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('รหัสทั้งสองไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                fullname,
                username,
                email,
                password
            }))
        }
    };

    React.useEffect(() => {
        if(!user) {
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            });
            dispatch(detailsUser(userData._id));
        } else {
            setFullname(user.fullname);
            setUserName(user.username);
            setEmail(user.email);
        }
    }, [dispatch, userData._id, user]);

    return (
        <React.Fragment>

            <ColContainer>
                {loadingUpdate && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>)}
                    
                {errorUpdate && (
                    <div style={{margin: '10px 0 30px'}}>
                        <MessageScreen success={false}>{errorUpdate}</MessageScreen>
                    </div>)}

                {successUpdate && (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={true}>แก้ไขข้อมูลเสร็จสิ้น</MessageScreen> 
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
                        <PageTitle>แก้ไขข้อมูลส่วนตัว</PageTitle>
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
                                    onChange={(e) => setUserName(e.target.value)}
                                ></Input>

                                <Label htmlFor='email'>อีเมล</Label>
                                <Input 
                                    require
                                    placeholder='กรอกอีเมลของคุณ' 
                                    type='email'
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Input>
                                
                                <Label htmlFor='password'>รหัสผ่าน</Label>
                                <Input 
                                    placeholder='กรอกรหัสผ่านของคุณ' 
                                    type='password'
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Input>

                                <Label htmlFor='confirm-password'>ยืนยันรหัสผ่าน</Label>
                                <Input 
                                    placeholder='กรอกรหัสผ่านของคุณอีกครั้ง' 
                                    type='password'
                                    id='confirm-password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Input>
                            </div>

                            <Buttons type="submit">
                                แก้ไข
                            </Buttons>
                        </Form>
                    </Card>

                )}
            </ColContainer>

        </React.Fragment>
    )
}
