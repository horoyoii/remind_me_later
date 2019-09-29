import React from "react";
import { Route, Switch,AppliedRoute } from "react-router-dom";
import Home from "./components/Home";
import Doing from "./components/Doing"
import Todo from "./components/Todo"
import Done from "./components/Done"
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"


export default () =>
  <Switch>
    <Route path="/" exact component={Todo} />
    <Route path="/doing" exact component={Doing} />
    <Route path="/done" exact component={Done} />
    <Route path="/create" exact component={NewNote} />
    <Route path="/Notes/:noteid" exact component={Notes} />

  </Switch>;
