var browser = browser || chrome;

const blacklist = [
  'code.i-harness.com',
  'sejuku.net/blog',
];

function inBlacklist(url) {
  for (let b of blacklist) {
    if (url.includes(b)) {
      return true;
    }
  }
  return false;
}

const iconUrl = browser.extension.getURL("icons/icon-32.png");

const search = document.querySelector('#search');
const gs = search.querySelectorAll('.g');
gs.forEach(g => {
  const r = g.querySelector('.r');
  if (!r) {
    return;
  }
  const a = r.querySelector('a');
  if (!a) {
    return;
  }
  const url = a.href;
  if (inBlacklist(url)) {
    // annoying!!!
    g.innerHTML = `<p><img src="${iconUrl}" width="24" height="24" style="vertical-align: middle"> ${url}</p>`;
  }
});
