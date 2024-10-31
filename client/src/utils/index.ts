export const decodeUnicode = (unicodeStr: string) => {
  const splitStr = unicodeStr.split("\\u");
  if (splitStr.length === 1) {
    return unicodeStr;
  }
  let chineseStr = "";
  for (let i = 0, len = splitStr.length; i < len; i++) {
    if (splitStr[i] === "") continue;
    chineseStr += String.fromCharCode(parseInt(splitStr[i], 16));
  }
  return chineseStr;
};

export const replaceURL = (key: string, value: number | string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (params.has(key)) {
    params.set(key, String(value));
  } else {
    params.append(key, String(value));
  }
  url.search = params.toString();
  window.history.replaceState({}, "", url.toString());
};

export const getURLParamsByKey = (key: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get(key);
};
