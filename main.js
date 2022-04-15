let html;
let tabsByDevice;
let container;

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
  for (let i = 0; i < data.length; i++) {
    html += `<div class="link-list"><h1>${data[i].name}</h1>`
    html += `<ul>`
    for (let j = 0; j < data[i].tabs.length; j++) {
      let favicon = data[i].tabs[j].favIconUrl;
      let favUrl;
      if (String(favicon).length > 0){
        favUrl = favicon;
      } else {
        favUrl = 'icons/default.png';
      };
      html += `<li><a href="${data[i].tabs[j].url}"><img height="16" width="16" style="border-radius: 8px;" src="${favUrl}" alt="favicon"/> ${data[i].tabs[j].title}</a></li>`;
    }
    html += `</ul></div>`;
  }
  // html += `<a class="madeby" href="https://twitter.com/dannymcclain">Made by @dannymcclain</a>`;
  return html;
}

function renderHtmlToDom(data) {
    tabsByDevice = getTabsByDevice(data);
    html = generateHtml(tabsByDevice);
    container = document.getElementsByClassName('container')[0];
    container.innerHTML = html;
}
chrome.sessions.getDevices({}, renderHtmlToDom);