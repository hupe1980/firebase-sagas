import React from 'react';
import { Field } from 'redux-form';
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
 } from 'react-bootstrap';

const renderField = ({ input, label, type, meta: { touched, error, invalid } }) => (
  <FormGroup>
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl {...input} type={type} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
 );

const FormField = ({ type, label, name }) => (
  <Field
    name={name}
    label={label}
    component={renderField}
    type={type}
  />
  );

export default FormField;
