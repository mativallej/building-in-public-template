/**
 * team.ts — the people building it.
 *
 * `photo` is optional; with none, the page renders an initials block. `links`
 * accept "linkedin" | "x" | "github" | "web". Everything here is fictional.
 */

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio: string;
  links: { type: "linkedin" | "x" | "github" | "web"; href: string }[];
}

export const team: TeamMember[] = [
  {
    name: "Alex Founder",
    role: "Product & code",
    bio: "Decides what Acme Tasks does and doesn't do, and writes most of the words on this page. Believes the best roadmap is a short one you actually finish.",
    links: [
      { type: "x", href: "https://x.com/acmetasks" },
      { type: "github", href: "https://github.com/acmetasks" },
      { type: "web", href: "https://acme.example.com" },
    ],
  },
  {
    name: "Sam Builder",
    role: "Code & ops",
    bio: "Keeps the servers up and the editor fast. Rolled back realtime sync without blinking and would do it again. Prefers boring technology that sleeps through the night.",
    links: [
      { type: "github", href: "https://github.com/acmetasks" },
      { type: "linkedin", href: "https://www.linkedin.com/company/acme-tasks" },
    ],
  },
];
