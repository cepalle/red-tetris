const log_sock = true;
const log_reducer = true;

const logger_sock = arg => {
  log_sock && console.log("socket:", ...arg);
};

const logger_reducer = arg => {
  log_reducer && console.log("reducer:", ...arg);
};

export {logger_sock, logger_reducer};
