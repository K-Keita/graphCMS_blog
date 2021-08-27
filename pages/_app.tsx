import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import client from "../libs/apollo-client";


function MyApp({ Component, pageProps }: AppProps) {
  return(

  <ApolloProvider client={client}>
  <Component {...pageProps} />
  </ApolloProvider>
  )
}
export default MyApp
