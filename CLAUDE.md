# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Chrome Extension Manifest V3** boilerplate built with React 19, TypeScript, Webpack 5, and Tailwind CSS 4. The extension demonstrates a complete MV3 setup with multiple UI surfaces (popup, options page, side panel) and content script integration using Shadow DOM for React components.

## Development Commands

```bash
npm start      # Start development build with webpack watch mode
npm run build  # Create production-optimized build
npm run zip    # Generate webstore.zip from dist/ for Chrome Web Store submission
npm install    # Install dependencies
```

**Development Workflow:**
1. Run `npm start` to build and watch for changes
2. Navigate to `chrome://extensions/` and load the unpacked `dist/` folder
3. Changes rebuild automatically; reload the extension to test

## Architecture

### Entry Points (Webpack Configuration)

The extension is organized into multiple independent entry points, defined in `webpack.common.js`:

- **popup**: `src/popup/popup.tsx` — The action button popup UI
- **options**: `src/options/options.tsx` — Settings/options page
- **sidePanel**: `src/sidePanel/sidePanel.tsx` — Side panel UI (MV3 feature)
- **background**: `src/background/background.ts` — Service worker (MV3, not background page)
- **contentScript**: `src/contentScript/contentScript.ts` — Content script runner
- **main**: `src/contentScript/main.tsx` — React component injected via Shadow DOM into web pages

### Chunking Strategy

Webpack chunk splitting excludes content script and background service worker:
- **Isolated chunks**: contentScript, background, main, tailwind — loaded without shared code
- **Shared chunks**: popup, options, sidePanel — common code extracted to reduce file size

This prevents content scripts from growing too large and ensures each script is self-contained.

### Content Script & Shadow DOM

The project uses Shadow DOM to isolate React components in content scripts:
- `contentScript.ts` initializes and injects the Shadow DOM container
- `main.tsx` renders React components within the Shadow DOM
- Tailwind CSS is exposed as a web-accessible resource to style content within the Shadow DOM

This isolation prevents style/script conflicts with host page CSS and JavaScript.

### Manifest V3 Features

**Key Permissions & Capabilities:**
- `sidePanel` — Enables the side panel UI surface
- `tabs` — Allows extension to interact with browser tabs
- `content_scripts` — Matches `<all_urls>` to inject into all web pages
- No background page (replaced by service worker in MV3)

See `src/static/manifest.json` for the full manifest.

## File Structure

```
src/
├── static/              # Static assets copied to dist/
│   └── manifest.json   # MV3 manifest
├── popup/              # Action popup UI
│   ├── popup.tsx
│   └── popup.css
├── options/            # Options page
│   ├── options.tsx
│   └── options.css
├── sidePanel/          # Side panel UI
│   ├── sidePanel.tsx
│   └── sidePanel.css
├── background/         # Service worker (runs in background)
│   └── background.ts
├── contentScript/      # Content script & injected React component
│   ├── contentScript.ts     # Initializes Shadow DOM and injects main.tsx
│   ├── main.tsx             # React component to render in Shadow DOM
│   └── contentComponent.tsx  # Sample component
├── Icons.tsx           # Lucide React icon exports (used across UIs)
├── utils.ts            # Shared utility functions
└── tailwind.css        # Base Tailwind imports (exposed as web-accessible resource)
```

## Build Output

After `npm run build` or `npm start`, the `dist/` folder contains:
- `popup.html`, `options.html`, `sidePanel.html` — HTML files for UI surfaces
- `popup.js`, `options.js`, `sidePanel.js` — Bundled scripts
- `background.js` — Service worker
- `contentScript.js`, `main.js` — Content script bundle
- `*.css` — Extracted stylesheets for each entry point
- `manifest.json` — Copied from `src/static/`
- Other assets from `src/static/`

**Loading in Chrome:**
1. Go to `chrome://extensions/`
2. Enable Developer Mode (top right)
3. Click "Load unpacked" and select the `dist/` folder

## Build Tools & Configuration

- **Webpack 5** (`webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`) — Bundles TypeScript/React
- **TypeScript** — Type checking (tsconfig.json)
- **Tailwind CSS 4** with PostCSS — Utility-first styling
- **ts-loader** — Webpack TypeScript compilation
- **MiniCssExtractPlugin** — Extracts CSS to separate files
- **HtmlWebpackPlugin** — Generates HTML for UI surfaces
- **CleanWebpackPlugin** — Cleans dist/ before each build
- **CopyPlugin** — Copies static assets to dist/

## Key Context

- **React 19 & React DOM** — Used for popup, options, side panel, and content script UI
- **Lucide React** — Icon library (Icons.tsx re-exports commonly used icons)
- **react-hot-toast** — Toast notifications
- **Shadow DOM isolation** — Content script React components are styled independently
- **No external API calls** — Extension is self-contained; add permissions in manifest if needed

## Chrome Web Store Publishing

When ready to publish:
1. Update `manifest.json` version
2. Run `npm run build && npm run zip` to create `build-zip/webstore.zip`
3. Use the chrome-extensions skill (`/chrome-extensions`) for submission guidance and CHROMEWEBSTORE.md creation

## When to Use Skills (Token-Efficient)

Invoke skills **only when needed** to avoid unnecessary token cost:

- **`/chrome-extensions`** — Only for:
  - Changes to `manifest.json` or extension-specific APIs (tabs, sidePanel, content scripts)
  - Service worker logic or Chrome extension permissions
  - Publishing or Chrome Web Store submission
  - **Skip for**: Refactoring existing code, variable renaming, fixing non-API bugs

