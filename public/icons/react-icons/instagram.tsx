import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width?? 26.4} height={props.height ?? 26.4} {...props} viewBox="0 0 26.4 26.4">
    <g
      data-name="Icon feather-instagram"
      fill="none"
      stroke="#424f60"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
    >
      <path
        data-name="Path 12"
        d="M7.2 1.2h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-12a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6Z"
      />
      <path
        data-name="Path 13"
        d="M19.178 12.277a6 6 0 1 1-5.055-5.055 6 6 0 0 1 5.055 5.055Z"
      />
      <path data-name="Path 14" d="M19.8 6.6h0" />
    </g>
  </svg>
)

export default SvgComponent
