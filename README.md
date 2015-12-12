# Local-cast

Stream local video/audio content to a Chromecast on your network.

## Overview

**local-cast** is a nodeJS application which scans for video and audio artifacts
in your local network, and allows them to be cast to a connected
[chromecast](https://www.google.com/intl/en_uk/chromecast/).

**local-cast** exposes a material-ui based web interface (using React) to
allow you to select and cast movies, as well as a remote control.

![search page](https://raw.githubusercontent.com/rm-hull/local-cast/master/doc/screenshots/search.jpg)

![movie page](https://raw.githubusercontent.com/rm-hull/local-cast/master/doc/screenshots/movie.jpg)

## Setup

Install [Node.js](https://nodejs.org/en/download/) (at least v4.2.2), confirm it works with:

    $ node -v
    v4.2.2

    $ npm -v
    2.14.7

Clone this repository, and inside the created directory:

    $ sudo apt-get install libavahi-compat-libdnssd-dev
    $ sudo npm install -g gulp
    $ npm install

## Running locally

Whilst this codebase is evolving quickly, the front-end uses a series of
mocked endpoints to provide some scaffolding until the back-end API is
written. To start the front end:

    $ gulp

## TODO
* Web interface
* SRT ==> VTT conversion
* TMDB enrichment/integration
* Redis cache
* Auto-scan content
* Autoscale output


## Attribution

* Chromecast cast button SVG from https://commons.wikimedia.org/wiki/File:Chromecast_cast_button_icon.svg
