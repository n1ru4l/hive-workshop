import type { TypedDocumentString } from "./graphql";

const endpoint = "http://localhost:4000/graphql";

type ExecutionArguments<TResult, TVariables> = {
  document: TypedDocumentString<TResult, TVariables>;
} & (TVariables extends Record<string, never>
  ? { variables?: never }
  : { variables: TVariables });

export async function execute<TResult, TVariables>(
  args: ExecutionArguments<TResult, TVariables>
) {
  let queryOrDocumentId: any = { query: args.document.toString() };

  // TODO: enable persisted document usage
  if (args.document?.__meta__?.hash) {
    queryOrDocumentId = {
      documentId: args.document.__meta__.hash,
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({
      ...queryOrDocumentId,
      variables: args.variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as TResult;
}
