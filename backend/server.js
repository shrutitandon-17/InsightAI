require("dotenv").config()

const express = require("express")
const cors = require("cors")
const research = require("./research")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "InsightAI backend is running" })
})

app.post("/api/research", async (req, res) => {
  try {
    const { question } = req.body

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Question is required"
      })
    }

    const answer = await research(question)

    res.json(answer)
  } catch (error) {
    console.error(error.response?.data || error.message)

    res.status(500).json({
      error: "Research request failed"
    })
  }
})

app.listen(5000, () => {
  console.log("Backend running on port 5000")
})