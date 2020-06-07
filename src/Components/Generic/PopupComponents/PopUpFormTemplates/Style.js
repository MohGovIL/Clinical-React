import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';

export const CustomizedPaper =styled.div`
  width: 100%;
  height: 614px;
  border-radius: 10px;
  background-color: #f9faff;
`;


export const CustomizedPaperFooter =styled.div`
  width: 100%;
  height: 83px;
  border-radius: 10px;
  box-shadow: 0 -4px 25px 6px rgba(151, 151, 152, 0.09);
  background-color: #fafbff;
`;
export const CustomizedPaperHeader =styled.div`
  width: 100%;
  height: 30px;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: ${(props) =>  props.languageDirection === 'ltr' ? 'left' : 'right'};
  color: #00094a;
`;
export const StyledListItemText =styled(ListItemText)`
  min-width: 186px;
  max-width:233px
  height: 22px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #00094a;
  text-align: ${(props) =>  props.languageDirection === 'ltr' ? 'left' : 'right'};
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
  margin-top:40px;
  img{
    position: absolute;
    margin: 0.5% -3%
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
  margin-bottom: 10px
`;
export const StyledList = styled(List)`
    padding-top: 130px;
    padding-bottom: 8px;
    .MuiListItemText-root.MuiListItemText-dense{
      height: auto;
    }
`;
export const SearchInput = styled.input`

 
`;
