const log_sock = true;
const log_reducer = true;

const logger_sock = param => {
  log_sock && console.log("socket:", ...param);
};

const logger_reducer = param => {
  log_reducer && console.log("reducer:", ...param);
};

export {logger_sock, logger_reducer};
