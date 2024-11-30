chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ unlocked: false });
  });
  
  chrome.tabs.onCreated.addListener(() => {
    chrome.storage.local.get("unlocked", (data) => {
      if (!data.unlocked) {
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => chrome.tabs.remove(tab.id));
        });
        chrome.action.openPopup();
      }
    });
  });