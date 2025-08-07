import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tailwind.css';
import './popup.css';

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="icon.png" className="w-10 h-10 mx-auto mt-10 mb-10" />
      <h1 className="text-2xl font-bold text-center">Dealmatch</h1>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(<App />);
