# Manage Claude

To manage your GPT API key, use the following commands:

### Setting Your API Key

Run the command below to add, update, or delete your Claude API key:

```bash
# Locally installed
git-mind manage-claude

# With npx
npx git-mind@latest manage-claude
```

### You will be presented with three options:

- Add API Key: Provide your API key for GPT.

- Update API Key: Replace the existing key with a new one.

- Delete API Key: Remove the saved GPT API key.

### How to Obtain a GPT API Key

1. Visit [Claude API Portal](https://console.anthropic.com)

2. Complete the authentication flow; login or signup

3. Create an organization

4. Copy the [key](https://console.anthropic.com/settings/keys) and the run the `git-mind manage-claude` command

5. Select `Register API key` the paste your API key
