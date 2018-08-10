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
  var html = `
      <svg class="logo" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" 
          <g id="Icons-Copy" stroke="none" fill="none" fill-rule="evenodd">
              <g transform="translate(-6.000000, -6.000000)" fill="#F2F2F2" fill-rule="nonzero">
                  <g id="relay-icon" transform="translate(6.000000, 6.000000)">
                      <rect x="0" y="8" width="20" height="12" rx="2"></rect>
                      <rect fill-opacity="0.7" x="2" y="4" width="16" height="2" rx="1"></rect>
                      <rect fill-opacity="0.4" x="4" y="0" width="12" height="2" rx="1"></rect>
                  </g>
              </g>
          </g>
      </svg>`;
  for (let i = 0; i < data.length; i++) {
    html += `<div class="link-list"><h2>${data[i].name}</h2>`
    html += `<ul>`
    for (let j = 0; j < data[i].tabs.length; j++) {
      html += `<li><a href="${data[i].tabs[j].url}">${data[i].tabs[j].title}</a></li>`;
    }
    html += `</ul></div>`;
  }
  html += `<a class="madeby" href="https://twitter.com/dannymcclain">Made by @dannymcclain</a>`;
  return html;
}

function renderHtmlToDom(data) {
    const tabsByDevice = getTabsByDevice(data);
    const html = generateHtml(tabsByDevice);
    const container = document.getElementsByClassName('container')[0];
    container.innerHTML = html;
}
chrome.sessions.getDevices({}, renderHtmlToDom);
