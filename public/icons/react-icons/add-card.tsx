import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 52}
    height={props.height ?? 52}
    {...props}
    viewBox="0 0 52 52">
    <path
      d="M4.345 24.757v10.862a8.97 8.97 0 0 0 8.965 8.994h25.358a9.007 9.007 0 0 0 8.987-9.015V24.757a2.62 2.62 0 0 0-2.62-2.629H6.965a2.62 2.62 0 0 0-2.62 2.629Zm12.993 12.579h-4.331a1.63 1.63 0 0 1 0-3.259h4.331a1.63 1.63 0 0 1 0 3.259Zm14.076 0h-8.662a1.63 1.63 0 0 1 0-3.259h8.662a1.63 1.63 0 0 1 0 3.259Z"
      fill="#424f60"
    />
    <path
      data-name="Vector"
      d="M29.329 10.016v6.365A2.624 2.624 0 0 1 26.7 19.01H6.974a2.647 2.647 0 0 1-2.629-2.672 8.975 8.975 0 0 1 8.994-8.951H26.7a2.624 2.624 0 0 1 2.629 2.629ZM43.247 4.345h-6.39a4.055 4.055 0 0 0-4.41 4.41v6.39a4.055 4.055 0 0 0 4.41 4.41h6.39a4.055 4.055 0 0 0 4.41-4.41v-6.39a4.055 4.055 0 0 0-4.41-4.41Zm2.04 8.538a1.405 1.405 0 0 1-.891.391h-3.063l.022 3.02a1.374 1.374 0 0 1-.413.934 1.283 1.283 0 0 1-.891.369 1.307 1.307 0 0 1-1.3-1.3v-3.045l-3.042.022a1.326 1.326 0 0 1-1.307-1.329 1.307 1.307 0 0 1 1.3-1.3l3.045.022V7.626a1.304 1.304 0 1 1 2.607 0l-.021 3.019h3.063a1.307 1.307 0 0 1 1.3 1.3 1.479 1.479 0 0 1-.409.938Z"
      fill="#424f60"
    />
  </svg>
)

export default SvgComponent
