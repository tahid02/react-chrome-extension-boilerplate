// TODO: background script
console.log('background script');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('background script received message:', request);
  //   return true; // Keep message channel open for async response
});
