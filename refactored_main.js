function getTabsByDevice(theDevices) {
  // maps loops over every device passing the current device
  // to a function call. Map returns a new array
  // with the value you return from
  // each iteration

  return theDevices.map((device) => {
    const sessions = device.sessions;
    // pull out the retrieval of tabs
    // into a separate function
    const tabs = getTabsFromSessions(sessions);

    // for each iteration we create the object
    // we need with the device name
    // and tabs
    return {
      name: device.deviceName,
      tabs,
    };
  });
}

function getTabsFromSessions(sessions) {
  // reduce is starting with an empty array, and we are looping
  // through all the sessions, finding the tabs
  // and adding them to that empty array
  return sessions.reduce((acc, curr) => {
    // acc is what we return from the previous loop so it
    // would be all tabs gathered up to this point
    // then we add the tabs from the current
    // iteration and flatten that
    // into a single array
    return [...acc, ...curr.window.tabs];
  }, []);
}

function generateHtml(data) {
  console.log(tabsByDevice);
  var html = ``;
  for (let i = 0; i < tabsByDevice.length; i++) {
    html += `<h2>${tabsByDevice[i].name}</h2>`
    html += `<ul>`
    for (let j = 0; j < tabsByDevice[i].tabs.length; j++) {
      html += `<li><a href="${tabsByDevice[i].tabs[j].url}">${tabsByDevice[i].tabs[j].title}</a></li>`
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
