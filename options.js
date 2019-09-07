var browser = browser || chrome;

const defaultBlacklist = [
  'code.i-harness.com',
  'sejuku.net',
  'codeday.me',
  'stackoverrun.com',
  'kotaeta.com'
];

function saveOptions(e) {
  e.preventDefault();
  const s = document.querySelector('textarea').value;
  const blacklist = s.split(/\r?\n/);
  browser.storage.local.set({
    blacklist: blacklist
  });
}

function restoreOptions(e) {
  function renderToTextarea(blacklist) {
    if (!blacklist) {
      blacklist = defaultBlacklist;
    }
    const s = blacklist.join("\r\n");
    document.querySelector('textarea').textContent = s;
  }

  let getting = browser.storage.local.get('blacklist', result => {
    renderToTextarea(result.blacklist);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
