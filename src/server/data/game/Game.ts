import {Player} from '@src/server/data/player/Player';
import {PacketSender} from '@src/server/packet/PacketSender';
import {IParams} from '@src/common/IType';
import {roomManager} from '@src/server/data/game/GameManager';

class Game {
  players: Player[];
  name: string;
  waiting: boolean;
  params: IParams;

  constructor(name: string) {
    this.players = [];
    this.name = name;
    this.waiting = true;
    this.params = {
      addWallLine: true,
      groundResizer: true,
    };
  }

  /**
   * Add an player with playerName and id
   * @param {string} playerName
   * @param {string} id
   * @param {boolean} [master]
   * @return {Player | undefined}
   */
  addPlayer(playerName: string, id: string, master: boolean = false): Player | undefined {
    if (!playerName || !id) {
      return undefined;
    }
    if (!this.containPlayer(playerName) && !this.containId(id)) {
      const player = new Player(playerName, id, Date.now(), master);
      player.spectator = !this.waiting;
      this.players.push(player);

      PacketSender.sendPlayerJoin(player, this);

      return player;
    }
    return undefined;
  }

  /**
   * Remove an player by his playerName.
   */
  removePlayer(playerName: string): Player | undefined {
    const player = this.players.find(e => e.playerName === playerName);
    if (player) {
      this.players.filter((p) => p === player);
      if (this.players.filter(e => e.spectator).length === this.players.length) {
        this.setWaiting(true);
      }
      if (player.master) {
        this.promoteNewPlayer();
      }

      PacketSender.sendPlayerQuit(player, this);

      return player;
    }
    return undefined;
  }

  /**
   * Get an player in the room by his id.
   */
  getPlayer(id: string): Player | undefined {
    return this.players.find(e => e.id === id);
  }

  /**
   * Return true if this.players contain player with id.
   */
  containId(id: string): boolean {
    return this.players.find(e => e.id === id) !== undefined;
  }

  /**
   * Return true if this.players contain player with playerName.
   */
  containPlayer(playerName: string): boolean {
    return this.players.find(e => e.playerName === playerName) !== undefined;
  }

  /**
   * Check if a player is alone and he has lose or on multiples players, there is only player that not has loose.
   */
  gameHasEnd(): boolean {
    if (this.players.filter(p => !p.spectator).length === 1 && this.players[0].loose ||
      this.players.length > 1 && this.players.filter(p => !p.loose && !p.spectator).length === 1) {
      this.players.forEach(e => e.loose = false);
      this.setWaiting(true);
      return true;
    }
    return false;
  }

  /**
   * Set params with custom values
   * @param {object} params
   */
  setParams(params: IParams) {
    this.params = {
      ...this.params,
      groundResizer: params.groundResizer,
      addWallLine: params.addWallLine,
    };
  }

  /**
   * Set the current getState of the room to true or false, if getState is true player can join else player can't join.
   */
  setWaiting(stateWaiting: boolean): void {
    this.waiting = stateWaiting;
    if (!this.waiting) {
      this.players.forEach(e => {
        e.lines = 0;
        e.score = 0;
        e.spectator = false;
      });
      PacketSender.sendGameStart(this);
    }
  }

  /**
   * Check if the player is the master, if it is assign the master role to another player.
   */
  promoteNewPlayer() {
    if (this.players.length === 0) {
      roomManager.deleteGame(this.name);
    } else if (!this.players.some(e => e.master)) {
      const promotedPlayer = this.players.sort((a, b) =>
        a.order > b.order ? 1 : -1,
      )[0];
      promotedPlayer.master = true;
      PacketSender.sendPlayerPromoted(promotedPlayer, this);
    }
  }

  /**
   * Return true if players can join, false else.
   */
  canJoin(): boolean {
    return this.waiting;
  }
}

export {Game};
