import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [joke, setJoke] = useState("Loading your next laugh...");
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes/joke/random",
      );
      const data = await response.json();
      setJoke(data?.data?.content || "Could not load a joke right now.");
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Could not load a joke right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="app-shell">
      <div className="joke-card">
        <h1>Jokes</h1>
        <p className="joke-text">{joke}</p>
        <button className="new-joke-btn" onClick={fetchJoke} disabled={loading}>
          {loading ? "Loading..." : "New Joke"}
        </button>
      </div>
    </div>
  );
}

export default App;
