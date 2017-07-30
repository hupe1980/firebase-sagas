import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function (ComposedComponent) {
  class RequireAuth extends PureComponent {

    componentWillMount() {
      if (!this.props.auth.loggedIn) {
        this.props.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth.loggedIn) {
        this.props.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps, { push })(RequireAuth);
}
