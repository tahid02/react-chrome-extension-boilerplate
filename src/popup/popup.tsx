import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tailwind.css';
import './popup.css';

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="icon.png" className="w-[300px] h-[300px] mx-auto mt-10 mb-10" />
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(<App />);
