// services/claudeService.js
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateBlogPost({
  topic,
  keywords = [],
  tone = "professional",
}) {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are a content writer for Akountin Professionals, a UK-based accounting firm.

Write a blog post about: "${topic}"
Keywords to include: ${keywords.join(", ")}
Tone: ${tone}
Audience: UK small business owners and entrepreneurs

Return ONLY valid JSON in this format:
{
  "title": "...",
  "slug": "...",         // URL-friendly, hyphenated
  "excerpt": "...",      // 1-2 sentence summary
  "content": "...",      // Full post in Markdown
  "tags": ["...", "..."],
  "metaDescription": "..." // SEO meta description, max 160 chars
}`,
      },
    ],
  });

  const raw = message.content[0].text;
  return JSON.parse(raw);
}
