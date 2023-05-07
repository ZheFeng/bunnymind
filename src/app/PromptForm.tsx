"use client";

import React, { useEffect, useRef, useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setResult("");
    setPrompt("");
    fetch(`/api/bunny?prompt=${encodeURI(prompt)}`)
      .then((res) => res.json())
      .then(({ result }) => {
        console.log(result);
        setResult(result.choices[0].message.content.replace(/\n/g, "<br>"));
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  return (
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

      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingSkeleton />
        </div>
      ) : null}
      <p>{result}</p>
    </div>
  );
}
