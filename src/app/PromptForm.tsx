"use client";

import React, { useEffect, useRef, useState } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.6);
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
    fetch(`/api/bunny?prompt=${encodeURI(prompt)}`)
      .then((res) => res.json())
      .then(({ result }) => {
        console.log(result);
        setResult(
          `
          <div class="card">
            <div class="card-header">
              prompt: ${prompt}
            </div>
            <div class="card-body">
              ${result.choices[0].message.content.replace(/\n/g, "<br />")}
            </div>
          </div>          
          `
        );
        setPrompt("");
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
        <div className="form-floating mb-3">
          <input
            className="form-control"
            value={temperature}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setTemperature(parseFloat(e.currentTarget.value));
            }}
            placeholder="Temperature"
            step={0.1}
            min={0.1}
            max={1}
            type="number"
            name="temperature"
            id="temperature"
          />
          <label htmlFor="temperature">Temperature</label>
        </div>
        <div className="form-floating mb-3">
          <input className="btn btn-primary" value="Submit" type="submit" />
        </div>
      </form>

      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingSkeleton />
        </div>
      ) : null}
      <p dangerouslySetInnerHTML={{ __html: result }}></p>
    </div>
  );
}
