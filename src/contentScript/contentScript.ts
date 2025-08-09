// Content script entry point
console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);
  //   return true; // Keep message channel open for async response
});
