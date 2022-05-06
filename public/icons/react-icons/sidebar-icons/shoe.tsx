import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27.143}
    height={11.916}
    {...props}
  >
    <path
      d="m27.122 9.974-.405-1.332a.485.485 0 0 0-.6-.325c-.212.062-.059.024-.273.082l-.03-.106a4.406 4.406 0 0 0-3.839-3.209 19.907 19.907 0 0 1-5.411-1.373 7.161 7.161 0 0 1-.925-.462L14.8 4.563a.7.7 0 1 1-1.182-.752l.839-1.309a36.809 36.809 0 0 1-1.158-.829l-1.682 2.3a.7.7 0 0 1-1.131-.827l1.7-2.325c-.318-.251-.6-.478-.819-.658a.69.69 0 0 0-.944.066 11.27 11.27 0 0 1-8.049 3.489 12.368 12.368 0 0 1-1.26-.042.468.468 0 0 0-.5.467V9.56H.428A.428.428 0 0 0 0 9.982v1.506a.428.428 0 0 0 .428.428l11.482-.038c5.981 0 9.937.142 14.883-1.3a.485.485 0 0 0 .329-.607Z"
      // fill="#5f8ee5"
    />
  </svg>
)

export default SvgComponent