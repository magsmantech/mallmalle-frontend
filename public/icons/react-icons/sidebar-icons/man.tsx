import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <g 
      // fill="#5f8ee5"
      >
      <path
        data-name="Vector"
        d="M17 7a5 5 0 1 1-5-5 5 5 0 0 1 5 5ZM12 14.5c-5.01 0-9.09 3.36-9.09 7.5a.5.5 0 0 0 .5.5h17.18a.5.5 0 0 0 .5-.5c0-4.14-4.08-7.5-9.09-7.5Z"
      />
    </g>
  </svg>
)

export default SvgComponent
