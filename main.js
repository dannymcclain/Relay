function constructHistory(historyItems) {
  console.log(historyItems);
}

chrome.history.search({
      text: '',
      maxResults: 30
    }, constructHistory);
