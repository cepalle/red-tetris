class Player {
  /**
   * Constructor of Player class
   * @param {Socket} socket
   * @param {string} playerName
   * @param {string} id
   * @param {number} order
   * @param {boolean} isMaster
   */
  constructor(playerName, id, order, isMaster = false) {
    this.playerName = playerName;
    this.id = id;
    this.order = order;
    this.master = isMaster;
    this.loose = false;
  }

  /**
   * Return playerName of the player
   * @returns {string}
   */
  getPlayerName() { return this.playerName }

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
   * Set the new master value for the player
   * @param {boolean} value
   */
  setMaster(value) { this.master = value}

}

export default Player;
