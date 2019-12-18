import styled from "styled-components";

 const Loader = styled.div`
  position: relative;
    height: 80px;
    width: 80px;
    border-radius: 80px;
    border: 3px solid  #2ecc71;

    top: 28%;
    top: -webkit-calc(50% - 43px);
    top: calc(50% - 43px);
    left: 35%;
    left: -webkit-calc(50% - 43px);
    left: calc(50% - 43px);

    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: loader1 3s linear infinite;
    animation: loader1 3s linear infinite;

    &:after {
    content: "";
    position: absolute;
    top: -5px;
    left: 20px;
    width: 11px;
    height: 11px;
    border-radius: 10px;
    background-color: #fff;
    }

    @keyframes loader1 {
     0%{transform:rotate(0deg);}
     100%{transform:rotate(360deg);}
    }

    @-webkit-keyframes loader1{
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);}
  }
`;

 export default Loader;
