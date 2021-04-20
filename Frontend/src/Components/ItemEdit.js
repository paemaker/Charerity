import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailItems, updateItem } from './Redux/Actions/ItemActions';
import LoadingScreen from './LoadingScreen';
import MessageScreen from './MessageScreen';
import { ITEM_UPDATE_RESET } from './Redux/Constants/AllConstants';
import axios from 'axios';

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
    font-size: 15px;
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
const BackButton = styled.button`
    cursor: pointer;
    color: #f8ede3;
    background-color: #28b5b5;
    border: solid 2px #28b5b5;
    width: 100px;
    padding: 10px;
    margin-bottom: 10px;
    transition: 0.5s;

    :hover {
        color: #ffffff;
        background-color: #8fd9a8;
        border: solid 2px #8fd9a8;
    }
`;

export default function ItemEdit(props) {
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
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

            <Container>
                <Link to='/itemlist'>
                    <BackButton>กลับ</BackButton>
                </Link>

                <Card>
                    {loadingUpdate &&
                        <div style={{margin: '10px 0 30px'}}>
                            <LoadingScreen />
                        </div>
                    }
                    {errorUpdate && 
                        <div style={{margin: '10px 0 30px'}}>
                            <MessageScreen color={false}>{errorUpdate}</MessageScreen>
                        </div>
                    }
                    {loading ? 
                        <LoadingScreen /> : 
                    error ? 
                        <MessageScreen color={false}>{error}</MessageScreen> : (

                        <>
                        <PageTitle>แก้ไขข้อมูล {itemId}</PageTitle>

                        <Form onSubmit={submitHandler}>
                            <div style={{width: '50%'}}>
                                <Label>ชื่อหนังสือ</Label>
                                <Input 
                                    placeholder='กรอกชื่อหนังสือของคุณ' 
                                    type='text'
                                    id='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></Input>

                                <Label>รายละเอียด</Label>
                                <Textarea
                                    rows='5'
                                    placeholder='กรอกรายละเอียดหนังสือของคุณ' 
                                    type='text'
                                    id='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Textarea>

                                <Label>รูปภาพ</Label>
                                <Input
                                    disabled
                                    placeholder='อัปโหลดรูปภาพหนังสือของคุณ' 
                                    type='text'
                                    id='image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Input>

                                <Label>อัปโหลดรูปภาพ</Label>
                                <Input
                                    type='file'
                                    id='imageFile'
                                    label='เลือกไฟล์'
                                    onChange={uploadFileHandler}
                                ></Input>

                                <Label></Label>
                                
                                <Label>ประเภท</Label>
                                <Input
                                    placeholder='กรอกประเภทหนังสือของคุณ' 
                                    type='text'
                                    id='category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Input>

                                <Label>ผู้เขียน</Label>
                                <Input
                                    placeholder='กรอกชื่อผู้เขียนหนังสือของคุณ' 
                                    type='text'
                                    id='writer'
                                    value={writer}
                                    onChange={(e) => setWriter(e.target.value)}
                                ></Input>

                                <Label>จำนวน</Label>
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
                        </>

                    )}
                </Card>
            </Container>

        </React.Fragment>
    )
}
