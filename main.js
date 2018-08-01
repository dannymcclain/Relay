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
  var html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `<h2>
<svg class="cloud" width="16px" height="10px" viewBox="0 0 16 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">  
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Cloud-Export" fill="#C9CED6" fill-rule="nonzero">
            <path d="M12.6315789,10 L3.36842105,10 L3.36842105,9.97711301 C1.47370507,9.76984456 0,8.18023069 0,6.25 C0,4.17893219 1.69660516,2.5 3.78947368,2.5 C4.04292367,2.5 4.2905622,2.52462259 4.53007983,2.57158239 C5.16278556,1.06187036 6.66660721,0 8.42105263,0 C10.4584328,0 12.1578363,1.43197655 12.5475616,3.33434998 C12.5754844,3.33367353 12.6034915,3.33333333 12.6315789,3.33333333 C14.4919065,3.33333333 16,4.8257175 16,6.66666667 C16,8.50761583 14.4919065,10 12.6315789,10 Z" id="Combined-Shape-Copy"></path>
        </g>
    </g>
</svg>${data[i].name}</h2>`
    html += `<ul>`
    for (let j = 0; j < data[i].tabs.length; j++) {
      html += `<li><a href="${data[i].tabs[j].url}">${data[i].tabs[j].title}</a></li>`;
    }
    html += `</ul>`;
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
