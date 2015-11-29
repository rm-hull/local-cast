"use strict";

var crypto = require("crypto");

var algo = "sha256";
var encoding = "hex";

function SHA256(text) {
  if (!text) {
    return undefined;
  }
  var shasum = crypto.createHash(algo);
  return shasum.update(text, "utf8").digest(encoding);
}

module.exports = SHA256;