import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width ?? 24}
    height={props.height ?? 24}
    {...props}
    viewBox="0 0 24 24">
    <g data-name="Iconly/Bold/Edit" opacity={0.5}>
      <path
        data-name="Edit"
        d="M14.28 21a1.023 1.023 0 0 1 0-2.047h5.71a1.023 1.023 0 0 1 0 2.047Zm-10.432-.424-.8-3.451a2.132 2.132 0 0 1 .4-1.8l6.236-8.057a.313.313 0 0 1 .424-.054L12.73 9.3a.846.846 0 0 0 .647.183.945.945 0 0 0 .817-1.043 1.053 1.053 0 0 0-.329-.634l-2.546-2.043a.378.378 0 0 1-.064-.526l.986-1.28A2.584 2.584 0 0 1 16.03 3.7l1.475 1.172a3.061 3.061 0 0 1 1.146 1.752 2.4 2.4 0 0 1-.488 2.042L9.376 20.028a2.105 2.105 0 0 1-1.634.817l-3.5.042a.4.4 0 0 1-.394-.311Z"
        fill="#200e32"
      />
    </g>
  </svg>
)

export default SvgComponent
