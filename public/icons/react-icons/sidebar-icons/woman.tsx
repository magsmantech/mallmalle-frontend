import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25.65}
    height={25.65}
    viewBox="0 0 25.65 25.65"
    {...props}
  >
    <path className={props.className}
      data-name="Path 563"
      d="m21.1 19.286-4.094-1.024-.236-.946a13.561 13.561 0 0 0 4.342-1.359.535.535 0 0 0 .259-.425.543.543 0 0 0-.2-.457c-.019-.015-1.929-1.592-1.929-7.058 0-4.61-1.078-6.947-3.206-6.947h-.315A3.42 3.42 0 0 0 12.825 0c-2.008 0-6.412 2.019-6.412 8.016 0 5.466-1.91 7.043-1.924 7.054a.533.533 0 0 0 .045.885 13.266 13.266 0 0 0 4.346 1.364l-.236.944-4.095 1.023A6 6 0 0 0 0 25.116a.535.535 0 0 0 .534.534h24.582a.536.536 0 0 0 .534-.537 6 6 0 0 0-4.55-5.827Z"
      // fill="#cb21f4"
    />
  </svg>
)

export default SvgComponent
