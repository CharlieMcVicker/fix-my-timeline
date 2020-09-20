function rip_out_likes(){
  let divs = document.getElementsByClassName('css-1dbjc4n r-obd0qt r-18kxxzh r-zso239');
  const svg_classes = 'r-111h2gw r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1xzupcd'.split(' ');
  for (let div of divs) {
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
        if (text.endsWith('liked')) div.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style += ';display:None;';
      }
    }
  }
}

document.body.onscroll = rip_out_likes
