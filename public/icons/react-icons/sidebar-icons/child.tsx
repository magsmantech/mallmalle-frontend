import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16.073} height={20} {...props}>
    <path
      data-name="Path 567"
      d="M8.036 20a8.033 8.033 0 0 0 4.379-14.77 8.389 8.389 0 0 1 1.509-.794.759.759 0 0 0 .065-1.377 6.636 6.636 0 0 0-4.281-.393 8.347 8.347 0 0 1 .961-1.42A.759.759 0 0 0 10.077 0c-2.937.034-5.631 3.011-6.7 4.792a5.145 5.145 0 0 0-.46.984A8.034 8.034 0 0 0 8.04 20Z"
      // fill="#ffa700"
    />
  </svg>
)

export default SvgComponent
