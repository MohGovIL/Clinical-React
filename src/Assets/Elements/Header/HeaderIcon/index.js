import React from 'react';
import StyledSearchIcon from './Style'
import styled from "styled-components";

const IconWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
`;



const HeaderIcon = (props) => {

    const onClickHandler = () => {
        if(props.onClick){
            props.onClick();
        }
    };

    return (
        <IconWrapper>
            <StyledSearchIcon alt={props.alt} src={props.img} onClick={onClickHandler} />
            {props.children}
        </IconWrapper>
    )
};

export default HeaderIcon;
