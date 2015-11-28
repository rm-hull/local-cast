"use strict";

var Client = require('castv2-client').Client;
var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;
var mdns = require('mdns');
var mime = require('mime-types');
var is = require("is");

// Fix for IPv6 crash
mdns.Browser.defaultResolverSequence[1] = 'DNSServiceGetAddrInfo' in mdns.dns_sd
  ? mdns.rst.DNSServiceGetAddrInfo()
  : mdns.rst.getaddrinfo({families:[4]});

function onDeviceUp(movie, host, callback) {

  const client = new Client();

  client.connect(host, () => {
    console.log('connected, launching app ...');

    client.launch(DefaultMediaReceiver, function(err, player) {
      const media = {
        contentId: movie.url,
        contentType: mime.lookup(movie.url),
        streamType: 'BUFFERED', // or LIVE

        // Title and cover displayed while buffering
        metadata: {
          type: 0,
          metadataType: 0,
          title: movie.metadata.title,
          images: [
            { url: movie.image }
          ]
        }
      };

      const options = {
        autoplay: true
      };

      if (movie.subtitles) {
        media.tracks = [{
          trackId: 1, // This is an unique ID, used to reference the track
          type: 'TEXT', // Default Media Receiver currently only supports TEXT
          trackContentId: 'http://vtt.dev.sope.io/', // the URL of the VTT (enabled CORS and the correct ContentType are required)
          trackContentType: 'text/vtt', // Currently only VTT is supported
          name: 'English', // a Name for humans
          language: 'en-US', // the language
          subtype: 'SUBTITLES' // should be SUBTITLES
        }];

        options.activeTrackIds = [1];
      }

      player.on('status', (status) => {
        console.log('status broadcast=%s', JSON.stringify(status, null, 2));
        if (is.fn(callback)) {
          callback(err, status, player);
        }
      });

      console.log('app "%s" launched, loading media %s ...', player.session.displayName, media.contentId);


      player.load(media, options, (err, status) => {
        console.log('media loaded status=%s', JSON.stringify(status, null, 2));

        if (is.fn(callback)) {
          callback(err, status, player);
        }
      });
    });
  });

  client.on('error', (err) => {
    console.log('Error: %s', err.message);
    client.close();
    if (is.fn(callback)) {
      callback(err);
    }
  });
}

module.exports = {
  movie: (movie, callback) => {
    const browser = mdns.createBrowser(mdns.tcp('googlecast'));
    browser.on('serviceUp', (service) => {
      console.log('found device "%s" at %s:%d', service.name, service.addresses[0], service.port);
      onDeviceUp(movie, service.addresses[0]);
      browser.stop();
    });

    browser.start();
    }
};