import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAuth, getConfig } from '../selectors';
import { authActions } from '../actions';


export default function (ComposedComponent) {
  class withSignIn extends PureComponent {
    componentWillMount() {

    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: getAuth(state),
    config: getConfig(state).auth,
  });

  return connect(mapStateToProps, authActions)(withSignIn);
}
