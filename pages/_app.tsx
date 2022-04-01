import Head from 'next/head'
import React from 'react'
import { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

const App = (props: AppProps): JSX.Element => {
  return <AppContent {...props} />
}

export default App

const AppContent = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>FTX NFT</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />

        {/* Google Fonts */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  :root {
    --color-white: #FFFFFF;
    --color-alabaster: #F9F9F9;
    --color-mercury: #E7E7E7;
    --color-black: #000000;
    --color-dove: #666666;
    --color-dusty: #999999;
    --color-highlight: #9FFEDD;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: var(--color-white);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-black);
    font-weight: 500;
    margin: 0;
  }

  p {
    color: var(--color-dove);
    margin: 0;
    font-size: 14px;
    line-height: 20px;
  }

  a {
    text-decoration: none;
  }
  
  img {
    user-select: none;
    user-drag: none;
  }

  input, select, textarea, button {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  ::selection {
    color: var(--color-black);
    background: var(--color-highlight);
  }

  ::-webkit-scrollbar {
    display: none;
  }
`
