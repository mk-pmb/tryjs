const f0 = document.forms[0];

function resetFetch() {
  window.fetchedText = '';
  window.fetchFailed = false;
  window.fetching = false;
  window.fetchResponse = null;
}

resetFetch();

async function startFetch() {
  resetFetch();
  const url = f0.elements.url.value.trim();
  const txa = f0.elements.result;
  txa.value = '(Fetching…) ' + url;
  let attempt;
  try {
    attempt = window.fetch(url);
    window.fetching = attempt;

    let tmp = await window.fetching;
    if (window.fetching !== attempt) { return; }
    window.fetchResponse = tmp;

    tmp = await window.fetchResponse.text();
    if (window.fetching !== attempt) { return; }
    window.fetchedText = tmp;
  } catch (err) {
    if (window.fetching !== attempt) { return; }
    window.fetchFailed = err;
    txa.value = String(err);
  }
}

f0.onsubmit = function onsubmit() {
  startFetch();
  return false;
};
