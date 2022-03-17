import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width?? 26.267}
    height={props.height ??17.511}
    viewBox="0 0 26.267 17.511"
    {...props}
  >
    <path
      data-name="Icon awesome-eye"
      d="M26.108 8.09A14.626 14.626 0 0 0 13.133 0 14.628 14.628 0 0 0 .159 8.09a1.475 1.475 0 0 0 0 1.331 14.626 14.626 0 0 0 12.975 8.09 14.628 14.628 0 0 0 12.975-8.09 1.475 1.475 0 0 0-.001-1.331Zm-12.975 7.232A6.567 6.567 0 1 1 19.7 8.756a6.567 6.567 0 0 1-6.567 6.566Zm0-10.944a4.346 4.346 0 0 0-1.154.173A2.182 2.182 0 0 1 8.928 7.6a4.368 4.368 0 1 0 4.2-3.224Z"
      color={props.color ?? '#000000'}
    />
  </svg>
)

export default SvgComponent
