const urlGetRoomPlayerName = (): { playerName: string | undefined, roomName: string | undefined } => {
  const UndefinedObj = {
    playerName: undefined,
    roomName: undefined,
  };

  const sp = window.location.href.split('#');
  const scnd = sp[1];
  if (scnd === undefined) {
    return UndefinedObj;
  }

  const sp2 = scnd.split('[');
  const roomName = sp2[0];
  const scnd2 = sp2[1];
  if (scnd2 === undefined) {
    return UndefinedObj;
  }

  const sp3 = scnd2.split(']');
  const playerName = sp3[0];

  if (playerName === undefined || roomName === undefined) {
    return UndefinedObj;
  }

  return {
    playerName,
    roomName,
  };
};

export {urlGetRoomPlayerName};