- **`/modern-web-guidance`** — Only for:
  - Creating new UI layouts or modifying CSS/HTML structure
  - Accessibility issues or form components
  - Performance concerns (LCP, responsive design, animations)
  - **Skip for**: Logic changes, event handler updates, component state fixes, refactoring

Both skills are reference/documentation lookups — use them when you genuinely need current best practices or API guidance, not for routine code changes.

## Persistent Workflow

Follow this workflow for every task:

1. **Check persistent project context** — Read `AGENTS.md` and `CLAUDE.md` (and any similar instruction files) for coding rules, conventions, commands, and architecture notes. Follow them before making changes.

2. **Load skills selectively** — Inspect the skills available in `.agents/`/`.claude`. Load **only** the skills relevant to the current task (per the "When to Use Skills" section above). Never load the whole skills folder — keep token usage minimal while still following all relevant instructions.

3. **Understand and implement the task** — Inspect the relevant code and existing architecture before changing anything. Make the required changes following project instructions and conventions. Avoid modifications outside the scope of the task.

4. **Run the extension in an isolated Chrome profile** — The DevTools MCP is configured to launch a dedicated isolated profile (see "Security" section below). Load the extension and open the appropriate test page. **If authentication is required and user credentials or an interactive login are needed, STOP and ask the user to perform the login.** Once the user completes the login, continue the task. Preserve the authenticated session (`.chrome-mcp-profile` persists on disk) so the user does **not** have to log in again for every subsequent task.

5. **Verify the result** — Use the verification method appropriate to what changed:
   - **UI-change task**: take a screenshot AND an accessibility/DOM snapshot; inspect the result.
   - **Code-related or UX task**: perform the relevant interactions and verify behavior.
   - Note: the agent model may not be able to view images — prefer a11y snapshots, console checks, and network inspection as primary verification, with screenshots as supplements.
   - If something is wrong, investigate and fix it yourself, then re-verify.

6. **Final report** — Give a concise report containing:
   - What was changed
   - Which relevant instructions/skills were used
   - How the change was verified
   - Any issues encountered and how they were fixed
   - Any remaining limitations or manual steps for the user

The goal is a workflow that is **persistent, efficient, token-conscious, and self-verifying**, while minimizing unnecessary skill/context loading and avoiding repeated authentication.

## Testing Changes with DevTools MCP

DevTools MCP is configured in `.mcp.json` and available for testing. When making changes:

**UI/CSS changes only** → Take screenshot(s)
```
npm start
# Then prompt: "Take a screenshot of the [popup|options|sidePanel] to verify my UI changes"
```

**Logic/functionality changes only** → Test with interactions
```
npm start
# Then prompt: "Load the extension and test [feature]: try [action], then [action], verify [expected result]. Take screenshots at each step."
```

**Both UI + logic changes** → Do both
```
npm start
# Then prompt: "Load the extension, test [feature] by [actions], and show screenshots of the results"
```

DevTools MCP will:
- Launch Chrome
- Load the unpacked extension from `dist/`
- Interact with it (click, fill, type, navigate)
- Take screenshots and check console for errors
- Report any failures or unexpected behavior

**Always run `npm start` before testing** — changes rebuild automatically, then test the `dist/` folder.

## Security: DevTools MCP & Isolated Profile

DevTools MCP access is restricted to a separate Chrome profile to prevent credential/PII exposure:

**Profile Setup:**
- DevTools MCP is configured in `.mcp.json` with `--userDataDir ./.chrome-mcp-profile` — a project-local Chrome profile, entirely separate from your system Chrome profiles (`.chrome-mcp-profile` is gitignored)
- `--loadExtension ./dist` auto-loads the built extension into that profile
- Your personal Chrome profile with real credentials is never touched by DevTools MCP — it's a different `userDataDir` altogether, not just a different named profile within the same Chrome install

**Tool-level guardrails (`kilo.json` permission block is the source of truth):**
- `evaluate_script` and `get_network_request` are currently **allowed** in `kilo.json`. This is only safe because the MCP is attached to the isolated profile (no real credentials/PII present). If the MCP is ever switched back to `--autoConnect` (real Chrome), these must be set back to `deny` — `evaluate_script` runs arbitrary JS against the loaded page and `get_network_request` reads request/response bodies (headers, tokens, cookies).
- **Pre-approved without prompting**: `list_pages`, `navigate_page`, `list_extensions`, `install_extension`, `uninstall_extension`, `reload_extension`, `trigger_extension_action`, `performance_start_trace`, `performance_stop_trace`, `performance_analyze_insight`, `lighthouse_audit` — these let testing run end-to-end without per-call approval
- Everything else (click, fill, type, screenshot, snapshot, console/network listing, etc.) falls back to `chrome-devtools_*: ask` — prompts for confirmation per call

**Testing Constraints:**
- Test only against `localhost`, demo sites, or sites the user explicitly authorizes
- The agent NEVER types or handles credentials — the user always performs logins manually
- Before any DevTools testing, the extension code is reviewed for safety
- Subagents do NOT have DevTools MCP access — only the main Claude instance

**If Testing Requires a Real Account Login (e.g. YouTube):**
- The agent STOPS and asks the user to log in manually in the isolated profile's Chrome window
- The user types their credentials themselves; the agent waits until the user confirms "done"
- The login persists in `.chrome-mcp-profile`, so the user logs in once, not per task
- Note: once logged in, the agent's MCP tools (evaluate_script, get_network_request, network inspection) CAN see the logged-in session's data within the isolated profile only — the real Chrome profile is never touched
