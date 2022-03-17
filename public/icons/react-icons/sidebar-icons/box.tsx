import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 27.275}
    height={props.height ?? 28.29}
    viewBox="0 0 27.275 28.29"
    {...props}
  >
    <path
      data-name="Path 31"
      d="M16.022 0a2.412 2.412 0 0 0-2.08 1.217.375.375 0 0 1-.615 0A2.384 2.384 0 0 0 8.87 2.396c0 2.667 2.355 4.773 4.665 5.864a.255.255 0 0 0 .219 0c2.331-1.106 4.656-3.218 4.653-5.873A2.388 2.388 0 0 0 16.022 0Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 32"
      d="M10.007 2.392A2.388 2.388 0 0 1 11.82.075a2.384 2.384 0 0 0-2.951 2.317c0 2.667 2.355 4.773 4.665 5.864a.256.256 0 0 0 .219 0 9.09 9.09 0 0 0 .456-.233C12.058 6.88 10.01 4.88 10.007 2.392Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 33"
      d="M16.76 15.915a.678.678 0 0 0 .6.388h6.948V27.37a.874.874 0 0 1-.821.919h-9.879V10.126Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 34"
      d="M13.608 10.126v18.162h1.1V12.149Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 35"
      d="M10.515 15.915a.678.678 0 0 1-.6.388H2.964V27.37a.874.874 0 0 0 .821.919h9.88V10.126Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 36"
      d="M4.064 27.371V16.304h-1.1v11.067a.874.874 0 0 0 .821.919h1.1a.874.874 0 0 1-.821-.919Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 37"
      d="M26.893 16.488h-9.646a.678.678 0 0 1-.6-.388l-3.039-5.975h10.161a.917.917 0 0 1 .807.525l2.646 5.2a.428.428 0 0 1-.329.638Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 38"
      d="m17.895 16.1-3.04-5.972h-1.248l3.04 5.972a.678.678 0 0 0 .6.388h1.244a.678.678 0 0 1-.596-.388Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 39"
      d="M.381 16.488h9.646a.678.678 0 0 0 .6-.388l3.04-5.972H3.503a.917.917 0 0 0-.807.525l-2.646 5.2a.428.428 0 0 0 .331.635Z"
      // fill={props.color?? "#ea1313"}
    />
    <path
      data-name="Path 40"
      d="m1.151 15.85 2.646-5.2a.917.917 0 0 1 .807-.525h-1.1a.917.917 0 0 0-.807.525l-2.646 5.2a.428.428 0 0 0 .331.638h1.1a.428.428 0 0 1-.331-.638Z"
      // fill={props.color?? "#ea1313"}
    />
  </svg>
)

export default SvgComponent
