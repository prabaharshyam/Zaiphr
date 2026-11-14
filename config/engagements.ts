/**
 * How clients work with us. Replaces price lists: every engagement is scoped and priced
 * after a discovery conversation.
 */
export interface Engagement {
  name: string;
  duration: string;
  summary: string;
  outcomes: string[];
}

export const engagements: Engagement[] = [
  {
    name: "Opportunity Sprint",
    duration: "2–3 weeks",
    summary: "Find and size the AI opportunities worth pursuing, and leave with a costed roadmap.",
    outcomes: ["Ranked use-case portfolio", "Business cases", "12-month roadmap"],
  },
  {
    name: "Labs Prototype",
    duration: "4–6 weeks",
    summary: "Prove one high-value use case on your own data, with clear go or no-go criteria.",
    outcomes: ["Working prototype", "Evaluation results", "Production plan"],
  },
  {
    name: "Production Build",
    duration: "8–16 weeks",
    summary: "Engineer, secure and launch the system, integrated with the tools your teams use.",
    outcomes: ["Production system", "Integrations", "Runbooks & training"],
  },
  {
    name: "Run & Evolve",
    duration: "Ongoing",
    summary: "Monitor, evaluate and improve what's live, and extend it as needs grow.",
    outcomes: ["Monitoring & evaluation", "Monthly improvements", "Impact reporting"],
  },
];
