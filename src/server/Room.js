const User = require("./User");
class Room {

  constructor(name) {
    this.name = name;
    this.users = [];
    this.waiting = true;
  }

  addUser(username, id) {
    if (typeof username !== "string")
      return;
    this.users.push(username);
  }

  removeUser(username) {
    if (typeof username !== "string" || !this.containUser(username))
      return;
    const user = this.users.find(e => e.name === username);
    this.users.removeObj(user);
  }

  containUser(username) {
    if (typeof username !== "string")
      return;
    return this.users.find(e => e.name === username) !== undefined;
  }

  setWaiting(stateWaiting) {
    if (typeof stateWaiting !== "boolean")
      return;
    this.waiting = stateWaiting;
  }

  getUsers() {
    return this.users;
  }
}

module.exports = Rooms;
