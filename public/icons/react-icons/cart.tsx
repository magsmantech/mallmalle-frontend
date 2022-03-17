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
  <SvgWrapper xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    color={props.color} width={props.width ?? 36} height={props.height ?? 36} style={props.style}>
    <g data-name="Component 120 \u2013 1">
      <g data-name="Group 430">
        <g data-name="Component 80 \u2013 4">
          <FillingPath
            data-name="Rectangle 49"
            id='outline'
            fill="none"
            opacity={0.005}
            d="M0 0h36v36H0z"
          />
          <g data-name="Iconly/Light-outline/Buy">
            <FillingPath
              id='outline'
              data-name="Buy"
              d="M26.256 31.159a2.424 2.424 0 1 1 2.425 2.441 2.435 2.435 0 0 1-2.425-2.441Zm-18 0a2.423 2.423 0 1 1 2.42 2.441 2.433 2.433 0 0 1-2.422-2.441Zm2.69-5a4.119 4.119 0 0 1-4.045-3.506l-.03-.264L5.41 4.822 2.995 4.4a1.211 1.211 0 0 1-.994-1.233L2.018 3a1.2 1.2 0 0 1 1.183-1h.043l.157.017 3.333.583a1.2 1.2 0 0 1 .962.913l.029.178.376 4.515h22.554a3.3 3.3 0 0 1 2.446 1.074 3.394 3.394 0 0 1 .887 2.536l-.026.244-1.514 10.574a4.115 4.115 0 0 1-3.781 3.519l-.262.009Zm-1.681-3.972a1.7 1.7 0 0 0 1.493 1.547l.186.01h17.457a1.689 1.689 0 0 0 1.63-1.268l.037-.189 1.523-10.574a.953.953 0 0 0-.79-1.078l-.141-.012H8.301Z"
              fill="#fff"
            />
          </g>
        </g>
        <g data-name="Component 80 \u2013 4">
          <FillingPath
            id='filled'
            data-name="Rectangle 49"
            fill="none"
            opacity={0.005}
            d="M0 0h36v36H0z"
          />
          <g data-name="Iconly/Light-outline/Buy">
            <FillingPath
              id='filled'
              data-name="Buy"
              d="M26.255 31.158A2.424 2.424 0 1 1 28.68 33.6a2.435 2.435 0 0 1-2.425-2.442Zm-18 0a2.423 2.423 0 1 1 2.42 2.442 2.434 2.434 0 0 1-2.422-2.442Zm2.69-5A4.094 4.094 0 0 1 6.9 22.652l-.031-.264-1.46-17.566L2.995 4.4A1.207 1.207 0 0 1 2 3.166L2.017 3a1.2 1.2 0 0 1 1.225-1l.158.018 3.332.582a1.2 1.2 0 0 1 .968.91l.028.178.372 4.518h22.554a3.361 3.361 0 0 1 3.337 3.612l-.026.243-1.518 10.572a4.1 4.1 0 0 1-3.781 3.52l-.263.008Z"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </g>
  </SvgWrapper>
)

export default SvgComponent
