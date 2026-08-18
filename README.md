# Chrome Extension Template

### MV3 || React 19 || Tailwind 4 || TypeScript || Webpack 5

An agentic-first Chrome Extension (Manifest V3) boilerplate. The repo is pre-configured so AI coding tools (Claude Code, Kilo, Cursor, Codex, Cline) can pick up context, skills, and a DevTools testing loop with minimal setup.

## Getting Started

```bash
npm i          # Install dependencies
npm start      # Webpack watch mode → bundles into dist/
npm run build  # Production build
npm run zip    # Generate build-zip/webstore.zip for Chrome Web Store
```

## Loading The Chrome Extension (Manual)

1. Open Chrome → `chrome://extensions/`
2. Toggle on **Developer mode** (top right)
3. Click **Load unpacked** → select the `dist/` folder
4. After code changes rebuild (`npm start`), click **Reload** on the extension card



## [Agentic Development Setup](https://developer.chrome.com/blog/extensions-io-2026)

This repo uses a **single source of truth** for agent instructions, so every tool behaves the same way:


| Layer        | Location                                                                  | Consumed by                                                                                     |
| ------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Instructions | `CLAUDE.md` (all project guidance) + `AGENTS.md` (pointer to `CLAUDE.md`) | Claude Code, Kilo, Codex, Cline                                                                 |
| Skills       | `.claude/skills/` (`chrome-extensions`, `modern-web-guidance`)            | Claude Code (native), Kilo (via `kilo.json` → `skills.paths`), Cursor (via `.cursorrules` refs) |
| Cursor rules | `.cursorrules`                                                            | Cursor                                                                                          |
| DevTools MCP | `.mcp.json` (Claude Code), `kilo.json` (Kilo)                             | Claude Code, Kilo                                                                               |


The agreed agent workflow (documented in `CLAUDE.md`) is: **read context → load only relevant skills → implement → test in the isolated Chrome profile → verify → concise report**.

### Claude Code

- **Auto-loads** `AGENTS.md` + `CLAUDE.md`
- **Skills**: auto-discovers `.claude/skills/`
- **DevTools MCP**: reads `.mcp.json`
- **Permissions**: `.claude/settings.json`



### Kilo (CLI / VS Code extension)

- **Auto-loads** `AGENTS.md` + `CLAUDE.md`
- **Skills**: `kilo.json` → `"skills": { "paths": ["./.claude/skills"] }`
- **DevTools MCP + permissions**: `kilo.json` (`mcp` + `permission` blocks)
- After changing `kilo.json`, restart Kilo or reload the window (`Ctrl/Cmd+Shift+P` → "Developer: Reload Window")



### Cursor

- Uses `.cursorrules` (no other config needed)
- Skills are referenced by path in `.cursorrules` — the agent reads them on demand



### Codex / Cline

- Both read `AGENTS.md` / `CLAUDE.md` automatically
- Skills live in `.claude/skills/` — reference them by path if needed



## [DevTools MCP (Agentic Testing)](https://developer.chrome.com/docs/devtools/agents/get-started)

The `chrome-devtools-mcp` server lets the agent drive a real Chrome instance: load the extension, navigate sites, interact with popup/options/side panel, take screenshots, read console/network, and run Lighthouse/performance traces.

### Configuration (already in the repo)

- **Claude Code**: `.mcp.json`
- **Kilo**: `kilo.json`
- Others:  
[https://github.com/ChromeDevTools/chrome-devtools-mcp/#mcp-client-configuration](https://github.com/ChromeDevTools/chrome-devtools-mcp/#mcp-client-configuration)

Both launch an **isolated Chrome profile** (`.chrome-mcp-profile`, gitignored) with `--loadExtension ./dist`, so your personal Chrome profile and credentials are never touched.

- If you want to use DevTools in a logged-in website, then you have to use a real Chrome profile. Because , chrome will not allow to signup in an isolated profile. ( We recommend to use an unimportant profile to run devtool. And to avoid conflict, only open that profile while devtool is running. You can use other browser/chrome canary for regular using atm )

    Change the ***args*** property in `.mcp.json`  to 

        ``` 
        "args": [
            "chrome-devtools-mcp@latest",
            "--categoryExtensions",
            "--autoConnect"
        ],
    

    And change the ***command*** property to: 
    ```
    "command": ["npx", "chrome-devtools-mcp@latest", "--categoryExtensions", "--autoConnect"],


### Permissions

- **Claude Code**: `.claude/settings.json` (deny/ask/allow per tool)
- **Kilo**: `kilo.json` → `permission` (broad `chrome-devtools_*: ask`, with high-risk tools explicitly denied and safe testing tools pre-approved)
- Adjust these to match your comfort level — e.g. keep `evaluate_script` / `get_network_request` denied if you want zero access to page internals


### ⚠️ Manual steps in Chrome (required)

Open Chrome, navigate to `chrome://inspect/#remote-debugging` and select **Allow remote debugging for this browser instance**.

#### After configuring the Devtool , relaunch Claude code/ Kilo code and chrome profile to apply the changes. 



### [Troubleshooting:](https://developer.chrome.com/docs/devtools/agents/get-started#troubleshoot_your_setup)

- **Extension not loading** → ensure `dist/` exists (`npm start`) and the extension is enabled in the isolated profile's `chrome://extensions/`
- **MCP config changes not taking effect** → restart the tool (Claude Code: `/mcp`; Kilo: `/mcps` or reload window)
- **Stale code being tested** → ask to rebuild + reload the extension in the isolated profile
- **Permission prompts interrupting tests** → add the tool to the allow list in your tool's settings



## Security

- DevTools MCP runs on an **isolated profile** (`.chrome-mcp-profile`) — never `--autoConnect` to your real Chrome. Details [here](https://developer.chrome.com/docs/devtools/agents/get-started/configuration#configuration_options_reference).
- Test against `localhost`, demo sites, or explicitly authorized sites
- The agent never handles credentials — logins are always performed by you, manually
- `.chrome-mcp-profile/` is gitignored; delete it any time to wipe the test profile and to start fresh profile ( your session data will be removed )



## For Production Build  
> [https://developer.chrome.com/docs/extensions/ai/build-with-ai#chromewebstoremd_agent_instructions](https://developer.chrome.com/docs/extensions/ai/build-with-ai#chromewebstoremd_agent_instructions)  
> [https://developer.chrome.com/docs/extensions/ai/build-with-ai#prompt_examples_to_streamline_distribution_with_chromewebstoremd](https://developer.chrome.com/docs/extensions/ai/build-with-ai#prompt_examples_to_streamline_distribution_with_chromewebstoremd)

```bash
npm i
npm run build     # Production build
npm run zip       # Creates build-zip/webstore.zip
```

See the `chrome-extensions` skill in `.claude/skills/` for Chrome Web Store submission guidance (permission justifications, privacy policy, store listing, review rejections).
