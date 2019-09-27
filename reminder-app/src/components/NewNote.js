import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
//import config from "../config";
import "./NewNote.css";
import axios from 'axios';


export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      title: "",
      content: ""
    };
  }

  // validateForm() {
  //   return this.state.content.length > 0;
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }
  //
  // handleFileChange = event => {
  //   this.file = event.target.files[0];
  // }
  //
  // handleSubmit = async event => {
  //   event.preventDefault();
  //
  //   if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
  //     alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
  //     return;
  //   }
  //
  //   this.setState({ isLoading: true });
  // }
  handleChange = e => {
    console.log("handlechanged is called");
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    })

  };

  validateForm(){};
  handleFileChange = event => {};

  handleSubmit = async event =>{
    event.preventDefault();

    console.log("handleSubmit called");
    console.log(this.state.title);
    console.log(this.state.content);

    // POST request to Server
    axios.post(
      'https://bovcq5al50.execute-api.ap-northeast-2.amazonaws.com/default/notes',{
        "title": this.state.title,
        "content":this.state.content,
        "type":"Todo"
      }
    ).then(res =>{
      this.props.history.push('/');
    })
    .catch(res => {console.log(res)});
    // Redirect to ....

  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="title"
        >
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
            name="title"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>

        <FormGroup controlId="content">
          <ControlLabel>Contents</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
              name="content"
            />
        </FormGroup>
        <button type="submit">등록</button>
        </form>
      </div>
    );
  }
}
