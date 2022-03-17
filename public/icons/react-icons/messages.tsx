import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44.659}
    height={44.659}
    {...props}
  >
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width={44.659}
        height={44.659}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} />
        <feGaussianBlur stdDeviation={3} result="blur" />
        <feFlood floodColor="#4d79af" floodOpacity={0.475} />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g filter="url(#a)">
      <path
        data-name="Vector"
        d="M27.661 6H17q-8 0-8 8v17.326a1.337 1.337 0 0 0 1.333 1.333h17.328q8 0 8-8V14q-.002-8-8-8ZM25 23.661h-9.335a1 1 0 1 1 0-2H25a1 1 0 1 1 0 2Zm4-6.665H15.665a1 1 0 1 1 0-2h13.329a1 1 0 0 1 0 2Z"
        fill="#4d79af"
      />
    </g>
  </svg>
)

export default SvgComponent
