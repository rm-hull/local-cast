import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/master';
import Home from './components/pages/home';

import MediaTypes from './components/pages/media-types';
import AppBar from './components/pages/components/app-bar';

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
    <Route path="media" component={MediaTypes}>
      <Route path="video" component={AppBar} />
      <Route path="audio" component={AppBar} />
    </Route>

    <IndexRoute component={Home}/>
  </Route>
);

export default AppRoutes;
