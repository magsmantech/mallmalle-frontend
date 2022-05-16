import { createGlobalStyle } from 'styled-components'

export const Scrollbar = createGlobalStyle<{ hide: boolean }>`
  body {
    overflow: ${props => (props.hide === true ? 'hidden' : 'unset')};
  }
`