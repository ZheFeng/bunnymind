import "./App.css";

function App() {
  return (
    <main className="container mt-5">
      <div>
        <form className="mb-5">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {}}
              placeholder="What do you want to ask?"
              type="text"
              name="prompt"
              id="prompt"
            />
            <label htmlFor="prompt">What do you want to ask?</label>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
