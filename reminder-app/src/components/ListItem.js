import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class ListItem extends Component {
  constructor(props){
    super(props);

    this.state = {
    };

    this.foo = this.foo.bind(this);
  }

  foo(){
    //console.log(Date(Date.now()));
    //alert(this.props.data.title);
    console.log(Date(this.props.data.date));
  }
// /<Link to='/Notes/{this.props.data.noteid}'>
  render() {

    return (
      <Link to={{
        pathname: '/Notes/'+this.props.data.noteid,
        state: {
          title : this.props.data.title,
          content : this.props.data.content,
          do_type : this.props.data.do_type,
        }
      }}>
      <ListGroupItem header={this.props.data.title.trim().split("\n")[0]} onClick={this.foo}>
        <div margin-bottom="0px">Created : {Date(this.props.data.date)}</div>
      </ListGroupItem>
      </Link>
    );
  }
}
