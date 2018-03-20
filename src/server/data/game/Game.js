import Player from "../player/Player";
import PacketSender from "../../packet/PacketSender";
import RoomManager from "./GameManager";

class Game {

  constructor(name) {
    /** @type {Array<Player>} */
    this.players = [];
    this.name = name;
    this.waiting = true;
  }

  /**
   * Add an player with playerName and id
   * @param {string} playerName
   * @param {string} id
   * @param {boolean} [master]
   * @return {Player}
   */
  addPlayer(playerName, id, master = false) {
    if (!this.containId(id) && this.waiting) {
      const player = new Player(playerName, id, Date.now(), master);
      this.players.push(player);

      PacketSender.sendPlayerJoin(player, this);

      return player;
    }
  }

  /**
   * Remove an player by his playerName.
   * @param {string} playerName
   * @return {Player}
   */
  removePlayer(playerName) {
    const player = this.players.find(e => e.playerName === playerName);
    this.players.removeObj(player);
    if (player.isMaster())
      this.promoteNewPlayer();

    PacketSender.sendPlayerQuit(player, this);

    return player;
  }

  /**
   * Get an player in the room by his id.
   * @param {string} id
   * @returns {Player | undefined}
   */
  getPlayer(id) {
    return this.players.find(e => e.id === id);
  }

  /**
   * Remove an player from his id.
   * @param {string} id
   * @returns {(Object|undefined)}
   */
  removeFromId(id) {
    const player = this.players.find(e => e.id === id);
    this.players.removeObj(player);
    if (player.isMaster())
      this.promoteNewPlayer(player);

    PacketSender.sendPlayerQuit(player, this);

    return player;
  }

  /**
   * Return true if this.players contain player with id.
   * @param {string} id
   * @returns {boolean}
   */
  containId(id) {
    return this.players.find(e => e.id === id) !== undefined;
  }

  /**
   * Return true if this.players contain player with playerName.
   * @param {string} playerName
   * @returns {boolean}
   */
  containPlayer(playerName) {
    return this.players.find(e => e.playerName === playerName) !== undefined;
  }

  gameHasEnd() {
    if (this.players.length === 1 && this.players[0].loose ||
      this.players.length > 1 && this.players.filter(p => !p.loose).length === 1) {
      this.players.forEach(e => e.loose = false);
      this.setWaiting(true);
    }
  }

  /**
   * Set the current state of the room to true or false, if state is true player can join else player can't join.
   * @param {boolean} stateWaiting
   */
  setWaiting(stateWaiting) {
    this.waiting = stateWaiting;
    if (!this.waiting)
      PacketSender.sendGameStart(this);
  }

  /**
   * Check if the player is the master, if it is assign the master role to another player.
   */
  promoteNewPlayer() {
    if (this.players.length === 0) {
      RoomManager.deleteGame(this.name);
    }
    else {
      const promotedPlayer = this.players.sort((a, b) => a.order > b.order)[0];
      promotedPlayer.setMaster(true);
      PacketSender.sendPlayerPromoted(promotedPlayer, this);
    }
  }

  /**
   * Return true if players can join, false else.
   * @returns {boolean}
   */
  canJoin() {
    return this.waiting;
  }
}

export default Game;
