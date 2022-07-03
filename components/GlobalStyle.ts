import { createGlobalStyle } from 'styled-components'

export const Scrollbar = createGlobalStyle<{ hide: boolean }>`
  body {
    overflow: ${props => (props.hide === true ? 'hidden' : 'unset')} !important;
    padding-right: ${props => (props.hide === true ? '4px' : '0px')} !important;
  }
`