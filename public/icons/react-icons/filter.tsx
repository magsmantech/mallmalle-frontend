import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="vuesax/linear/setting-4"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width?? 24}
    height={props.height?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke={props.color?? "#292d32"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M22 6.5h-6" />
      <path
        data-name="Vector"
        d="M6 6.5H2M13.5 6.5A3.5 3.5 0 1 1 10 3a3.5 3.5 0 0 1 3.5 3.5ZM22 17.5h-4M8 17.5H2M17.5 17.5A3.5 3.5 0 1 1 14 14a3.5 3.5 0 0 1 3.5 3.5Z"
      />
    </g>
  </svg>
)

export default SvgComponent
