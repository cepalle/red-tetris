const log = false;
const log_sock = false;
const log_reducer = false;
const log_component = false;
const log_middleware = false;

const logger = arg => {
  log && console.log(...arg);
};

const logger_sock = arg => {
   log_sock && console.log("socket:", ...arg);
};

const logger_reducer = arg => {
   log_reducer && console.log("reducer:", ...arg);
};

const logger_component = arg => {
   log_component && console.log("store:", ...arg);
};

const logger_middleware = arg => {
   log_middleware && console.log("middleware:", ...arg);
};

export {logger, logger_sock, logger_reducer, logger_component, logger_middleware};
