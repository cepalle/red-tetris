import {logger, loggerSock, loggerReducer, loggerComponent, loggerMiddleware} from "../../src/client/util/logger-handler";

describe('logger test', () => {
  it('logger', () => {
    logger(["logger"]);
    loggerSock(["logger"]);
    loggerReducer(["logger"]);
    loggerComponent(["logger"]);
    loggerMiddleware(["logger"]);
  });
});
