import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, MenuItem,NavItem} from 'react-bootstrap';


import './App.css';

import DatesContainer from './datesContainer';

class App extends Component {
  render() {
    return (
      <div>
        <DatesContainer/>
      </div>
    );
  }
}

export default App;
