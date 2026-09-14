const axios = require("axios")

const research = async (question) => {
  const searchResponse = await axios.post(
    "https://api.tavily.com/search",
    {
      api_key: process.env.TAVILY_API_KEY,
      query: question,
      search_depth: "advanced",
      max_results: 5,
      include_answer: false
    }
  )

  const sources = searchResponse.data.results.map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content
  }))

  const researchContext = sources
    .map(
      (source, index) =>
        `Source ${index + 1}:\nTitle: ${source.title}\nURL: ${source.url}\nContent: ${source.content}`
    )
    .join("\n\n")

  const aiResponse = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are a research assistant. Answer the user's question using the provided web research. Give a clear, accurate and well-organized answer. Do not invent facts."
        },
        {
          role: "user",
          content: `Research question: ${question}

Web research:
${researchContext}`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  )

  return {
    answer: aiResponse.data.choices[0].message.content,
    sources
  }
}

module.exports = research