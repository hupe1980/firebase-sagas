import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageHeader, Button, Glyphicon } from 'react-bootstrap';
import { signOut } from '../actions/authActions';

const Header = props => (
  <PageHeader>
      firebase-sagas <small>Example</small>
    {props.loggedIn && <Button bsStyle="link" onClick={props.signOut}>
      <Glyphicon glyph="log-out" />
      </Button>}
  </PageHeader>
  );

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ loggedIn: auth.loggedIn });

export default connect(mapStateToProps, { signOut })(Header);
