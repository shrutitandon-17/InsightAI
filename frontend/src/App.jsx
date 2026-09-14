import { useState } from "react"
import "./App.css"

function App() {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState([])
  const [error, setError] = useState("")
  const [showAbout, setShowAbout] = useState(false)

  const handleResearch = async () => {
    if (!question.trim()) return

    setLoading(true)
    setAnswer("")
    setSources([])
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Research request failed")
      }

      setAnswer(data.answer)
      setSources(data.sources || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span>✦</span>
          InsightAI
        </div>

        <button
          className="about-btn"
          onClick={() => setShowAbout(true)}
        >
          About
        </button>
      </nav>

      {showAbout && (
        <div
          className="about-overlay"
          onClick={() => setShowAbout(false)}
        >
          <div
            className="about-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowAbout(false)}
            >
              ×
            </button>

            <div className="about-icon">✦</div>

            <h2>About InsightAI</h2>

            <p>
              InsightAI is an AI-powered research assistant that searches
              the web, collects relevant information, and uses a large
              language model to generate clear, organized answers with
              source references.
            </p>

            <div className="tech-stack">
              <span>React</span>
              <span>Node.js</span>
              <span>Tavily</span>
              <span>OpenRouter</span>
            </div>
          </div>
        </div>
      )}

      <main className="hero">
        <div className="badge">
          <span>✦</span>
          AI Research Assistant
        </div>

        <h1>
          Research smarter.
          <br />
          <span>Discover faster.</span>
        </h1>

        <p className="subtitle">
          Ask a question and let AI research the topic,
          <br />
          organize the information, and give you a clear answer.
        </p>

        <div className="search-card">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to research?"
            rows="4"
          />

          <div className="search-footer">
            <span>{question.length} characters</span>

            <button
              className="research-btn"
              onClick={handleResearch}
              disabled={loading}
            >
              {loading ? "Researching..." : "Research"}
              <span>✦</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="result-card">
            <div className="result-heading">
              <span>!</span>
              Something went wrong
            </div>

            <p>{error}</p>
          </div>
        )}

        {answer && (
          <div className="result-card">
            <div className="result-heading">
              <span>✦</span>
              Research Result
            </div>

            <div className="answer">{answer}</div>

            {sources.length > 0 && (
              <div className="sources">
                <h3>Sources</h3>

                <div className="source-grid">
                  {sources.map((source, index) => (
                    <a
                      className="source-card"
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      key={index}
                    >
                      <span className="source-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h4>{source.title}</h4>
                        <p>{new URL(source.url).hostname}</p>
                      </div>

                      <span className="source-arrow">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="features">
          <div>
            <span>✦</span>
            AI-powered research
          </div>

          <div>
            <span>◈</span>
            Web-powered answers
          </div>

          <div>
            <span>↗</span>
            Source references
          </div>
        </div>
      </main>
    </div>
  )
}

export default App