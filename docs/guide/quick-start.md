# Quick Start

Follow these steps to get started with git-mind:

### 1. Install git-mind

```bash
npm install -g git-mind
```

or with npx

```bash
npx git-mind@latest <command>
```

### 2. Initialize a Git Commit / Commit your changes

Use the init command to generate a commit message for your changes:

```bash
git-mind init
```

Or with npx

```bash
npx git-mind@latest init
```

### 3. Manage API Keys

Set up API keys for the AI models you want to use:

```bash
# For Gemini
git-mind manage-gemini

# For Claude
git-mind manage-claude

# For GPT
git-mind manage-gpt
```

or with npx

```bash
npx git-mind@latest manage-gemini
npx git-mind@latest manage-claude
npx git-mind@latest manage-gpt
```

### 4. Select a Default Model

Choose the AI model you want to use by default:

```bash
git-mind select-default
```

or with npx

```bash
npx git-mind@latest select-default
```

### 5. Ask AI for Help

If you’re stuck with a git-related question, ask the AI directly:

```bash
git-mind ask "How do I revert the last commit?"
```

or with npx

```bash
npx git-mind@latest ask "How do I revert the last commit?"
```
