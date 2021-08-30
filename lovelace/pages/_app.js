import { GlobalStyle, theme } from '../assets/styles/globalStyles'
import { ThemeProvider } from 'styled-components'
import HeadComponent from '../components/Head/index'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <HeadComponent />
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
