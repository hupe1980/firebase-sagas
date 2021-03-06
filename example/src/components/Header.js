import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authActions } from 'firebase-sagas';
import { PageHeader, Button, Glyphicon } from 'react-bootstrap';

const Header = props => (
  <PageHeader>
      firebase-sagas <small>Example</small>
    {props.authenticated && <Button bsStyle="link" onClick={props.signOut}>
      <Glyphicon glyph="log-out" />
      </Button>}
  </PageHeader>
  );

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ authenticated: auth.authenticated });

export default connect(mapStateToProps, authActions)(Header);
