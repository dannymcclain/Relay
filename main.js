let html = ``;
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
    html += `<div class="link-list"><h1><svg class="device-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 12V3.5H15V3C15 2.44772 14.5523 2 14 2H2C1.44772 2 1 2.44772 1 3V12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H8V12H2.5Z" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.5C10.4477 5.5 10 5.94772 10 6.5V14C10 14.5523 10.4477 15 11 15H15C15.5523 15 16 14.5523 16 14V6.5C16 5.94772 15.5523 5.5 15 5.5H11ZM11.5 7V13H14.5V7H11.5Z" />
    </svg>
    ${data[i].name}</h1>`
    html += `<ul>`
    for (let j = 0; j < data[i].tabs.length; j++) {
      let favicon = data[i].tabs[j].favIconUrl;
      let favUrl;
      if (String(favicon).length > 0){
        favUrl = favicon;
      } else {
        favUrl = 'icons/default.svg';
      };
      html += `<li><a href="${data[i].tabs[j].url}" target="_blank"><span class="favicon"><img height="16" width="16" style="border-radius: 8px;" src="${favUrl}" alt="favicon"/></span><span class="link-title">${data[i].tabs[j].title}</a></span></li>`;
    }
    html += `</ul></div>`;
  }
  return html;
}

function renderHtmlToDom(data) {
    tabsByDevice = getTabsByDevice(data);
    html = generateHtml(tabsByDevice);
    container = document.getElementsByClassName('container')[0];
    container.innerHTML = html;
}
chrome.sessions.getDevices({}, renderHtmlToDom);