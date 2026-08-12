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
- DevTools MCP is **hardcoded** to use the `extension-testing` profile only (via `.mcp.json`)
- Create the profile once:
  ```bash
  open -a "Google Chrome" --args --user-data-dir="$HOME/Library/Application Support/Google/Chrome/extension-testing"
  ```
- Your personal profile with real credentials is **completely isolated** and cannot be accessed by DevTools MCP

**Testing Constraints:**
- Do NOT log into real accounts (Gmail, bank, work) in the test profile
- Test only against `localhost` or demo sites with dummy data
- Do NOT test workflows involving real API keys or credentials
- Before any DevTools testing, the extension code is reviewed for safety
- Subagents do NOT have DevTools MCP access — only the main Claude instance

**If Testing Requires Real Credentials:**
- Tell me explicitly: "This test requires real credentials, please review [specific feature] manually or via static analysis instead"
- I will NOT use DevTools MCP in this case
