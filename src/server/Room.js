class Room {

  constructor(name) {
    this.name = name;
    this.users = [];
    this.waiting = true;
  }

  addUser(username) {
    if (typeof username !== "string")
      return;
    this.users.push(username);
  }

  removeUser(username) {
    if (typeof username !== "string" || !this.containUser(username))
      return;
    this.users.removeObj(username);
  }

  containUser(username) {
    if (typeof username !== "string")
      return;
    return this.users.indexOf(what) !== undefined;
  }

  setWaiting(stateWaiting) {
    if (typeof stateWaiting !== "boolean")
      return;
    this.waiting = stateWaiting;
  }
}

module.exports = Rooms;
