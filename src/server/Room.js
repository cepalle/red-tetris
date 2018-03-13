class Room {

  constructor(name) {
    this.name = name;
    this.users = [];
    this.waiting = true;
  }

  /**
   * Add an user with username and id
   * @param {string} username
   * @param {string} id
   */
  addUser(username, id) {
    if (!this.containId(id) && this.waiting)
      this.users.push({username, id});
  }

  /**
   * Remove
   * @param {string} username
   */
  removeUser(username) {
    const user = this.users.find(e => e.username === username);
    this.users.removeObj(user);
  }

  /**
   * Remove an user from his id
   * @param {string} id
   * @returns {(Object|undefined)}
   */
  removeFromId(id) {
    if (!this.containId(id))
      return;
    const user = this.users.find(e => e.id === id);
    this.users.removeObj(user);
    return user;
  }

  /**
   * Return true if this.users contain user with id
   * @param {string} id
   * @returns {boolean}
   */
  containId(id) {
    return this.users.find(e => e.id === id) !== undefined;
  }

  /**
   * Return true if this.users contain user with username
   * @param {string} username
   * @returns {boolean}
   */
  containUser(username) {
    return this.users.find(e => e.name === username) !== undefined;
  }

  /**
   * Set the current state of the room to true or false, if state is true player can join else player can't join
   * @param {boolean} stateWaiting
   */
  setWaiting(stateWaiting) {
    if (typeof stateWaiting !== "boolean")
      return;
    this.waiting = stateWaiting;
  }

  /**
   * Return true if players can join, false else
   * @returns {boolean}
   */
  canJoin() {
    return this.waiting;
  }

  /**
   * Returns all user in the room
   * @returns {Array}
   */
  getUsers() {
    return this.users;
  }
}

module.exports = Room;
