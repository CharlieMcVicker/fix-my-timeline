/**
 * Copyright 2020 Charles McVicker
 */
function connectToTab(tabs) {
  if (tabs.length > 0) {
    var port = browser.tabs.connect(
      tabs[0].id,
      {name: "send-stats"}
    );
    return port;
  }
}

function onError(error) {
  document.getElementById('error-content').removeClass('hidden');
  document.getElementById('popup-content').addClass('hidden');
}

let gettingActive = browser.tabs.query({
  currentWindow: true, active: true
});

gettingActive.then(connectToTab, onError).then(port => {
  port.onMessage.addListener(function(msg) {
    console.log(msg)
    document.getElementById('num_filtered').innerText = msg.res.fixed+'';
  })
  port.postMessage({ req: 'send-stats' })
});
