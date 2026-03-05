const f0 = document.forms[0];

function resetFetch() {
  window.data = null;
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
    if (window.fetching !== attempt) {
      console.warn('Fetching', url, 'superseded while fetching');
      return;
    }
    window.fetchResponse = tmp;

    tmp = await window.fetchResponse.text();
    if (window.fetching !== attempt) {
      console.warn('Fetching', url, 'superseded while reading');
      return;
    }
    window.fetchedText = tmp;
    txa.value = tmp;

    try {
      window.data = JSON.parse(tmp);
    } catch (errDecodeJson) {
      window.data = errDecodeJson;
    }
  } catch (errFetch) {
    console.error('Fetching', url, 'failed:', errFetch);
    if (window.fetching !== attempt) { return; }
    window.fetchFailed = errFetch;
    txa.value = String(errFetch);
  }
}

f0.onsubmit = function onsubmit() {
  startFetch();
  return false;
};
