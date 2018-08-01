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
  console.log(data);
  var html = ``;
  for (let i = 0; i < data.length; i++) {
    html += `<h2>${data[i].name}</h2>`
    html += `<ul>`
    for (let j = 0; j < data[i].tabs.length; j++) {
      html += `<li><a href="${data[i].tabs[j].url}">${data[i].tabs[j].title}</a><a id="${data[i].tabs[j].sessionId}" href="#" class="close">Close</a></li>`;

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

      console.log("Cool face");
    const closeTabButtonNodes = document.querySelectorAll('.close');
    console.log(closeTabButtonNodes);
    const closeTabButtonElements = Array.from(closeTabButtonNodes);
    closeTabButtonElements.map((closeTabButton)=>{
      closeTabButton.addEventListener('click', function() {
          // chrome.tabs.remove(closeTabButton.id);
          console.log(closeTabButton.id);
          console.log("The button should close something");
        })
    })

}

const closeTabButton = document.getElementById('close-tab');
closeTabButton.onclick = function closeTab() {
  chrome.tabs.remove([session_syncXILfG+GxjSJ1QJblT3Yqew==.10]);
  console.log('Did we remove it?');
}

chrome.sessions.getDevices({}, renderHtmlToDom);
