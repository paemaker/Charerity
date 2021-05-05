import { PageTitle, RowContainer, Wrapper } from '../Components/Styles/Styled';
import { useDispatch, useSelector } from 'react-redux';

import Item from '../Components/Item';
import { Link } from 'react-router-dom';
import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import { listItems } from '../Components/Redux/Actions/ItemActions';
import styled from 'styled-components';
import { useParams } from 'react-router';

const PageTitles = styled(PageTitle)`
    text-align: center;
    background-color: #f8f5f1;
    margin: 0;
    padding: 15px 0 0;
`;
const DetailSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #f8ede3;
    padding: 0 20px;
`;
const Detail = styled.h3`
    color: #4b778d;
`;

export default function SearchResult() {
    const dispatch = useDispatch();
    const itemList = useSelector(state => state.itemList);
    const itemCategory = useSelector(state => state.itemCategory);
    const { loading, error, items } = itemList;
    const {
        loading: loadingCategory, 
        error: errorCategory, 
        categories 
    } = itemCategory;
    const { title = 'all', category = 'all' } = useParams();

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterTitle = filter.title || title;
        return `/search/category/${filterCategory}/title/${filterTitle}`;
    };

    React.useEffect(() => {
        dispatch(listItems({
            title: title !== 'all' ? title : '',
            category: category !== 'all' ? category : ''
        }));
    }, [dispatch, title, category]);

    return (
        <React.Fragment>

            {loading ? (
                <Wrapper>
                    <LoadingScreen />
                </Wrapper>) :
            error ? (
                <Wrapper>
                    <MessageScreen success={false}>{error}</MessageScreen>
                </Wrapper>) : 
            (
                <>
                    <PageTitles>ผลการค้นหา</PageTitles>
                    <DetailSection>
                        <Detail>พบหนังสือจำนวน {items.length} เล่ม</Detail>
                    </DetailSection>

                    <RowContainer>
                        {items.map(object => (
                            <Item key={object._id} object={object} />
                        ))}
                    </RowContainer>
                </>
            )}
            
        </React.Fragment>
    )
}
