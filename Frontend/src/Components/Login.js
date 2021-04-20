import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import React from 'react';
import { loginUser } from './Redux/Actions/UserActions';
import styled from 'styled-components';

const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    background-color: #f8f5f1;

    @media (max-width: 770px) {
        padding: 0;
        height: 100vh;
    }
`;
const Card = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border: solid 1px #28b5b5;
    width: 1000px;
    transition: 0.5s;
    background-color: #f8f5f1;

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
    margin: 30px 0 50px;
    color: #4b778d;
`;
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
const Input = styled.input`
    font-size: 1em;
    box-sizing: border-box;
    padding: 0.5rem 0.5rem;
    margin: 10px 0;
    border: solid 2px #28b5b5;
    border-radius: 3px;
    width: 100%;
    color: #4b778d;
    background-color: #f8f5f1;
    transition: 0.5s;
    
    :focus {
        border: solid 2px #d2e69c;
    }

`;
const Label = styled.h3`
    margin: 0;
    color: #4b778d;
`;
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

            <Container>
                <Card>

                {loading && (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                )}
                {error && (
                    <div style={{margin: '10px 0 30px'}}>
                        <MessageScreen color={false}>{error}</MessageScreen>
                    </div>
                )}

                    <PageTitle>เข้าสู่ระบบ</PageTitle>

                    <Form onSubmit={submitHandler}>
                        <div style={{width: '50%'}}>
                            <Label>อีเมล</Label>
                            <Input 
                                required
                                placeholder='กรอกอีเมลของคุณ' 
                                type='email'
                                id='email'
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>

                            <Label>รหัสผ่าน</Label>
                            <Input
                                required
                                placeholder='กรอกรหัสผ่านของคุณ' 
                                type='password'
                                id='password'
                                name='password'
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
            </Container>

        </React.Fragment>
    )
}
