import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button, Glyphicon } from 'react-bootstrap';
import { logoutUserRequest } from '../actions/authActions';

const Header = props => (
  <div>
    <PageHeader>
      firebase-sagas <small>Example</small>
      {props.auth.loggedIn && <Button bsStyle="link" onClick={props.logoutUserRequest}>
        <Glyphicon glyph="log-out" />
      </Button>}
    </PageHeader>

  </div>
  );

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logoutUserRequest })(Header);
