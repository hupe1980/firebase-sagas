import React from 'react';
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { FormField, SimpleForm } from './common';
import { loginUserRequest } from '../actions/authActions';

const Login = props => (
  <Well>
    <SimpleForm submitAction={props.loginUserRequest.bind(this)} buttonText="Log in">
      <FormField type="email" name="email" label="EMail (demo@demo.de)" />
      <FormField type="password" name="password" label="Password (demo123)" />
    </SimpleForm>
  </Well>
);

export default connect(null, { loginUserRequest })(Login);
