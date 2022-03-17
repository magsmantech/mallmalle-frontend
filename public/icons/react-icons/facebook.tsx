import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width?? 24} height={props.height ?? 24} {...props} viewBox="0 0 24 24">
    <path
      data-name="Icon awesome-facebook-square"
      d="M21.429 0H2.571A2.571 2.571 0 0 0 0 2.571v18.858A2.571 2.571 0 0 0 2.571 24h7.353v-8.159H6.549V12h3.375V9.073c0-3.329 1.982-5.169 5.018-5.169a20.446 20.446 0 0 1 2.974.259v3.268h-1.675a1.92 1.92 0 0 0-2.165 2.075V12h3.685l-.589 3.841h-3.1V24h7.353A2.571 2.571 0 0 0 24 21.429V2.571A2.571 2.571 0 0 0 21.429 0Z"
      fill="#424f60"
    />
  </svg>
)

export default SvgComponent
