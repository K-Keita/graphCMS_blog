import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-ap-northeast-1.graphcms.com/v2/ckssnm7i24n4q01xncfhdgln5/master",
  cache: new InMemoryCache(),
});

export default client;
