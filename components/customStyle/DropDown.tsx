import React, { useState } from 'react'
import { DropdownButton } from 'react-bootstrap'
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import RadioButton from './RadioButton';
import { BsChevronDown } from 'react-icons/bs'
import Responsive from '../../config/Responsive';
const DropDown: React.FC<{}> = ({ }) => {

  const [selected, setselected] = useState();

  return (
    <Wrapper>
      <Arrow />
      <DropDownBtn id="dropdown-item-button" title="პოპულარობა">
        <RadioButton
          id="userType"
          onChange={(value) => setselected(value)}
          options={[
            { label: "i am levan", value: "levan" },
            { label: "i am giorgi", value: "giorgi" },
          ]}
          value={selected}
        />
      </DropDownBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
`;
const Arrow = styled(BsChevronDown)`
    width: 18px;
    height: 18px;
    position: absolute;
    z-index: 10;
    right: 17px;
    top: 18px;
    user-select: none;
    pointer-events: none;
`;
const DropDownBtn = styled(DropdownButton)`
  width: fit-content;
    button {
      display: flex;
      box-shadow: unset !important;
      padding: 10px 10px 10px 15px;
      border: 0px;
      border-radius: 25px;
      font-size: 18px;
      color: #424F60;
      user-select: none;
      font-family: 'helvetica';
      font-weight: 500;
      background-color: #F2F2F2;
      color: #424F60;
        &:hover {
          background-color: #C9F5EB;
          color: #424F60;
        }
        &::after {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
          border: 0px;
          margin-left: 20px;
          cursor: pointer;
        }
    }
    button + div {
      width: 100%;
      background-color: #fff;
      border-radius: 18px;
      border: 0px;
      padding: 15px 10px;
      box-shadow: 0 0 0.4rem 0.4rem rgb(0 0 0 / 8%);
        ${Responsive.mobile} {
          position: fixed !important;
          left: 0 !important;
          bottom: 0 !important;
          height: 70%;
          margin-top: auto;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
          transform: unset !important;
          overflow-y: scroll;
          padding-left: 20px;
          padding-right: 20px;
        }
    }
    &.show > .btn-primary.dropdown-toggle {
      background-color: #F2F2F2;
      color: #424F60;
    }
    &.btn-check:focus+.btn-primary, .btn-primary:focus {
      background-color: #F2F2F2;
      color: #424F60;
    }
`;


export default DropDown