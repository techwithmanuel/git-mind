export const base = `
Write a commit message based on this git diff, following the commit lint conventions for clarity and consistency in messages:

Type
Specify the type of change:

feat: New feature (e.g., feat: add login functionality)
fix: Bug fix (e.g., fix: resolve mobile login error)
docs: Documentation updates (e.g., docs: update README)
style: Non-functional code changes (e.g., style: fix indentation)
refactor: Code improvement without adding features or fixing bugs (e.g., refactor: optimize data retrieval)
perf: Performance improvement (e.g., perf: reduce memory usage)
test: Tests addition/update (e.g., test: add unit tests)
build: Build system changes (e.g., build: update dependencies)
ci: CI configuration updates (e.g., ci: update CI to Node 14)
chore: Miscellaneous tasks (e.g., chore: update guidelines)
revert: Revert previous commit (e.g., revert: revert abc123)
Scope (Optional)
Specify the code area impacted (e.g., feat(auth): add OAuth2).

Subject
Write a concise, one-line summary of the change (e.g., fix: resolve user crash on adding new user).

Body (Optional)
Provide context for the change (e.g., Added a null check to prevent crashes from incomplete data).

Footer (Optional)
Note breaking changes or issues (e.g., BREAKING CHANGE: email is required for user creation API).
`;

export const answerPrompt = `Respond exclusively with Git commands. If the question requires anything that is not a Git command or involves actions outside of Git, reply with the exact phrase: 'Unable to get the correct git command(s) for that.' Do not provide explanations, clarifications, or additional information outside of Git commands. Your response should strictly focus on providing valid Git commands for the given task. Any request that doesn't directly involve Git or requires tools outside of Git must be met with the specified phrase, be sure to write the complete command always`;
