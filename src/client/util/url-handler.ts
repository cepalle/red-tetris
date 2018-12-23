const urlGetPlayerName = (): string | undefined => {
  const firstSplit = window.location.href.split('[');
  if (firstSplit.length <= 1) {
    return undefined;
  }

  const name = firstSplit[1].split(']')[0];
  if (name.length <= 0) {
    return undefined;
  }

  return name;
};

const urlGetRoomName = (): string | undefined => {
  const firstSplit = window.location.href.split('#');
  if (firstSplit.length <= 1) {
    return undefined;
  }

  const name = firstSplit[1].split('[')[0];
  if (name.length <= 0) {
    return undefined;
  }

  return name;
};

export {urlGetPlayerName, urlGetRoomName};
