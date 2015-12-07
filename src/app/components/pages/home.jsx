import React from 'react';
import {History} from 'react-router';
import {Mixins, RaisedButton, Styles} from 'material-ui';
import HomeFeature from './home-feature';
import FullWidthSection from '../full-width-section';

const {StylePropable, StyleResizable} = Mixins;
const {Colors, Spacing, Typography} = Styles;
const DefaultRawTheme = Styles.LightRawTheme;


const HomePage = React.createClass({

  mixins: [
    StylePropable,
    StyleResizable,
    History,
  ],

  render() {
    let style = {
      paddingTop: Spacing.desktopKeylineIncrement,
    };

    return (
      <div style={style}>
        {this._getHomePageHero()}
        {this._getHomePurpose()}
        {this._getHomeFeatures()}
        {this._getHomeContribute()}
      </div>
    );
  },

  _getHomePageHero() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden',
      },
      svgLogo: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        width: 294 + 'px'
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      label: {
        color: DefaultRawTheme.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px',
      },
      startStyle: {
        margin: '16px 32px 0px 32px',
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
          <img style={styles.svgLogo} src="img/Chromecast_cast_button_icon.svg" />
          <div style={styles.tagline}>
            <h1 style={styles.h1}>local-cast</h1>
            <h2 style={styles.h2}>
              Stream local video/audio content to a Chromecast on your network
            </h2>
            <RaisedButton
              className="start-button"
              label="Start"
              onTouchTap={this._onStartClick}
              linkButton={true}
              style={styles.demoStyle}
              labelStyle={styles.label}/>
          </div>
      </FullWidthSection>
    );
  },

  _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="home-purpose">
        Some text here
      </FullWidthSection>
    );
  },

  _getHomeFeatures() {
    let styles = {maxWidth: '906px'};
    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
        <HomeFeature
          heading="Get Started"
          route="/get-started"
          img="images/get-started.svg"
          firstChild={true}/>
        <HomeFeature
          heading="Customization"
          route="/customization"
          img="images/css-framework.svg" />
        <HomeFeature
          heading="Media"
          route="/media"
          img="images/media.svg"
          lastChild={true}/>
      </FullWidthSection>
    );
  },

  _getHomeContribute() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
        textAlign: 'center',
      },
      h3: {
        margin: 0,
        padding: 0,
        fontWeight: Typography.fontWeightLight,
        fontSize: 22,
      },
      button: {
        marginTop: 32,
      },
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>
        <h3 style={styles.h3}>
          Want to help make this <span style={styles.nowrap}>project awesome? </span>
          <span style={styles.nowrap}>Check out our repo.</span>
        </h3>
        <RaisedButton
          label="GitHub"
          primary={true}
          linkButton={true}
          href="https://github.com/rm-hull/local-cast"
          style={styles.button}/>
      </FullWidthSection>
    );
  },

  _onStartClick() {
    this.history.pushState(null, '/media');
  },
});

export default HomePage;
