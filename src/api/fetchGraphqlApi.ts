import { GraphQLFetcher } from "./types/api/fetcher";
import { getError } from "./handle-fetch-response";

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  const res = await fetch("http://localhost:9000/graphql", {
    ...fetchOptions,
    method: "POST",
    headers: {
      // 'X-Shopify-Storefront-Access-Token': API_TOKEN!,
      ...fetchOptions?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors, status } = await res.json();
  console.log("12121", errors, status, data);
  if (errors) {
    throw getError(errors, status);
  }

  return { data, res };
};
export default fetchGraphqlApi;
