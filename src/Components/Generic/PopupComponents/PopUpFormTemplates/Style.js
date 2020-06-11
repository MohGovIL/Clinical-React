import styled from 'styled-components';

import ListItemText from '@material-ui/core/ListItemText';

import { ListItem, TextareaAutosize } from '@material-ui/core';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import React from 'react';

export const CustomizedPaper = styled.div`
  width: 100%;
  height: 614px;
  border-radius: 10px;
  background-color: #f9faff;
`;
export const CustomizedPaperBlocked = styled.div`
  width: 100%;
  height: 78%;
  border-radius: 10px;
  background-color: #f9faff;
  overflow-y: auto;
  display: inline-block;
  margin-top: 30%;
`;

export const CustomizedPaperFooter = styled.div`
  width: 46%;
  height: 83px;
  border-radius: 10px;
  box-shadow: 0 -4px 25px 6px rgba(151, 151, 152, 0.09);
  background-color: #fafbff;
  position: absolute;
  margin-top: -2%;
  z-index: 9999;
`;
export const CustomizedPaperHeader = styled.div`
  width: 100%;
  height: 30px;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: ${(props) =>
    props.languageDirection === 'ltr' ? 'left' : 'right'};
  color: #00094a;
`;
export const StyledListItemText = styled(ListItemText)`
  min-width: 186px;
  max-width: 233px;
  height: 22px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #00094a;
  text-align: ${(props) =>
    props.languageDirection === 'ltr' ? 'left' : 'right'};
`;
export const StyledCheckAll = styled.div`
  margin: 89px 63px;
  position: absolute;
`;
export const SearchTemplates = styled.div`
  z-index: 99999999;
  position: absolute;
  width: 366px;
  max-height: 43px;
  border-radius: 23px;
  border: solid 1px rgba(0, 11, 64, 0.4);
  background-color: #ffffff;
  margin-right: 43px;
  border-radius: 23px;
  border: solid 1px rgba(0, 11, 64, 0.4);
  margin-top: 40px;
  img {
    position: absolute;
    margin: 0.5% -3%;
  }
  input {
    background-color: transparent;
    padding: 6px 10px 6px;
    margin: 0px 11px;
    width: 83%;
    color: #00094a;
    border: none;
    outline: none;
  }
  .MuiListItemIcon-alignItemsFlexStart {
    margin-top: -5px;
  }
`;
export const StyledListItem = styled(ListItem)`
  width: 366px;
  min-height: 56px;
  border-radius: 10px;
  box-shadow: 0 0 10px 8px rgba(152, 151, 151, 0.05);
  background-color: #ffffff;
  margin-right: 43px;
  margin-bottom: 10px;
`;
export const StyledList = styled(List)`
  padding-bottom: 8px;
  .MuiListItemText-root.MuiListItemText-dense {
    height: auto;
  }
`;
export const SearchInput = styled.input``;

export const StyledRoundButton = styled(Button)`
  min-width: 56px;
  min-height: 56px;
  box-shadow: 0 2px 4px 0 rgba(152, 151, 151, 0.15);
  background-color: #076ce9;
  border-radius: 27px;
  position: absolute;
  margin-right: 45.7%;
  margin-left: 45.7%;
  margin-top: 31%;
  img {
    object-fit: contain;
    margin-right: 0px;
    margin-left: 0px;
  }
`;

export const StyledSaveButton = styled(Button)`
  width: 127px;
  height: 32px;
  border-radius: 25px;
  background-color: #002398;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  float: left;
  top: 26px;
`;

export const StyledCheckAllLabel = styled.span`
  width: 55px;
  height: 22px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000662;
`;

export const StyledGridClean = styled.span`
  height: 22px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #000755;
  margin-top: 55px;
  margin-right: 182px;
  img {
    object-fit: contain;
    margin-right: -24px;
    margin-left: -4px;
    margin-top: 0px;
    position: absolute;
  }
`;
export const StyledGridChoosen = styled.span`
  height: 22px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  color: #000b40;
  margin-top: 55px;
  margin-right: 90px;
`;
export const StyledContextTextArea = styled(TextareaAutosize)`
  height: 554px !important;
  width: 90%;
  max-width: 383px;
  max-height: 554px;
  background: transparent;
  margin: 4% 7%;
  overflow-y: auto !important;
  border: none;
  resize: none;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
  :focus {
    outline: none;
  }
`;
