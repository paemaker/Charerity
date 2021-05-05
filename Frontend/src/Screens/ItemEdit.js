import { Card, ColContainer, Form, Input, Label, PageTitle } from '../Components/Styles/Styled'
import { detailItems, updateItem } from '../Components/Redux/Actions/ItemActions';
import { useDispatch, useSelector } from 'react-redux';

import CategoryList from '../Components/CategoryList';
import { ITEM_UPDATE_RESET } from '../Components/Redux/Constants/AllConstants';
import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react'
import Select from 'react-select';
import axios from 'axios';
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
const Textarea = styled.textarea`
    font-size: 17px;
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
const Selector = styled(Select)`
    font-size: 15px;
    box-sizing: border-box;
    padding: 10px;
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

export default function ItemEdit(props) {
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState([]);
    const [writer, setWriter] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [loadingUpload, setLoadingUpload] = React.useState(false);
    const [errorUpload, setErrorUpload] = React.useState('');

    const itemDetails = useSelector(state => state.itemDetails);
    const itemUpdate = useSelector(state => state.itemUpdate);
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, item } = itemDetails;
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = itemUpdate;
    const itemId = props.match.params.id;
    const dispatch = useDispatch();

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const Formdata = new FormData();

        Formdata.append('image', file);
        setLoadingUpload(true);

        try {
            const { data } = await axios.post('/api/uploads', Formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userLogin.userData.token}`,
                }
            });
            setImage(data);
            setLoadingUpload(false);
        } catch(error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateItem({
            _id: itemId,
            title,
            image,
            description,
            category,
            writer,
            quantity
        }));
    };

    React.useEffect(() => {
        if(successUpdate) {
            dispatch({
                type: ITEM_UPDATE_RESET
            });
            props.history.push('/itemlist');
        }

        if(!item || item._id !== itemId) {
            dispatch(detailItems(itemId));
        } else {
            setTitle(item.title);
            setImage(item.image);
            setDescription(item.description);
            setCategory(item.category);
            setWriter(item.writer);
            setQuantity(item.quantity);
        }
    }, [item, dispatch, itemId, successUpdate, props.history]);

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

                {loading ? (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen /> 
                    </div>) : 
                error ? (
                    <div style={{margin: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen>
                    </div>) : (

                    <>
                        <PageTitle>แก้ไขข้อมูล {itemId}</PageTitle>
                        <Card width center>

                            <Form onSubmit={submitHandler}>
                                <div style={{width: '50%'}}>
                                    <Label htmlFor='title'>ชื่อหนังสือ</Label>
                                    <Input 
                                        placeholder='กรอกชื่อหนังสือของคุณ' 
                                        type='text'
                                        id='title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></Input>

                                    <Label htmlFor='description'>รายละเอียด</Label>
                                    <Textarea
                                        rows='5'
                                        placeholder='กรอกรายละเอียดหนังสือของคุณ' 
                                        type='text'
                                        id='description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></Textarea>

                                    <Label htmlFor='image'>รูปภาพ</Label>
                                    <div style={{border:'solid 2px #28b5b5', padding: '10px', borderRadius: '10px', marginTop: '10px'}}>
                                        <Input
                                            disabled
                                            placeholder='อัปโหลดรูปภาพหนังสือของคุณ' 
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
                                            style={{margin: '0', marginTop: '10px'}}
                                        ></Input>
                                    </div>
                                    
                                    <Label htmlFor='category'>ประเภท</Label>
                                    <Selector
                                        isMulti
                                        id='category'
                                        options={CategoryList}
                                        value={category}
                                        onChange={setCategory}
                                    />

                                    <Label htmlFor='writer'>ผู้เขียน</Label>
                                    <Input
                                        placeholder='กรอกชื่อผู้เขียนหนังสือของคุณ' 
                                        type='text'
                                        id='writer'
                                        value={writer}
                                        onChange={(e) => setWriter(e.target.value)}
                                    ></Input>

                                    <Label htmlFor='quantity'>จำนวน</Label>
                                    <Input
                                        placeholder='กรอกจำนวนหนังสือของคุณ' 
                                        type='text'
                                        id='quantity'
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    ></Input>
                                </div>

                                <Button register type='submit'>
                                    แก้ไขข้อมูล
                                </Button>
                            </Form>
                        </Card>
                    </>

                )}
            </ColContainer>

        </React.Fragment>
    )
}
