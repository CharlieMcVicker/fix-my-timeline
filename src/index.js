/**
 * Copyright 2020 Charles McVicker
 */

let __TWITTER_FIXER = { fixed: 0 }

function hide_if_like(node) {
  let div = node.querySelector('.css-1dbjc4n.r-obd0qt.r-18kxxzh.r-zso239');
  const parent = div.parentElement;
  if (parent.childElementCount == 2) {
    let node = parent.children[1];
    let count = 6;
    while (--count) {
      if (node.childElementCount == 1) node = node.children[0];
      else break;
    }
    if (count == 0) {
      const text = node.innerText;
      if (text.endsWith('liked')) {
        div.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style += ';display:None;';
        __TWITTER_FIXER.fixed += 1;
      }
    }
  }
}

let observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    for(let i = 0; i < mutation.addedNodes.length; i++)
      hide_if_like(mutation.addedNodes[i])
  });
  browser.browserAction.setBadgeText({
    text: ''+__TWITTER_FIXER.fixed
  });
});

observer.observe(document, {
  childList: true,
  subtree: true
});

browser.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(function(msg) {
    if(msg.req && msg.req == 'send-stats') {
      port.postMessage({res: __TWITTER_FIXER})
    }
  })
})
