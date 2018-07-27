// const historyList = document.getElementById('history-list');
//
// function constructHistory(historyItems) {
//   var i;
//   for (i = 0; i < historyItems.length; i++) {
//     var historyItem = document.createElement('li');
//     var historyLink = document.createElement('a');
//     historyLink.href = historyItems[i].url;
//     historyLink.innerHTML = historyItems[i].title;
//     historyItem.appendChild(historyLink);
//     historyList.appendChild(historyItem);
//     // console.log(historyItems[i]);
//   }
// }
//
// chrome.history.search({
//       text: ''
//     }, constructHistory);

function showDevices(theDevices) {
      var sessionList = document.getElementById('session-list');
      var i;
      for (i = 0; i < theDevices.length; i++) {
        var device = document.createElement('li');
        device.innerHTML = theDevices[i].deviceName + ' ' + theDevices[i].sessions[0].window.tabs[0].url;
        sessionList.appendChild(device);
        // console.log(theDevices[i].sessions[i].window.tabs);
        console.log(theDevices[i]);
      }
    }
chrome.sessions.getDevices({},showDevices);
//
// function showTab(theTabs) {
//     var i = 0;
//     for (i = 0; i < theTabs.length; i++) {
//       console.log(theTabs[i].tab.Tab.url)
//     }
//     // console.log(theTabs);
// }
//
// chrome.tabs.query({}, showTab);
