"use strict";

var url = require("url");
var gutil = require("gulp-util");
var fs = require("fs");
var is = require("is");
var prettyjson = require('prettyjson');

function endpoints(request, body) {
  var error = Math.random() < 0.01;
  var choice = 1; //Math.floor(Math.random() * 2) + 1;
  var errorChoice = Math.floor(Math.random() * 2) + 1;

  return [
    {
      method: "GET",
      url: "^/search",
      status: error ? 500 : 200,
      headers: {"Content-Type": "application/json"},
      response: () =>
        error
          ? {"error" : "Something went wrong"}
          : require(`./data/search${choice}.json`)
    }
  ];
}

function isJSON(endpoint) {
  return endpoint.headers["Content-Type"] === "application/json";
}

function httpInterceptor(req, res, next) {

  var body = "";
  req.on("data", (chunk) => body += chunk);
  req.on("end", () => {

    var bodyJSON = body ? JSON.parse(body) : {};
    var matched = false;
    endpoints(req, bodyJSON).forEach((endpoint) => {
      var parsed = url.parse(req.url);

      if (!matched &&
          endpoint.method === req.method &&
          new RegExp(endpoint.url).test(parsed.pathname)) {

        matched = true;

        gutil.log("Intercepted: " + gutil.colors.yellow(`${req.method} ${req.url}`));
        if (endpoint.ondata) {
          endpoint.ondata(body);
        }

        setTimeout(() => {
          if (res) {
            var response = is.fn(endpoint.response) ? endpoint.response() : endpoint.response;
            var result = isJSON(endpoint) ? JSON.stringify(response) : response;
            gutil.log(`Sending: ${gutil.colors.cyan(endpoint.status)}\n${prettyjson.render(JSON.parse(result))}`);
            res.writeHead(endpoint.status, endpoint.headers);
            res.write(result || "");
            res.end();
            next();
          }
        }, endpoint.delay || 0);
      }
    });

    if (!matched) {
      next();
    }
  });
}

module.exports = httpInterceptor;
