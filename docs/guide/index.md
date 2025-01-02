# Introduction

Hi, I’ve been working on projects for over 5 years, and during this time, I built a tool called lint-commit to make my workflow more efficient. After using it for about a year, I realized it saved me an incredible amount of time by automating commit message creation, especially when working on larger projects with multiple team members.

While lint-commit was effective, I wanted to do even more. I took the learnings from that tool and rebuilt it from the ground up as git-mind. This new tool is designed to generate intelligent, AI-powered git commit messages, ensuring that commit messages are not only helpful for teams and code reviews, but also improve the quality of a project by avoiding poorly written, amateurish messages.

git-mind follows the Commitlint convention to generate standardized commit messages, ensuring consistency across projects. The supported commit message types include:

- **feat**: A new feature for the user.
- **fix**: A bug fix for the user.
- **docs**: Documentation changes.
- **style**: Code style changes (e.g., formatting, white-space).
- **refactor**: Code changes that neither fix a bug nor add a feature.
- **perf**: Performance improvements.
- **test**: Adding or modifying tests.
- **chore**: Other changes that don't modify the source code (e.g., updates to build tasks or configuration files).

`git-mind` is currently in beta. While there won’t be any breaking changes during this stage, it is open to community contributions and feature suggestions. Some key design decisions include:

If the number of files to be staged exceeds 5, git-mind consolidates all changes into a single commit to save resources.
git-mind doesn’t cover every possible use case, which is why the `git-mind ask <question>` command exists. This command prompts AI models to provide git-related responses exclusively. If the query isn’t git-related, the tool will respond with "Unable to process that."
I’m excited to share git-mind and look forward to seeing how it can help developers worldwide streamline their workflows.
