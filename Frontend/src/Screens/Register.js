import { Card, ColContainer, Form, Input, Label, PageTitle } from '../Components/Styles/Styled'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import { registerUser } from '../Components/Redux/Actions/UserActions';
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

export default function Register(props) {
    const [fullname, setFullname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { userData, loading, error } = userRegister;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('รหัสทั้งสองไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
        } else {
            dispatch(registerUser(fullname, email, password))
        }
    };

    React.useEffect(() => {
        if(userData) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userData]); 

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

                <Card width center>
                    <PageTitle>สมัครสมาชิก</PageTitle>

                    <Form onSubmit={submitHandler}>
                        <div style={{width: '50%'}}>
                            <Label htmlFor='fullname'>ชื่อจริงและชื่อสกุล</Label>
                            <Input 
                                required
                                placeholder='กรอกชื่อจริงและชื่อสกุลของคุณ' 
                                type='text'
                                id='fullname'
                                onChange={(e) => setFullname(e.target.value)}
                            ></Input>

                            <Label htmlFor='email'>อีเมล</Label>
                            <Input 
                                require
                                placeholder='กรอกอีเมลของคุณ' 
                                type='email'
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>
                            
                            <Label htmlFor='password'>รหัสผ่าน</Label>
                            <Input 
                                required
                                placeholder='กรอกรหัสผ่านของคุณ' 
                                type='password'
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                            ></Input>

                            <Label htmlFor='confirm-password'>ยืนยันรหัสผ่าน</Label>
                            <Input 
                                required
                                placeholder='กรอกรหัสผ่านของคุณอีกครั้ง' 
                                type='password'
                                id='confirm-password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Input>

                            <Label>มีบัญชีแล้วเหรอ?
                                <Link 
                                    style={{marginLeft: '10px'}}
                                    to={`/login?redirect=${redirect}`}
                                >
                                    <Button>เข้าสู่ระบบ</Button>
                                </Link>
                            </Label>
                        </div>

                        <Button register type="submit">
                            สมัครสมาชิก
                        </Button>
                    </Form>

                </Card>
            </ColContainer>
            
        </React.Fragment>
    )
}
