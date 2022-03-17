import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props} viewBox="0 0 24 24">
    <g fill="#ff2f5f" data-name="vuesax/bold/card-remove">
      <path
        data-name="Vector"
        d="M18.9 15.03a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm1.6 5.65a.748.748 0 0 1-1.06 0l-.53-.53-.55.55a.748.748 0 0 1-1.06 0 .754.754 0 0 1 0-1.06l.55-.55-.53-.53a.75.75 0 0 1 1.06-1.06l.53.53.5-.5a.75.75 0 0 1 1.06 1.06l-.5.5.53.53a.754.754 0 0 1 0 1.06ZM22 7.55V8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-.46A4.135 4.135 0 0 1 6.14 3.4h11.71A4.153 4.153 0 0 1 22 7.55Z"
      />
      <path
        data-name="Vector"
        d="M2 11.5v4.96a4.135 4.135 0 0 0 4.14 4.14h6.26a1.019 1.019 0 0 0 1.03-1.07 5.514 5.514 0 0 1 1.71-4.51 5.078 5.078 0 0 1 2-1.21 5.6 5.6 0 0 1 3.53.01 1 1 0 0 0 1.33-.94v-1.39a1 1 0 0 0-1-1H3a1.018 1.018 0 0 0-1 1.01Zm6 5.75H6a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 0 1.5Z"
      />
    </g>
  </svg>
)

export default SvgComponent
