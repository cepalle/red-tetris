class User {
  /**
   * Constructor of User class
   * @param {Socket} socket
   * @param {string} username
   * @param {string} id
   * @param {number} order
   * @param {boolean} isMaster
   */
  constructor(username, id, order, isMaster = false) {
    this.username = username;
    this.id = id;
    this.order = order;
    this.master = isMaster;
    this.loose = false;
  }

  /**
   * Return username of the user
   * @returns {string}
   */
  getUsername() { return this.username }

  /**
   * Return the unique id provided by socket.io
   * @returns {string}
   */
  getId() { return this.id }

  /**
   * The order of the player that join the room
   * @returns {number}
   */
  getOrder() { return this.order}

  /**
   * Return true if the player is the master of the room
   * @returns {boolean}
   */
  isMaster() { return this.master }

  /**
   * Set the new master value for the user
   * @param {boolean} value
   */
  setMaster(value) { this.master = value}

}

module.exports = User;
