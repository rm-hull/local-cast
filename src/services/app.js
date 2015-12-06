"use strict";

const express = require("express");
const vidStreamer = require("vid-streamer");
const ip = require("ip");

const subtitle = require('./subtitle');
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

const movie1 = {
  url: `http://${addr}:${port}/videos/Jean De Florette.m4v`,
  subtitles: `http://${addr}:${port}/subtitles/Jean De Florette.srt`,
  image: 'https://image.tmdb.org/t/p/w185/5NDJTCAFAgMESBHxEqLYd1q5VbQ.jpg',
  metadata: {
    poster_path: '/5NDJTCAFAgMESBHxEqLYd1q5VbQ.jpg',
    adult: false,
    overview: 'In a rural French village an old man and his only remaining relative cast their covetous eyes on an adjoining vacant property. They need its spring water for growing their flowers, so are dismayed to hear the man who has inherited it is moving in. They block up the spring and watch as their new neighbour tries to keep his crops watered from wells far afield through the hot summer. Though they see his desperate efforts are breaking his health and his wife and daughter\'s hearts they think only of getting the water',
    release_date: '1986-08-27',
    genre_ids: [],
    id: 4480,
    original_title: 'Jean de Florette',
    original_language: 'fr',
    title: 'Jean de Florette',
    backdrop_path: '/gmv3jkIdbNGJtAclh7Z4l0q2APs.jpg',
    popularity: 1.238354,
    vote_count: 23,
    video: false,
    vote_average: 7.28
  }
};

const movie2 = {
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
app.get("/subtitles/:movie", subtitle.settings(newSettings));
app.listen(port);


cast.movie(movie2);