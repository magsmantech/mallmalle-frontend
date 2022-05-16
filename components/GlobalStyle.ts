import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ scrollBar: boolean }>`
  body {
    overflow: ${props => (props.scrollBar === true ? 'unset' : 'hidden')};
  }
`