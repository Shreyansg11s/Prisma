import EventEmitter from "events";

var eventEmitter = new EventEmitter();

var fun1 = (msg) => {
  console.log("Message from fun1: " + msg);
};

var fun2 = (msg) => {
  console.log("Message from fun2: " + msg);
};

eventEmitter.addListener("myEvent", fun1);

eventEmitter.prependListener("myEvent", fun2);

console.log(eventEmitter.listeners("myEvent"));

console.log(eventEmitter.listenerCount("myEvent"));

eventEmitter.emit("myEvent", "Event occurred");

var fun1 = (msg) => {
  console.log("Message from fun1: " + msg);
};

var fun2 = (msg) => {
  console.log("Message from fun2: " + msg);
};

eventEmitter.on("myEvent", fun1);
eventEmitter.on("myEvent", fun1);
eventEmitter.on("myEvent", fun2);

eventEmitter.removeListener("myEvent", fun1);
eventEmitter.emit("myEvent", "Event occurred");
eventEmitter.removeAllListeners("myEvent");
eventEmitter.emit("myEvent", "Event occured");

eventEmitter.on("error", (err) => {
  console.error("whoops! there was an error");
});

// Register to newListener
eventEmitter.on("newListener", (event, listener) => {
  console.log(`The listener is added to ${event}`);
});

// Register to removeListener
eventEmitter.on("removeListener", (event, listener) => {
  console.log(`The listener is removed from ${event}`);
});

// Declaring listener fun1 to myEvent1
var fun1 = (msg) => {
  console.log("Message from fun1: " + msg);
};

// Declaring listener fun2 to myEvent2
var fun2 = (msg) => {
  console.log("Message from fun2: " + msg);
};

// Listening to myEvent with fun1 and fun2
eventEmitter.on("myEvent", fun1);
eventEmitter.on("myEvent", fun2);

// Removing listener
eventEmitter.off("myEvent", fun1);

// Triggering myEvent
eventEmitter.emit("myEvent", "Event occurred");

// Triggering error
eventEmitter.emit("error", new Error("whoops!"));

// Async function listening to myEvent
eventEmitter.on("myEvent", (msg) => {
  setImmediate(() => {
    console.log("Message from async: " + msg);
  });
});

// Declaring listener fun to myEvent
var fun = (msg) => {
  console.log("Message from fun: " + msg);
};

// Listening to myEvent with fun
eventEmitter.on("myEvent", fun);

// Triggering myEvent
eventEmitter.emit("myEvent", "Event occurred");
