import React, { useEffect } from 'react';

const ContentComponent: React.FC = () => {
  useEffect(() => {
    console.log('hello content');

    // Send/receive message to background /popup/sidepanel ( they should be opened )
    chrome.runtime.sendMessage({});
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('messeage received in content.tsx', request);
      // return true ( while using sendResponse())
    });
  }, []);

  return <div>your component here </div>;
};

export default ContentComponent;
