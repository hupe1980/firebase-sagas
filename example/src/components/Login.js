import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Well, Button } from 'react-bootstrap';
import { authActions } from 'firebase-sagas';
import { FormField, SimpleForm } from './common';

const Login = props => (
  <Well>
    <SimpleForm submitAction={props.signInWithEmailAndPassword.bind(this)} buttonText="Log in">
      <FormField type="email" name="email" label="EMail (demo@demo.de)" />
      <FormField type="password" name="password" label="Password (demo123)" />
    </SimpleForm>
    <Button onClick={props.signInWithGoogle} block>Log in with Google</Button>
  </Well>
);

Login.propTypes = {
  signInWithEmailAndPassword: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
};

export default connect(null, authActions)(Login);
