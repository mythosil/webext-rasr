var browser = browser || chrome;

const defaultBlacklist = [
  'code.i-harness.com',
  'sejuku.net/blog',
];

const iconUrl = browser.extension.getURL("icons/icon-32.png");

async function getBlacklist() {
  const p = new Promise((resolve, reject) => {
    browser.storage.local.get('blacklist', result => {
      if (result.blacklist) {
        resolve(result.blacklist);
      } else {
        resolve(defaultBlacklist);
      }
    });
  });
  return await p;
}

async function inBlacklist(url) {
  const blacklist = await getBlacklist();
  for (let b of blacklist) {
    if (url.includes(b)) {
      return true;
    }
  }
  return false;
}

async function filterAnnoying(gElem) {
  const r = gElem.querySelector('.r');
  if (!r) {
    return;
  }
  const a = r.querySelector('a');
  if (!a) {
    return;
  }
  const url = a.href;
  const annoying = await inBlacklist(url);
  if (annoying) {
    gElem.innerHTML = `<p><img src="${iconUrl}" width="24" height="24" style="vertical-align: middle"> ${url}</p>`;
  }
}

const search = document.querySelector('#search');
const gs = search.querySelectorAll('.g');
gs.forEach(g => filterAnnoying(g));
