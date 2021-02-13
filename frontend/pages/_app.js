import React from 'react';
import NProgress from 'nprogress';
import Router from "next/router";
import Page from "../components/Page";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';

const MyApp = ({Component, pageProps}) => {
  return (
    <Page>
      <Component {...pageProps}/>
    </Page>
  );
};

export default MyApp;