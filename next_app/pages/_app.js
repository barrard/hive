import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import ReduxToastr from 'react-redux-toastr'

import { makeStore } from "../redux/store.js";
import {set_csrf} from '../redux/actions/meta_actions.js'
import {set_user} from '../redux/actions/user_actions.js'
import {set_proposals} from '../redux/actions/proposals_actions.js'

import loading_bar from '../components/small_components/loading_bar.js'
import API from '../components/API.js'
import {set_workers} from '../redux/actions/workers_actions.js'
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if(ctx.req && ctx.req.isAuthenticated()){
      console.log('WHOA')

      /* Get all workers */
      let workers = await API.get_workers(ctx);
      ctx.store.dispatch(set_workers(workers));
      /* Get all projects */
      //@TODO
      /* Get all proposals */
      let proposals = await API.get_proposals(ctx);
      ctx.store.dispatch(set_proposals(proposals));
    }

    if(ctx.isServer){
      // logger.log('isServer')
      let _csrf = ctx.res.locals.csrf_token_function()
      // logger.log('ctx.store')
      // logger.log(ctx.store)
      ctx.store.dispatch(set_csrf(_csrf))
      if(ctx.req.user)ctx.store.dispatch(set_user(ctx.req.user))

    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <>

            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates
              position="top-left"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar={true}
              showCloseButton={false}
              closeOnToastrClick
            />
            <Component {...pageProps} />
          </>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
