import {logger, logger_sock, logger_reducer, logger_component, logger_middleware} from "../../src/client/util/logger-handler";

describe('logger test', () => {
  it('logger', () => {
    logger(["logger"]);
    logger_sock(["logger"]);
    logger_reducer(["logger"]);
    logger_component(["logger"]);
    logger_middleware(["logger"]);
  });
});
