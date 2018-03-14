const User = require("../user/User");
const RoomManager = require("./RoomsManager");
const PacketSender = require("../../packet/PacketSender");

class Room {

  constructor(name) {
    this.name = name;
    /**
     * @type {Array<User>}
     */
    this.users = [];
    this.waiting = true;
  }

  /**
   * Add an user with username and id
   * @param {string} username
   * @param {string} id
   * @param {boolean} [master]
   * @return {User}
   */
  addUser(username, id, master = false) {
    if (!this.containUser(username) && this.waiting) {
      const user = new User(username, id, Date.now(), master);
      this.users.push(user);

      PacketSender.sendPlayerJoin(user, this);

      return user;
    }
  }

  /**
   * Remove
   * @param {string} username
   * @return {User}
   */
  removeUser(username) {
    const user = this.users.find(e => e.username === username);
    this.users.removeObj(user);
    if (user.isMaster())
      this.promoteNewUser(user);

    PacketSender.sendPlayerQuit(user, this);

    return user;
  }

  /**
   * Remove an user from his id
   * @param {string} id
   * @returns {(Object|undefined)}
   */
  removeFromId(id) {
    const user = this.users.find(e => e.id === id);
    this.users.removeObj(user);
    if (user.isMaster())
      this.promoteNewUser(user);

    PacketSender.sendPlayerQuit(user, this);

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
    return this.users.find(e => e.username === username) !== undefined;
  }

  /**
   * Set the current state of the room to true or false, if state is true player can join else player can't join
   * @param {boolean} stateWaiting
   */
  setWaiting(stateWaiting) {
    this.waiting = stateWaiting;

    if (this.waiting)
      PacketSender.sendGameStart(this);
  }

  /**
   * Check if the player is the master, if it is assign the master role to another player
   * @param {User} user
   */
  promoteNewUser(user) {
    if (this.users.length === 0)
      RoomManager.destroyRoom(this.name);
    else {
      const promotedUser = this.users.sort((a, b) => a.order > b.order)[0];
      promotedUser.setMaster(true);
      PacketSender.sendPlayerPromoted(promotedUser, this);
    }
  }

  /**
   * Return true if players can join, false else
   * @returns {boolean}
   */
  canJoin() {
    return this.waiting;
  }
}

module.exports = Room;
