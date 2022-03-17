import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="Iconly/Bold/Message"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width?? 24}
    height={props.height?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={props.color?? "#424f60"}
      data-name="Message"
      d="M16.939 21H7.06A5.061 5.061 0 0 1 2 15.95v-7.9A5.061 5.061 0 0 1 7.06 3h9.879a5.091 5.091 0 0 1 3.58 1.481A5.012 5.012 0 0 1 22 8.05v7.9A5.061 5.061 0 0 1 16.939 21ZM6.035 8.246a.733.733 0 0 0-.535.224.764.764 0 0 0-.071 1l.131.13 4.55 3.55a3.129 3.129 0 0 0 1.95.68 3.18 3.18 0 0 0 1.958-.68l4.512-3.61.08-.08a.774.774 0 0 0-.012-1 .831.831 0 0 0-.528-.26h-.042a.76.76 0 0 0-.519.2L13 12a1.565 1.565 0 0 1-1 .36 1.592 1.592 0 0 1-1-.36L6.5 8.4a.778.778 0 0 0-.465-.154Z"
    />
  </svg>
)

export default SvgComponent
