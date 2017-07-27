import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Button, FormGroup } from 'react-bootstrap';

class SimpleForm extends PureComponent {

  handleFormSubmit(values) {
    this.props.submitAction(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form inline={this.props.inline} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.props.children}
        <FormGroup>
          <Button type="submit" bsStyle="primary" block>
            {this.props.buttonText}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default reduxForm({ form: 'SimpleForm' })(SimpleForm);
