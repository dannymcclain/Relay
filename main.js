function getTabsByDevice(theDevices) {
  return theDevices.map((device) => {
    const sessions = device.sessions;
    const tabs = getTabsFromSessions(sessions);
    return {
      name: device.deviceName,
      tabs,
    };
  });
}

function getTabsFromSessions(sessions) {
  return sessions.reduce((acc, curr) => {
    return [...acc, ...curr.window.tabs];
  }, []);
}

function generateHtml(data) {
  // console.log(tabsByDevice);
  var html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `<h2>${data[i].name}</h2>`
    html += `<ul>`
    for (let j = 0; j < data[i].tabs.length; j++) {
      html += `<li><a href="${data[i].tabs[j].url}">${data[i].tabs[j].title}</a></li>`
    }
    html += `</ul>`
  }
  return html;
}

function renderHtmlToDom(data) {
  const tabsByDevice = getTabsByDevice(data);
  const html = generateHtml(tabsByDevice);
  const container = document.getElementsByClassName('container')[0];
  container.innerHTML = html;
}

chrome.sessions.getDevices({}, renderHtmlToDom);
