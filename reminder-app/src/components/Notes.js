import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar } from "react-bootstrap";
import axios from 'axios';
import "./NewNote.css";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      noteid:"",
      title: "",
      content: "",
      do_type:""
    };
  }

  componentDidMount () {
    const { noteid } = this.props.match.params;
    const { title } = this.props.location.state;
    const { content } = this.props.location.state;
    const { do_type } = this.props.location.state;
    this.setState({
      noteid: noteid,
      title: title,
      content: content,
      do_type:do_type
    })


    console.log(this.props.match.params.noteid);
    console.log(title);
    console.log(content);
    console.log(do_type);
  }

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


    axios.put(
      'https://bovcq5al50.execute-api.ap-northeast-2.amazonaws.com/default/notes/'+this.state.noteid,
      {
        "title": this.state.title,
        "content":this.state.content,
        "type":"Todo"
      }
    ).then(res =>{
      this.props.history.push('/');
    })
    .catch(res => {console.log(res)});

  }

  render() {
    return (
      <div className="Notes">
        <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="title"
        >
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            value={this.state.title}
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

        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="large">
            Primary button
          </Button>
          <Button bsSize="large">
            Button
          </Button>
       </ButtonToolbar>;

        <Button bsStyle="primary" type="submit" block>Save</Button>
        </form>
      </div>
    );
  }
}
