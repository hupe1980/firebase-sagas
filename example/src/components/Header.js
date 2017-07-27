import React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';
import { logoutUserRequest } from '../actions/authActions';

const Header = () => (
  <PageHeader>
    firebase-sagas <small>Example</small>
  </PageHeader>
  );

export default connect(null, { logoutUserRequest })(Header);
