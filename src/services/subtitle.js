"use strict";

var fs = require("fs");
var url = require("url");
var events = require("events");
var srt2vtt = require("srt-to-vtt");

var handler = new events.EventEmitter();
var settings = {
  maxAge: 3600,
  rootPath: "subtitles/",
  rootFolder: "/path/to/videos/",
  cors: true
};

var subtitles = (req, res) => {
  var info = {};
  var reqUrl = url.parse(req.url, true);

  info.path = typeof reqUrl.pathname === "string"
    ? reqUrl.pathname.substring(1)
    : undefined;

  if (info.path) {
    try {
      info.path = decodeURIComponent(info.path);
    } catch (exception) {
      // Can throw URI malformed exception.
      handler.emit("badRequest", res);
      return false;
    }
  }

  // Security checks. Word.
  if (!info.path) {
    handler.emit("badFile", res);
    return false;
  } else if (info.path.search(/^\.\.?|^\/|^\\/) !== -1) {
    handler.emit("security", res, { message: info.path });
    return false;
  } else if (info.path.substring(0, settings.rootPath.length) !== settings.rootPath) {
    // This will trigger if wrong slashes are used. Change?
    handler.emit("security", res, { message: info.path });
    return false;
  }

  info.path = info.path.substring(settings.rootPath.length);
  info.file = info.path.match(/(.*[\/|\\])?(.+?)$/)[2];
  info.path = settings.rootFolder + info.path;

  try {
    const stat = fs.statSync(info.path);

    if (!stat.isFile()) {
      handler.emit("badFile", res);
      return false;
    }
    info.modified = stat.mtime;

  } catch (e) {
    handler.emit("badFile", res, e);
    return false;
  }

  writeHeader(res, info);

  fs.createReadStream(info.path)
    .pipe(srt2vtt())
    .pipe(res);

  return true;
};

subtitles.settings = (s) => {
  for (const prop in s) {
    settings[prop] = s[prop];
  }
  return subtitles;
};

var writeHeader = (res, info) => {
  const code = 200;
  const header = {
    "Cache-Control": "public; max-age=" + settings.maxAge,
    "Connection": "keep-alive",
    "Content-Type": "text/vtt",
    "Pragma": "public",
    "Last-Modified": info.modified.toUTCString(),
    "Content-Transfer-Encoding": "utf-8"
  };

  if (settings.cors) {
    header["Access-Control-Allow-Origin"] = "*";
    header["Access-Control-Allow-Headers"] = "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept";
  }

  res.writeHead(code, header);
};

var errorHeader = function (res, code) {
  var header = {
    "Content-Type": "text/html",
    Server: settings.server
  };

  res.writeHead(code, header);
};


module.exports = subtitles;