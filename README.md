<p align="center">
  <img width="100" height="100" alt="Motion logo" src="./docs/public/logo.svg" />
</p>
<h1 align="center">Git Mind</h1>
<h3 align="center">
 A CLI tool that generates  git commit messages using AI, <br /> with support for Gemini, ChatGPT, and Claude AI.
</h3>

## Features

- Generate AI-powered Git commit messages.
- Supports multiple AI models: **Gemini**, **ChatGPT**, and **Claude**.
- Easy to use command-line interface (CLI).
- Manage API keys for each supported AI model.
- Ask Git-related questions and get intelligent responses.
- View the complete [documentation](https://git-mind.vercel.app)

## Installation

To use Git Mind, you need to have **Node.js** installed on your system.

1. Install using npx:

   ```bash
   git install -g git-mind

   # Linux or Mac
   sudo git install -g git-mind
   ```

2. You can now use the git-mind CLI tool.

## Usage

Once installed, you can use the git-mind CLI tool to manage your Git commit messages and interact with different AI models.

Refer to the [documentation for the full guide](https://git-mind.vercel.app)

### Available Commands

- `git-mind init`
  - Description: Initialize Git Commit.
  - Action: Starts the Git commit message generation process.
- `git-mind manage-gemini`
  - Description: Manage the Gemini model API key.
  - Action: Allows you to manage the Gemini model API key for generating messages.
- `git-mind manage-claude`
  - Description: Manage the Claude model API key.
  - Action: Allows you to manage the Claude model API key for generating messages.
- `git-mind manage-gpt`
  - Description: Manage the GPT model API key.
  - Action: Allows you to manage the GPT model API key for generating messages.
- `git-mind select-default`
  - Description: Select the default AI model.
  - Action: Allows you to select the default AI model for commit message generation.
- `git-mind ask <question>`
  - Description: Ask Git-related questions.
  - Action: Lets you ask Git-related questions and get intelligent responses based on the selected model.

## Help Command

To display a list of available commands and options, you can run:

```bash
git-mind -h

# or

git-mind --help
```

This will show a summary of all available commands and how to use them.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository, create a new branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE.md) file for details.
