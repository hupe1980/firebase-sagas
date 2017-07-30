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
      <Col xs={12} md={8} mdOffset={2}>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Todo" component={RequireAuth(TodoList)} />
        </Switch>
      </Col>
    </Row>
  </Grid>
  );

export default App;
