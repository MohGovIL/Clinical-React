import styled from "styled-components";

const LoginStyleBox = styled.div`
    width: 400px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #000d37;
    text-align: center;
    border-radius: 15px;
    & h1{
    color: white;
    text-transform: uppercase;
    font-weight: 500;
  }
  & input[type = "text"], input[type = "password"]{
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #076ce9;
    padding: 14px 10px;
    width: 200px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
  }
  & input[type = "text"]:focus, input[type = "password"]:focus{
    width: 280px;
    border-color: #28d957;
  }
  & input[type = "submit"]{
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #28d957;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
  }
  & input[type = "submit"]:hover{
    background: #2ecc71;
}
`;
export default LoginStyleBox;
