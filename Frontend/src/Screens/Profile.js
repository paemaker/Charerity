import { Button, Card, ColContainer, Form, Input, Label, PageTitle } from '../Components/Styles/Styled';
import { detailsUser, updateUserProfile } from '../Components/Redux/Actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import { USER_UPDATE_PROFILE_RESET } from '../Components/Redux/Constants/AllConstants';
import axios from 'axios';
import styled from 'styled-components';

const Buttons = styled(Button)`
    width: 50%;
    margin: 30px 0 50px;
`;
const Textarea = styled.textarea`
    font-size: 17px;
    box-sizing: border-box;
    padding: 0.5rem 0.5rem;
    margin: 10px 0;
    border: solid 2px #28b5b5;
    border-radius: 3px;
    width: 100%;
    resize: vertical;
    color: #4b778d;
    background-color: #f8f5f1;
    transition: 0.5s;

    :focus {
        border: solid 2px #d2e69c;
    }
`;

export default function Profile() {
    const [fullname, setFullname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [giverUsername, setGiverUsername] = React.useState('');
    const [giverLogo, setGiverLogo] = React.useState('');
    const [giverDescription, setGiverDescription] = React.useState('');
    const [haveUsername, setHaveUsername] = React.useState(false);
    const [loadingUpload, setLoadingUpload] = React.useState(false);
    const [errorUpload, setErrorUpload] = React.useState('');
    const [image, setImage] = React.useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const userDetails = useSelector(state => state.userDetails);
    const userProfileUpdate = useSelector(state => state.userProfileUpdate);
    const { userData } = userLogin;
    const { loading, error, user } = userDetails;
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, } = userProfileUpdate;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const Formdata = new FormData();

        Formdata.append('image', file);
        setLoadingUpload(true);

        try {
            const { data } = await axios.post('/api/uploads', Formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userData.token}`,
                }
            });
            setImage(data);
            setLoadingUpload(false);
        } catch(error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };

    const usernameCheck = (e) => {
        setGiverUsername(e.target.value);
        setHaveUsername(true);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('รหัสทั้งสองไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                fullname,
                email,
                password,
                giverUsername,
                giverLogo,
                giverDescription,
                haveUsername,
            }));
        };
    };

    React.useEffect(() => {
        if(!user) {
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            });
            dispatch(detailsUser(userData._id));
        } else {
            setFullname(user.fullname);
            setEmail(user.email);
            setHaveUsername(user.haveUsername);
            if(user.giver) {
                setGiverUsername(user.giver.username);
                setGiverLogo(user.giver.logo);
                setGiverDescription(user.giver.description);
            }
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
                                {userData.isGiver && (
                                    <>
                                        <Label>ผู้บริจาค</Label>
                                        <div style={{border:'solid 2px #28b5b5', padding: '10px', borderRadius: '10px', marginTop: '10px'}}>
                                            <Label htmlFor='giverUsername'>ชื่อผู้ใช้</Label>
                                            <Input 
                                                placeholder='กรอกชื่อในการบริจาคของคุณ' 
                                                type='text'
                                                id='giverUsername'
                                                value={giverUsername}
                                                onChange={(e) => usernameCheck(e)}
                                            ></Input>

                                            <Label htmlFor='image'>โลโก้</Label>
                                            <Input
                                                disabled
                                                placeholder='อัปโหลดรูปภาพ'
                                                type='text'
                                                id='image'
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                style={{margin: '0'}}
                                            ></Input>
                                            <Input 
                                                type='file'
                                                accept='image/*'
                                                id='imageFile'
                                                label='เลือกไฟล์'
                                                onChange={uploadFileHandler}
                                                style={{margin: '0', margin: '10px 0'}}
                                            ></Input>

                                            <Label htmlFor='giverDescription'>รายละเอียดผู้บริจาค</Label>
                                            <Textarea
                                                rows='5'
                                                placeholder='กรอกรายละเอียดผู้บริจาค' 
                                                type='text'
                                                id='giverDescription'
                                                value={giverDescription}
                                                onChange={(e) => setGiverDescription(e.target.value)}
                                            ></Textarea>
                                        </div>
                                    </>
                                )}
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
