import { Card, ColContainer, Form, Input, Label, PageTitle } from '../Components/Styles/Styled'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import { loginUser } from '../Components/Redux/Actions/UserActions';
import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    font-size: ${props => props.login ? "1em" : "0.8em"};
    padding: ${props => props.login ? "0.5em 2em" : ""};
    margin: ${props => props.login ? "50px 0 30px" : ""};
    margin-left: ${props => props.login ? "" : "10px"};
    border: solid 2px #28b5b5;
    width: ${props => props.login ? "50%" : ""};
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: #8fd9a8;
        border: solid 2px #8fd9a8;
    }

    @media (max-width: 770px) {
        margin: ${props => props.login ? "50px 0 30px" : ""};
        padding: ${props => props.login ? "0.5em 2em;" : ""};
        margin-left: 0;
    }
`;

export default function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userData } = userLogin;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password))
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
                    <PageTitle>เข้าสู่ระบบ</PageTitle>

                    <Form onSubmit={submitHandler}>
                        <div style={{width: '50%'}}>
                            <Label htmlFor='email'>อีเมล</Label>
                            <Input 
                                required
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

                            <Label>ยังไม่มีบัญชีเหรอ?
                                <Link 
                                    style={{textDecoration: 'none', color: '#4b778d'}}
                                    to={`/register?redirect=${redirect}`}
                                >
                                    <Button>สมัครสมาชิก</Button>
                                </Link>
                            </Label>
                        </div>

                        <Button login type='submit'>
                            เข้าสู่ระบบ
                        </Button>
                    </Form>

                </Card>
            </ColContainer>

        </React.Fragment>
    )
}
