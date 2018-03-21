import "../../../src/client/util/event-listener-handler"

let event = new CustomEvent('keydown');

event.keyCode = 37;
window.dispatchEvent(event);

event.keyCode = 38;
window.dispatchEvent(event);

event.keyCode = 39;
window.dispatchEvent(event);

event.keyCode = 40;
window.dispatchEvent(event);

event.keyCode = 32;
window.dispatchEvent(event);

