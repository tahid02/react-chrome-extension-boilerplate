import React from 'react';
import { createRoot } from 'react-dom/client';
import '../tailwind.css';
import './popup.css';

const App: React.FC<{}> = () => {
  React.useEffect(() => {
    // Define the message listener function
    const messageListener = (
      request: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      console.log('popup received message:', request, 'from', sender);
      // Handle your message logic here

      // if you want to send a response asynchronously
      // return true
    };

    // Add the message listener
    chrome.runtime.onMessage.addListener(messageListener);

    // MESSAGE PASSING WILL WORK ONLY WHEN THE POPUP IS OPEN
    chrome.runtime.sendMessage({
      // data to send
    });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          // data to send
        });
      }
    });

    // Cleanup function to remove the listener to avoid memory leak
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div>
      <img src="icon.png" className="w-[300px] h-[300px] mx-auto mt-10 mb-10" />
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container, {
  identifierPrefix: 'popup-',
  onRecoverableError: (error) => {
    console.error('[Popup] Recoverable error:', error);
  },
});

root.render(<App />);
