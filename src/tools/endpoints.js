"use strict";

const url = require("url");
const querystring = require("querystring");
const gutil = require("gulp-util");
const fs = require("fs");
const is = require("is");
const prettyjson = require('prettyjson');


function endpoints(request, body) {
  let error = Math.random() < 0.01;
  let errorChoice = Math.floor(Math.random() * 2) + 1;
  let query = querystring.parse(url.parse(request.url).query);

  return [
  {
      method: "GET",
      url: "^/asset",
      status: error ? 500 : 200,
      headers: {"Content-Type": "application/json"},
      response: () =>
        error
          ? {"error" : "Something went wrong"}
          : require(`./data/${query.id}.json`)
    },
    {
      method: "GET",
      url: "^/search",
      status: error ? 500 : 200,
      headers: {"Content-Type": "application/json"},
      response: () =>
        error
          ? {"error" : "Something went wrong"}
          : [
            require('./data/30ffcb8be3a214972c7a3a937c3cfd77288b8927fb491f41fd914da4e9401d27.json'),
            require('./data/46fbffbaec5d98a0b3811ef3881478c4befb06d32b4928d5296e13cf464b1c6b.json'),
            require('./data/5ee2f9c4c6f63dbfd440870dfc44c0055cb0c191907b712beb27d363c2b9e8b7.json'),
            require('./data/6aa3fa37b0ecc0b34283eda6036e8ea1498c95abd14a403e3b8e0c74f6a52999.json'),
            require('./data/8f9488a034665f83ea392e59d1161784da828a913ece3c3e52731a5f15bdf45c.json'),
            require('./data/ccdafe97c4c078455fc0f28b2b22addb5ebf37de52d4d4197fc1990500d00580.json'),
            require('./data/0978c6f9887896e58985a4a63eb8b853222729bb803785d080c1ad1fc59d788d.json'),
            require('./data/679bacb4196e8ae23aced5809d2395ef118c4bd68487c61ea6d41876a1330311.json'),
            require('./data/ce6c2cd3c50408d7abf9503306694311c9eb62cc88ef5e2a4289cdd77a1604fb.json'),
            require('./data/f520c120f99bebbda8a095b830b66144d8068e4e8a34979a22d592fbace6be76.json'),
            require('./data/b8bd0bec597adf7212ecdb4c064bb9ddf6c8546e7f003ed09075f8e81d0e01bd.json')
          ]
    }
  ];
}

function isJSON(endpoint) {
  return endpoint.headers["Content-Type"] === "application/json";
}

function httpInterceptor(req, res, next) {

  let body = "";
  req.on("data", (chunk) => body += chunk);
  req.on("end", () => {

    let bodyJSON = body ? JSON.parse(body) : {};
    let matched = false;
    endpoints(req, bodyJSON).forEach((endpoint) => {
      let parsed = url.parse(req.url);

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
            let response = is.fn(endpoint.response) ? endpoint.response() : endpoint.response;
            let result = isJSON(endpoint) ? JSON.stringify(response) : response;
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
