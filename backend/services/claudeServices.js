require("dotenv").config();
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateBlogPost({ topic, keywords = [], tone = "professional" }) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,             // ← increased from 2000
    messages: [
      {
        role: "user",
        content: `You are a content writer for Akountin Professionals, a UK-based accounting firm.

Write a blog post about: "${topic}"
${keywords.length ? `Keywords to include: ${keywords.join(", ")}` : ""}
Tone: ${tone}
Audience: UK small business owners, sole traders, limited company directors, and contractors.

Guidelines:
- Use British English spelling (e.g. "organisation", "recognised", "favour")
- Reference UK-specific legislation and HMRC rules where relevant
- Use **bold text** for section headings (no markdown # headers)
- Separate paragraphs with a blank line
- Keep the total post under 600 words so the response stays concise

Return ONLY valid JSON — no markdown fences, no preamble, no explanation:
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "...",
  "tags": ["...", "..."],
  "metaDescription": "..."
}`,
      },
    ],
  });

  const raw = message.content[0].text.replace(/```json|```/g, "").trim();

  // Debug: log raw response if parse fails
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse Claude response. Raw output:");
    console.error(raw.slice(0, 500)); // log first 500 chars
    throw new Error("Claude returned invalid JSON. Try again.");
  }

  return parsed;
}

module.exports = { generateBlogPost };