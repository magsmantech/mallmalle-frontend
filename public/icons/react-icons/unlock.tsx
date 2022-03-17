import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="Iconly/Bold/Unlock"
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 24}
    height={props.height ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      data-name="Unlock"
      d="M16.231 22H7.768A4.227 4.227 0 0 1 3.5 17.825v-4.939a4.038 4.038 0 0 1 .872-2.514A4.337 4.337 0 0 1 6.571 8.9l-.111.014V7.387a5.548 5.548 0 0 1 10.75-1.759.838.838 0 0 1-.041.666.85.85 0 0 1-.509.438.887.887 0 0 1-.291.049.91.91 0 0 1-.847-.585 3.761 3.761 0 0 0-7.283 1.172v1.341h-.013 8.006a4.227 4.227 0 0 1 4.268 4.177v4.938A4.227 4.227 0 0 1 16.231 22ZM12 13.382a.875.875 0 0 0-.884.865v2.207a.889.889 0 0 0 1.777 0v-2.207a.881.881 0 0 0-.893-.865Z"
      fill={props.color ?? "#424f60"}
    />
  </svg>
)

export default SvgComponent
