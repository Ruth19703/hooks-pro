
import { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext } from "react";

// Custom Hook: useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((current) => !current);

  return [value, toggle];
}

// Custom Hook: useDebounce
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Custom Hook: useDocument
function useDocument(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// Reducer for useReducer
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}

function App() {
  // useState
  const [name, setName] = useState("");

  // useEffect
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // useRef
  const inputRef = useRef(null);

  // useMemo
  const [number, setNumber] = useState(5);

  const squaredNumber = useMemo(() => {
    return number * number;
  }, [number]);

  // useCallback
  const showMessage = useCallback(() => {
    alert("Hello! This is useCallback.");
  }, []);

  // useReducer
  const [count, dispatch] = useReducer(counterReducer, 0);

  // Custom Hook: useToggle
  const [isVisible, toggleVisibility] = useToggle();

  // Custom Hook: useDebounce
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Custom Hook: useDocument
  useDocument("React Hooks Toolkit");

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-10 rounded-2xl bg-slate-900 p-8 text-white">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Advanced Frontend Development
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            React Hooks Toolkit
          </h1>

          <p className="mt-3 text-slate-300">
            Explore how React Hooks help us manage data, actions and component behavior.
          </p>
        </header>

        {/* Hooks Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* useState */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">1. useState</h2>
            <p className="mb-4 text-sm text-slate-500">
              Stores and updates component data.
            </p>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p className="mt-3">
              Hello, <strong>{name || "Guest"}</strong>!
            </p>
          </section>

          {/* useEffect */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">2. useEffect</h2>
            <p className="mb-4 text-sm text-slate-500">
              Runs side effects and manages timers.
            </p>

            <p className="text-3xl font-bold text-blue-600">
              {seconds}s
            </p>

            <p className="text-sm text-slate-500">Time since page opened</p>
          </section>

          {/* useRef */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">3. useRef</h2>
            <p className="mb-4 text-sm text-slate-500">
              Accesses an input element directly.
            </p>

            <input
              ref={inputRef}
              className="w-full rounded-lg border p-3"
              placeholder="Click the button below"
            />

            <button
              onClick={() => inputRef.current.focus()}
              className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Focus Input
            </button>
          </section>

          {/* useMemo */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">4. useMemo</h2>
            <p className="mb-4 text-sm text-slate-500">
              Caches calculated values.
            </p>

            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              className="w-full rounded-lg border p-3"
            />

            <p className="mt-3">
              Squared result: <strong>{squaredNumber}</strong>
            </p>
          </section>

          {/* useCallback */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">5. useCallback</h2>
            <p className="mb-4 text-sm text-slate-500">
              Caches a function between renders.
            </p>

            <button
              onClick={showMessage}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Show Message
            </button>
          </section>

          {/* useReducer */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">6. useReducer</h2>
            <p className="mb-4 text-sm text-slate-500">
              Manages state using actions.
            </p>

            <p className="mb-4 text-3xl font-bold">{count}</p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => dispatch({ type: "increment" })}
                className="rounded-lg bg-green-600 px-3 py-2 text-white"
              >
                +
              </button>

              <button
                onClick={() => dispatch({ type: "decrement" })}
                className="rounded-lg bg-red-600 px-3 py-2 text-white"
              >
                -
              </button>

              <button
                onClick={() => dispatch({ type: "reset" })}
                className="rounded-lg bg-slate-600 px-3 py-2 text-white"
              >
                Reset
              </button>
            </div>
          </section>

          {/* useToggle */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">7. useToggle</h2>
            <p className="mb-4 text-sm text-slate-500">
              Custom Hook for showing and hiding content.
            </p>

            <button
              onClick={toggleVisibility}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              {isVisible ? "Hide Content" : "Show Content"}
            </button>

            {isVisible && (
              <p className="mt-3 rounded-lg bg-blue-50 p-3">
                The content is now visible!
              </p>
            )}
          </section>

          {/* useDebounce */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-xl font-bold">8. useDebounce</h2>
            <p className="mb-4 text-sm text-slate-500">
              Delays updates until typing stops.
            </p>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search something..."
              className="w-full rounded-lg border p-3"
            />

            <p className="mt-3">
              Search result: <strong>{debouncedSearch || "Waiting..."}</strong>
            </p>
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-slate-500">
          React Hooks Toolkit | Learning by building
        </footer>

      </div>
    </div>
  );
}

export default App;
