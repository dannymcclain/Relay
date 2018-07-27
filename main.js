function constructHistory(historyItems) {
  var i;
  for (i = 0; i < historyItems.length; i++) {
    console.log(historyItems[i].url);
  }
}

chrome.history.search({
      text: '',
      maxResults: 5
    }, constructHistory);
