const compute = require("../pkg/md5_wasm").compute;

// The md5 module on npm is pretty permissive on what it accepts, so let's try
// and keep compatibilty.
function wrapper(message) {
  if (message === undefined || message === null) {
    throw new Error("Illegal argument " + message);
  }
  if (typeof message === "string") {
    message = Buffer.from(message);
  }

  // TODO: There's more to do for perfect compatibility, but I just want to
  // finish this mvp. Check this file:
  // https://github.com/pvorb/node-md5/blob/master/md5.js

  // ~ message is definitely for sure a Buffer ~
  return compute(message);
}

module.exports = wrapper;
