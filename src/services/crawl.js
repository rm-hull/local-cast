"use strict";

const is = require("is");
const Redis = require("ioredis");
const walk = require("walk").walk;
const movieTitle = require("movie-title");
const MovieDB = require("moviedb");
const moment = require("moment");

const sha256 = require("./sha256");

const redis = new Redis(6379, "redis");
const apiKey = process.env.TMDB_API_KEY;
const mdb = MovieDB(apiKey);

const supportedFormats = [
  ".mp4",
  ".m4v",
  ".avi",
  ".flv"
];

function addMetadata(searchTerms) {
  return (movie) => {
    return new Promise((resolve, reject) => {
      if (is.empty(searchTerms)) {
        return resolve(movie);
      }

      if (is.empty(movie.metadata) && is.empty(movie.matches)) {
        console.log("No metadata for: " + searchTerms, Object.keys(movie));
        mdb.searchMovie({query: searchTerms}, (err, res) => {

          if (err) {
            return reject(err);
          }

          if (res.total_results === 1) {
            movie.metadata = res.results[0];
            delete movie.matches;

          } else {
            movie.matches = res.results;
            delete movie.metadata;
          }
        });
      }

      resolve(movie);
    });
  }
}

function setFileStats(id, root, fileStats) {
  return (movie) => {
    return new Promise((resolve) => {
      movie = movie ? JSON.parse(movie) : {};
      movie.id = id;
      movie.root = root;
      movie.fileStats = fileStats;
      movie.crawled = moment().toISOString();
      resolve(movie);
    });
  };
}

function isSupported(filename) {
  return supportedFormats.some((ext) => filename.endsWith(ext));
}

function processFile(root, fileStats, next) {
  if (!isSupported(fileStats.name)) {
    return next();
  }

  const id = sha256(fileStats.name);
  const movieName = movieTitle(fileStats.name);
  //console.log(id, movieName);

  redis.hget("movie", id)
    .then(setFileStats(id, root, fileStats))
    .then(addMetadata(movieName))
    .then((movie) => redis.hset("movie", id, JSON.stringify(movie)))
    .then(() => next());
}

var walker = walk("/mnt/atrax/media/Videos/Films");

walker.on("file", processFile);
walker.on("errors", console.log);
walker.on("end", () => {
  console.log("all done");
});
