const log_sock = true;
const log_reducer = true;
const log_component = true;

const logger_sock = arg => {
  log_sock && console.log("socket:", ...arg);
};

const logger_reducer = arg => {
  log_reducer && console.log("reducer:", ...arg);
};

const logger_component = arg => {
  log_component && console.log("store:", ...arg);
};

export {logger_sock, logger_reducer, logger_component};
