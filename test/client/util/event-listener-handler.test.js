import {eventHandler} from "../../../src/client/util/event-handler"

describe('event-listener-handler', () => {
  describe('#event-listener-handler', () => {
    it('should sendEvent ', () => {

      let event = {keyCode: 37, preventDefault: () => 1};
      eventHandler(event)

      event.keyCode = 38;
      eventHandler(event)

      event.keyCode = 39;
      eventHandler(event)

      event.keyCode = 40;
      eventHandler(event)

      event.keyCode = 32;
      eventHandler(event)

    });
  });
});

