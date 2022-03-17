import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26.659}
    height={26.659}
    {...props}
  >
    <path
      d="M18.661 0H8Q0 0 0 8v17.326a1.337 1.337 0 0 0 1.333 1.333h17.328q8 0 8-8V8q-.002-8-8-8ZM16 17.661H6.665a1 1 0 1 1 0-2H16a1 1 0 1 1 0 2Zm4-6.665H6.665a1 1 0 1 1 0-2h13.329a1 1 0 0 1 0 2Z"
      // fill="#4d79af"
    />
  </svg>
)

export default SvgComponent
