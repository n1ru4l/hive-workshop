import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { graphql } from "./graphql";
import { execute } from "./graphql/execute";
import { subscribe } from "./graphql/subscribe";

const BroadcastMutation = graphql(`
  mutation Broadcast($message: String!) {
    broadcast(message: $message)
  }
`);

const BroadcastsSubscription = graphql(`
  subscription Broadcasts {
    broadcasts
  }
`);

function App() {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    return subscribe({
      document: BroadcastsSubscription,
      onNext(message) {
        setMessages((prev) => [...prev, message.broadcasts]);
      },
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <textarea
          ref={ref}
          style={{ display: "block", marginBottom: 16, width: "100%" }}
        />
        <button
          onClick={() => {
            if (!ref.current) return;

            execute({
              document: BroadcastMutation,
              variables: { message: ref.current.value },
            });

            ref.current.value = "";
          }}
        >
          Send Message
        </button>
      </div>
      <ul className="read-the-docs">
        {messages.map((message, index) => (
          <li key={String(index)}>{message}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
