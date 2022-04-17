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
    html += `<div class="link-list"><h1><svg class="device-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3.5H14.5V2H3C2.175 2 1.5 2.675 1.5 3.5V11.75H0V14H8.5V11.75H3V3.5ZM15.25 5H10.75C10.3375 5 10 5.3375 10 5.75V13.25C10 13.6625 10.3375 14 10.75 14H15.25C15.6625 14 16 13.6625 16 13.25V5.75C16 5.3375 15.6625 5 15.25 5ZM14.5 11.75H11.5V6.5H14.5V11.75Z" />
    </svg>
    ${data[i].name}</h1>`
    html += `<ul>`
    for (let j = 0; j < data[i].tabs.length; j++) {
      let favicon = data[i].tabs[j].favIconUrl;
      let favUrl;
      if (String(favicon).length > 0){
        favUrl = favicon;
      } else {
        favUrl = 'icons/default.png';
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