var L = require("lemonad");

exports.t = L.always(true);

exports.f = L.always(false);

exports.fail = function (message) {
  throw new Error(message);
};
