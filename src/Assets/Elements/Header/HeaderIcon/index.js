import React from 'react';
import StyledSearchIcon from './Style'
import styled from "styled-components";

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


const HeaderIcon = ({onClick, alt, img,}) => {

    const onClickHandler = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <IconWrapper>
            <StyledSearchIcon alt={alt} src={img} onClick={onClickHandler}/>
        </IconWrapper>
    )
};

export default HeaderIcon;
