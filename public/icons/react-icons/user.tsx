
import * as React from "react"
import { SVGProps } from "react"
import styled from "styled-components";

const SvgWrapper = styled.svg`
    &:hover path {
        fill: ${(props: SVGProps<SVGSVGElement>)=> props.color?? 'transparent'}
    }
`
const FillingPath = styled.path`
    transition: fill 150ms ease-in-out;
`;
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <SvgWrapper id="Iconly_Bold_Profile" data-name="Iconly/Bold/Profile" xmlns="http://www.w3.org/2000/svg" color={props.color} width={props.width} height={props.height} viewBox="0 0 24 24" style={props.style}>
        <g id="Profile" transform="translate(4.002 2)">
            <FillingPath 
            id="Profile-2" data-name="Profile" d="M0,16.575c0-2.722,3.685-3.4,8-3.4,4.339,0,8,.7,8,3.425S12.315,20,8,20C3.662,20,0,19.3,0,16.575ZM2.706,5.291A5.294,5.294,0,1,1,8,10.583,5.274,5.274,0,0,1,2.706,5.291Z"
            transform="translate(-0.002 0)"
            stroke={props.color?? '#200e32'}
            strokeWidth="1.5"
            fill="transparent" />
        </g>
    </SvgWrapper>

)

export default SvgComponent
