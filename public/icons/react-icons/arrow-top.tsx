import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 17.152}
    height={props.height ?? 30.001}
    {...props}
    viewBox="0 0 17.152 30"
  >
    <path
      data-name="Icon ionic-ios-arrow-back"
      d="M11.982 15.001.63 26.347a2.144 2.144 0 1 0 3.037 3.028l12.861-12.852a2.14 2.14 0 0 0 .063-2.956L3.675.625A2.144 2.144 0 1 0 .638 3.653Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent
