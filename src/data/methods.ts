/**
 * methods.ts — the frameworks and ideas we actually use, with named sources.
 *
 * `category` is a plain string — define your own. MethodStack derives its pill
 * filters from these categories in first-appearance order.
 */

export interface Method {
  name: string;
  source: string;
  use: string;
  category: string;
}

export const methods: Method[] = [
  {
    name: "Shape Up",
    source: "Basecamp",
    use: "Six-week cycles with an appetite instead of an estimate. If it doesn't fit, we cut scope, not quality.",
    category: "product",
  },
  {
    name: "Getting Real",
    source: "37signals",
    use: "Build the smallest honest version first. Say no to features until they earn their way in.",
    category: "product",
  },
  {
    name: "The Mom Test",
    source: "Rob Fitzpatrick",
    use: "Ask users about their life and past behavior, never about our idea. Compliments are not data.",
    category: "decision-making",
  },
  {
    name: "RICE prioritization",
    source: "Intercom",
    use: "Reach × impact × confidence ÷ effort. Mostly a way to argue about confidence out loud.",
    category: "decision-making",
  },
  {
    name: "Trunk-Based Development",
    source: "Paul Hammant",
    use: "Everyone commits to main behind feature flags. Long-lived branches are where momentum goes to die.",
    category: "engineering",
  },
  {
    name: "The Twelve-Factor App",
    source: "Adam Wiggins",
    use: "Config in the environment, stateless processes, logs as streams. Boring on purpose.",
    category: "engineering",
  },
  {
    name: "On Writing Well",
    source: "William Zinsser",
    use: "Cut every word that earns nothing. It's why the changelog reads like a person wrote it.",
    category: "writing",
  },
  {
    name: "Show Your Work!",
    source: "Austin Kleon",
    use: "Share the process, not just the finished thing. This whole page is the method applied.",
    category: "writing",
  },
];
