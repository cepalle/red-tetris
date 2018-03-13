const url_get_player_name = () => {
  let first_split = window.location.href.split("[");
  if (first_split.length > 1) {
    return first_split[1].split("]")[0];
  }
  return "";
};

const url_get_room_name = () => {
  let first_split = window.location.href.split("#");
  if (first_split.length > 1) {
    return first_split[1].split("[")[0];
  }
  return "";
};

export {url_get_player_name, url_get_room_name};
