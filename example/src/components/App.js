import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './Header';
import TodoList from './TodoList';
import Login from './Login';
import RequireAuth from './RequireAuth';

const App = () => (
  <Grid>
    <Row>
      <Col xs={8} xsOffset={2}>
        <Header />
        <Switch>
          <Route exact path="/" component={RequireAuth(TodoList)} />
          <Route path="/Login" component={Login} />
        </Switch>
      </Col>
    </Row>
  </Grid>
  );

export default App;
