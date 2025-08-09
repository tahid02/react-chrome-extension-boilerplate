// Create and inject the root component into the webpage.
// Adjust its positioning according to your need
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ContentComponent from './contentComponent';
import '../tailwind.css';
const createContentComponent = () => {
  // Check if container already exists
  let container = document.getElementById('chrome-extension-content-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'chrome-extension-content-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '2147483647';

    // Make sure children can receive pointer events
    container.style.setProperty('pointer-events', 'none');
    const style = document.createElement('style');
    style.textContent = `
        #chrome-extension-content-container > * {
          pointer-events: auto;
        }
      `;
    document.head.appendChild(style);

    document.body.appendChild(container);
  }

  const root = createRoot(container, {
    identifierPrefix: 'content-',
    onRecoverableError: (error) => {
      console.error('[Content] Recoverable error:', error);
    },
  });

  root.render(<ContentComponent />);
};

// Initialize the component when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createContentComponent);
} else {
  createContentComponent();
}
