import * as React from "react"
import { SVGProps } from "react"
import styled from "styled-components";

const SvgWrapper = styled.svg`
    & #filled {
        opacity: 0;
    }
    &:hover #outline {
        opacity: 0;
    }
    &:hover #filled {
        opacity: 1;
    }
`
const FillingPath = styled.path`
    transition: opacity 150ms ease-in-out;
`;

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <SvgWrapper
    data-name="Component 121 \u2013 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    color={props.color} width={props.width ?? 36} height={props.height ?? 36}  style={props.style}>
    <g data-name="Group 507">
      <g data-name="Group 501">
        <g data-name="Group 502">
          <g data-name="Iconly/Light-outline/Bookmark">
            <FillingPath
              id='outline'
              data-name="Bookmark"
              d="m25.53 32.706-8.068-4.544-8.035 4.553a2.278 2.278 0 0 1-1.073.273 2.369 2.369 0 0 1-1.8-.861l-.141-.183-.134-.223A2.587 2.587 0 0 1 6 30.581V10.43a6.039 6.039 0 0 1 1.93-4.811A7.856 7.856 0 0 1 13.207 4h8.584C26.372 4 29 6.25 29 10.174v20.407a2.45 2.45 0 0 1-.686 1.711 2.3 2.3 0 0 1-1.672.708 2.449 2.449 0 0 1-1.112-.294Zm-7.1-6.392 8.053 4.536a.43.43 0 0 0 .181.051.305.305 0 0 0 .221-.095.332.332 0 0 0 .09-.227V10.174c0-2.7-1.742-4.074-5.179-4.074h-8.589c-3.484 0-5.177 1.416-5.177 4.33v20.133c0 .024 0 .049.005.067s0 .039 0 .041h-.008l.055.088a.333.333 0 0 0 .265.139.275.275 0 0 0 .124-.03l8.029-4.555a1.964 1.964 0 0 1 1.922 0Zm-5.9-11.056a1.052 1.052 0 0 1-.138-2.089l.138-.01h9.87a1.053 1.053 0 0 1 .138 2.09l-.138.009Z"
              fill={props.color ?? '#fff'}
            />
             <FillingPath
              id='filled'
              data-name="Bookmark"
              d="M26.643 33a2.448 2.448 0 0 1-1.113-.294l-8.068-4.544-8.035 4.553a2.275 2.275 0 0 1-1.073.273 2.367 2.367 0 0 1-1.8-.861l-.141-.183-.134-.223A2.586 2.586 0 0 1 6 30.58V10.43a6.039 6.039 0 0 1 1.93-4.811A7.857 7.857 0 0 1 13.208 4h8.583a8.183 8.183 0 0 1 5.255 1.552A5.672 5.672 0 0 1 29 10.174V30.58a2.448 2.448 0 0 1-.685 1.712 2.308 2.308 0 0 1-1.672.708ZM12.527 13.159l-.138.01a1.052 1.052 0 0 0 .138 2.089H22.4l.138-.009a1.053 1.053 0 0 0-.138-2.09Z"
              fill={props.color ?? '#fff'}
            />
          </g>
        </g>
      </g>
    </g>
  </SvgWrapper>
)

export default SvgComponent
