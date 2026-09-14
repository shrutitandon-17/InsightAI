# InsightAI — AI Research Assistant

InsightAI is a full-stack AI-powered research assistant that takes a user's research question, searches the web for relevant information, and uses an AI language model to generate a clear answer with source references.

## Features

* AI-powered research workflow
* Web search using Tavily
* AI-generated answers using OpenRouter
* Source references with clickable URLs
* Loading and error handling
* Clean and responsive React interface
* About section with project technology details

## How It Works

```text
User Question
      ↓
React Frontend
      ↓
Node.js + Express Backend
      ↓
Tavily Web Search
      ↓
Relevant Web Sources
      ↓
OpenRouter LLM
      ↓
AI-Generated Answer
      ↓
Answer + Sources
      ↓
React UI
```

## Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js
* Axios

### AI & APIs

* Tavily Search API
* OpenRouter API

## Project Structure

```text
InsightAI/
├── backend/
│   ├── research.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shrutitandon-17/InsightAI.git
cd InsightAI
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Start the backend:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Research Flow

1. The user enters a research question.
2. The React frontend sends the question to the Express backend.
3. The backend sends the question to Tavily.
4. Tavily returns relevant web search results.
5. The backend collects the retrieved information.
6. The collected research is sent to an LLM through OpenRouter.
7. The LLM generates a clear research answer.
8. The backend returns the answer and source URLs.
9. The React frontend displays the answer and clickable sources.

## Security

API keys are stored in environment variables and are excluded from Git using `.gitignore`.

Never commit API keys or other sensitive credentials to the repository.

## Future Improvements

* Conversation history
* Multiple research modes
* Improved source ranking
* Export research reports
* User authentication
* Deployment with a live public URL

## Author

**Shruti Tandon**

B.Tech Information Technology — 2026

GitHub: https://github.com/shrutitandon-17
