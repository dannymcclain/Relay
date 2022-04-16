let html;
let tabsByDevice;
let container;

// Convert Miliseconds to Days, Hours, Minutes, Seconds
function dhm (ms) {
  const days = Math.floor(ms / (24*60*60*1000));
  const daysms = ms % (24*60*60*1000);
  const hours = Math.floor(daysms / (60*60*1000));
  const hoursms = ms % (60*60*1000);
  const minutes = Math.floor(hoursms / (60*1000));
  const minutesms = ms % (60*1000);
  const sec = Math.floor(minutesms / 1000);
  return days + "days, " + hours + "hours, " + minutes + "minutes, " + sec;
}

function getTabsByDevice(theDevices) {
  return theDevices.map((device) => {
    const sessions = device.sessions;
    console.log(sessions);
    console.log(dhm(sessions[0].lastModified))
    const tabs = getTabsFromSessions(sessions);
    return {
      name: device.deviceName,
      // lastUpdate: dhm(sessions[0].lastModified),
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
    html += `<div class="link-list"><h1><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3.5H14.5V2H3C2.175 2 1.5 2.675 1.5 3.5V11.75H0V14H8.5V11.75H3V3.5ZM15.25 5H10.75C10.3375 5 10 5.3375 10 5.75V13.25C10 13.6625 10.3375 14 10.75 14H15.25C15.6625 14 16 13.6625 16 13.25V5.75C16 5.3375 15.6625 5 15.25 5ZM14.5 11.75H11.5V6.5H14.5V11.75Z" fill="black"/>
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