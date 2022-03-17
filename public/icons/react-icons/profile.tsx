import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width?? 36} height={props.height?? 45} {...props} viewBox="0 0 36 45">
    <defs>
      <linearGradient
        id="a"
        x1={-0.069}
        y1={-0.075}
        x2={1.085}
        y2={1.086}
        gradientUnits="objectBoundingBox"
      >
        <stop offset={0} stopColor="#22d5ae" />
        <stop offset={1} stopColor="#3a7bd5" />
      </linearGradient>
    </defs>
    <path
      d="M0 37.295c0-6.124 8.292-7.653 18-7.653 9.762 0 18 1.586 18 7.705S27.708 45 18 45c-9.76 0-18-1.586-18-7.705Zm6.089-25.39A11.911 11.911 0 1 1 18 23.812 11.866 11.866 0 0 1 6.089 11.905Z"
      fill="url(#a)"
    />
  </svg>
)

export default SvgComponent
