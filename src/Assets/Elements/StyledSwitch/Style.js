import styled from 'styled-components';

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 40px;
  margin-right: ${(props) => props.marginRight || null};
  margin-left: ${(props) => props.marginLeft || null};
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  & span {
    box-shadow: inset 0 1px 3px 0 rgba(27, 27, 27, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px 0 12px;
    position: absolute;
    border-radius: 20.4px;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #dadbda;
    color: #656565;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    font-size: 15px;
    font-weight: bold;
  }
  & span:before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 30px;
    width: 30px;
    left: 4px;
    bottom: 5px;
    background-color: white;
    -webkit-transition: 0.3s;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    transition: 0.3s;
  }
  & input:checked + span {
    background-color: #076ce9;
    color: #ffffff;
  }

  & input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  & input:checked + span:before {
    -webkit-transform: translateX(42px);
    -ms-transform: translateX(42px);
    transform: translateX(42px);
  }
`;

export default Label;
