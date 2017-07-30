import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Well, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { FormField, SimpleForm } from './common';
import { saveTodo, removeTodo, setDoneStatus, startSyncTodo } from '../actions/todoActions';

class TodoList extends PureComponent {

  componentWillMount() {
    this.props.startSyncTodo();
  }

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
            onClick={() => this.props.setDoneStatus(item.key)}
            bsStyle="success"
          >&#x2713;</Button>
          {' '}
          <Button
            bsSize="xs"
            onClick={() => this.props.removeTodo(item.key)}
            bsStyle="danger"
          >&#xff38;</Button>
        </div>
      </ListGroupItem>
    )
  }

  render() {
    return (
      <Well>
        <SimpleForm submitAction={this.props.saveTodo.bind(this)} buttonText="Add Task">
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

export default connect(mapStateToProps, { saveTodo, removeTodo, setDoneStatus, startSyncTodo })(TodoList);
