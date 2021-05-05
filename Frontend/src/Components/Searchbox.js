import { Button, Input } from './Styles/Styled';

import { CgSearch } from 'react-icons/cg';
import React from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
    display: flex;
    flex-flow: rows wrap;
    background-color: #f8f5f1;
    width: 30%;
`;
const SearchInput = styled(Input)`
    border: solid 1px #28b5b5;
    border-radius: 0;

    :focus {
        border: solid 1px #d2e69c;
    }
`;
const SearchButton = styled(Button)`
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 50px;
    border: solid 1px #28b5b5;
    background-color: #f8f5f1;
    color: #28b5b5;
`;

export default function Searchbox(props) {
    const [title, setTitle] = React.useState('');

    const submitHandler = () => {
        props.history.push(`/search/title/${title}`);
    };

    return (
        <React.Fragment>
            
            <SearchForm onSubmit={submitHandler}>
                <SearchInput
                    placeholder='ค้นหาเลย'
                    type='text'
                    name='title'
                    id='title'
                    onChange={(e) => setTitle(e.target.value)}
                ></SearchInput>
                <SearchButton type='submit'><CgSearch /></SearchButton>
            </SearchForm>

        </React.Fragment>
    )
}
