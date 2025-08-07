import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tailwind.css';
import './sidePanel.css';

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="icon.png" className="w-10 h-10" />
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container, {
  identifierPrefix: 'sidepanel-',
  onRecoverableError: (error) => {
    console.error('[Sidepanel] Recoverable error:', error);
  },
});
root.render(<App />);
