// Create and inject the root component into the webpage using Shadow DOM
// for complete style isolation
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ContentComponent from './contentComponent';

// Function to inject Tailwind CSS v4 into Shadow DOM
const injectStyles = async (shadowRoot: ShadowRoot) => {
  const style = document.createElement('style');

  try {
    // Load the extracted Tailwind CSS file
    const cssUrl = chrome.runtime.getURL('tailwind.css');
    const response = await fetch(cssUrl);

    if (!response.ok) {
      throw new Error(`Failed to load CSS: ${response.status}`);
    }

    const cssText = await response.text();

    // Add Shadow DOM specific modifications
    const shadowDOMCSS = `
      /* Shadow DOM isolation - prevents style bleeding */
      :host {
        all: initial;
        font-family: ui-sans-serif, system-ui, sans-serif;
      }

      /* Reset only inherited properties that might interfere */
      * {
        box-sizing: border-box;
      }

      /*  compiled Tailwind CSS v4 */
      ${cssText}

      /* Ensure pointer events work correctly within Shadow DOM */
      .pointer-events-none {
        pointer-events: none !important;
      }

      .pointer-events-auto {
        pointer-events: auto !important;
      }
    `;

    style.textContent = shadowDOMCSS;
  } catch (error) {
    console.warn('[Content] Failed to load Tailwind CSS:', error);

    // Fallback: Basic Tailwind-like utilities for essential functionality
    style.textContent = `
      /* Shadow DOM Reset */
      :host {
        all: initial;
        font-family: ui-sans-serif, system-ui, sans-serif;
      }

      *, ::before, ::after {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: #e5e7eb;
      }

      /* Essential Tailwind-like utilities */
      .fixed { position: fixed !important; }
      .absolute { position: absolute !important; }
      .relative { position: relative !important; }
      .top-0 { top: 0px !important; }
      .left-0 { left: 0px !important; }
      .w-full { width: 100% !important; }
      .h-full { height: 100% !important; }
      .pointer-events-none { pointer-events: none !important; }
      .pointer-events-auto { pointer-events: auto !important; }
      .z-10 { z-index: 10 !important; }
      .z-20 { z-index: 20 !important; }
      .z-50 { z-index: 50 !important; }

      /* Basic spacing */
      .p-4 { padding: 1rem !important; }
      .m-4 { margin: 1rem !important; }

      /* Basic colors */
      .bg-white { background-color: #ffffff !important; }
      .bg-gray-100 { background-color: #f3f4f6 !important; }
      .text-black { color: #000000 !important; }
      .text-gray-800 { color: #1f2937 !important; }

      /* Basic border and shadow */
      .border { border-width: 1px !important; }
      .rounded { border-radius: 0.25rem !important; }
      .shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important; }
    `;
  }

  shadowRoot.appendChild(style);
};

const createContentComponent = async () => {
  // Check if container already exists
  let containerElement = document.getElementById(
    'chrome-extension-content-container'
  );

  if (!containerElement) {
    // Create the host container
    containerElement = document.createElement('div');
    containerElement.id = 'chrome-extension-content-container';

    // Style the host container (these styles are outside Shadow DOM)
    containerElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483647;
    `;

    // Create Shadow DOM (closed mode for better isolation)
    const shadowRoot = containerElement.attachShadow({ mode: 'closed' });

    // Inject styles into Shadow DOM
    await injectStyles(shadowRoot);

    // Create React container inside Shadow DOM
    const reactContainer = document.createElement('div');
    reactContainer.className = 'content-wrapper';
    reactContainer.style.cssText = `
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    // Add style for children to receive pointer events
    const childrenStyle = document.createElement('style');
    childrenStyle.textContent = `
      .content-wrapper > * {
        pointer-events: auto;
      }
    `;
    shadowRoot.appendChild(childrenStyle);
    shadowRoot.appendChild(reactContainer);

    // Append to document body
    document.body.appendChild(containerElement);

    // Create React root inside Shadow DOM
    const root = createRoot(reactContainer, {
      identifierPrefix: 'content-',
      onRecoverableError: (error) => {
        console.error('[Content] Recoverable error:', error);
      },
    });

    // Render the component
    root.render(<ContentComponent />);

    // Store cleanup function on the container for later use
    (containerElement as any)._cleanup = () => {
      root.unmount();
      document.body.removeChild(containerElement);
    };
  }
};

// Cleanup function (export for use in other parts of your extension)
export const cleanupContentComponent = () => {
  const container = document.getElementById(
    'chrome-extension-content-container'
  );
  if (container && (container as any)._cleanup) {
    (container as any)._cleanup();
  }
};

// Initialize the component when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createContentComponent);
} else {
  createContentComponent();
}
