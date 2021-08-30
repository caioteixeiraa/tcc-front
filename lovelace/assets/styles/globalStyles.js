import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

export const theme = {
  colors: {
    primary: {
      normal: '#2B7DE9',
      dark: '#0B5DC9'
    },
    grey: {
      normal: '#EFEFEF',
    },
    black: '#1A1A1A',
    white: '#FFFFFF'
  }
}