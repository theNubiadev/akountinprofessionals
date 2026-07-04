const { randomUUID } = require("crypto");

// Shared mutable array — both blog.js and admin.js import this same reference.
// Swap this out for a real DB query in production.
const posts = [
  {
    id:              randomUUID(),
    slug:            "understanding-self-assessment-deadlines-2024-25",
    title:           "Understanding the 2024–25 Self-Assessment Deadlines",
    excerpt:
      "Miss the 31 January deadline and HMRC issues automatic penalties. Here's every date you need to diary.",
    content: `**Overview**

Every year, millions of UK taxpayers must file a Self Assessment return. The consequences of missing key deadlines range from a £100 fixed penalty to daily charges of £10 after three months.

**Key dates for 2024–25**

The paper filing deadline falls on 31 October 2024. Online filing must be completed by 31 January 2025. Any tax owed for 2023–24 — plus the first payment on account for 2024–25 — is also due on 31 January 2025.

**Who needs to file**

You must file if you are self-employed, a company director, or earned more than £100,000 in the tax year. HMRC will usually write to you if they believe you need to file, but the responsibility for registering ultimately rests with you.

**Penalties for late filing**

A £100 fixed penalty applies immediately after the deadline. After three months, £10 per day is charged up to a maximum of £900. Six months late triggers a further penalty of 5% of the tax due or £300, whichever is greater.`,
    tags:            ["Self Assessment", "HMRC", "Tax Deadlines"],
    authorName:      "Sarah Williams",
    author:          "editor",
    status:          "published",
    readingMinutes:  4,
    metaDescription:
      "Key self-assessment deadlines for the 2024-25 tax year, penalties for late filing, and who needs to register.",
    createdAt:   new Date(Date.now() - 86400000 * 5).toISOString(),
    publishedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id:              randomUUID(),
    slug:            "corporation-tax-changes-small-business-2023",
    title:           "Corporation Tax Changes: What Small Businesses Must Know",
    excerpt:
      "The main rate rose to 25% for profits over £250,000. We break down the marginal relief rules so you know exactly where you stand.",
    content: `**The new rate structure**

From April 2023, the UK Corporation Tax landscape changed significantly. Companies with profits up to £50,000 continue to pay at the small profits rate of 19%. Profits above £250,000 are taxed at the new main rate of 25%.

**Marginal relief**

Companies with profits between £50,000 and £250,000 benefit from marginal relief, which tapers the effective rate between 19% and 25%. The formula can be complex, and the thresholds are divided by the number of associated companies — making group structures more important to review.

**What you should do now**

Review your profit forecasts for the current year and model the impact of the new rate. If you operate multiple companies, assess whether any qualify as associated under HMRC's rules. Consider the timing of dividend payments and capital expenditure in light of the Annual Investment Allowance.`,
    tags:            ["Corporation Tax", "Limited Company", "Tax Planning"],
    authorName:      "Sarah Williams",
    author:          "editor",
    status:          "draft",
    readingMinutes:  3,
    metaDescription:
      "Corporation Tax changes from April 2023 explained — rates, marginal relief, and planning steps for small businesses.",
    createdAt:   new Date(Date.now() - 86400000 * 2).toISOString(),
    publishedAt: null,
  },
];

module.exports = { posts };