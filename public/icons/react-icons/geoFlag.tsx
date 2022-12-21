import * as React from "react"
import styled from "styled-components";
import Responsive from "../../../config/Responsive";

const Svg = styled.svg`
      width: 36px;
      height: 48px;
      margin-left: 0px;
    ${Responsive.laptop} {
        margin-left: -10px;
    }
    ${Responsive.mobile} {
        margin-left: 20px;
        width: 36px;
        height: 48px;
    }
`;

function geoFlag() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 300 200"
      width = "24" height = "36" 
    >
      <defs>
        <g id="c">
          <clipPath id="a">
            <path d="M-109 104a104 104 0 000-208h218a104 104 0 000 208z" />
          </clipPath>
          <path
            id="b"
            d="M-55 74a55 55 0 01110 0V-74a55 55 0 01-110 0z"
            clipPath="url(#a)"
          />
          <use xlinkHref="#b" transform="rotate(90)" />
        </g>
      </defs>
      <path fill="#fff" d="M0 0h300v200H0z" />
      <path d="M130 0v80H0v40h130v80h40v-80h130V80H170V0h-40z" fill="red" />
      <use xlinkHref="#c" transform="translate(64.45 39.45)" fill="red" />
      <use xlinkHref="#c" transform="translate(235.55 160.55)" fill="red" />
      <use xlinkHref="#c" transform="translate(235.55 39.45)" fill="red" />
      <use xlinkHref="#c" transform="translate(64.45 160.55)" fill="red" />
    </Svg>
  )
}

export default geoFlag
