import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { graphql } from "./graphql";
import { execute } from "./graphql/execute";

const BroadcastMutation = graphql(`
  mutation Broadcast($message: String!) {
    broadcast(message: $message)
  }
`);

function App() {
  const ref = useRef<HTMLTextAreaElement>(null);

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
            alert(ref.current.value);
            ref.current.value = "";

            execute(BroadcastMutation, {
              message: "Hello, world!",
            });
          }}
        >
          Send Message
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
