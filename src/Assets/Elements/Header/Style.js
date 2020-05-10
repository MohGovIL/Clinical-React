import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';

export default styled(AppBar)`
  flex-direction: row;
  align-items: center;
  color: #fafafa;
  height: 88px;
  background-image: linear-gradient(86deg, #002398 1%, #076ce9 148%);
  box-shadow: 0 2px 4px 0 rgba(90, 90, 90, 0.5);
  padding-right: 25px;
  padding-left: 25px;
  position: relative;
  & span {
    margin-right: 8px;
    margin-left: 8px;
  }
`;
