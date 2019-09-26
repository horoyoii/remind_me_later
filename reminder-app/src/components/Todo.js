import React, { Component } from "react";
import "./Todo.css";
import axios from 'axios';
import { Button, PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';

import ListItem from './ListItem'
import Modal from './Modal'
export default class Todo extends Component {
  constructor(props){
    super(props);

    this.state={
      data: [],
    }
  }

  // it is better not to call setState in componentDidMount
  componentDidMount() {
    axios.get(
      'https://bovcq5al50.execute-api.ap-northeast-2.amazonaws.com/default/notes?type=Todo'
    ).then(res =>{
      let result = res.data.result.Items;
      result.map(item => {
        const { data } = this.state;
        console.log("insert"+item.title);
        this.setState({
          data: data.concat(item)
        })
      })
    })
    .catch(res => {console.log(res)});
  }

  // render() is called whenever state is changed...
  render() {
    return (
      <div className="Todo">
        <div className="lander">
          <h1>Todo</h1>
          <p>A simple note taking app</p>
        </div>

        <Button bsStyle="primary">Primary</Button>
        {this.state.data.map(item => {
          return(
            <ListGroup>
              <ListItem data={item}/>
            </ListGroup>
          );
        })}
      </div>
    );
  }
}
