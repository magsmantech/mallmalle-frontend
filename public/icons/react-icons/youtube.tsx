import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 33.956}
    height={props.height?? 23.876}
    {...props}
    viewBox="0 0 33.956 23.876"
  >
    <path
      data-name="Icon awesome-youtube"
      d="M33.25 3.736a4.267 4.267 0 0 0-3-3.022C27.597 0 16.978 0 16.978 0S6.36 0 3.712.714a4.267 4.267 0 0 0-3 3.022 44.759 44.759 0 0 0-.71 8.226 44.759 44.759 0 0 0 .71 8.226 4.2 4.2 0 0 0 3 2.973c2.648.714 13.267.714 13.267.714s10.618 0 13.267-.714a4.2 4.2 0 0 0 3-2.973 44.759 44.759 0 0 0 .71-8.226 44.759 44.759 0 0 0-.71-8.226ZM13.505 17.011v-10.1l8.875 5.049-8.875 5.049Z"
      fill="#424f60"
    />
  </svg>
)

export default SvgComponent
