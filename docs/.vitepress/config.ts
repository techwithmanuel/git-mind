import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Git Mind",
  titleTemplate: "The End of Writing Git Commits",
  description:
    "A CLI tool that generates intelligent git commit messages using AI, with support for Gemini, ChatGPT, and Claude AI.",

  head: [
    [
      "meta",
      {
        name: "description",
        content:
          "A CLI tool that generates intelligent git commit messages using AI, supporting Gemini, ChatGPT, and Claude AI.",
      },
    ],
    ["link", { rel: "icon", href: "/logo.ico" }],
  ],

  themeConfig: {
    logo: {
      src: "/logo.svg",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide" },
    ],

    sidebar: [
      {
        text: "Get Started",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Quick Start", link: "/guide/quick-start" },
        ],
      },
      {
        text: "Models",
        items: [
          { text: "Gemini (Preferred)", link: "/guide/models/gemini" },
          { text: "OpenAI GPT", link: "/guide/models/gpt" },
          { text: "Claude", link: "/guide/models/claude" },
        ],
      },
      {
        text: "Ask Models",
        items: [{ text: "Command", link: "/guide/ask" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/techwithmanuel/git-mind" },
      { icon: "x", link: "https://x.com/techwithmanuel" },
    ],
  },
});
