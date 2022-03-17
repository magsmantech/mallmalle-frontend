import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20.713}
    height={26.363}
    {...props}
  >
    <g data-name="Group 479">
      <g data-name="Group 478">
        <path
          data-name="Path 24"
          d="M18.783 12.24A9.409 9.409 0 0 0 14.5 5.259L13.181 0H5.649L4.333 5.263a9.4 9.4 0 0 0 0 15.836l1.316 5.263h7.532L14.5 21.1a9.41 9.41 0 0 0 4.287-6.981h1.931V12.24Zm-9.368 8.474a7.532 7.532 0 1 1 7.532-7.532 7.541 7.541 0 0 1-7.532 7.531Z"
          // fill="#31c4be"
        />
      </g>
    </g>
    <g data-name="Group 481">
      <g data-name="Group 480">
        <path
          data-name="Path 25"
          d="M10.357 13.254v-4.78H8.474v5.36l2.376 3.429 1.539-1.065Z"
          // fill="#31c4be"
        />
      </g>
    </g>
  </svg>
)

export default SvgComponent
