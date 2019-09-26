import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
export default class ListItem extends Component {
  constructor(props){
    super(props);

    this.state = {
    };

    this.foo = this.foo.bind(this);
  }

  foo(){
    alert(this.props.data.title);
  }

  render() {

    return (
      <ListGroupItem header={this.props.data.title.trim().split("\n")[0]} onClick={this.foo}>
        {this.props.data.content}
        <p>Hello</p>
      </ListGroupItem>
    );
  }
}
