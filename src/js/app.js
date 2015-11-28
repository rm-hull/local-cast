"use strict";

const express = require("express");
const vidStreamer = require("vid-streamer");
const ip = require("ip");

const cast = require('./cast');

const newSettings = {
  rootFolder: "/export/media/Videos/Films/",
  cors: true
}

// Use IP address as it is likely that chromecast uses its
// own DNS resolution, and won't necessarily know the name
// of the local server.
const addr = ip.address();
const port = 3000;

const movie = {
  subtitles: true,
  url: `http://${addr}:${port}/videos/Grand Budapest Hotel.m4v`,
  image: 'https://image.tmdb.org/t/p/w185/nX5XotM9yprCKarRH4fzOq1VM1J.jpg',
  metadata: {
    poster_path: '/nX5XotM9yprCKarRH4fzOq1VM1J.jpg',
    adult: false,
    overview: 'The Grand Budapest Hotel tells of a legendary concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé. The story involves the theft and recovery of a priceless Renaissance painting, the battle for an enormous family fortune and the slow and then sudden upheavals that transformed Europe during the first half of the 20th century.',
    release_date: '2014-03-07',
    genre_ids: [],
    id: 120467,
    original_title: 'The Grand Budapest Hotel',
    original_language: 'en',
    title: 'The Grand Budapest Hotel',
    backdrop_path: '/x5X14fl677xQ8r2R6mwApDKUWkr.jpg',
    popularity: 4.62562,
    vote_count: 1685,
    video: false,
    vote_average: 7.91
  }
};

const app = express();
app.get("/videos/:movie", vidStreamer.settings(newSettings));
app.listen(port);

cast.movie(movie);