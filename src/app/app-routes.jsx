import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/master';
import Home from './components/pages/home';

import MediaTypes from './components/pages/media-types';
import VideoSearch from './components/pages/components/video-search';
import AudioSearch from './components/pages/components/audio-search';
import Asset from './components/pages/components/asset';

/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
  <Route path="/" component={Master}>
    <Route path="home" component={Home} />

    <Redirect from="media" to="/media/video" />
    <Route path="media" component={MediaTypes} >
      <Route path="video" component={VideoSearch} />
      <Route path="audio" component={AudioSearch} />
      <Route path="video/:assetId" component={Asset} />
      <Route path="audio/:assetId" component={Asset} />
    </Route>

    <IndexRoute component={Home}/>
  </Route>
);

export default AppRoutes;
