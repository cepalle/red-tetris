class Player {
  playerName: string;
  id: string;
  order: number;
  master: boolean;
  loose: boolean;
  score: number;
  lines: number;
  spectator: boolean;

  constructor(playerName: string, id: string, order: number, isMaster: boolean = false) {
    this.playerName = playerName;
    this.id = id;
    this.order = order;
    this.master = isMaster;
    this.loose = false;
    this.score = 0;
    this.lines = 0;
    this.spectator = false;
  }
}

export {Player};
