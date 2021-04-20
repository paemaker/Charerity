import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from './Redux/Actions/UserActions';
import styled from 'styled-components';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen'
import { USER_UPDATE_RESET } from './Redux/Constants/AllConstants';

const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    justify-content: center;
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
    margin: 30px 0 30px;
    color: #4b778d;
`;
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

export default function Profile() {
    const [fullname, setFullname] = React.useState('');
    const [username, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const userDetails = useSelector(state => state.userDetails);
    const userUpdate = useSelector(state => state.userUpdate);
    const { userData } = userLogin;
    const { loading, error, user } = userDetails;
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate, } = userUpdate;

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('รหัสทั้งสองไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
        } else {
            dispatch(updateUser({
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
                type: USER_UPDATE_RESET
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
            <Container>
                <Card>
                    <PageTitle>แก้ไขข้อมูลส่วนตัว</PageTitle>
                    {loading ? (
                            <div style={{margin: '10px 0 30px'}}>
                                <LoadingScreen />
                            </div>
                        ) : error ? (
                            <div style={{padding: '10px 10px 30px'}}>
                                <MessageScreen color={false}>{error}</MessageScreen> 
                            </div>
                        ) : (

                            <React.Fragment>
                                    {loadingUpdate && 
                                    <div style={{margin: '10px 0 30px'}}>
                                        <LoadingScreen />
                                    </div>}
                                    
                                    {errorUpdate && 
                                        <div style={{margin: '10px 0 30px'}}>
                                            <MessageScreen color={false}>{errorUpdate}</MessageScreen>
                                        </div>}
                                    {successUpdate && 
                                        <div style={{padding: '10px 10px 30px'}}>
                                            <MessageScreen color={true}>แก้ไขข้อมูลเสร็จสิ้น</MessageScreen> 
                                        </div>}

                                <Form onSubmit={submitHandler}>
                                <div style={{width: '50%'}}>
                                    <Label>ชื่อจริงและชื่อสกุล</Label>
                                    <Input 
                                        placeholder='กรอกชื่อจริงและชื่อสกุลของคุณ' 
                                        type='text'
                                        id='fullname'
                                        name='fullname'
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    ></Input>

                                    <Label>ชื่อผู้ใช้</Label>
                                    <Input
                                        placeholder='กรอกชื่อผู้ใช้ของคุณ' 
                                        type='text'
                                        id='username'
                                        name='username'
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                    ></Input>

                                    <Label>อีเมล</Label>
                                    <Input 
                                        require
                                        placeholder='กรอกอีเมลของคุณ' 
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Input>
                                    
                                    <Label>รหัสผ่าน</Label>
                                    <Input 
                                        placeholder='กรอกรหัสผ่านของคุณ' 
                                        type='password'
                                        id='password'
                                        name='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></Input>

                                    <Label>ยืนยันรหัสผ่าน</Label>
                                    <Input 
                                        placeholder='กรอกรหัสผ่านของคุณอีกครั้ง' 
                                        type='password'
                                        id='confirm-password'
                                        name='confirm-password'
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    ></Input>
                                </div>

                                <Button register type="submit">
                                    แก้ไข
                                </Button>
                            </Form>
                        </React.Fragment>

                    )}
                </Card>
            </Container>

        </React.Fragment>
    )
}
