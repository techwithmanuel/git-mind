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
      { text: "Showcase", link: "/showcase" },
      { text: "Changelog", link: "/changelog" },
      { text: "License", link: "/license" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} Emmanuel Alozie`,
    },

    sidebar: [
      {
        text: "Get Started",
        items: [
          { text: "Introduction", link: "/guide/" },
          { text: "Quick Start", link: "/guide/quick-start" },
          { text: "Demo", link: "/showcase.md" },
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
