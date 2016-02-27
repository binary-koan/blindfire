import test from "tape";
import sinon from "sinon";

import EventHandler from "../../../server/util/event-handler";

test("Event handler", t => {
  const handler = EventHandler();

  const createListener = sinon.spy();
  handler.on("create", createListener);
  handler.emit("create", "test data");

  t.ok(createListener.calledWith("test data"), "calls a single event listener with the given data");

  const updateListener1 = sinon.spy();
  const updateListener2 = sinon.spy();
  handler.on("update", updateListener1);
  handler.on("update", updateListener2);
  handler.emit("update");

  t.ok(updateListener1.called && updateListener2.called, "calls multiple listeners to the same event");
  t.ok(createListener.callCount === 1, "does not call unrelated listeners");

  t.end();
});
