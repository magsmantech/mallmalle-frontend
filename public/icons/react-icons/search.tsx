import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="Iconly/Light/Search"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width?? 28}
    height={props.height?? 28}
    viewBox="0 0 28 28"
    {...props}
  >
    <g
      transform="translate(3.241 3.241)"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.5}
    >
      <circle cx={10.487} cy={10.487} r={10.487} />
      <path d="m17.78 18.325 4.111 4.1" />
    </g>
  </svg>
)

export default SvgComponent