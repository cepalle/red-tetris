const urlGetPlayerName = (window) => {
  let first_split = window.location.href.split("[");
  if (first_split.length > 1) {
    return first_split[1].split("]")[0];
  }
  return "";
};

const urlGetRoomName = (window) => {
  let first_split = window.location.href.split("#");
  if (first_split.length > 1) {
    return first_split[1].split("[")[0];
  }
  return "";
};

export {urlGetPlayerName, urlGetRoomName};
