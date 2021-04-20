import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { saveShippingAddress } from './Redux/Actions/BasketActions';

const Container = styled.div`
    padding: 60px 150px;
    display: flex;
    justify-content: center;
    background-color: #f8f5f1;
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
    margin: 30px 0 80px;
    color: #4b778d;
`;
const Button = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    font-size: 1em;
    padding: 0.5em 2em;
    margin: ${props => props.continue ? "50px 0 30px" : "10px 0 30px"};
    border: solid 2px #28b5b5;
    width: 100%;
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: #8fd9a8;
        border: solid 2px #8fd9a8;
    }

    @media (max-width: 770px) {
        margin: 50px 0 30px;
        padding: 0.5em 2em;
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

export default function Shipping(props) {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const basket = useSelector(state => state.basket);
    const { userData } = userLogin;
    const { shippingAddress } = basket;

    if(!userData) {
        props.history.push('/login');
    }

    const [fullname, setFullname] = React.useState(shippingAddress.fullname);
    const [phoneNumber, setPhoneNumber] = React.useState(shippingAddress.phoneNumber);
    const [address, setAddress] = React.useState(shippingAddress.address);
    const [district, setDistrict] = React.useState(shippingAddress.district);
    const [province, setProvince] = React.useState(shippingAddress.province);
    const [postal, setPostal] = React.useState(shippingAddress.postal);
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullname, phoneNumber, address, district, province, postal}));
        props.history.push('/payment');
    };
    return (
        <React.Fragment>

            <Container>
                <Card>
                    <PageTitle>ที่อยู่ในการจัดส่ง</PageTitle>

                    <Form onSubmit={submitHandler}>
                        <div style={{width: '50%'}}>
                            <Label>ชื่อผู้รับ</Label>
                            <Input 
                                required
                                placeholder='กรอกชื่อจริงและชื่อสกุลของคุณ' 
                                type='text'
                                id='fullname'
                                name='fullname'
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            ></Input>

                            <Label>เบอร์โทรศัพท์</Label>
                            <Input 
                                required
                                placeholder='กรอกเบอร์โทรศัพท์ของคุณ' 
                                type='tel'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            ></Input>

                            <Label>ที่อยู่</Label>
                            <Input 
                                required
                                placeholder='กรอกที่อยู่ของคุณ' 
                                type='text'
                                id='adress'
                                name='adress'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></Input>

                            <Label>อำเภอ</Label>
                            <Input 
                                required
                                placeholder='กรอกอำเภอของคุณ' 
                                type='text'
                                id='district'
                                name='district'
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            ></Input>

                            <Label>จังหวัด</Label>
                            <Input 
                                required
                                placeholder='กรอกจังหวัดของคุณ' 
                                type='text'
                                id='province'
                                name='province'
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                            ></Input>

                            <Label>รหัสไปรษณีย์</Label>
                            <Input 
                                required
                                placeholder='กรอกรหัสไปรษณีย์ของคุณ' 
                                type='text'
                                id='postal'
                                name='postal'
                                value={postal}
                                onChange={(e) => setPostal(e.target.value)}
                            ></Input>

                            {/* <Label>ที่อยู่บนแผนที่</Label>
                            <Button>เปิดแผนที่</Button> */}
                            <Button continue type='submit'>ต่อไป</Button>
                        </div>
                    </Form>
                </Card>
            </Container>
            
        </React.Fragment>
    )
}
