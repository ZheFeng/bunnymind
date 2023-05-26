import { useEffect, useRef, useState } from "react";
import "./App.css";

async function chatgpt(prompt: string, temperature: number): Promise<string> {
  const response = await fetch(
    `/api/chatgpt?prompt=${encodeURI(prompt)}&temperature=${temperature}`
  );
  const { data } = await response.json();
  return data.choices[0].message.content;
}

function App() {
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [temperature] = useState(0.6);
  const [fetching, setFetching] = useState(false);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFetching(true);
    setAnswer("");
    chatgpt(prompt, temperature)
      .then((answer) => {
        setAnswer(answer);
        setLastPrompt(prompt);
        setPrompt("");
        setFetching(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <main className="container mt-5">
      <div>
        <form onSubmit={onSubmit} className="mb-5">
          <div className="form-floating mb-3">
            <input
              ref={inputRef}
              className="form-control"
              value={prompt}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setPrompt(e.currentTarget.value);
              }}
              placeholder="What do you want to ask?"
              type="text"
              name="prompt"
              id="prompt"
            />
            <label htmlFor="prompt">What do you want to ask?</label>
          </div>
        </form>

        {fetching ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : null}
        {answer ? (
          <div className="card">
            <div className="card-header">prompt: {lastPrompt}</div>
            <div className="card-body">
              {answer
                .split(/\n/g)
                .filter((a) => a)
                .map((a) => {
                  return <p>{a}</p>;
                })}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;
