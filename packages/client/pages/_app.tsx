import React, { SFC } from 'react'
import { AppProps } from 'next/app'
import 'styles/global.css'

const MyApp: SFC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
