import { GlobalStyle, theme } from '../assets/styles/globalStyles'
import { ThemeProvider } from 'styled-components'
import HeadComponent from '../components/Head/index'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <HeadComponent />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
