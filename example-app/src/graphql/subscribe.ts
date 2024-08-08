import type { TypedDocumentString } from "./graphql";

const endpoint = "http://localhost:4000/graphql";

type SubscriptionArguments<TResult, TVariables> = {
  document: TypedDocumentString<TResult, TVariables>;
  onNext: (message: TResult) => void;
} & (TVariables extends Record<string, never>
  ? { variables?: never }
  : { variables: TVariables });

export function subscribe<TResult, TVariables>(
  args: SubscriptionArguments<TResult, TVariables>
) {
  const url = new URL(endpoint);
  // TODO: enable persisted document usage
  if (args.document?.__meta__?.hash) {
    url.searchParams.set("documentId", args.document.__meta__.hash);
  } else {
    url.searchParams.set("query", args.document.toString());
  }

  if (args.variables) {
    url.searchParams.set("variables", JSON.stringify(args.variables));
  }

  const eventSource = new EventSource(url);
  eventSource.addEventListener("next", (event) => {
    const data = JSON.parse(event.data);
    args.onNext(data.data);
  });

  return () => {
    eventSource.close();
  };
}
