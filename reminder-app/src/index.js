import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

var BackgroundImage = React.Component({
  componentWillMount:function(){
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    this.setState({x:x,y:y});
  },
  render:function(){
    return (<div><img className='bg' src={'https://images.pexels.com/photos/373892/pexels-photo-373892.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'} /></div>)
  }
});


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
