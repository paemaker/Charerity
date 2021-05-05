import { BreadLi, BreadUl, Breadcrumb, ColContainer, DetailCard, ImageSection, Img, PageTitle, RowContainer } from '../Components/Styles/Styled'
import { useDispatch, useSelector } from 'react-redux';

import Item from '../Components/Item';
import LoadingScreen from '../Components/LoadingScreen';
import MessageScreen from '../Components/MessageScreen';
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { detailsUser } from '../Components/Redux/Actions/UserActions';
import { listItems } from '../Components/Redux/Actions/ItemActions';
import styled from 'styled-components';

const DetailSection = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
`;
const Description = styled.div`
    width: auto;
    height: auto;
    max-height: 200px;
    overflow: scroll;
`;
const ItemsSection = styled.div`
    padding: 15px;
`;
const ShowItem = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow: scroll;
    background-color: #f8f5f1;
`;

export default function Giver(props) {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const itemList = useSelector(state => state.itemList);
    const { loading, error, user } = userDetails;
    const { loading: loadingList, error: errorList, items } = itemList;
    const giverId = props.match.params.id;

    React.useEffect(() => {
        dispatch(detailsUser(giverId));
        dispatch(listItems({
            giver: giverId,
        }));
    }, [dispatch, giverId]);
    return (
        <React.Fragment>

            <ColContainer>
                {loading ? (
                    <div style={{margin: '10px 0 30px'}}>
                        <LoadingScreen />
                    </div>
                ) : error ? (
                    <div style={{padding: '10px 0 30px'}}>
                        <MessageScreen success={false}>{error}</MessageScreen> 
                    </div>
                ) : (
                    <>
                        <DetailCard giver>
                            <DetailSection>
                                <PageTitle>{user.giver.username}</PageTitle>
                                <ImageSection>
                                    <Img src={user.giver.logo} alt={user.giver.username} />
                                </ImageSection>

                                <ReactStars 
                                    value={user.giver.rating} 
                                    size={30}
                                />

                                <div>
                                    <a href={`mailto:${user.email}`}>ติดต่อผู้บริจาค (อีเมล)</a>
                                    <Description>{user.giver.description}</Description>
                                </div>
                            </DetailSection>

                            <ItemsSection>
                                {loadingList ? (
                                    <LoadingScreen />
                                ) : errorList ? (
                                    <MessageScreen success={false}>{errorList}</MessageScreen>
                                ) : (
                                    <>
                                        {items === 0 && (
                                            <MessageScreen success={false}>ไม่พบหนังสือ</MessageScreen>
                                        )}
                                        <ShowItem>
                                            {items.map((object) => (
                                                <Item key={object._id} object={object} />
                                            ))}
                                        </ShowItem>
                                    </>
                                )}
                            </ItemsSection>
                        </DetailCard>
                    </>
                )}
            </ColContainer>
            
        </React.Fragment>
    )
}
