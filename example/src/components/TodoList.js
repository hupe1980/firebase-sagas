import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Well, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { FormField, SimpleForm } from './common';
import {
  saveTodoRequest,
  removeTodoRequest,
  setTodoStatusRequest,
} from '../actions/todoActions';


class TodoList extends PureComponent {

  renderTask(item) {
    if (item.done) {
      return <s>{item.task}</s>;
    }
    return item.task;
  }

  renderItem(item) {
    return (
      <ListGroupItem key={item.key}>
        { this.renderTask(item) }
        <div className="pull-right" role="group">
          <Button
            bsSize="xs"
            disabled={item.done}
            onClick={() => this.props.setTodoStatusRequest(item.key)}
            bsStyle="success"
          >&#x2713;</Button>
          {' '}
          <Button
            bsSize="xs"
            onClick={() => this.props.removeTodoRequest(item.key)}
            bsStyle="danger"
          >&#xff38;</Button>
        </div>
      </ListGroupItem>
    )
  }

  render() {
    return (
      <Well>
        <SimpleForm submitAction={this.props.saveTodoRequest.bind(this)} buttonText="Add Task">
          <FormField type="text" name="task" label="Task" />
        </SimpleForm>
        <ListGroup>
          {this.props.todo.list.map(item => this.renderItem(item))}
        </ListGroup>
      </Well>
    );
  }
}

const mapStateToProps = ({ todo }) => ({ todo });

export default connect(mapStateToProps, { saveTodoRequest, removeTodoRequest, setTodoStatusRequest })(TodoList);
