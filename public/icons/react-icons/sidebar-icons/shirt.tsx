import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26.641}
    height={23.864}
    {...props}
  >
    <path
      data-name="Path 23"
      d="M.054 10.631a.626.626 0 0 0 .273.8l2.573 1.4a.626.626 0 0 0 .812-.192l2-2.869c1.05 2.557.324 10.095 0 12.966a1.014 1.014 0 0 0 1.008 1.128h13.204a1.015 1.015 0 0 0 1.008-1.133c-.327-2.872-1.053-10.41 0-12.966l2 2.869a.626.626 0 0 0 .812.192l2.57-1.395a.626.626 0 0 0 .273-.8l-3.84-8.653A3.369 3.369 0 0 0 20.094.003H17.81a.664.664 0 0 0-.649.525 3.749 3.749 0 0 1-3.84 2.571A3.749 3.749 0 0 1 9.481.528a.665.665 0 0 0-.649-.525H6.546a3.369 3.369 0 0 0-2.653 1.975Z"
      // fill="#d5ad40"
    />
  </svg>
)

export default SvgComponent
