function getTabsByDevice(theDevices) {
      let devices = []

      for(let i = 0; i < theDevices.length; i++){
        let theDevice = theDevices[i];
        let device = {
          name: theDevice.deviceName,
          tabs: []
        }
        devices = [...devices, device];
        for(let j = 0; j < theDevice.sessions.length; j++){
          let theSession = theDevice.sessions[j]
          for(let k = 0; k < theSession.window.tabs.length; k++){
            const {url , title} = theSession.window.tabs[k];
            let newTab = {
              url,
              title,
            }
            device.tabs = [...device.tabs, newTab];
          }
        }
      }
      return devices;
    }

function generateHtml (data) {
  const tabsByDevice = getTabsByDevice(data);
  var html = ``;
  for(let i = 0; i < tabsByDevice.length; i++){
    html += `<h2>${tabsByDevice[i].name}</h2>`
    html += `<ul>`
    for (let j = 0; j < tabsByDevice[i].tabs.length; j++){
      html += `<li><a href="${tabsByDevice[i].tabs[j].url}">${tabsByDevice[i].tabs[j].title}</a></li>`
    }
    html += `</ul>`
  }
  console.log(html);
  const container = document.getElementsByClassName('container')[0];
  container.innerHTML = html;
  console.log(container);
}

chrome.sessions.getDevices({},generateHtml);
