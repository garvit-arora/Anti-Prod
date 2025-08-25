const messages = [
  "🚨 Stop working! The fridge light mystery still isn’t solved.",
  "😜 Instagram reels > assignments.",
  "🔥 Someone is fighting on Twitter right now. Go check!",
  "👀 Reddit wants your opinion nobody asked for.",
  "🎬 YouTube has exactly what you didn’t know you wanted to watch."
];
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("reminder", { delayInMinutes: 1, periodInMinutes: 1 });
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "reminder") {
    const message = messages[Math.floor(Math.random() * messages.length)];
    chrome.notifications.create(
      {
        type: "basic",
        iconUrl: "logo.png",
        title: "😈 Anti-Productivity Reminder",
        message: message,
        priority: 2
      },
      (id) => {
        setTimeout(() => {
          chrome.notifications.clear(id);
        }, 10000);
      }
    );
    chrome.storage.local.set({ lastUrl: distraction.url });
  }
});
chrome.notifications.onClicked.addListener(() => {
  chrome.storage.local.get("lastUrl", (data) => {
    if (data.lastUrl) {
      chrome.tabs.create({ url: data.lastUrl });
    }
  });
});
