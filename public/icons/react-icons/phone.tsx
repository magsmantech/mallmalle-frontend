import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="Iconly/Bold/Call"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width?? 24}
    height={props.height?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      data-name="Call"
      d="M18.167 14.38a2.279 2.279 0 0 0-1.674.44c-.482.281-1.4 1.024-1.923.834a11.932 11.932 0 0 1-6.313-6.16c-.193-.536.547-1.458.825-1.946a2.335 2.335 0 0 0 .436-1.685 13.7 13.7 0 0 0-2.329-3.247 1.912 1.912 0 0 0-1.168-.615C4.52 1.938 2.844 3.941 2.549 4.42c-.736 1.022-.732 2.381.013 4.031 1.8 4.428 8.586 11.112 13.031 12.974a5.371 5.371 0 0 0 2.244.576 2.919 2.919 0 0 0 1.751-.549c.381-.219 2.466-1.979 2.411-3.521a1.941 1.941 0 0 0-.608-1.166 13.8 13.8 0 0 0-3.224-2.385"
      fill={props.color?? "#424f60"}
    />
  </svg>
)

export default SvgComponent
