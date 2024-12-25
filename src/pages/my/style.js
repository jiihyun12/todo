import styled from "styled-components";
import { flexCenterColumn } from "../../global/common";

const S = {}

S.Wrapper = styled.div`
    ${flexCenterColumn}
`

S.Label = styled.label`
    display: block;
    width: 200px;
    height: 200px;
`

S.profile = styled.img`
    display: block;
    width: 200px;
    height: 200px;
    width: 100%;
    background-color: #d9d9d9;
    overflow: hidden;
    border-radius: 50%;
`

S.Button = styled.button`
    cursor: pointer;
    width: 200px;
    height: 50px;
    margin: 0 0 100px;
`

export default S;