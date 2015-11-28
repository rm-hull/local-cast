# Local-cast

Stream local video/audio content to a Chromecast on your network.

## Setup

Install [Node.js](https://nodejs.org/en/download/) (at least v4.2.2), confirm it works with:

    $ node -v
    v4.2.2

    $ npm -v
    2.14.7

Clone this repository, and inside the created directory:

    $ sudo apt-get install libavahi-compat-libdnssd-dev
    $ npm install


## TODO
* Web interface
* SRT ==> VTT conversion
* TMDB enrichment/integration
* Redis cache
* Auto-scan content
* Autoscale output
