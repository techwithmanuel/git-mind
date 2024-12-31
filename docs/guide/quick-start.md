# Quick Start

Follow these steps to get started with git-mind:

### 1. Install git-mind

```bash
# Locally installed
npm install -g git-mind

# with npx
npx git-mind@latest <command>
```

### 2. Initialize a Git Commit / Commit your changes

Use the init command to generate a commit message for your changes:

```bash
# Locally installed
git-mind init

# with npx
npx git-mind@latest init
```

### 3. Manage API Keys

Set up API keys for the AI models you want to use:

```bash
# For Gemini
git-mind manage-gemini

# with npx
npx git-mind@latest manage-gemini

# For Claude
git-mind manage-claude

# with npx
npx git-mind@latest manage-claude

# For GPT
git-mind manage-gpt

# with npx
npx git-mind@latest manage-gpt
```

### 4. Select a Default Model

Choose the AI model you want to use by default:

```bash
# Locally installed
git-mind select-default

# with npx
npx git-mind@latest select-default
```

### 5. Ask AI for Help

If you’re stuck with a git-related question, ask the AI directly:

```bash
# Locally installed
git-mind ask "How do I revert the last commit?"

# with npx
npx git-mind@latest ask "How do I revert the last commit?"
```
