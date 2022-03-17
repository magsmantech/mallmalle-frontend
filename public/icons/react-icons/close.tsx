import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 20.309}
    height={props.height ?? 20.304}
    {...props}
    viewBox="0 0 20.309 20.304"
  >
    <path
      data-name="Icon ionic-ios-close"
      d="m12.561 10.152 7.254-7.254a1.7 1.7 0 1 0-2.4-2.4l-7.254 7.254L2.907.498a1.7 1.7 0 1 0-2.4 2.4l7.254 7.254-7.254 7.254a1.7 1.7 0 1 0 2.4 2.4l7.254-7.254 7.254 7.259a1.7 1.7 0 0 0 2.4-2.4Z"
      fill={props.color ?? '#424f60'}
    />
  </svg>
)

export default SvgComponent
