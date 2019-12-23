import React, {useEffect} from 'react';
import SearchPNG from '../../Images/search.png';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 246px;
  height: 46px;
  border-radius: 23px;
  border: solid 1px #b6b6b6;
  background-color: #ffffff;
`;

const Input = styled.input`
  margin-right: 33px;
  direction: rtl;
  border: none;
  font-size: 13px;
  height: 18px;
  outline-style: none;
  font-weight: bold;
  color: #727a85;
`;

const SearchImg = styled.img`
  margin-left: 33px;
  height: 24px;
  min-width: 24px;
  object-fit: contain;
`;

const Search = (props) => {
    useEffect(() => {
        document.addEventListener('keypress', keyDownHandler);
    }, []);

    const keyDownHandler = (e) => {
        if(e.key==="Enter"){

        }
        console.log(e);
    };

    return (
        <Wrapper>
            <Input placeholder={props.placeholder}/>
            <SearchImg src={SearchPNG}/>
        </Wrapper>
    );
};

export default Search;
