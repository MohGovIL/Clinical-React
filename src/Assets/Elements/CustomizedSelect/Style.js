import styled from "styled-components";
import Select from "@material-ui/core/Select";
import React from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default styled((props) => <Select native {...props} IconComponent={ExpandMoreIcon}/>)`
  background-color: ${props => props.backgroundcolor ? props.backgroundcolor : null};
  border-radius: 15px;
  width: 100%;
  & .MuiSelect-icon {
    position: relative;
    color: ${props => props.iconColor ? props.iconColor : null}
  }
  ::before{
    border-bottom: none;
  }
`;
