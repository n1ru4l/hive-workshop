import type { TypedDocumentString } from "./graphql";

const endpoint = "http://localhost:4000/graphql";

export async function execute<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  let queryOrDocumentId: any = { query: document.toString() };

  // TODO: enable persisted document usage
  // if (document?.__meta__?.hash) {
  //   queryOrDocumentId = {
  //     documentId: document.__meta__.hash,
  //   };
  // }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({
      ...queryOrDocumentId,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as TResult;
}
