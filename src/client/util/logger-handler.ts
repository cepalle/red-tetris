const log = true;
const logSock = true;
const logReducer = true;
const logComponent = true;
const logMiddleware = true;

const logger = (arg: any[]) => {
  log && console.log(...arg);
};

const loggerSock = (arg: any[]) => {
  logSock && console.log('socket:', ...arg);
};

const loggerReducer = (arg: any[]) => {
  logReducer && console.log('reducer:', ...arg);
};

const loggerComponent = (arg: any[]) => {
  logComponent && console.log('store:', ...arg);
};

const loggerMiddleware = (arg: any[]) => {
  logMiddleware && console.log('middleware:', ...arg);
};

export {
  logger,
  loggerSock,
  loggerReducer,
  loggerComponent,
  loggerMiddleware,
};
