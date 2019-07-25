import React from "react";
import PropTypes from "prop-types";
import dva, { connect } from "dva";
import { Provider } from "react-redux";
import models from "../src/models/index.js";

const checkServer = () =>
  Object.prototype.toString.call(global.process) === "[object process]";

const __NEXT_DVA_STORE__ = "__NEXT_DVA_STORE__";

function createDvaStore(initialState) {
  let app;
  if (initialState) {
    app = dva({
      initialState
    });
  } else {
    app = dva({});
  }
  const isArray = Array.isArray(models);
  if (isArray) {
    models.forEach(m => {
      app.model(m);
    });
  } else {
    app.model(models);
  }
  app.router(() => {});
  app.start();

  const store = app._store;
  return store;
}

function getOrCreateStore(initialState) {
  const isServer = checkServer();
  if (isServer) {
    return createDvaStore(initialState);
  }

  if (!window[__NEXT_DVA_STORE__]) {
    window[__NEXT_DVA_STORE__] = createDvaStore(initialState);
  }

  return window[__NEXT_DVA_STORE__];
}

export default function withDva(...args) {
  return function CreateNextPage(Component) {
    const ComponentWithDva = (props = {}) => {
      const { store, initialProps, initialState } = props;
      const ConnectedComponent = connect(...args)(Component);
      return React.createElement(
        Provider,
        // in client side, it will init store with the initial state tranfer from server side
        {
          store:
            store && store.dispatch ? store : getOrCreateStore(initialState)
        },
        // transfer next.js's props to the page
        React.createElement(ConnectedComponent, initialProps)
      );
    };
    ComponentWithDva.propTypes = {
      store: PropTypes.object,
      initialProps: PropTypes.object,
      initialState: PropTypes.object
    };

    ComponentWithDva.getInitialProps = async (props = {}) => {
      const isServer = checkServer();
      const store = getOrCreateStore(props.req);
      // call children's getInitialProps
      // get initProps and transfer in to the page
      const initialProps = Component.getInitialProps
        ? await Component.getInitialProps({ ...props, isServer, store })
        : {};
      return {
        store,
        initialProps,
        initialState: store.getState()
      };
    };
    return ComponentWithDva;
  };
}
