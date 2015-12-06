"use strict";

// Superagent cachebuster, derived from https://github.com/johntron/superagent-no-cache
// but without the IE cruft

module.exports = function(request) {
  request.set("X-Requested-With", "XMLHttpRequest");
  request.set("Expires", "-1");
  request.set("Cache-Control", "no-cache,no-store,must-revalidate,max-age=-1,private");
  request._query = [Date.now().toString()];

  return request;
};
