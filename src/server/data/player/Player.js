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
    this.score = 0;
    this.lines = 0;
  }
}

export default Player;
